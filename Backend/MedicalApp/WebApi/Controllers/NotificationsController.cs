using Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.SignalR;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        //private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public NotificationsController(ApplicationDbContext context/*, IHubContext<BroadcastHub, IHubClient> hubContext*/)
        {
            _context = context;
            //_hubContext = hubContext;
        }

        // GET: api/Notifications/notificationcount  
        [Route("notificationcount")]
        [HttpGet]
        public async Task<ActionResult<NotificationCountResult>> GetNotificationCount()
        {
            var count = (from not in _context.Notifications
                         select not).CountAsync();
            NotificationCountResult result = new NotificationCountResult
            {
                Count = await count
            };
          //  await _hubContext.Clients.All.BroadcastCount(count);

            return result;
        }

        // GET: api/Notifications/notificationresult  
       
        [HttpGet("notificationresult")]
        public async Task<ActionResult<List<Notification>>> notificationresult()
        {
            var results = from message in _context.Notifications
                          orderby message.Id descending 
                          //where (message.TranType== "reported")
                          select new Notification
                          {
                              Id = message.Id,
                              Comment_Content = message.Comment_Content,
                              TranType = message.TranType,
                              status = message.status,
                              Usercommented = message.Usercommented,

                          };
            return await results.ToListAsync();
        }
       
        [HttpGet("GetNotificationLowRate")]
        public async Task<ActionResult<List<Notification>>> GetNotificationLowRate()
        {
            var results = from message in _context.Notifications
                          orderby message.Id descending
                          where (message.TranType == "Low-Rate")
                          select new Notification
                          {
                              Id = message.Id,
                              Comment_Content = message.Comment_Content,
                              TranType = message.TranType,
                              status = message.status,
                              Usercommented = message.Usercommented,

                          };
            return await results.ToListAsync();
        }
        // DELETE: api/Notifications/deletenotifications  
        [HttpDelete]
        [Route("deletenotifications")]
        public async Task<IActionResult> DeleteNotifications()
        {
            await _context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE Notification");
            await _context.SaveChangesAsync();
            
          //  await _hubContext.Clients.All.BroadcastMessage("","del");

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var Deletecomment = await _context.Notifications.FindAsync(id);
            if (Deletecomment == null)
            {
                return NotFound();
            }

            _context.Notifications.Remove(Deletecomment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}