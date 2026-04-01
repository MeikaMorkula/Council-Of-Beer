using BeerLogic.DTOs;
using Npgsql;
using System.Data;
using BeerLogic.Interface;
namespace BeerData.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly string _connectionString;

        public UserRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<string> CreateUser(UserDTO user)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);

                string query = @"
                    INSERT INTO users (name, password_hash, birthday)
                    VALUES (@name, @password_hash, @birthday)";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@name", user.Name);
                command.Parameters.AddWithValue("@password_hash", user.PasswordHash);
                command.Parameters.AddWithValue("@birthday", user.Birthday);
                command.ExecuteNonQuery();
                return "Ok";
            }
            catch (PostgresException ex) when (ex.SqlState == "23505")
            {
                return "Username already exists";
            }

            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string LookupUserPassword(string userName)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string query = @"
                    SELECT password_hash
                    FROM users
                    WHERE name = @name";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@name", userName);
                using var reader = command.ExecuteReader();
                if (reader.Read())
                {
                    var PasswordHash = reader.GetString(reader.GetOrdinal("password_hash"));
                    return PasswordHash;
                }

                throw new Exception("while retrieving information");
            }
            catch (Exception ex)
            {
                throw new Exception("Error", ex);
            }

        }

    }
}
