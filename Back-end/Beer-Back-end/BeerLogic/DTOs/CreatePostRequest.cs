using Microsoft.AspNetCore.Http;

namespace BeerLogic.DTOs
{
    public class CreatePostRequest
    {
        public string username { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
    }
}