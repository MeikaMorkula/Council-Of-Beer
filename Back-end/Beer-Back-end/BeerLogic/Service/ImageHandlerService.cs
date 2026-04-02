using BeerLogic.DTOs;
using BeerLogic.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Service
{
    public class ImageHandlerService
    {

        private readonly IImageHandlerRepo _imageHandlerRepo;
        private readonly CloudinaryHandlerService _cloudinaryHandlerService;

        public ImageHandlerService(IImageHandlerRepo postRepo, CloudinaryHandlerService cloudinaryHandlerService)
        {
            _imageHandlerRepo = postRepo;
            _cloudinaryHandlerService = cloudinaryHandlerService;
        }

        public async Task<CreatePostResponse> CreatePostAsync(CreatePostRequest request)
        {
            var uploadResult = await _cloudinaryHandlerService.UploadImageAsync(request.Image);

            var createdPost = await _imageHandlerRepo.CreatePostAsync(
                request.UserId,
                request.BeerId,
                request.Description,
                uploadResult.ImageUrl,
                uploadResult.PublicId
            );

            return new CreatePostResponse
            {
                PostId = createdPost.PostId,
                BeerId = createdPost.BeerId,
                Description = createdPost.Description,
                ImageUrl = createdPost.ImageUrl,
                PublicId = createdPost.PublicId
            };
        }
    }
}
