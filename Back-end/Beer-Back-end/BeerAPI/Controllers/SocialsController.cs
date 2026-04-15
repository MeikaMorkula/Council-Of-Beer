using Microsoft.AspNetCore.Mvc;
using BeerLogic.Service;

namespace BeerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SocialsController : Controller
    {
        private readonly SocialService _socialService;

        public SocialsController(SocialService socialService)
        {
            _socialService = socialService;
        }

        [HttpGet("Usernames")]
        public IActionResult GetAllUsernames()
        {
            var usernames = _socialService.GetAllUsernames();
            return Ok(usernames);
        }

        [HttpPost("Follow")]
        public IActionResult FollowUser(string username, string followingUsername)
        {
            string result = _socialService.FollowUser(username, followingUsername);

            if (result == "Follow request sent")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("FollowRequests")]
        public IActionResult GetFollowRequests(string username)
        {
            var requests = _socialService.GetFollowRequests(username);
            return Ok(requests);
        }
        //Unfollow
        //AcceptFollow
        //DeclineFollow
        //GetAllFollowers
        //GetAllFollowing
    }
}
