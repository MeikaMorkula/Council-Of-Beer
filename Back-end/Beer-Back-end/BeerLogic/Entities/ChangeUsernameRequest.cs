using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Entities
{
    public class ChangeUsernameRequest
    {
        public string newUser { get; set; }
        public string oldUser { get; set; }
    }
}
