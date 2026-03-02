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

        [HttpGet(Name = "GetAllBeer")]
        public List<BeerDTO> GetAllBeer()
        {
           return _beerService.GetAllBeer();
        }
    }
}
