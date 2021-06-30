using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Context;
using System.Net.Http;
using Models.googleReturn;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceSearchController : ControllerBase
    {
        private ApplicationDbContext _db;
        string Mykey = "AIzaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw";
        HttpClient client;

        public PlaceSearchController(ApplicationDbContext db)
        {
            _db = db;
            client = new HttpClient();
        }

        //[HttpGet("{searchString}")]
        [HttpGet()]
        public async Task<ActionResult<string>> PlaceSearch([FromQuery]string searchString)
        {
            HttpResponseMessage res = await client.GetAsync("https://maps.googleapis.com/maps/api/place/textsearch/json?&language=ar&key=" + Mykey +"&region=eg"+"&query=" + searchString);
            if (res.IsSuccessStatusCode)
            {
                var places = await res.Content.ReadAsAsync<googleRes>();
                for (int i = 0; i < places.results.Length; i++)
                {

                    ///rating
                    var p = _db.places.FirstOrDefault(a => a.place_id == places.results[i].place_id);
                    if (p != null)
                    {
                        places.results[i].rating = p.rate.ToString();
                    }
                }
                return Ok(places);
                //return Ok(a);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<string>> getMorePlaces([FromBody]string pageToken)
        {
            HttpResponseMessage res = await client.GetAsync("https://maps.googleapis.com/maps/api/place/textsearch/json?&language=ar&key=" + Mykey + "&pagetoken=" + pageToken);
            if (res.IsSuccessStatusCode)
            {
                var places = await res.Content.ReadAsAsync<googleRes>();
                for (int i = 0; i < places.results.Length; i++)
                {

                    ///rating
                    var p = _db.places.FirstOrDefault(a => a.place_id == places.results[i].place_id);
                    if (p != null)
                    {
                        places.results[i].rating = p.rate.ToString();
                    }
                }
                return Ok(places);
                //return Ok(a);
            }
            return NotFound();
        }
    }
}
