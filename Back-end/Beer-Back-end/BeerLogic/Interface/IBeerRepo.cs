using BeerLogic.DTOs;

namespace BeerLogic.Interface
{
    public interface IBeerRepo
    {
        public List<CreateBeerResponse> GetAllBeer();
        public List<string> GetBeerNames();
        public CreateBeerResponse GetInfoByBeerName(string beername);
        public CreateBeerResponse AddBeer(CreateBeerRequest beerDTO, CloudinaryUploadResultDTO uploadDTO);
    }
}
