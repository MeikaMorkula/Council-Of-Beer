using BeerLogic.DTOs;
using BeerLogic.Entities;
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
                    b.barcode,
                    b.url,
                    COALESCE(
                        array_agg(l.name) FILTER (WHERE l.name IS NOT NULL),
                        ARRAY[]::text[]
                    ) AS labels
                FROM beer b
                LEFT JOIN beer_label bl ON bl.beer_id = b.id
                LEFT JOIN label l ON l.id = bl.label_id
                GROUP BY b.id, b.name, b.alcohol_percentage, b.brewery, b.country, b.barcode, b.url
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
                        Labels = reader.GetFieldValue<string[]>(reader.GetOrdinal("labels")).ToList(),
                        Barcode = reader.GetString(reader.GetOrdinal("barcode")),
                        Url = reader.GetString(reader.GetOrdinal("url")),
                    });
                }

                return beers;
            }
            catch (Exception ex)
            {
                throw new Exception("GetAllBeer failed", ex);
            }
        }

        public List<string> GetBeerNames()
        {
            try
            {
                List<string> beerNames = new List<string>();

                using NpgsqlConnection connection = (NpgsqlConnection)_connection;
                connection.Open();

                string query = @"
                SELECT name
                FROM beer
                ORDER BY name;
                ";

                using NpgsqlCommand command = new NpgsqlCommand(query, connection);
                using var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    beerNames.Add(reader.GetString(reader.GetOrdinal("name")));
                }

                return beerNames;
            }
            catch (Exception ex)
            {
                throw new Exception("GetAllBeerNames failed", ex);
            }
        }
        public string AddBeer(BeerDTO BeerDTO)
        {
            try
            {
                using NpgsqlConnection connection = (NpgsqlConnection)_connection;
                connection.Open();

                string sql = @"
                WITH new_beer AS (
                  INSERT INTO beer (name, alcohol_percentage, brewery, country, barcode, url)
                  VALUES (@name, @alcohol_percentage, @brewery, @country, @country, @url)
                  RETURNING id
                ),
                ins_labels AS (
                  INSERT INTO label (name)
                  SELECT DISTINCT unnest(@labels::text[])
                  ON CONFLICT (name) DO NOTHING
                  RETURNING id, name
                ),
                all_labels AS (
                  SELECT id, name FROM ins_labels
                  UNION
                  SELECT id, name FROM label WHERE name = ANY(@labels::text[])
                )
                INSERT INTO beer_label (beer_id, label_id)
                SELECT nb.id, al.id
                FROM new_beer nb
                JOIN all_labels al ON TRUE
                ";

                using NpgsqlCommand command = new NpgsqlCommand(sql, connection);
                command.Parameters.AddWithValue("@name", BeerDTO.Name);
                command.Parameters.AddWithValue("@alcohol_percentage", BeerDTO.AlcPrecentage);
                command.Parameters.AddWithValue("@brewery", BeerDTO.Brewery);
                command.Parameters.AddWithValue("@country", BeerDTO.Country);
                command.Parameters.AddWithValue("@labels", BeerDTO.Labels?.ToArray() ?? Array.Empty<string>());
                command.Parameters.AddWithValue("barcode", BeerDTO.Barcode);
                command.Parameters.AddWithValue("url", BeerDTO.Url);
                command.ExecuteNonQuery();
                return "Ok";
            }
            catch (Exception ex)
            {
                throw new Exception("AddBeer failed", ex);
            }
        }
    }
}