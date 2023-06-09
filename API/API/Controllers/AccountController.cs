﻿using API.Controllers.Base;
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

        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _unitOfWork.User.UserExists(registerDto.Email))
                return BadRequest("Пользователь уже существует");

            User user = _mapper.Map<User>(registerDto);

            if (user.Password.Length < 8)
                return BadRequest("Длина пароля должна быть минимум 8 символов");

            user.Password = _hashPassword.CreateHash(user.Password);

            _unitOfWork.User.Create(user);

            var userDto = _mapper.Map<UserDto>(user);

            userDto.Token = await _tokenService.CreateToken(user);

            if (await _unitOfWork.Complete())

                return userDto;

            return BadRequest("Не удалось создать аккаунт");
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginUser)
        {
            var user = await _unitOfWork.User.
                GetUserByEmail(loginUser.Email);

            if (user is null) return BadRequest("E-mail не найден");

            var hash = _hashPassword.CreateHash(loginUser.Password);

            if (user.Password != _hashPassword.CreateHash(loginUser.Password))
                return BadRequest("Неверный пароль");

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = user.Role,
                Money = user.Money,
            };

        }
    }
}
