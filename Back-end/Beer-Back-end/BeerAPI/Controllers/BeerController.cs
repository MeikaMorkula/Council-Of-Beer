using Microsoft.AspNetCore.Mvc;
using BeerLogic.Service;
using BeerLogic.DTOs;

namespace BeerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BeerController : Controller
    {
        private readonly BeerService _beerService;

        public BeerController(BeerService beerService)
        {
            _beerService = beerService;
        }

        [HttpGet("GetAllBeer")]
        public List<CreateBeerResponse> GetAllBeer()
        {
           return _beerService.GetAllBeer();
        }

        [HttpGet("GetBeerNames")]
        public List<string> GetBeerNames()
        {
            return _beerService.GetBeerNames();
        }

        [HttpGet("GetInfoByBeerName")]
        public CreateBeerResponse GetInfoByBeerName(string beername)
        {
            return _beerService.GetInfoByBeerName(beername);
        }

        [HttpPost("AddBeer")]
        public async Task<CreateBeerResponse> AddBeer([FromForm] CreateBeerRequest BeerDTO)
        {
            return await _beerService.AddBeer(BeerDTO);
        }
    }
}
