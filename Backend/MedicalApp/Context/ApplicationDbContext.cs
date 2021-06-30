using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models;

namespace Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public virtual DbSet<comment_like> comment_like { get; set; }
        public virtual DbSet<comment> comments { get; set; }
        public virtual DbSet<fav_doc> fav_doc { get; set; }
        public virtual DbSet<place> places { get; set; }
        public virtual DbSet<review> reviews { get; set; }
        public virtual DbSet<offer> offers { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }

}
