using BeerLogic.DTOs;
using BeerLogic.Entities;
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
                connection.Open();

                string query = @"
                    INSERT INTO users (name, password_hash, birthday)
                    VALUES (@name, @passwordhash, @birthday)";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@name", user.Name);
                command.Parameters.AddWithValue("@passwordhash", user.PasswordHash);
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

        public async Task<bool> SaveRefreshToken(RefreshRequest refresher, DateTime expiry)
        {
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = @"
                UPDATE users
                SET refreshtoken = @RefreshToken,
                    refreshtoken_expiry = @Expiry
                WHERE name = @name";

            await using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@name", refresher.Name);
            command.Parameters.AddWithValue("@RefreshToken", refresher.Token);
            command.Parameters.AddWithValue("@Expiry", expiry);

            int rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<(string RefreshToken, DateTime Expiry)?> GetRefreshTokenData(string username)
        {
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            const string query = @"
                SELECT refreshtoken, refreshtoken_expiry
                FROM users
                WHERE name = @name";

            await using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@name", username);

            await using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                var refreshToken = reader["refreshtoken"]?.ToString();
                var expiry = reader.GetDateTime(reader.GetOrdinal("refreshtoken_expiry"));

                return (refreshToken, expiry);
            }

            return null;
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

        public string ChangeUsername(string newUser, string oldUser)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string query = @"
                    UPDATE users
                    SET name = @new_username
                    WHERE name = @old_username";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@new_username", newUser);
                command.Parameters.AddWithValue("@old_username", oldUser);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "User not found";
                }

                return "Username updated";
            }
            catch (Exception ex)
            {
                throw new Exception($"ChangeUsername failed: {ex.Message}", ex);
            }
        }

        public string ChangePassword(string newPass, string userName)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string query = @"
                    UPDATE users
                    SET password_hash = @new_password
                    WHERE name = @username";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@new_password", newPass);
                command.Parameters.AddWithValue("@username", userName);
                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "User not found";
                }

                return "Password changed";
            }
            catch (Exception ex)
            {
                throw new Exception($"ChangePassword failed: {ex.Message}", ex);
            }
        }

        public string DeleteAccount(string username)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username))
                {
                    return "Username is required";
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string query = @"
                    DELETE FROM users
                    WHERE name = @username";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@username", username);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "User not found";
                }

                return "Account deleted";
            }
            catch (Exception ex)
            {
                throw new Exception($"DeleteAccount failed: {ex.Message}", ex);
            }
        }
    }
}
