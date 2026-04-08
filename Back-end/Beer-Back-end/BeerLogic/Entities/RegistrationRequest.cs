using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Entities
{
    public class RegistrationRequest
    {
        public string userName {  get; set; }
        public string password { get; set; }
        public DateOnly Birthday { get; set; }
    }
}
