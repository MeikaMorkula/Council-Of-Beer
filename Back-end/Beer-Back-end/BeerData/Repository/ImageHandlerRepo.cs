using BeerLogic.DTOs;
using BeerLogic.Interface;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerData.Repository
{
    public class ImageHandlerRepo : IImageHandlerRepo
    {
        private readonly string _connectionString;

        public ImageHandlerRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<CreatePostResponse> CreatePostAsync(int userId, int beerId, string description, string imageUrl, string publicId)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                await connection.OpenAsync();

                string query = @"
                    INSERT INTO post (user_id, beer_id, description, image_url, image_public_id)
                    VALUES (@user_id, @beerId, @description, @image_url, @image_public_id)
                    RETURNING id, user_id, beer_id, description, image_url, image_public_id;
                ";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@beerId", beerId);
                command.Parameters.AddWithValue("@description", description ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@image_url", imageUrl);
                command.Parameters.AddWithValue("@image_public_id", publicId);
                command.Parameters.AddWithValue("@user_id", 1);

                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new CreatePostResponse
                    {
                        UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                        PostId = reader.GetInt32(reader.GetOrdinal("id")),
                        BeerId = reader.GetInt32(reader.GetOrdinal("beer_id")),
                        Description = reader["description"]?.ToString(),
                        ImageUrl = reader["image_url"].ToString(),
                        PublicId = reader["image_public_id"].ToString()
                    };
                }

                throw new Exception("Post could not be created.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating post in database.", ex);
            }
        }
    }
}
