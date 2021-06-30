using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class comment
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("place")]
        public string place_id { get; set; }
        public string ClientId { get; set; }
        public ApplicationUser Client { get; set; }
        public string comm { get; set; }

        public virtual place place { get; set; }
        public virtual List<comment_like> comment_like { get; set; }

        //[ForeignKey("user")]
        //public int user_id { get; set; }

        //  public virtual user user { get; set; }
    }
}