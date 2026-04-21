using BeerLogic.Entities;
using BeerLogic.DTOs;

namespace BeerLogic.Mapper
{
    public class Mapper
    {
        // UserMapper
        public User UserDTOToEntity(UserDTO userDTO)
        {
            return new User()
            {
                Name = userDTO.Name,
                PasswordHash = userDTO.PasswordHash,
                Birthday = userDTO.Birthday
            };
        }

        public UserDTO UserEntityToDTO(User user)
        {
            return new UserDTO()
            {
                Name = user.Name,
                PasswordHash = user.PasswordHash,
                Birthday = user.Birthday
            };
        }

        public Post PostDTOToEntity(PostDTO postDTO)
        {
            return new Post()
            {
                Id = postDTO.Id,
                ImgUrl = postDTO.ImgUrl,
                Bar = postDTO.Bar
            };
        }
        
        public PostDTO PostEntityToDTO(Post post)
        {
            return new PostDTO()
            {
                Id = post.Id,
                ImgUrl = post.ImgUrl,
                Bar = post.Bar
            };
        }


        // BeerMapper
        public Beer BeerRequestToEntity (CreateBeerRequest beerDTO)
        {
            return new Beer()
            {
                Name = beerDTO.Name,
                AlcPrecentage = beerDTO.AlcPrecentage,
                Brewery = beerDTO.Brewery,
                Labels = beerDTO.Labels,
                Country = beerDTO.Country,
                Barcode = beerDTO.Barcode,
            };
        }

        public CreateBeerRequest BeerEntityToRequest(Beer beer)
        {
            return new CreateBeerRequest
            {
                Name = beer.Name,
                AlcPrecentage = beer.AlcPrecentage,
                Brewery = beer.Brewery,
                Labels = beer.Labels,
                Country = beer.Country,
                Barcode = beer.Barcode,
            };
        }

        public CreateBeerResponse BeerEntityToDTO(Beer beer)
        {
            return new CreateBeerResponse()
            {
                Name = beer.Name,
                AlcPrecentage = beer.AlcPrecentage,
                Brewery = beer.Brewery,
                Labels = beer.Labels,
                Country = beer.Country,
                Barcode = beer.Barcode,
                ImageUrl = beer.ImageUrl,
                ImagePublicId = beer.ImagePublicId
            };
        }
    }
}
