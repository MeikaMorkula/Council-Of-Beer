using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BeerId { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public string Bar { get; set; }
        public string City { get; set; }
        public Review Review { get; set; }
    }
}
