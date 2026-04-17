using BeerLogic.Entities;

namespace BeerLogic.Interface
{
    public interface ISocialRepo
    {
        List<string> GetAllUsernames();
        string FollowUser(string username, string followingUsername);
        List<FollowRequestResponse> GetFollowRequests(string username);
        string UnfollowUser(string username, string followingUsername);
        string AcceptFollowRequest(string username, string followerUsername);
        string RejectFollowRequest(string username, string followerUsername);
        List<string> GetFollowers(string username);
        List<string> GetFollowing(string username);
    }
}
