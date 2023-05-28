using API.Controllers;
using API.Data;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.Service;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Controllers
{
    public class Account
    {
        [Fact]
        public async void Login()
        {
            IUnitOfWork unitOfWork = new UnitOfWork();
            ITokenService tokenService = new TokenService(); 
            IHashPassword hashPassword = new HashPasswordService();
            IMapper mapper;

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfiles());
            });
            mapper = mapperConfig.CreateMapper();

            var account = new AccountController(unitOfWork, tokenService, hashPassword, mapper);

            LoginDto login = new()
            {
                Email = "444",
                Password = "444",
            };

            var result = await account.Login(login);

            var token = new JwtSecurityToken(jwtEncodedString: result.Value.Token);

            string email = token.Claims.First(c => c.Type == "email").Value;

            string role = token.Claims.First(c => c.Type == "role").Value;

            Assert.Equal(email, login.Email);

            Assert.Equal(role, "user");
        }

        [Fact]
        public async void Register()
        {
            IUnitOfWork unitOfWork = new UnitOfWork();
            ITokenService tokenService = new TokenService();
            IHashPassword hashPassword = new HashPasswordService();
            IMapper mapper;

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfiles());
            });
            mapper = mapperConfig.CreateMapper();

            var account = new AccountController(unitOfWork, tokenService, hashPassword, mapper);

            RegisterDto register = new()
            {
                Email = "666",
                Password = "666",
            };

            var result = await account.Register(register);

            var token = new JwtSecurityToken(jwtEncodedString: result.Value.Token);

            string email = token.Claims.First(c => c.Type == "email").Value;

            string role = token.Claims.First(c => c.Type == "role").Value;

            Assert.Equal(email, register.Email);

            Assert.Equal(role, "user");
        }
    }
}
