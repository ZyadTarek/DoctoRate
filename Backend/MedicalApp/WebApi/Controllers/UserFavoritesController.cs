using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Context;
using Models;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavoritesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserFavoritesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserFavorites
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<fav_doc>>> Getfav_doc()
        //{
        //    return await _context.fav_doc.ToListAsync();
        //}

        // GET: api/UserFavorites/5
        [HttpGet]
        public ActionResult<fav_doc> Getfav_doc(string ClientId, string place_id)
        {
            var fav_doc = _context.fav_doc.FirstOrDefault(f=>f.ClientId == ClientId && f.place_id == place_id);

            if (fav_doc == null)
            {
                return NotFound(fav_doc);
            }

            return Ok(fav_doc);
        }
        [HttpGet("GetFavorites")]
        public ActionResult<IEnumerable<place>> GetUserFavorites(string ClientId)
        {
            var fav_doc = _context.fav_doc.Include("place").Where(f => f.ClientId == ClientId).Select(p=>p.place);
            if (fav_doc.ToList().Count == 0)
            {
                return Ok("You haven't saved any Place yet.");
            }
            else
            {
                //foreach (var place in fav_doc)
                //{
                //    places.Add(_context.places.FirstOrDefault(p => p.place_id == place.place_id));
                //}
                return Ok(fav_doc);

            }
        }
        // PUT: api/UserFavorites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putfav_doc(int id, fav_doc fav_doc)
        {
            if (id != fav_doc.id)
            {
                return BadRequest();
            }

            _context.Entry(fav_doc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!fav_docExists(id))
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

        // POST: api/UserFavorites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPost]
        public ActionResult<fav_doc> Postfav_doc(fav_doc fav_doc)
        {
			if (ModelState.IsValid) {
                var fav = _context.fav_doc.FirstOrDefault(f => f.ClientId == fav_doc.ClientId && f.place_id == fav_doc.place_id);
                if(fav == null)
				{
                    _context.fav_doc.Add(fav_doc);
                    _context.SaveChanges();
                return CreatedAtAction("Getfav_doc", new { id = fav_doc.id }, fav_doc);
                }
				else
				{
                    return Content(null);
				}
            }
            return BadRequest();
        }

        // DELETE: api/UserFavorites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletefav_doc(int id)
        {
            var fav_doc = await _context.fav_doc.FindAsync(id);
            if (fav_doc == null)
            {
                return NotFound();
            }

            _context.fav_doc.Remove(fav_doc);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool fav_docExists(int id)
        {
            return _context.fav_doc.Any(e => e.id == id);
        }


        [HttpDelete]
        public ActionResult<fav_doc> RemoveFavorite(string ClientId, string place_id)
        {
            var fav_doc = _context.fav_doc.FirstOrDefault(f => f.ClientId == ClientId && f.place_id == place_id);

            if (fav_doc == null)
            {
                return NotFound(fav_doc);
            }
			else
			{
                _context.fav_doc.Remove(fav_doc);
                _context.SaveChanges();
			}
            return Ok("Place Removed Successfully.");
        }
    }
}
