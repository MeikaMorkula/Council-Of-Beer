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
                Id = userDTO.Id,
                Name = userDTO.Name,
                PasswordHash = userDTO.PasswordHash,
                Birthday = userDTO.Birthday
            };
        }

        public UserDTO UserEntityToDTO(User user)
        {
            return new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                PasswordHash = user.PasswordHash,
                Birthday = user.Birthday
            };
        }

        // PostMapper
        public Post PostDTOToEntity(PostDTO postDTO)
        {
            return new Post()
            {
                Id = postDTO.Id,
                ImgUrl = postDTO.ImgUrl,
                Reviews = postDTO.Reviews,
                Location = postDTO.Location,
                Bar = postDTO.Bar
            };
        }
        
        public PostDTO PostEntityToDTO(Post post)
        {
            return new PostDTO()
            {
                Id = post.Id,
                ImgUrl = post.ImgUrl,
                Reviews = post.Reviews,
                Location = post.Location,
                Bar = post.Bar
            };
        }

        // ReviewMapper
        public Review ReviewDTOToEntity(ReviewDTO reviewDTO)
        {
            return new Review()
            {
                Id = reviewDTO.Id,
                BeerId = reviewDTO.BeerId,
                UserId = reviewDTO.UserId,
                Score = reviewDTO.Score,
                Description = reviewDTO.Description,
                Created = reviewDTO.Created
            };
        }

        public ReviewDTO ReviewEntityToDTO(Review review)
        {
            return new ReviewDTO()
            {
                Id = review.Id,
                BeerId = review.BeerId,
                UserId = review.UserId,
                Score = review.Score,
                Description = review.Description,
                Created = review.Created
            };
        }

        // BeerMapper
        public Beer BeerDTOToEntity(BeerDTO beerDTO)
        {
            return new Beer()
            {
                Id = beerDTO.Id,
                Name = beerDTO.Name,
                AvgRating = beerDTO.AvgRating,
                AlcPrecentage = beerDTO.AlcPrecentage,
                Label = beerDTO.Label,
                Brewery = beerDTO.Brewery,
                Country = beerDTO.Country
            };
        }

        public BeerDTO BeerEntityToDTO(Beer beer)
        {
            return new BeerDTO()
            {
                Id = beer.Id,
                Name = beer.Name,
                AvgRating = beer.AvgRating,
                AlcPrecentage = beer.AlcPrecentage,
                Label = beer.Label,
                Brewery = beer.Brewery,
                Country = beer.Country
            };
        }
    }
}
