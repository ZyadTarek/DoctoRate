using System;
using System.ComponentModel.DataAnnotations.Schema;

using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public class Notification
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Comment_Content { get; set; }
        public string TranType { get; set; }
        public string Usercommented { get; set; }
        public bool status { get; set; }
    }
}
