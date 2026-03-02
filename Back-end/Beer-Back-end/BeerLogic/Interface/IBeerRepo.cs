using BeerLogic.DTOs;

namespace BeerLogic.Interface
{
    public interface IBeerRepo
    {
        List<BeerDTO> GetAllBeer();
    }
}
