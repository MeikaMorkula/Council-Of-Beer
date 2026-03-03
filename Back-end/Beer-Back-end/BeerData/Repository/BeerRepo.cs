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
            try
            {
                List<BeerDTO> beers = new List<BeerDTO>();

                using NpgsqlConnection connection = (NpgsqlConnection)_connection;
                connection.Open();

                string query = @"
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

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
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
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    public string AddBeer(BeerDTO BeerDTO)
        {
            try
            {
                using NpgsqlConnection connection = (NpgsqlConnection)_connection;
                connection.Open();

                string query = @"
                INSERT INTO beer (name,alcohol_percentage,brewery,country)
                VALUES (@name, @alcohol_percentage, @brewery, @country)";
                using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@name", BeerDTO.Name);
                    command.Parameters.AddWithValue("@alcohol_percentage", BeerDTO.AlcPrecentage);
                    command.Parameters.AddWithValue("@brewery", BeerDTO.Brewery);
                    command.Parameters.AddWithValue("@country", BeerDTO.Country);
                    command.ExecuteNonQuery();
                }
                return "Succesfully added";
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}