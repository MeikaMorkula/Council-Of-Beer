using Microsoft.AspNetCore.Mvc;
using BeerLogic.Service;
using BeerLogic.Entities;

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
        public IActionResult FollowUser(UserAndFollowing request)
        {
            string result = _socialService.FollowUser(request);

            if (result == "Follow request sent")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("FollowRequests")]
        public IActionResult GetFollowRequests(JustUsernameRequest request)
        {
            var requests = _socialService.GetFollowRequests(request.username);
            return Ok(requests);
        }

        [HttpDelete("Unfollow")]
        public IActionResult UnfollowUser(UserAndFollowing request)
        {
            string result = _socialService.UnfollowUser(request.Username, request.FollowingUsername);

            if (result == "Unfollowed successfully")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPatch("AcceptFollowRequest")]
        public IActionResult AcceptFollowRequest(UserAndFollower request)
        {
            string result = _socialService.AcceptFollow(request.username, request.followerUsername);

            if (result == "Follow request accepted")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("RejectFollowRequest")]
        public IActionResult RejectFollowRequest(UserAndFollower request)
        {
            string result = _socialService.RejectFollow(request.username, request.followerUsername);

            if (result == "Follow request rejected")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("Followers")]
        public IActionResult GetFollowers(JustUsernameRequest request)
        {
            var followers = _socialService.GetFollowers(request.username);
            return Ok(followers);
        }

        [HttpGet("Following")]
        public IActionResult GetFollowing(JustUsernameRequest request)
        {
            var following = _socialService.GetFollowing(request.username);
            return Ok(following);
        }
    }
}
