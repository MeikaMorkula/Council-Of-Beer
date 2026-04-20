using BeerLogic.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Interface
{
    public interface IImageHandlerRepo
    {
        Task<CreatePostResponse> CreatePostAsync(CreatePostRequest post, CloudinaryUploadResultDTO uploadResult);
    }
}
