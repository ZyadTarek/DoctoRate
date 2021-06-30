using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Context;
using Models;
using Newtonsoft.Json;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class commentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public commentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/comments
        [HttpGet]
        public IQueryable<object> Getcomments(string placeId, double totalRate, double commNum)
        {
            double userTotalRate = 0;
            var userRateArr = _context.reviews.Where(r=>r.place_id==placeId).Select(r => r.rate).ToArray();
            for (int i = 0; i < userRateArr.Length; i++)
            {
                userTotalRate = userRateArr[i] + userTotalRate;
            }
            double av = 0;
            if (userTotalRate + (totalRate * commNum) != 0)
            { av = (userTotalRate + (totalRate * commNum)) / ((userRateArr.Length) + commNum); }
            var placeTotalRate = _context.places.Where(d => d.place_id == placeId).FirstOrDefault();
            
            if (placeTotalRate != null)
            {
                placeTotalRate.rate = av;
                _context.places.Update(placeTotalRate);
                _context.SaveChanges();
            }

            var comment = _context.comments.Where(d => d.place_id == placeId);

            //if (comment == null)
            //{
            //    return NotFound();
            //}
            var data = from c in _context.comments
                       join u in _context.Users on c.ClientId equals u.Id  
                       join r in _context.reviews on new
                       {
                           k1 = c.ClientId,
                           k2 = c.place_id
                       }
                       equals new
                       {
                           k1 = r.ClientId,
                           k2 = r.place_id
                       }
                       where c.place_id == placeId
                       select new
                       {
                           Ucomment = c.comm,
                           rate = r.rate,
                           username = u.UserName,
                           userImg = u.User_Image,
                           finaltotalRate = av
                       };

            return (data);
        }

        // GET: api/comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<comment>> Getcomment(int id)
        {
            var comment = await _context.comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcomment(int id, comment comment)
        {
            if (id != comment.id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!commentExists(id))
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

        // POST: api/comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<comment>> Postcomment(comment comment)
        {
            _context.comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcomment", new { id = comment.id }, comment);
        }

        // DELETE: api/comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletecomment(int id)
        {
            var comment = await _context.comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool commentExists(int id)
        {
            return _context.comments.Any(e => e.id == id);
        }
    }
}
