using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Interface
{
    public interface IUserRepo
    {
        string AuthUser(string emial, string password);
        string RegisterUser(string emial, string password);
    }
}
