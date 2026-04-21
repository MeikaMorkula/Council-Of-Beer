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
            CloudinaryUploadResultDTO uploadResult = await _cloudinaryHandlerService.UploadImageAsync(request.Image);

            CreatePostResponse createdPost = await _imageHandlerRepo.CreatePostAsync(request, uploadResult);

            return createdPost;
        }
    }
}
