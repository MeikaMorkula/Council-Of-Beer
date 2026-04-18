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

        public string UnfollowUser(string username, string followingUsername)
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
                    return "User to unfollow not found";
                }

                const string deleteQuery = @"
            DELETE FROM user_follow
            WHERE follower_id = @followerId
              AND following_id = @followingId";

                using var deleteCommand = new NpgsqlCommand(deleteQuery, connection);
                deleteCommand.Parameters.AddWithValue("@followerId", followerId.Value);
                deleteCommand.Parameters.AddWithValue("@followingId", followingId.Value);

                int rowsAffected = deleteCommand.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "Follow relationship not found";
                }

                return "Unfollowed successfully";
            }
            catch (Exception ex)
            {
                throw new Exception($"UnfollowUser failed: {ex.Message}", ex);
            }
        }

        public string AcceptFollowRequest(string username, string followerUsername)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(followerUsername))
                {
                    return "Both usernames are required";
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string getIdsQuery = @"
                    SELECT id, name
                    FROM users
                    WHERE name = @username OR name = @followerUsername";

                using var getIdsCommand = new NpgsqlCommand(getIdsQuery, connection);
                getIdsCommand.Parameters.AddWithValue("@username", username);
                getIdsCommand.Parameters.AddWithValue("@followerUsername", followerUsername);

                int? followingId = null;
                int? followerId = null;

                using (var reader = getIdsCommand.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string name = reader["name"].ToString();

                        if (name == username)
                        {
                            followingId = id;
                        }
                        else if (name == followerUsername)
                        {
                            followerId = id;
                        }
                    }
                }

                if (followingId == null)
                {
                    return "User not found";
                }

                if (followerId == null)
                {
                    return "Follower user not found";
                }

                const string updateQuery = @"
                    UPDATE user_follow
                    SET status = @status,
                        updated_at = @updatedAt
                    WHERE follower_id = @followerId
                      AND following_id = @followingId";

                using var updateCommand = new NpgsqlCommand(updateQuery, connection);
                updateCommand.Parameters.AddWithValue("@status", "Accepted");
                updateCommand.Parameters.AddWithValue("@updatedAt", DateTime.UtcNow);
                updateCommand.Parameters.AddWithValue("@followerId", followerId.Value);
                updateCommand.Parameters.AddWithValue("@followingId", followingId.Value);

                int rowsAffected = updateCommand.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "Follow request not found";
                }

                return "Follow request accepted";
            }
            catch (Exception ex)
            {
                throw new Exception($"AcceptFollowRequest failed: {ex.Message}", ex);
            }
        }

        public string RejectFollowRequest(string username, string followerUsername)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(followerUsername))
                {
                    return "Both usernames are required";
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string getIdsQuery = @"
                    SELECT id, name
                    FROM users
                    WHERE name = @username OR name = @followerUsername";

                using var getIdsCommand = new NpgsqlCommand(getIdsQuery, connection);
                getIdsCommand.Parameters.AddWithValue("@username", username);
                getIdsCommand.Parameters.AddWithValue("@followerUsername", followerUsername);

                int? followingId = null;
                int? followerId = null;

                using (var reader = getIdsCommand.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string name = reader["name"].ToString();

                        if (name == username)
                        {
                            followingId = id;
                        }
                        else if (name == followerUsername)
                        {
                            followerId = id;
                        }
                    }
                }

                if (followingId == null)
                {
                    return "User not found";
                }

                if (followerId == null)
                {
                    return "Follower user not found";
                }

                const string deleteQuery = @"
                    DELETE FROM user_follow
                    WHERE follower_id = @followerId
                      AND following_id = @followingId";

                using var deleteCommand = new NpgsqlCommand(deleteQuery, connection);
                deleteCommand.Parameters.AddWithValue("@followerId", followerId.Value);
                deleteCommand.Parameters.AddWithValue("@followingId", followingId.Value);

                int rowsAffected = deleteCommand.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return "Follow request not found";
                }

                return "Follow request rejected";
            }
            catch (Exception ex)
            {
                throw new Exception($"RejectFollowRequest failed: {ex.Message}", ex);
            }
        }

        public List<string> GetFollowers(string username)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username))
                {
                    return new List<string>();
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string query = @"
                    SELECT u.name
                    FROM user_follow uf
                    INNER JOIN users u ON uf.follower_id = u.id
                    INNER JOIN users target_user ON uf.following_id = target_user.id
                    WHERE target_user.name = @username
                      AND uf.status = @status
                    ORDER BY u.name";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@status", "Accepted");

                using var reader = command.ExecuteReader();

                List<string> followers = new List<string>();

                while (reader.Read())
                {
                    followers.Add(reader["name"].ToString());
                }

                return followers;
            }
            catch (Exception ex)
            {
                throw new Exception($"GetFollowers failed: {ex.Message}", ex);
            }
        }

        public List<string> GetFollowing(string username)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username))
                {
                    return new List<string>();
                }

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                const string query = @"
                    SELECT u.name
                    FROM user_follow uf
                    INNER JOIN users u ON uf.following_id = u.id
                    INNER JOIN users source_user ON uf.follower_id = source_user.id
                    WHERE source_user.name = @username
                      AND uf.status = @status
                    ORDER BY u.name";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@status", "Accepted");

                using var reader = command.ExecuteReader();

                List<string> following = new List<string>();

                while (reader.Read())
                {
                    following.Add(reader["name"].ToString());
                }

                return following;
            }
            catch (Exception ex)
            {
                throw new Exception($"GetFollowing failed: {ex.Message}", ex);
            }
        }
    }
}
