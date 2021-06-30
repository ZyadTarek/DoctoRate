using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class review
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("place")]
        public string place_id { get; set; }
        public double rate { get; set; }
        public virtual place place { get; set; }

        [ForeignKey("Client")]
        public string ClientId { get; set; }
        public ApplicationUser Client { get; set; }

        //[ForeignKey("user")]
        //public int user_id { get; set; }

        //  public virtual user user { get; set; }
    }
}