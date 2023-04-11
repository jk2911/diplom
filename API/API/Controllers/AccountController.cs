using API.Controllers.Base;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IHashPassword _hashPassword;
        private readonly IMapper _mapper;
        public AccountController(IUnitOfWork unitOfWork, ITokenService tokenService, IHashPassword hashPassword, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _hashPassword = hashPassword;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _unitOfWork.User.UserExists(registerDto.Email))
                return BadRequest("User is taken");

            User user = _mapper.Map<User>(registerDto);

            _unitOfWork.User.Create(user);

            var userDto = _mapper.Map<UserDto>(user);

            userDto.Token = await _tokenService.CreateToken(user);

            if (await _unitOfWork.Complete())

                return userDto;

            return BadRequest("Failed to create user");
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginUser)
        {
            var user = await _unitOfWork.User.
                GetUserByPhone(loginUser.Email);

            if (user is null) return BadRequest("Invalid email");

            if (user.Password != _hashPassword.CreateHash(loginUser.Password))
                return BadRequest("Invalid password");

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = user.Role
            };

        }
    }
}
