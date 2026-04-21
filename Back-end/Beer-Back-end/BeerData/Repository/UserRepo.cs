using Azure;
using BeerLogic.DTOs;
using BeerLogic.Entities;
using BeerLogic.Interface;
using Npgsql;
using System.Data;
using System.Data.Common;
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
                    INSERT INTO users (name, passwordhash, birthday)
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
                    SELECT passwordhash
                    FROM users
                    WHERE name = @name";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@name", userName);
                using var reader = command.ExecuteReader();
                if (reader.Read())
                {
                    var PasswordHash = reader.GetString(reader.GetOrdinal("passwordhash"));
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
                    SET passwordhash = @new_password
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

        public RetrieveUserResponse RetrieveUser(string username)
        {
                try
                {
                    if (string.IsNullOrWhiteSpace(username))
                    {
                        return null;
                    }

                    using var connection = new NpgsqlConnection(_connectionString);
                    connection.Open();

                    string userQuery = @"
            SELECT
                u.name AS username,
                u.image_url AS imageurl,
                COALESCE(followers.followers_amount, 0) AS followersamount,
                COALESCE(following.following_amount, 0) AS followingamount,
                COALESCE(posts.posts_amount, 0) AS postsamount
            FROM public.users u
            LEFT JOIN (
                SELECT following_id, COUNT(*) AS followers_amount
                FROM public.user_follow
                WHERE status = 'Accepted'
                GROUP BY following_id
            ) followers ON followers.following_id = u.id
            LEFT JOIN (
                SELECT follower_id, COUNT(*) AS following_amount
                FROM public.user_follow
                WHERE status = 'Accepted'
                GROUP BY follower_id
            ) following ON following.follower_id = u.id
            LEFT JOIN (
                SELECT user_id, COUNT(*) AS posts_amount
                FROM public.post
                GROUP BY user_id
            ) posts ON posts.user_id = u.id
            WHERE LOWER(u.name) = LOWER(@username);";

                    RetrieveUserResponse? user = null;

                    using (var userCommand = new NpgsqlCommand(userQuery, connection))
                    {
                        userCommand.Parameters.AddWithValue("@username", username);

                        using var reader = userCommand.ExecuteReader();

                        if (reader.Read())
                        {
                            user = new RetrieveUserResponse
                            {
                                name = reader["username"]?.ToString(),
                                imageURL = reader["imageurl"] == DBNull.Value ? null : reader["imageurl"].ToString(),
                                FollowersAmnt = Convert.ToInt32(reader["followersamount"]),
                                FollowingAmnt = Convert.ToInt32(reader["followingamount"]),
                                PostAmounts = Convert.ToInt32(reader["postsamount"]),
                                Posts = new List<PostDTO>()
                            };
                        }
                    }

                    if (user == null)
                    {
                        return null;
                    }

                    string postsQuery = @"
            SELECT
                p.id AS postid,
                p.description AS description,
                p.bar AS bar,
                p.city AS city,
                p.created_at AS createdat,
                p.image_url AS postimageurl,
                b.id AS beerid,
                b.name AS beername,
                b.image_url AS beerimageurl
            FROM public.post p
            INNER JOIN public.beer b ON b.id = p.beer_id
            INNER JOIN public.users u ON u.id = p.user_id
            WHERE LOWER(u.name) = LOWER(@username)
            ORDER BY p.created_at DESC NULLS LAST, p.id DESC;";

                    using (var postsCommand = new NpgsqlCommand(postsQuery, connection))
                    {
                        postsCommand.Parameters.AddWithValue("@username", username);

                        using var reader = postsCommand.ExecuteReader();

                        while (reader.Read())
                        {
                            user.Posts.Add(new PostDTO
                            {
                                Id = Convert.ToInt32(reader["postid"]),
                                Description = reader["description"] == DBNull.Value ? null : reader["description"].ToString(),
                                Bar = reader["bar"] == DBNull.Value ? null : reader["bar"].ToString(),
                                City = reader["city"] == DBNull.Value ? null : reader["city"].ToString(),
                                CreatedAt = reader["createdat"] == DBNull.Value
                                    ? (DateTime?)null
                                    : Convert.ToDateTime(reader["createdat"]),
                                ImgUrl = reader["postimageurl"] == DBNull.Value ? null : reader["postimageurl"].ToString(),
                                BeerId = Convert.ToInt32(reader["beerid"]),
                                BeerName = reader["beername"]?.ToString(),
                            });
                        }
                    }

                    return user;
                }
                catch (Exception ex)
                {
                    throw new Exception($"RetrieveUser failed: {ex.Message}", ex);
                }
            }
        }
    }


