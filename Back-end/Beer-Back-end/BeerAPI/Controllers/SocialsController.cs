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

        [HttpDelete("Unfollow")]
        public IActionResult UnfollowUser(string username, string followingUsername)
        {
            string result = _socialService.UnfollowUser(username, followingUsername);

            if (result == "Unfollowed successfully")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPatch("AcceptFollowRequest")]
        public IActionResult AcceptFollowRequest(string username, string followerUsername)
        {
            string result = _socialService.AcceptFollow(username, followerUsername);

            if (result == "Follow request accepted")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("RejectFollowRequest")]
        public IActionResult RejectFollowRequest(string username, string followerUsername)
        {
            string result = _socialService.RejectFollow(username, followerUsername);

            if (result == "Follow request rejected")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("Followers")]
        public IActionResult GetFollowers(string username)
        {
            var followers = _socialService.GetFollowers(username);
            return Ok(followers);
        }

        [HttpGet("Following")]
        public IActionResult GetFollowing(string username)
        {
            var following = _socialService.GetFollowing(username);
            return Ok(following);
        }
    }
}
