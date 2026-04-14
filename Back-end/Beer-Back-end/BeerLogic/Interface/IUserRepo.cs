using BeerLogic.DTOs;
using BeerLogic.Entities;
namespace BeerLogic.Interface
{
    public interface IUserRepo
    {
        Task<string> CreateUser(UserDTO user);
        string LookupUserPassword(string userName);
        string ChangeUsername(string newUser, string oldUser);
        string ChangePassword(string newPass, string userName);
        Task<bool> SaveRefreshToken(RefreshRequest refresher, DateTime expiry);
        Task<(string RefreshToken, DateTime Expiry)?> GetRefreshTokenData(string username);
    }
}
