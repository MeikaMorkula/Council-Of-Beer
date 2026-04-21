using BeerLogic.DTOs;
using BeerLogic.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeerAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    [Authorize]
    public class ImageHandlerController : ControllerBase
    {
        private readonly ImageHandlerService _imageHandlerService;
        public ImageHandlerController(ImageHandlerService imageHandler) 
        {
            _imageHandlerService = imageHandler;
        }
        [HttpPost("CreatePost")]
        [Consumes("multipart/form-data")]
        [Authorize]

        public async Task<IActionResult> CreatePost([FromForm] CreatePostRequest request)
        {
            if (request.Image == null || request.Image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            if (request.beername == null)
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
            

            var result = await _imageHandlerService.CreatePostAsync(request);

            return Ok(result);
        }
    }
}
