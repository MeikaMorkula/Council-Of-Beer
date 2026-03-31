using BeerLogic.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace BeerLogic.Utility
{
    public class Bcrypt : IPasswordHasher
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHash);
        }
    }
}

