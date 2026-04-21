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
                    WITH inserted_post AS (
                        INSERT INTO post (user_id, beer_id, description, bar, city, image_url, image_public_id)
                        SELECT u.id, b.id, @description, @bar, @city, @image_url, @image_public_id
                        FROM users u
                        JOIN beer b ON b.name = @beerName
                        WHERE u.name = @userName
                        RETURNING id, user_id, beer_id, description, bar, city, image_url, image_public_id
                    )
                    SELECT 
                        u.name AS username,
                        u.image_url AS userimg,
                        b.name AS beername,
                        p.description,
                        p.bar,
                        p.city,
                        p.image_url
                    FROM inserted_post p
                    JOIN users u ON u.id = p.user_id
                    JOIN beer b ON b.id = p.beer_id;
                ";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@userName", post.username);
                command.Parameters.AddWithValue("@description", (object?)post.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@image_url", (object?)uploadResult.ImageUrl ?? DBNull.Value);
                command.Parameters.AddWithValue("@image_public_id", (object?)uploadResult.PublicId ?? DBNull.Value);

                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new CreatePostResponse
                    {
                        Username = reader["username"]?.ToString(),
                        Description = reader["description"]?.ToString(),
                        ImageUrl = reader["image_url"]?.ToString()
                    };
                }

                throw new Exception($"Post could not be created. No matching user or beer found. userName='{post.username}'");
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating post in database.", ex);
            }
        }
    }
}
