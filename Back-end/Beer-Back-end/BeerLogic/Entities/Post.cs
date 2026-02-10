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
        public string ImgUrl { get; set; }
        public Review Reviews { get; set; }
        // research how to save location
        public string Location { get; set; }
        public string Bar {  get; set; }
    }
}
