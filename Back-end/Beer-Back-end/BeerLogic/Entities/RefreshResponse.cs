using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Entities
{
    public class RefreshResponse
    {
        public string newToken { get; set; }
        public string newRefreshToken { get; set; }
    }
}
