using BeerLogic.DTOs;
using BeerLogic.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageHandlerController : ControllerBase
    {
        private readonly ImageHandlerService _imageHandlerService;
        public ImageHandlerController(ImageHandlerService imageHandler) 
        {
            _imageHandlerService = imageHandler;
        }
        [HttpPost("CreatePost")]
        [Consumes("multipart/form-data")]
        //[Authorize] 
        public async Task<IActionResult> CreatePost([FromForm] CreatePostRequest request)
        {
            if (request.Image == null || request.Image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            if (request.BeerId <= 0)
            {
                return BadRequest("BeerId is invalid.");
            }

            var allowedTypes = new[] { "image/jpeg", "image/png", "image/webp" };
            if (!allowedTypes.Contains(request.Image.ContentType?.ToLower()))
            {
                return BadRequest("Only JPG, PNG, and WEBP images are allowed.");
            }

            if (request.Image.Length > 5 * 1024 * 1024)
            {
                return BadRequest("Image size cannot be larger than 5MB.");
            }

            // Example if you want user id from JWT later:
            // var userIdClaim = User.FindFirst("id")?.Value;
            // if (userIdClaim == null) return Unauthorized();
            // int userId = int.Parse(userIdClaim);

            var result = await _imageHandlerService.CreatePostAsync(request);

            return Ok(result);
        }
    }
}
