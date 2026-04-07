using BeerLogic.Interface;
using BeerLogic.Utility;

namespace BeerLogic.Service
{
    public class UserService
    {
        private readonly IUserRepo _userRepo;
        public UserService(IUserRepo userRepo)
        {
            userRepo = _userRepo;
        }

        public string ChangeUsername(string newUser, string oldUser)
        {
            string result = _userRepo.ChangeUsername(newUser, oldUser);
            return result;
        }

        public string ChangePassword(string newPass, string username)
        {
            if (JwtService.PasswordRules(newPass) == true)
            {
                string hashPass = Bcrypt.HashPassword(newPass);
                string result = _userRepo.ChangePassword(hashPass, username);
                return result;
            }
            else return null;
        }
    }
}
