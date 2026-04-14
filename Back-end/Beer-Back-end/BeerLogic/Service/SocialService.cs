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
    }
}
