using API.Controllers.Base;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IHashPassword _hashPassword;
        public AccountController(IUnitOfWork unitOfWork, ITokenService tokenService, IHashPassword hashPassword)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _hashPassword = hashPassword;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto user)
        {
            if (await _unitOfWork.User.UserExists(user.Phone))
                return BadRequest("User is taken");

            _unitOfWork.User.Create(new User
            {
                Phone = user.Phone,
                Password = _hashPassword.CreateHash(user.Password)
            });

            if (await _unitOfWork.Complete())
                return new UserDto
                {
                    Phone = user.Phone
                };

            return BadRequest("Failed to create user");
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginUser)
        {
            var user = await _unitOfWork.User.
                GetUserByPhone(loginUser.Phone);

            if (user is null) return BadRequest("Invalid phone");

            if (user.Password != _hashPassword.CreateHash(loginUser.Password))
                return BadRequest("Invalid password");

            return new UserDto
            {
                Phone = user.Phone,
                Token = await _tokenService.CreateToken(user),
                Role = user.Role
            };

        }

    }
}
