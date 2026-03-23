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

        public 
    }
}
