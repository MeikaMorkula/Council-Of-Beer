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
        public string userImg {  get; set; }
        public string Beername { get; set; }
        public string Description { get; set; }
        public string Bar { get; set; }
        public string City { get; set; }
        public string ImageUrl { get; set; }
    }
}
