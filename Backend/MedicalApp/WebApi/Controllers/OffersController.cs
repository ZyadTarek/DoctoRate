using Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.googleReturn;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        string Mykey = "AIzaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw";
        HttpClient client;

        public OffersController(ApplicationDbContext db)
        {
            _db = db;
            client = new HttpClient();
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> Getplaces()
        //public async Task<ActionResult<List<offer>>> Getplaces()
        {
            //return await _db.offers.ToListAsync();
            //var offer = (from o in _db.offers
            //             where DateTime.ParseExact(o.expired_date, "MM/dd/yyyy",
            //                        System.Globalization.CultureInfo.InvariantCulture) == DateTime.Today
            //             select o).ToListAsync();


            var offer = _db.offers.Select(a =>
                new
                {
                    a.place_id,
                    a.id,
                    a.offer_percent,
                    a.comment,
                    a.expired_date,
                    place_name = a.place.name,
                    a.place.rate,
                    a.place.type
                }
                ).ToList();
            offer.RemoveAll(o =>
             DateTime.ParseExact(o.expired_date, "MM/dd/yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture) < DateTime.Today);


            //var a = DateTime.ParseExact(offer, "MM/dd/yyyy",
            //                          System.Globalization.CultureInfo.InvariantCulture);

            return offer;
        }
        [HttpGet]
        [Route("/api/offerThree")]
        public ActionResult<IEnumerable<object>> GetThreeplaces()
        {
            Random rnd = new Random();
            var offer = _db.offers.Select(a =>
                new
                {
                    a.place_id,
                    a.offer_percent,
                    a.comment,
                    a.expired_date,
                    place_name = a.place.name,
                    a.place.rate,
                    a.place.type
                }
                ).ToList();
            offer.RemoveAll(o =>
           
             DateTime.ParseExact(o.expired_date, "MM/dd/yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture) < DateTime.Today);


            var off = offer.OrderBy(x => rnd.Next()).Take(3).ToList();

            return off;
        }

        [HttpGet()]
        [Route("/api/nearPlaces")]
        public async Task<ActionResult<string>> PlaceSearch(double lat, double lng)
        {
            Random rnd = new Random();
            //string query = "hospital or pharmacy";
            //HttpResponseMessage res = await client.GetAsync("https://maps.googleapis.com/maps/api/place/textsearch/json?&language=ar&key=" + Mykey + "&query=" + query + "&opennow&location="+lat.ToString()+","+lng.ToString()+ "&radius=1000");
            HttpResponseMessage res = await client.GetAsync("https://maps.googleapis.com/maps/api/place/nearbysearch/json?&language=ar&key=" + Mykey + "&location=" + lat.ToString() + "," + lng.ToString() + "&radius=500&type=hospital");
            if (res.IsSuccessStatusCode)
            {
                var allplaces = await res.Content.ReadAsAsync<googleRes>();
                var places = allplaces.results.OrderBy(x => rnd.Next()).Take(1).ToArray();


                HttpResponseMessage res2 = await client.GetAsync("https://maps.googleapis.com/maps/api/place/nearbysearch/json?&language=ar&key=" + Mykey + "&location=" + lat.ToString() + "," + lng.ToString() + "&radius=500&type=pharmacy");
                if (res2.IsSuccessStatusCode)
                {
                    var allplaces2 = await res2.Content.ReadAsAsync<googleRes>();
                    places = places.Concat(allplaces2.results.OrderBy(x => rnd.Next()).Take(2)).ToArray();
                    for (int i = 0; i < places.Length; i++)
                    {

                        ///rating
                        var p = _db.places.FirstOrDefault(a => a.place_id == places[i].place_id);
                        if (p != null)
                        {
                            places[i].rating = p.rate.ToString();
                        }
                    }


                    return Ok(places);
                    //return Ok(a);
                }
                //return Ok(places);
                //return Ok(a);
            }
            return NotFound();
        }
        // POST: api/offers1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<offer>> Postoffer(offer offer)
        {
            _db.offers.Add(offer);
            await _db.SaveChangesAsync();
            return CreatedAtAction("Getoffer", new { id = offer.id }, offer);
        }

    }
}