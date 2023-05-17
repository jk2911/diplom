using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Service
{
    public class TokenService : ITokenService
    {
        public async Task<string> CreateToken(User user)
        {
            var claims = new List<Claim> { 
                new Claim("email", user.Email),
                new Claim("role", user.Role),
                new Claim("id", user.Id.ToString()),
                new Claim("money", user.Money.ToString()),
            };
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromDays(30)), 
                    signingCredentials: new SigningCredentials(AuthOptions.
                    GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
