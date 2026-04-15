using BeerLogic.DTOs;
using BeerLogic.Entities;
using BeerLogic.Interface;
using Npgsql;

namespace BeerData.Repository
{
    public class BeerRepo : IBeerRepo
    {
        private readonly string _connectionString;

        public BeerRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<CreateBeerResponse> GetAllBeer()
        {
            try
            {
                List<CreateBeerResponse> beers = new List<CreateBeerResponse>();

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string query = @"
                    SELECT b.id, b.name, b.alcohol_percentage, b.brewery, b.country, b.barcode, b.image_url, b.image_public_id,
                        COALESCE(
                            array_agg(l.name) FILTER (WHERE l.name IS NOT NULL),
                            ARRAY[]::text[]
                        ) AS labels
                    FROM beer b
                    LEFT JOIN beer_label bl ON bl.beer_id = b.id
                    LEFT JOIN label l ON l.id = bl.label_id
                    GROUP BY b.id, b.name, b.alcohol_percentage, b.brewery, b.country, b.barcode, b.image_url, b.image_public_id
                    ORDER BY b.id;
                ";

                using var command = new NpgsqlCommand(query, connection);
                using var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    beers.Add(new CreateBeerResponse
                    {
                        Name = reader.GetString(reader.GetOrdinal("name")),
                        AlcPrecentage = reader.GetDouble(reader.GetOrdinal("alcohol_percentage")),
                        Brewery = reader.GetString(reader.GetOrdinal("brewery")),
                        Country = reader.GetString(reader.GetOrdinal("country")),
                        Barcode = reader.IsDBNull(reader.GetOrdinal("barcode"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("barcode")),
                        ImageUrl = reader.IsDBNull(reader.GetOrdinal("image_url"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("image_url")),
                        ImagePublicId = reader.IsDBNull(reader.GetOrdinal("image_public_id"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("image_public_id")),
                        Labels = reader.GetFieldValue<string[]>(reader.GetOrdinal("labels")).ToList()
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

                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string query = @"
                    SELECT name
                    FROM beer
                    ORDER BY name;
                ";

                using var command = new NpgsqlCommand(query, connection);
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

        public CreateBeerResponse GetInfoByBeerName(string beername)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string query = @"
                    SELECT b.id, b.name, b.alcohol_percentage, b.brewery, b.country, b.barcode, b.image_url, b.image_public_id,
                        COALESCE(
                            array_agg(l.name) FILTER (WHERE l.name IS NOT NULL),
                            ARRAY[]::text[]
                        ) AS labels
                    FROM beer b
                    LEFT JOIN beer_label bl ON bl.beer_id = b.id
                    LEFT JOIN label l ON l.id = bl.label_id
                    WHERE LOWER(b.name) = LOWER(@Name)
                    GROUP BY b.id, b.name, b.alcohol_percentage, b.brewery, b.country, b.barcode, b.image_url, b.image_public_id;
                ";

                using var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@Name", beername);

                using var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new CreateBeerResponse
                    {
                        Name = reader.GetString(reader.GetOrdinal("name")),
                        AlcPrecentage = reader.GetDouble(reader.GetOrdinal("alcohol_percentage")),
                        Brewery = reader.GetString(reader.GetOrdinal("brewery")),
                        Country = reader.GetString(reader.GetOrdinal("country")),
                        Barcode = reader.IsDBNull(reader.GetOrdinal("barcode"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("barcode")),
                        ImageUrl = reader.IsDBNull(reader.GetOrdinal("image_url"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("image_url")),
                        ImagePublicId = reader.IsDBNull(reader.GetOrdinal("image_public_id"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("image_public_id")),
                        Labels = reader.GetFieldValue<string[]>(reader.GetOrdinal("labels")).ToList()
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("GetInfoByBeerName failed", ex);
            }
        }

        public CreateBeerResponse AddBeer(CreateBeerRequest beerDTO, CloudinaryUploadResultDTO uploadDTO)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                connection.Open();

                string sql = @"
                    WITH new_beer AS (
                        INSERT INTO beer (name, alcohol_percentage, brewery, country, barcode, image_url, image_public_id)
                        VALUES (@name, @alcohol_percentage, @brewery, @country, @barcode, @image_url, @image_public_id)
                        RETURNING id ),
                    ins_labels AS (
                        INSERT INTO label (name)
                        SELECT DISTINCT unnest(@labels::text[])
                        ON CONFLICT (name) DO NOTHING
                        RETURNING id, name ),
                    all_labels AS (
                        SELECT id, name FROM ins_labels
                        UNION
                        SELECT id, name FROM label WHERE name = ANY(@labels::text[]))
                    INSERT INTO beer_label (beer_id, label_id)
                    SELECT nb.id, al.id
                    FROM new_beer nb
                    JOIN all_labels al ON TRUE;
                ";

                using var command = new NpgsqlCommand(sql, connection);
                command.Parameters.AddWithValue("@name", beerDTO.Name);
                command.Parameters.AddWithValue("@alcohol_percentage", beerDTO.AlcPrecentage);
                command.Parameters.AddWithValue("@brewery", beerDTO.Brewery);
                command.Parameters.AddWithValue("@country", beerDTO.Country);
                command.Parameters.AddWithValue("@barcode", (object?)beerDTO.Barcode ?? DBNull.Value);
                command.Parameters.AddWithValue("@image_url", (object?)uploadDTO.ImageUrl ?? DBNull.Value);
                command.Parameters.AddWithValue("@image_public_id", (object?)uploadDTO.PublicId ?? DBNull.Value);
                command.Parameters.AddWithValue("@labels", beerDTO.Labels?.ToArray() ?? Array.Empty<string>());

                command.ExecuteNonQuery();
                return new CreateBeerResponse
                {
                    Name = beerDTO.Name,
                    AlcPrecentage = beerDTO.AlcPrecentage,
                    Brewery = beerDTO.Brewery,
                    Country = beerDTO.Country,
                    Labels = beerDTO.Labels,
                    Barcode = beerDTO.Barcode,
                    ImageUrl = uploadDTO.ImageUrl,
                    ImagePublicId = uploadDTO.PublicId,
                };
            }
            catch (Exception ex)
            {
                throw new Exception("AddBeer failed", ex);
            }
        }
    }
}