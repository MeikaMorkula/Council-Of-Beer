using BeerLogic.DTOs;
using BeerLogic.Entities;
using BeerLogic.Interface;

namespace BeerLogic.Service
{
    public class BeerService
    {
        private readonly IBeerRepo _repo;
        private readonly Mapper.Mapper _map;
        private readonly CloudinaryHandlerService _cloudinaryHandlerService;

        public BeerService(Mapper.Mapper map, IBeerRepo repo, CloudinaryHandlerService cloudinaryHandler)
        {
            _repo = repo;
            _map = map;
            _cloudinaryHandlerService = cloudinaryHandler;
        }
        public List<CreateBeerResponse> GetAllBeer()
        {
            return _repo.GetAllBeer();
            
        }

        public List<string> GetBeerNames()
        {
            return _repo.GetBeerNames();

        }

        public CreateBeerResponse GetInfoByBeerName(string beername)
        {
            return _repo.GetInfoByBeerName(beername);
        }

        public async Task<CreateBeerResponse> AddBeer(CreateBeerRequest beer)
        {
            Beer EBeer = _map.BeerRequestToEntity(beer);
            CloudinaryUploadResultDTO uploadResultDTO = await _cloudinaryHandlerService.UploadImageAsync(beer.Image);


            if (EBeer == null)
            {
                throw new Exception("Beer cant be empty");
            }
            if (EBeer.Name == null)
            {
                throw new Exception("Beer must have a name.");
            }
            if (EBeer.Brewery == null)
            {
                throw new Exception("Beer must be brewed somewhere.");
            }
            if (EBeer.Country == null)
            {
                throw new Exception("The beer must have an origin");
            }
            if (EBeer.AlcPrecentage == null)
            {
                throw new Exception("Dont leave alcohole percantage empty");
            }
            else
            {
                beer = _map.BeerEntityToRequest(EBeer);
                return _repo.AddBeer(beer,uploadResultDTO);

            }
        }
    }
}
