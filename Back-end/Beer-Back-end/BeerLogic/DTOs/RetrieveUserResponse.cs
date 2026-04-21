using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.DTOs
{
    public class RetrieveUserResponse
    {
        public string name {  get; set; }
        public string imageURL { get; set; }
        public string imageId { get; set; }
        public int FollowingAmnt {  get; set; }
        public int FollowersAmnt { get; set; }
        public int PostAmounts { get; set; }
        public string Result { get; set; }
        public List<PostDTO> Posts { get; set; }
    }
}
