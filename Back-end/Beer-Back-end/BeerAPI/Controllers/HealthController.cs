using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace Api.Controllers
{
    [ApiController]
    [Route("health")]
    [AllowAnonymous]
    public class HealthController : ControllerBase
    {
        private readonly IDbConnection _connection;

        public HealthController(IDbConnection connection)
        {
            _connection = connection;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                _connection.Open();
                _connection.Close();

                return Ok(new
                {
                    status = "Healthy",
                    database = "Reachable"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(503, new
                {
                    status = "Unhealthy",
                    database = "Unreachable",
                    error = ex.Message
                });
            }
        }
    }
}