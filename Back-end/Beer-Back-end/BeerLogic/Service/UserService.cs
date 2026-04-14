using BeerLogic.Interface;
using BeerLogic.Utility;

namespace BeerLogic.Service
{
    public class UserService
    {
        private readonly IUserRepo _userRepo;
        public UserService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public string ChangeUsername(string newUser, string oldUser)
        {
            string result = _userRepo.ChangeUsername(newUser, oldUser);
            return result;
        }

        public string ChangePassword(string newPass, string oldPass, string username)
        {
            string hasholdpass = _userRepo.LookupUserPassword(username);

            if (string.IsNullOrWhiteSpace(hasholdpass))
            {
                return "User not found";
            }

            if (!Bcrypt.VerifyPassword(oldPass, hasholdpass))
            {
                return "Old password is incorrect";
            }

            if (!JwtService.PasswordRules(newPass))
            {
                return "New password does not meet password rules";
            }

            string hashPass = Bcrypt.HashPassword(newPass);
            return _userRepo.ChangePassword(hashPass, username);
        }
    }
}
