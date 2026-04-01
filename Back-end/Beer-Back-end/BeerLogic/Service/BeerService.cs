using BeerLogic.DTOs;
using BeerLogic.Entities;
using BeerLogic.Interface;

namespace BeerLogic.Service
{
    public class BeerService
    {
        private readonly IBeerRepo _repo;
        private readonly Mapper.Mapper _map;

        public BeerService(Mapper.Mapper map, IBeerRepo repo)
        {
            _repo = repo;
            _map = map;
        }
        public List<BeerDTO> GetAllBeer()
        {
            List<BeerDTO> beerlist = _repo.GetAllBeer();
            return beerlist;
        }

        public List<string> GetBeerNames()
        {
            List<string> beernamelist = _repo.GetBeerNames();
            return beernamelist;
        }

        public string AddBeer(BeerDTO beer)
        {
            Beer EBeer = _map.BeerDTOToEntity(beer);
            
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
                beer = _map.BeerEntityToDTO(EBeer);
                return _repo.AddBeer(beer);
            }
        }
    }
}
