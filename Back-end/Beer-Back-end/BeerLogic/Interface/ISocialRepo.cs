using BeerLogic.Entities;

namespace BeerLogic.Interface
{
    public interface ISocialRepo
    {
        List<string> GetAllUsernames();
        string FollowUser(string username, string followingUsername);
        List<FollowRequestResponse> GetFollowRequests(string username);
    }
}
