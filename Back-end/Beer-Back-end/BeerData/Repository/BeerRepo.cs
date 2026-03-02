using BeerLogic.DTOs;
using BeerLogic.Interface;
using Npgsql;
using System.Data;

namespace BeerData.Repository
{
    public class BeerRepo : IBeerRepo
    {
        private readonly IDbConnection _connection;

        public BeerRepo(IDbConnection connection)
        {
            _connection = connection;
        }

        public List<BeerDTO> GetAllBeer()
        {
            var beers = new List<BeerDTO>();

            using var connection = (NpgsqlConnection)_connection;
            connection.Open();

            var query = @"
                SELECT
                    b.id,
                    b.name,
                    b.alcohol_percentage,
                    b.brewery,
                    b.country,
                    COALESCE(
                        array_agg(l.name) FILTER (WHERE l.name IS NOT NULL),
                        ARRAY[]::text[]
                    ) AS labels
                FROM beer b
                LEFT JOIN beer_label bl ON bl.beerid = b.id
                LEFT JOIN label l ON l.id = bl.labelid
                GROUP BY b.id, b.name, b.alcohol_percentage, b.brewery, b.country
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
                    AlcPrecentage = reader.GetDouble(reader.GetOrdinal("alcohol_percentage")),
                    Brewery = reader.GetString(reader.GetOrdinal("brewery")),
                    Country = reader.GetString(reader.GetOrdinal("country")),
                    Labels = reader.GetFieldValue<string[]>(reader.GetOrdinal("labels")).ToList()
                });
            }

            return beers;
        }
    }
}