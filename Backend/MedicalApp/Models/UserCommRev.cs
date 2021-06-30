using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
   public class UserCommRev
    {
        public string Ucomment { get; set; }
        public double rate { get; set; }
        public string PlaceId { get; set; }
        public double totalRate { get; set; }
        public string ClientId { get; set; }
    }
}
