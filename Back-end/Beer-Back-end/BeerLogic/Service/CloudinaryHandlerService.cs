using BeerLogic.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Service
{
    public class CloudinaryHandlerService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryHandlerService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }
        public async Task<CloudinaryUploadResultDTO> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new Exception("No file was uploaded.");
            }

            await using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "council-of-beer/posts"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                throw new Exception($"Cloudinary upload failed: {uploadResult.Error.Message}");
            }

            return new CloudinaryUploadResultDTO
            {
                ImageUrl = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId
            };
        }
    }
}
