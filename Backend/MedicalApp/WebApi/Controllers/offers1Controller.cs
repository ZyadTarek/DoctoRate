using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Context;
using Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class offers1Controller : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public offers1Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/offers1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<offer>>> Getoffers()
        {
            return await _context.offers.ToListAsync();
        }

        // GET: api/offers1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<offer>> Getoffer(int id)
        {
            var offer = await _context.offers.FindAsync(id);

            if (offer == null)
            {
                return NotFound();
            }

            return offer;
        }

        // PUT: api/offers1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putoffer(int id, offer offer)
        {
            if (id != offer.id)
            {
                return BadRequest();
            }

            _context.Entry(offer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!offerExists(id))
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

        // POST: api/offers1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<offer>> Postoffer(offer offer)
        {
            _context.offers.Add(offer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getoffer", new { id = offer.id }, offer);
        }

        // DELETE: api/offers1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteoffer(int id)
        {
            var offer = await _context.offers.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }

            _context.offers.Remove(offer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool offerExists(int id)
        {
            return _context.offers.Any(e => e.id == id);
        }
    }
}
