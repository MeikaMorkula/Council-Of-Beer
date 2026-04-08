using Microsoft.Extensions.Configuration;
using BeerLogic.Entities;
using BeerLogic.Interface;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using BeerLogic.Utility;
using BeerLogic.DTOs;

namespace BeerLogic.Service
{
    public class JwtService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepo _userRepo;
        public JwtService(IConfiguration configuration, IUserRepo userRepo)
        {
            _configuration = configuration;
            _userRepo = userRepo;
        }

        public bool PasswordRules(string password)
        {
            if (password == null)
            {
                return false;
            }

            if (password.Length < 8)
            {
                return false;
            }

            if (!password.Any(char.IsUpper))
            {
                return false;
            }

            if (!password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                return false;
            }

            return true;
        }

        public async Task<LoginResponse> Authenticate(LoggingInRequest request)
        {
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                return null;
            }
            var hashedPassword = _userRepo.LookupUserPassword(request.UserName);
            if (hashedPassword == null || !Bcrypt.VerifyPassword(request.Password, hashedPassword))
            {
                return null;
            }

            var issuer = _configuration["JwtConfig:Issuer"];
            var audience = _configuration["JwtConfig:Audience"];
            var key = _configuration["JwtConfig:Key"];
            var tokenValidityMins = _configuration.GetValue<int>("JwtConfig:TokenValidityMins");
            var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Name, request.UserName)
                }),
                Expires = tokenExpiryTimeStamp,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                    SecurityAlgorithms.HmacSha512Signature),
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);

            return new LoginResponse
            {
                AccessToken = accessToken,
                UserName = request.UserName,
                ExpiresIn = (int)tokenExpiryTimeStamp.Subtract(DateTime.UtcNow).TotalSeconds
            };
        }

        public async Task<string> Authorize(RegistrationRequest request)
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            
            if (request == null)
            {
                return null;
            }
            if  (request.Birthday > today.AddYears(-18))
            {
                return null;
            }
            if (PasswordRules(request.password) == false)
            {
                return null;
            }

            UserDTO userDTO = new UserDTO
            {
                Name = request.userName,
                PasswordHash = Bcrypt.HashPassword(request.password),
                Birthday = request.Birthday
            };

            string userCreation = await _userRepo.CreateUser(userDTO);

            if (userCreation != "Ok")
            {
                return null;
            }

            return userDTO.PasswordHash;
        }
    }
}
