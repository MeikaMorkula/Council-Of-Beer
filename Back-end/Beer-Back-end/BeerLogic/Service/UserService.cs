using BeerLogic.Interface;

namespace BeerLogic.Service
{
    public class UserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public string AuthUser(string emial, string password)
        {
            //add all exceptions
            if (emial == null || password == null)
            {
                throw new Exception("Neither can be empty.");
            }
            if (password.Length < 8)
            {
                throw new Exception("Password has to be longer then 8 characters.");
            }
            else
            {
                return _userRepo.AuthUser(emial, password);
            }
        }

        public string RegisterUser(string emial, string password)
        {
            //add all exceptions
            if (emial == null || password == null)
            {
                throw new Exception("Neither can be empty.");
            }
            if (password.Length < 8)
            {
                throw new Exception("Password has to be longer then 8 characters.");
            }
            else
            {
                return _userRepo.RegisterUser(emial, password);
            }
        }
    }
}
