//using Microsoft.AspNetCore.SignalR;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Models
//{
  
//    public class BroadcastHub : Hub/*<IHubClient>*/
//    {
//        private readonly ApplicationDbContext _context;
//        public BroadcastHub(ApplicationDbContext context)
//        {
//            _context = context;
//        }
//        public async void reportComment(string uname,string ucomment)
//        {
//            Clients.All.SendAsync("adminListen", uname,ucomment);
//            Notification notification = new Notification()
//            {
//                Comment_Content = uname,
//                TranType = ""
//            };
//             _context.Notifications.Add(notification);
//        }
//    }
//}
