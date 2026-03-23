using BeerLogic.DTOs;
using BeerLogic.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Login")]
        public string AuthUser(string emial, string password)
        {
            return _userService.AuthUser(emial, password);
        }

    }
}
