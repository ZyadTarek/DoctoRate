using Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.SignalR;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext db;
     //   private IHubContext<SignalHub> _hub;
        private ApplicationDbContext _db;

        public AdminController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext _db, IConfiguration configuration/*, IHubContext<SignalHub> hub*/)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _userManager = userManager;
            db = _db;
            //_hub = hub;
        }
      
        [HttpGet]
        [Route("List-Users")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Getusers()
        {
            List<string> userids = db.UserRoles.Where(a => a.RoleId == "2").Select(b => b.UserId).Distinct().ToList();
            List<ApplicationUser> listUsers = _userManager.Users.Where(a => userids.Any(c => c == a.Id)).ToList();
            return Ok(await _userManager.Users.Where(a => userids.Any(c => c == a.Id)).ToListAsync());

        }
        [HttpGet]
        [Route("List-Admins")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAdmins()
        {
            List<string> userids = db.UserRoles.Where(a => a.RoleId == "1").Select(b => b.UserId).Distinct().ToList();
            List<ApplicationUser> listUsers = _userManager.Users.Where(a => userids.Any(c => c == a.Id)).ToList();
            return Ok(await _userManager.Users.Where(a => userids.Any(c => c == a.Id)).ToListAsync());

        }
        [HttpPost]
        [Route("addnew-admin")]
        public async Task<IActionResult> AddNewAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            //

           // _hub.Clients.Group("Admins").addMessage("");

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
        [HttpPost]
        [Route("add-admin")]
        public async Task<IActionResult> AddAdmin([FromBody]string id)
        {
            ApplicationUser user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                //IdentityResult result = await userManager.DeleteAsync(user);
                IdentityResult result = await userManager.RemoveFromRoleAsync(user, UserRoles.User);
                result = await userManager.AddToRoleAsync(user, UserRoles.Admin );

                if (result.Succeeded)
                    return Ok(new Response { Status = "Success", Message = "User updated successfully!" });
                else
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User updating failed! " });
            }
            else
                //ModelState.AddModelError("", "User Not Found");
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User not found." });
        }
        [HttpPost]
        [Route("delete-admin")]
        public async Task<IActionResult> Delete([FromBody]string id)
        {
            ApplicationUser user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                //IdentityResult result = await userManager.DeleteAsync(user);
                IdentityResult result = await userManager.RemoveFromRoleAsync(user, UserRoles.Admin);
                result = await userManager.AddToRoleAsync(user, UserRoles.User);

                if (result.Succeeded)
                    return Ok(new Response { Status = "Success", Message = "User updated successfully!" });
                else
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User updating failed! " });
            }
            else
                //ModelState.AddModelError("", "User Not Found");
                 return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User not found." });
        }
        [HttpGet]
        [Route("count-Member")]
        public int CountMember()
        {
            //return db.Users.Count();
            return db.Users.Count();

        }
        [HttpGet]
        [Route("count-Users")]
        public int CountUsers()
        {
            //return db.Users.Count();
            return db.UserRoles.Where(a => a.RoleId == "8f784845-c615-4699-9528-afcc21469d58").Count();

        }
        [HttpGet]
        [Route("count-admins")]
        public int CountAdmins()
        {
            return db.UserRoles.Where(a => a.RoleId == "a353f1ee-1bef-4870-a8a7-bd90d0098a17").Count();

        }
        [HttpGet]
        [Route("count-place")]
        public int CountPlaces()
        {
            return db.places.Count();
        }


        [HttpGet]
        [Route("count-place-WithType")]
        public int CountPlaces(int x)
        {
            return db.places.Count(e => e.type == x);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var fav_doc = await db.Users.FindAsync(id);
            if (fav_doc == null)
            {
                return NotFound();
            }

            db.Users.Remove(fav_doc);
            await db.SaveChangesAsync();

            return NoContent();
        }
    }
}
