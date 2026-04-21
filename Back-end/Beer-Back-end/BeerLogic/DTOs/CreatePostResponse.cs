using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.DTOs
{
    public class CreatePostResponse
    {
        public string Username { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
