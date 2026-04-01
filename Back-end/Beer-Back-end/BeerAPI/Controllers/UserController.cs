using BeerLogic.DTOs;
using BeerLogic.Entities;
using BeerLogic.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

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
            var result = await _jwtService.Authorize(request);
            if (result is null)
            {
                return Unauthorized();
            }

            return result;
        }
    }
}
