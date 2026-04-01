using BeerLogic.DTOs;

namespace BeerLogic.Interface
{
    public interface IBeerRepo
    {
        public List<BeerDTO> GetAllBeer();
        public List<string> GetBeerNames();
        public string AddBeer(BeerDTO BeerDTO);
    }
}
