using BeerLogic.DTOs;
using BeerLogic.Interface;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System.Linq;

namespace BeerData.Repository
{
    public class BeerRepo : IBeerRepo
    {
        private readonly string _connectionString;

        public BeerRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public List<BeerDTO> GetAllBeer()
        {
            try
            {
                var beers = new List<BeerDTO>();

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                var query = @"
                SELECT
                    b.id,
                    b.name,
                    b.alcoholpercentage,
                    b.brewery,
                    b.country,
                    COALESCE(
                        array_agg(l.name) FILTER (WHERE l.name IS NOT NULL),
                        ARRAY[]::text[]
                    ) AS labels
                FROM beer b
                LEFT JOIN beer_label bl ON bl.beer_id = b.id
                LEFT JOIN label l ON l.id = bl.label_id
                GROUP BY b.id, b.name, b.alcoholpercentage, b.brewery, b.country
                ORDER BY b.id;
            ";

                using var command = new NpgsqlCommand(query, connection);
                using var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    beers.Add(new BeerDTO
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("id")),
                        Name = reader.GetString(reader.GetOrdinal("name")),
                        AlcPrecentage = reader.GetDouble(reader.GetOrdinal("alcoholpercentage")),
                        Brewery = reader.GetString(reader.GetOrdinal("brewery")),
                        Country = reader.GetString(reader.GetOrdinal("country")),
                        Labels = reader.GetFieldValue<string[]>(reader.GetOrdinal("labels")).ToList()
                    });
                }

                return beers;
            }
            catch (Exception ex)
            {
                throw new ArgumentNullException();
            }
        }
    }
}