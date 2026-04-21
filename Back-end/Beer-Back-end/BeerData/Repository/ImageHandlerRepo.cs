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
        public async Task<CreatePostResponse> CreatePostAsync(CreatePostRequest post, CloudinaryUploadResultDTO uploadResult)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                await connection.OpenAsync();

                string query = @"
                    INSERT INTO post (user_id, beer_id, description, image_url, image_public_id)
                    SELECT u.id, b.id, @description, @image_url, @image_public_id
                    FROM users u
                    JOIN beer b ON b.name = @beerName
                    WHERE u.name = @userName
                    RETURNING id, user_id, beer_id, description, image_url, image_public_id;
                ";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@beerName", post.beername );
                command.Parameters.AddWithValue("@description", post.Description ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@image_url", uploadResult.ImageUrl);
                command.Parameters.AddWithValue("@image_public_id", uploadResult.PublicId);
                command.Parameters.AddWithValue("@userName", post.username);

                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new CreatePostResponse
                    {
                        Username = reader.GetInt32(reader.GetOrdinal("userName")),
                        Beername = reader.GetInt32(reader.GetOrdinal("beer_id")),
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
