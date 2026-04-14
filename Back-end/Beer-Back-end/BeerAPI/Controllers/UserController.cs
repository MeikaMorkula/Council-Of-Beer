using BeerLogic.Entities;
using BeerLogic.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace BeerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public UserController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var result = await _jwtService.RefreshLogin(request);

            if (result == null)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("Authorize")]
        public async Task<ActionResult<LoginResponse>> Login(LoggingInRequest request)
        {
            var result = await _jwtService.Authenticate(request);
            if (result is null)
            {
                return Unauthorized();
            }

            return result;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<ActionResult<LoginResponse>> Register(RegistrationRequest request)
        {
            var step1 = await _jwtService.Authorize(request);

            if (step1 is null)
            {
                return Unauthorized();
            }

            LoggingInRequest loginrequest = new LoggingInRequest
            {
                UserName = request.userName,
                Password = request.password
            };

            var result = await _jwtService.Authenticate(loginrequest);

            if (result is null)
            {
                return Unauthorized();
            }

            return result;
        }

        [HttpPatch("Username")]
        public async Task<string> ChangeUsername(string newUser, string oldUser)
        {
            string result = _userService.ChangeUsername(newUser, oldUser);
            return result;
        }

        [HttpPatch("Password")]
        public IActionResult ChangePassword(string newPass, string oldPass, string username)
        {
            string result = _userService.ChangePassword(newPass, oldPass, username);

            if (result == "Password changed")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
