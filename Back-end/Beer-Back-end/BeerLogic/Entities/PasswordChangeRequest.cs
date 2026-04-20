using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Entities
{
    public class PasswordChangeRequest
    {
        public string oldPass {  get; set; }
        public string newPass { get; set; }
        public string username { get; set; }
    }
}
