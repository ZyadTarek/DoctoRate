using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Models
{  
	public class ApplicationUser : IdentityUser
    {

		public DateTime User_DOB { get; set; }
		public string User_Address { get; set; }
		public string User_Phone { get; set; }
		public string User_Image { get; set; }
		public IEnumerable<fav_doc> User_Favorites { get; set; }
		public IEnumerable<review> User_Reviews { get; set; }
		public IEnumerable<comment> User_Comments { get; set; }
		public IEnumerable<comment_like> User_Likes_Dislikes { get; set; }

	}
}
