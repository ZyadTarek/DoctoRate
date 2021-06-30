using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.googleReturn
{
    public class placesFeatures
    {
        public string name { get; set; }
        public string place_id { get; set; }
        //public string icon { get; set; }
        public string formatted_address { get; set; }
        public string rating { get; set; }
        public place_open opening_hours { get; set; }
        public placePhoto[] photos { get; set; }
        public string[] types { get; set; }
    }
}
