using BeerLogic.DTOs;

namespace BeerLogic.Interface
{
    public interface IBeerRepo
    {
        public List<BeerDTO> GetAllBeer();
        public string AddBeer(BeerDTO BeerDTO);
    }
}
