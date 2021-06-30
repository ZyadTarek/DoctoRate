using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private ApplicationUser _currentUser;
        public SignInManager<ApplicationUser> SignInManager { get; }

        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.SignInManager = signInManager;
            _configuration = configuration;
            //_currentUser = new ApplicationUser();
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                await SignInManager.SignInWithClaimsAsync(user, false, authClaims);
                _currentUser = new ApplicationUser { UserName = user.UserName, PasswordHash = user.PasswordHash };
                //SignInManager signInManager = ;
                //signInManager.UpdateExternalAuthenticationTokensAsync();
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
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
            if (await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        //[HttpPost]
        //[Route("register-admin")]
        //public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        //{
        //    var userExists = await userManager.FindByNameAsync(model.Username);
        //    if (userExists != null)
        //        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

        //    ApplicationUser user = new ApplicationUser()
        //    {
        //        Email = model.Email,
        //        SecurityStamp = Guid.NewGuid().ToString(),
        //        UserName = model.Username
        //    };
        //    var result = await userManager.CreateAsync(user, model.Password);
        //    if (!result.Succeeded)
        //        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

        //    if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
        //        await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        //    if (!await roleManager.RoleExistsAsync(UserRoles.User))
        //        await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

        //    if (await roleManager.RoleExistsAsync(UserRoles.Admin))
        //    {
        //        await userManager.AddToRoleAsync(user, UserRoles.Admin);
        //    }

        //    return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        //}
        [HttpGet("User")]
        public async Task<IActionResult> GetCurrentUserAsync(string token)
        {
            Dictionary<string, object> User = new Dictionary<string, object>();
            var username = string.Empty;
            User.Add("token", token);
            if (token != null)
            {
                var payload = new JwtSecurityTokenHandler().ReadJwtToken(token).Payload;
                foreach (var load in payload)
                {
                    if (load.Key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")
                    {
                        User.Add("username", load.Value);
                    }
                    else if (load.Key == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")
                    {
                        User.Add("role", load.Value);
                    }
                }
                username = User.FirstOrDefault(u => u.Key == "username").Value.ToString();
                User.Add("user", await userManager.FindByNameAsync(username));
                return Ok(User);
            }
            else return BadRequest("There is any signed in user yet.");
        }

        [HttpPost]
        [Route("Edituser")]
        public async Task<IActionResult> Edituser([FromBody] ApplicationUser newUser)
        {

            var userExists = await userManager.FindByNameAsync(newUser.UserName);
            userExists.Email = newUser.Email;
            userExists.User_Phone = newUser.User_Phone;
            userExists.User_DOB = newUser.User_DOB;
            userExists.User_Address = newUser.User_Address;
            var result = await userManager.UpdateAsync(userExists);
            return Ok(result);

        }

        [HttpPost]
        [Route("EdituserPhoto")]
        public async Task<IActionResult> EdituserPhoto([FromBody] ApplicationUser newUser)
        {

            var userExists = await userManager.FindByNameAsync(newUser.UserName);
            userExists.User_Image = newUser.User_Image;
            var result = await userManager.UpdateAsync(userExists);
            return Ok(result);
        }


        [HttpDelete]
        [Route("DeleteUserPicture")]
        public async Task<IActionResult> DeleteUserPicture(string id)
        {
            var u = await userManager.FindByIdAsync(id);
            if (u != null)
            {
                u.User_Image = null;
                var result = await userManager.UpdateAsync(u);
                return Ok(result);
            }
            else return NotFound("User is not exist.");





        }
    }
}


