using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class offer
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("place")]
        public string place_id { get; set; }
        public int offer_percent { get; set; }
        public string comment { get; set; }
        public string expired_date { get; set; }
        public virtual place place { get; set; }
    }
}
