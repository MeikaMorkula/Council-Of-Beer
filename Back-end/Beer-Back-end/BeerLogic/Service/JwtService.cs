using Microsoft.Extensions.Configuration;
using BeerLogic.Entities;
using BeerLogic.Interface;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using BeerLogic.Utility;
using BeerLogic.DTOs;
using System.Security.Cryptography;

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

        public static bool PasswordRules(string password)
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

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }

            return Convert.ToBase64String(randomNumber);
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
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                    SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);

            var refreshToken = GenerateRefreshToken();

            var refreshExpiryTimeStamp = DateTime.UtcNow.AddDays(7);

            var saved = await _userRepo.SaveRefreshToken(new RefreshRequest
            {
                Name = request.UserName,
                Token = refreshToken
            }, refreshExpiryTimeStamp);

            return new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                UserName = request.UserName,
                ExpiresIn = (int)(tokenExpiryTimeStamp - DateTime.UtcNow).TotalSeconds,
                RefreshExpiresIn = (int)(refreshExpiryTimeStamp - DateTime.UtcNow).TotalSeconds
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

        public async Task<LoginResponse> RefreshLogin(RefreshRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Token))
            {
                return null;
            }

            var storedTokenData = await _userRepo.GetRefreshTokenData(request.Name);

            if (storedTokenData == null)
            {
                return null;
            }

            if (storedTokenData.Value.RefreshToken != request.Token)
            {
                return null;
            }

            if (storedTokenData.Value.Expiry <= DateTime.UtcNow)
            {
                return null;
            }

            var issuer = _configuration["JwtConfig:Issuer"];
            var audience = _configuration["JwtConfig:Audience"];
            var key = _configuration["JwtConfig:Key"];
            var tokenValidityMins = _configuration.GetValue<int>("JwtConfig:TokenValidityMins");

            if (string.IsNullOrWhiteSpace(issuer) ||
                string.IsNullOrWhiteSpace(audience) ||
                string.IsNullOrWhiteSpace(key))
            {
                throw new Exception("JWT configuration is missing.");
            }

            var now = DateTime.UtcNow;
            var tokenExpiryTimeStamp = now.AddMinutes(tokenValidityMins);
            var refreshExpiryTimeStamp = now.AddDays(7);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(JwtRegisteredClaimNames.Name, request.Name)
        }),
                Expires = tokenExpiryTimeStamp,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);

            var newRefreshToken = GenerateRefreshToken();

            var saved = await _userRepo.SaveRefreshToken(new RefreshRequest
            {
                Name = request.Name,
                Token = newRefreshToken
            }, refreshExpiryTimeStamp);

            if (!saved)
            {
                return null;
            }

            return new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken,
                UserName = request.Name,
                ExpiresIn = (int)(tokenExpiryTimeStamp - now).TotalSeconds,
                RefreshExpiresIn = (int)(refreshExpiryTimeStamp - now).TotalSeconds
            };
        }
    }
}
