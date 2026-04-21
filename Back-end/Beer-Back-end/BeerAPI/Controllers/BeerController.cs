using Microsoft.AspNetCore.Mvc;
using BeerLogic.Service;
using BeerLogic.DTOs;
using Microsoft.AspNetCore.Authorization;

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
        [AllowAnonymous]
        public List<CreateBeerResponse> GetAllBeer()
        {
           return _beerService.GetAllBeer();
        }

        [HttpGet("GetBeerNames")]
        [AllowAnonymous]
        public List<string> GetBeerNames()
        {
            return _beerService.GetBeerNames();
        }

        [HttpGet("GetInfoByBeerName")]
        [AllowAnonymous]
        public CreateBeerResponse GetInfoByBeerName(string beername)
        {
            return _beerService.GetInfoByBeerName(beername);
        }

        [HttpPost("AddBeer")]
        [Authorize]
        public async Task<CreateBeerResponse> AddBeer([FromForm] CreateBeerRequest BeerDTO)
        {
            return await _beerService.AddBeer(BeerDTO);
        }
    }
}
