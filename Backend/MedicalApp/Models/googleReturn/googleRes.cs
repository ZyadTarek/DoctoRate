using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.googleReturn
{
    public class googleRes
    {
        //public html_attributions
        public placesFeatures[] results { get; set; }
        public string next_page_token { get; set; }
        public string status { get; set; }
    }
}
