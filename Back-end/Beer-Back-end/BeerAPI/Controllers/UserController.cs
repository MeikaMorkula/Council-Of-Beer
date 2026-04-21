using BeerLogic.DTOs;
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
        [Authorize]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var result = await _jwtService.RefreshLogin(request);

            if (result == null)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }

            return Ok(result);
        }

        [HttpPost("Authorize")]
        [AllowAnonymous]
        public async Task<ActionResult<LoginResponse>> Login(LoggingInRequest request)
        {
            var result = await _jwtService.Authenticate(request);
            if (result is null)
            {
                return Unauthorized();
            }

            return result;
        }

        [HttpPost("Authenticate")]
        [AllowAnonymous]
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
        [Authorize]
        public async Task<string> ChangeUsername(ChangeUsernameRequest request)
        {
            string result = _userService.ChangeUsername(request);
            return result;
        }

        [HttpPatch("Password")]
        [Authorize]
        public IActionResult ChangePassword(PasswordChangeRequest request)
        {
            string result = _userService.ChangePassword(request);

            if (result == "Password changed")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("Terminate")]
        [Authorize]
        public IActionResult DeleteAccount(DeleteAccountRequest request)
        {
            string result = _userService.DeleteAccount(request);

            if (result == "Account deleted")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("GetAccount")]
        public IActionResult ViewAccount(RetrieveUserRequest request)
        {
            RetrieveUserResponse response = _userService.ViewAccount(request);

            if (response.Result == "succes")
            {
                return Ok(response);
            }

            return BadRequest(response);
        }
    }
}
