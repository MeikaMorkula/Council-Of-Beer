using BeerLogic.DTOs;
using BeerLogic.Entities;
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

        public string ChangeUsername(ChangeUsernameRequest request)
        {
            string result = _userRepo.ChangeUsername(request.newUser, request.oldUser);
            return result;
        }

        public string ChangePassword(PasswordChangeRequest request)
        {
            string hasholdpass = _userRepo.LookupUserPassword(request.username);

            if (string.IsNullOrWhiteSpace(hasholdpass))
            {
                return "User not found";
            }

            if (!Bcrypt.VerifyPassword(request.oldPass, hasholdpass))
            {
                return "Old password is incorrect";
            }

            if (!JwtService.PasswordRules(request.newPass))
            {
                return "New password does not meet password rules";
            }

            string hashPass = Bcrypt.HashPassword(request.newPass);
            return _userRepo.ChangePassword(hashPass, request.username);
        }

        public string DeleteAccount(DeleteAccountRequest request)
        {
            string hashPassword = Bcrypt.HashPassword(request.password);

            if(!Bcrypt.VerifyPassword(request.password, hashPassword))
            {
                return "Password is incorrect";
            }

            return _userRepo.DeleteAccount(request.username);
        }

        public RetrieveUserResponse ViewAccount(string username)
        {
            RetrieveUserResponse response = _userRepo.RetrieveUser(username);
            return response;
        }
    }
}
