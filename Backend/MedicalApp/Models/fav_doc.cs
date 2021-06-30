using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class fav_doc
    {
        [Key]
        public int id { get; set; }
        
        [ForeignKey("place")]
        public string place_id { get; set; }
        [ForeignKey("Client")]
        public string ClientId { get; set; }
        public ApplicationUser Client { get; set; }

        public virtual place place { get; set; }

        //7316918e-99f1-421a-8b2b-eb59a03fcc39
        //[ForeignKey("user")]
        //public int user_id { get; set; }

        //  public virtual user user { get; set; }

    }
}
