using BeerLogic.Interface;
using System.Data;

namespace BeerData.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly IDbConnection _connection;

        public UserRepo(IDbConnection connection)
        {
            _connection = connection;
        }

        public string AuthUser(string email, string password)
        {
            //add code to ask auth0 for token??
            //Im guessing i need to check if the email and password are correct in the auth0 db.
            //through some kind of auth0 api call.
        }

        public string RegisterUser(string email, string password)
        {
            //check if user already excists else add user
        }
    }
}
