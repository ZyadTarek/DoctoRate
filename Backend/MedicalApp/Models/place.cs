using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class place
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string place_id { get; set; }
        public string name { get; set; }
        public int? type { get; set; }
        public double? rate { get; set; }
        public string icon { get; set; }

        public virtual List<comment> comments { get; set; }
        public virtual List<review> reviews { get; set; }
        public virtual List<fav_doc> fav_docs { get; set; }
        public virtual List<offer> offers { get; set; }
        
    }
}