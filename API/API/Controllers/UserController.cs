using API.Controllers.Base;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IHashPassword _hashPassword;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork unitOfWork, ITokenService tokenService, IHashPassword hashPassword, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _hashPassword = hashPassword;
            _mapper = mapper;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("user")]
        public string Get()
        {
            return "admin";
        }
        [Authorize(Roles = "user")]
        [HttpGet("user1")]
        public string Get1()
        {
            return "user";
        }
        [Authorize(Roles = "admin, user")]
        [HttpGet("user2")]
        public string Get2()
        {
            return "admin user";
        }

        [Authorize]
        [HttpPut("change-password")]
        public async Task<ActionResult<UserDto>> ChangePassword(ChangePassword item)
        {
            var user = await _unitOfWork.User.Get(item.Id);

            if (user == null) return BadRequest("The user does not find");

            if (!_hashPassword.CreateHash(item.OldPassword).Equals(user.Password))
                return BadRequest("Invalid password");

            user.Password=_hashPassword.CreateHash(item.NewPassword);

            _unitOfWork.User.Update(user);

            var userDto = _mapper.Map<UserDto>(user);

            userDto.Token = await _tokenService.CreateToken(user);
           
            return userDto;
        }
    }
}
