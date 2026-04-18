using BeerLogic.Entities;
using BeerLogic.Interface;

namespace BeerLogic.Service
{
    public class SocialService
    {
        private readonly ISocialRepo _socialRepo;

        public SocialService(ISocialRepo socialRepo)
        {
            _socialRepo = socialRepo;
        }

        public List<string> GetAllUsernames()
        {
            return _socialRepo.GetAllUsernames();
        }

        public string FollowUser(string username, string followingUsername)
        {
            return _socialRepo.FollowUser(username, followingUsername);
        }

        public List<FollowRequestResponse> GetFollowRequests(string username)
        {
            return _socialRepo.GetFollowRequests(username);
        }

        public string UnfollowUser(string username, string followingUsername)
        {
            return _socialRepo.UnfollowUser(username, followingUsername);
        }

        public string AcceptFollow(string username, string followerUsername)
        {
            return _socialRepo.AcceptFollowRequest(username, followerUsername);
        }

        public string RejectFollow(string username, string followerUsername)
        {
            return _socialRepo.RejectFollowRequest(username, followerUsername);
        }

        public List<string> GetFollowers(string username)
        {
            return _socialRepo.GetFollowers(username);
        }

        public List<string> GetFollowing(string username)
        {
            return _socialRepo.GetFollowing(username);
        }
    }
}
