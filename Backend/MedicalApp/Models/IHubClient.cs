using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public interface IHubClient
    {
        //Task BroadcastMessage(string user, string message,int count);
        //Task BroadcastMessage(string name, string v);=====>
        //Task BroadcastCount(int c);
       // Task BroadcastCount(Task<int> c);
    }
}
