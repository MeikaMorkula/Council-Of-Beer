using BeerLogic.Entities;
using BeerLogic.Interface;
using Npgsql;

namespace BeerData.Repository
{
    public class SocialRepo : ISocialRepo
    {
        private readonly string _connectionString;

        public SocialRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<string> GetAllUsernames()
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string query = @"
                    SELECT name
                    FROM users
                    ORDER BY name";

                using var command = new NpgsqlCommand(query, connection);
                using var reader = command.ExecuteReader();

                List<string> usernames = new List<string>();

                while (reader.Read())
                {
                    usernames.Add(reader["name"].ToString());
                }

                return usernames;
            }
            catch (Exception ex)
            {
                throw new Exception($"GetAllUsernames failed: {ex.Message}", ex);
            }
        }

        public string FollowUser(string username, string followingUsername)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(followingUsername))
                {
                    return "Both usernames are required";
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string getIdsQuery = @"
                    SELECT id, name
                    FROM users
                    WHERE name = @username OR name = @followingUsername";

                using var getIdsCommand = new NpgsqlCommand(getIdsQuery, connection);
                getIdsCommand.Parameters.AddWithValue("@username", username);
                getIdsCommand.Parameters.AddWithValue("@followingUsername", followingUsername);

                int? followerId = null;
                int? followingId = null;

                using (var reader = getIdsCommand.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string name = reader["name"].ToString();

                        if (name == username)
                        {
                            followerId = id;
                        }
                        else if (name == followingUsername)
                        {
                            followingId = id;
                        }
                    }
                }

                if (followerId == null)
                {
                    return "User not found";
                }

                if (followingId == null)
                {
                    return "User to follow not found";
                }

                if (followerId == followingId)
                {
                    return "You cannot follow yourself";
                }

                const string checkExistingQuery = @"
                    SELECT 1
                    FROM user_follow
                    WHERE follower_id = @followerId
                      AND following_id = @followingId";

                using (var checkCommand = new NpgsqlCommand(checkExistingQuery, connection))
                {
                    checkCommand.Parameters.AddWithValue("@followerId", followerId.Value);
                    checkCommand.Parameters.AddWithValue("@followingId", followingId.Value);

                    var exists = checkCommand.ExecuteScalar();

                    if (exists != null)
                    {
                        return "Follow request already exists";
                    }
                }

                const string insertQuery = @"
                    INSERT INTO user_follow (follower_id, following_id, status, created_at, updated_at)
                    VALUES (@followerId, @followingId, @status, @createdAt, @updatedAt)";

                using var insertCommand = new NpgsqlCommand(insertQuery, connection);
                insertCommand.Parameters.AddWithValue("@followerId", followerId.Value);
                insertCommand.Parameters.AddWithValue("@followingId", followingId.Value);
                insertCommand.Parameters.AddWithValue("@status", "Pending");
                insertCommand.Parameters.AddWithValue("@createdAt", DateTime.Now);
                insertCommand.Parameters.AddWithValue("@updatedAt", DateTime.Now);

                int rowsAffected = insertCommand.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "Follow request failed";
                }

                return "Follow request sent";
            }
            catch (Exception ex)
            {
                throw new Exception($"FollowUser failed: {ex.Message}", ex);
            }
        }

        public List<FollowRequestResponse> GetFollowRequests(string username)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username))
                {
                    return new List<FollowRequestResponse>();
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string query = @"
                    SELECT 
                        u.name AS follower_name,
                        uf.status,
                        uf.created_at
                    FROM user_follow uf
                    INNER JOIN users u ON uf.follower_id = u.id
                    INNER JOIN users target_user ON uf.following_id = target_user.id
                    WHERE target_user.name = @username
                      AND uf.status = @status
                    ORDER BY uf.created_at DESC";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@status", "Pending");

                using var reader = command.ExecuteReader();

                List<FollowRequestResponse> requests = new List<FollowRequestResponse>();

                while (reader.Read())
                {
                    requests.Add(new FollowRequestResponse
                    {
                        FollowerName = reader["follower_name"].ToString(),
                        Status = reader["status"].ToString(),
                        CreatedAt = Convert.ToDateTime(reader["created_at"])
                    });
                }

                return requests;
            }
            catch (Exception ex)
            {
                throw new Exception($"GetFollowRequests failed: {ex.Message}", ex);
            }
        }
    }
}
