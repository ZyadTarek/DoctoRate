using Context;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi
{
  
    public class BroadcastHub : Hub/*<IHubClient>*/
    {
        private readonly ApplicationDbContext _context;
        int  count;
        public BroadcastHub(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task reportComment(string uname,string ucomment)
        {
            count = await (from not in _context.Notifications
                               select not).CountAsync();

            await Clients.All.SendAsync("adminListen", uname,ucomment);
            count = count + 1;
            NotificationCountResult result = new NotificationCountResult
            {
                Count = count
            };
            await Clients.All.SendAsync("getCount", count );
            Notification notification = new Notification()
            {
                Comment_Content = ucomment,
                TranType = "reported",
                Usercommented = uname,
                status=true,
            };

           
            _context.Notifications.Add(notification);
           await  _context.SaveChangesAsync();
        }
        //Low rate Hub
        public async Task lowRate(string uname, string ucomment,string placeName)
        {
             count = await (from not in _context.Notifications
                               select not).CountAsync();

            await Clients.All.SendAsync("adminListenLowRate", uname,ucomment, placeName);
            count = count + 1;
            NotificationCountResult result = new NotificationCountResult
            {
                Count = count
            };
            await Clients.All.SendAsync("getCount", count);
            Notification notification = new Notification()
            {
                Comment_Content = ucomment,
                TranType = "Low-Rate",
                Usercommented = uname,
                status = true,

            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }



    }
}
/*
 * 
 *  var count = (from not in _context.Notifications
                         select not).CountAsync();
            NotificationCountResult result = new NotificationCountResult
            {
                Count = await count
            };
 * */