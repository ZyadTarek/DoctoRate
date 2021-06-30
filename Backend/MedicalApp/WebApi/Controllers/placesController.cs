using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Context;
using Models;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class placesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
      //  private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public placesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager/*, IHubContext<BroadcastHub, IHubClient> hubContext*/)
        {
            _context = context;
           _userManager = userManager;
           // _hubContext = hubContext;
        }

        // GET: api/places
        [HttpGet]
        public async Task<ActionResult<IEnumerable<place>>> Getplaces()
        {
            return await _context.places.ToListAsync();
        }
        [HttpGet("GetplaceFromDB/{id}")]
        public async Task<ActionResult<place>> GetplaceFromDB(string id)
        {
            //var placeFromDb = await _context.places.FindAsync(id);
            var placeFromDb = await _context.places.FindAsync(id);

            if (placeFromDb != null) {
                return Ok(placeFromDb);
          

             }
            else
            {
                return NotFound();
            }

        //    return Ok(placeFromAPI);
        }
        // GET: api/places/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Getplace(string id)
        {
            //var placeFromDb = await _context.places.FindAsync(id);
            var placeFromAPI = string.Empty; 

            //if (placeFromDb == null) {
         
                    var client = new HttpClient();
                    var response = await client.GetStringAsync(String.Format($"https://maps.googleapis.com/maps/api/place/details/json?place_id={id}&key=AIzaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw&language=ar"));
                //placeFromAPI = await response.Content.ReadAsStringAsync();
                //placeFromAPI = JsonConvert.DeserializeObject<string>(placeFromAPI);
                placeFromAPI = response;
                
                      // }
            if (placeFromAPI == null)
            {
                return NotFound();
            }

            return Ok(placeFromAPI);
        }
        [HttpGet("GetToprate_doc")]
        // [HttpGet("GetplaceFromDB
        public IEnumerable<place> GetToprate_doc()
        {
            return _context.places.Where(a => a.rate >= 3.8 && a.type==1).Take(3);

            
        }
        [HttpGet("GetToprate_hos")]
        public IEnumerable<place> GetToprate_hos()
        {
            return _context.places.Where(a => a.rate >= 3.8 && a.type == 2).Take(3);


        }
        [HttpGet("GetToprate_pharmacy")]
        public IEnumerable<place> GetToprate_pharmacy()
        {
            return _context.places.Where(a => a.rate >= 3.8 && a.type == 3).Take(3);


        }
        /** private JObject GetJsonObject(string placeStr)
         {
             return JObject.Parse(placeStr);
         }*/
        /* [HttpGet("{id}")]
         public async Task<ActionResult> GetpPlaceOnMap(string id)
         {
             var placeStr = Getplace(id).Result.ToString();
             var placeJson = JObject.Parse(placeStr);
             var geo = placeJson.GetValue("geometry");
             //var lat = geo.;
             //var placeFromDb = await _context.places.FindAsync(id);
             //var placeFromAPI = string.Empty;

             //if (placeFromDb == null)
             //{

                 var client = new HttpClient();
                 var response = await client.GetStringAsync(String.Format($"https://maps.googleapis.com/maps/api/place/details/json?place_id={id}&key=AIzaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw&fields=geometry,formatted_address,formatted_phone_number,international_phone_number,name,opening_hours,rating&language=ar"));
                 //placeFromAPI = await response.Content.ReadAsStringAsync();
                 //placeFromAPI = JsonConvert.DeserializeObject<string>(placeFromAPI);
                 //placeFromAPI = response;

             //}
             if (response == null)
             {
                 return NotFound();
             }

             return Ok(response);
         }*/
        // PUT: api/places/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putplace(string id, place place)
        {
            if (id != place.place_id)
            {
                return BadRequest();
            }

            _context.Entry(place).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!placeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/places
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<string>> Postplace(UserCommRev data)
        {
            //11820c41-3ee5-41a0-93e1-b82ff4992952
            if (!placeExists(data.PlaceId))
            {
                //_context.places.Add(place);
                //await _context.SaveChangesAsync();
            }

            var user = await _userManager.GetUserAsync(HttpContext.User);
            //var  = user.Id;
            //var UId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var UId = data.ClientId;
            var PId = data.PlaceId;
            review rev = new review() { place_id = PId, ClientId = UId, rate = data.rate };
            comment comme = new comment() { place_id = PId, ClientId = UId, comm = data.Ucomment };
            var revFind = _context.reviews.Where(d => d.place_id == data.PlaceId && d.ClientId == UId).FirstOrDefault();
            if (revFind == null)
            {
                _context.reviews.Add(rev);

            }
            else
            {
                _context.reviews.Where(d => d.place_id == data.PlaceId && d.ClientId == UId).FirstOrDefault();
                revFind.rate = data.rate;
                _context.reviews.Update(revFind);
            }

            await _context.SaveChangesAsync();
            _context.comments.Add(comme);
            await _context.SaveChangesAsync();
            return data.PlaceId;
        }





        [HttpPost("AddPlace")]
        public async Task<ActionResult<place>> Addplace(place place)
        {
            place p = _context.places.Find(place.place_id);
            if (p == null)
                _context.places.Add(place);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (placeExists(place.place_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Getplace", new { id = place.place_id }, place);
        }

        // DELETE: api/places/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteplace(string id)
        {
            //var listOffersOnPlace = _context.offers.Where(d => d.place_id == id).ToList();
            

            var place = await _context.places.FindAsync(id);
            if (place == null)
            {
                return NotFound();
            }
            else 
            {

                // var listOffers=await _context.offers.FindAsync({a =>a. })
               // if (listOffers == null)
               // {
                  //  _context.places.Remove(place);
               // }
              //  else {
                    _context.places.Remove(place);
                //}
            }
            //_context.places.Remove(place);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool placeExists(string id)
        {
            return _context.places.Any(e => e.place_id == id);
        }
    }
}
