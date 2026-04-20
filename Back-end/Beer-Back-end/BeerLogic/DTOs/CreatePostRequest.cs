using Microsoft.AspNetCore.Http;

namespace BeerLogic.DTOs
{
    public class CreatePostRequest
    {
        public int UserId { get; set; }
        public int BeerId { get; set; }
        public string Description { get; set; }
        public string Bar {  get; set; }
        public string City {  get; set; }
        public IFormFile Image { get; set; }
    }
}