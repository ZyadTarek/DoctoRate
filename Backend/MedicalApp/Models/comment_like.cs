using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class comment_like
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("Client")]
        public string ClientId { get; set; }
        public ApplicationUser Client { get; set; }
        [ForeignKey("comment")]
        public int comment_id { get; set; }

        public int like_dis { get; set; }

        public virtual comment comment { get; set; }

        //[ForeignKey("user")]
        //public int user_id { get; set; }

        // public virtual user user { get; set; }
    }
}