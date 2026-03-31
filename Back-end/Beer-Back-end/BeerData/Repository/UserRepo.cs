using BeerLogic.DTOs;
using BeerLogic.Interface;
using Microsoft.Data.SqlClient;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerData.Repository
{
    public class UserRepo :IUserRepo
    {
        private readonly IDbConnection _connection;

        public UserRepo(IDbConnection connection)
        {
            _connection = connection;
        }

        public string CreateUser(UserDTO user)
        {
            try
            {
                using NpgsqlConnection connection = (NpgsqlConnection)_connection;
                connection.Open();

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

        public UserDTO LookupUserPassword(UserDTO user)
        {
            try
            {
                using NpgsqlConnection connection = (NpgsqlConnection)_connection;
                connection.Open();

                string query = @"
                    SELECT password_hash
                    FROM users
                    WHERE name = @name";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@name", user.Name);
                using var reader = command.ExecuteReader();
                if (reader.Read())
                {
                    return new UserDTO
                    {
                        PasswordHash = reader.GetString(reader.GetOrdinal("password_hash"))
                    };
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
