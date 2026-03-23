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

        [HttpGet("AuthUser/{Token}")]
        public void AuthUser(string Token)
        {
            //return _userService.AuthUser(Token);
        }

    }
}
