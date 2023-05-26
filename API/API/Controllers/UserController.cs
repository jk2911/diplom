using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

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

        //[Authorize]
        [HttpPost("Refill/{userId:int}-{sum:float}")]
        public async Task<ActionResult<string>> Refill(int userId, float sum)
        {
            if (sum < 2) return BadRequest("The money should not be less than 2");

            User user = await _unitOfWork.User.Get(userId);

            if (user == null) return NotFound("Пользователь не найден");

            user.Money += sum;

            _unitOfWork.User.Update(user);

            var history = new HistoryBankAccount
            {
                Date = DateTime.Now,
                Status = "Пополнение средств",
                Money = sum,
                UserId = user.Id,
            };

            _unitOfWork.History.Create(history);

            if(await _unitOfWork.Complete())
            {
                var token = await _tokenService.CreateToken(user);
                return Ok(token);
            }

            return BadRequest("Не удалось положить деньги на счет");
        }

        [HttpPost("Withdrawal/{userId:int}-{sum:float}")]
        public async Task<ActionResult> Withdrawal(int userId, float sum)
        {
            var user = await _unitOfWork.User.Get(userId);

            if (user == null) return BadRequest("Пользователь не найден");

            if (sum > user.Money) return BadRequest("Не хватает средств");

            user.Money -= (float)Math.Round(sum, 2);

            _unitOfWork.User.Update(user);

            var history = new HistoryBankAccount
            {
                Date = DateTime.Now,
                Status = "Вывод средств",
                Money = sum,
                UserId = user.Id,
            };

            _unitOfWork.History.Create(history);

            if (await _unitOfWork.Complete()) 
                return Ok(await _tokenService.CreateToken(user));

            return BadRequest("Не удалось вывести средства");
        }

        [HttpPost("GetToken")]
        public async Task<ActionResult> GetToken(string email)
        {
            var user = await _unitOfWork.User.GetUserByEmail(email);

            var token = await _tokenService.CreateToken(user);

            return Ok(token);
        }

        //[Authorize]
        [HttpPut("ChangePassword")]
        public async Task<ActionResult<UserDto>> ChangePassword(ChangePassword item)
        {
            var user = await _unitOfWork.User.Get(item.Id);

            if (user == null) return BadRequest("Пользователь не найден");

            if (!_hashPassword.CreateHash(item.OldPassword).Equals(user.Password))
                return BadRequest("Неверный пароль");

            user.Password=_hashPassword.CreateHash(item.NewPassword);

            _unitOfWork.User.Update(user);

            var userDto = _mapper.Map<UserDto>(user);

            userDto.Token = await _tokenService.CreateToken(user);
           
            return userDto;
        }

        [HttpGet("GetUsers")]
        public async Task<IEnumerable<UserDto>> GetUsers() 
        {
            var users = await _unitOfWork.User.GetAll();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        [HttpGet("GetUser")]
        public async Task<UserDto> GetUser(string email)
        {
            var user = await _unitOfWork.User.GetUserByEmail(email);

            return _mapper.Map<UserDto>(user);
        }

        [HttpPut("ChangeRole/{id:int}/{role}")]
        public async Task<ActionResult> ChangeRole(int id, string role)
        {
            var user = await _unitOfWork.User.Get(id);

            if (user == null) return BadRequest("Пользователь не найден");

            if (user.Email == "maksgoy2911@gmail.com")
                return BadRequest("Этому пользователю нельзя менять роль");

            if (!(role == "admin" || role == "bukmeker" || role == "user"))    
                return BadRequest("Нет такой роли");

            user.Role = role;

            _unitOfWork.User.Update(user);

            if (await _unitOfWork.Complete())
                return Ok("Роль изменена");

            return BadRequest("Не удалось изменить роль");
        }
        [HttpGet("GetHistoryUser")]
        public async Task<IEnumerable<HistoryBankAccount>> GetHistoryBankAccount(int id)
        {
            return await _unitOfWork.User.GetHistoryBankAccounts(id);
        }
    }
}
