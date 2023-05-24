using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BetController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public BetController(IUnitOfWork unitOfWork, IMapper mapper, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("AddBet/{matchId:int}/{count:int}")]
        public async Task<ActionResult> AddBet(int matchId, int count)
        {
            string? name = Request.Form["name"];

            if (name == null || name.Length < 2)
                return BadRequest("Слишком короткий исход");

            if (count == 0)
                return BadRequest("Количество исходов равно 0");

            if (count > 10)
                return BadRequest("Количество исходов не должно быть больше 10");

            var match = await _unitOfWork.Match.Get(matchId);

            if (match == null)
                return BadRequest("Матч не найден");

            var isOutcomeInMatch = await _unitOfWork.Bet.
                IsOutcomeInMatch(match, name);

            if (isOutcomeInMatch)
                return BadRequest("Такой исход уже есть");
            
            _unitOfWork.Bet.AddBet(match, name, count);

            if(await _unitOfWork.Complete())
                return Ok();

            return BadRequest("Не удалось создать исход");
        }
        [HttpPost("DoBet/{betId:int}-{userId:int}-{amount:float}")]
        public async Task<ActionResult> DoBet(int betId, int userId, float amount)
        {
            var user = await _unitOfWork.User.Get(userId);

            if (user == null)
                return BadRequest("");

            var betValue = await _unitOfWork.Bet.GetBetValue(betId);

            if (betValue == null)
                return BadRequest("Ставка не найдена");

            if (amount > user.Money)
                return BadRequest("Сумма ставки превышает количество денег на игровом счету");

            var userBet = await _unitOfWork.Bet.GetUserBet(userId, betId);

            if (userBet != null)
                return BadRequest("На этот матч уже сделана ставка");

            _unitOfWork.Bet.DoBet(betId, userId, amount);

            user.Money -= amount;

            _unitOfWork.User.Update(user);

            _unitOfWork.User.DoBet(userId, betId, amount);

            if (await _unitOfWork.Complete())
                return Ok(await _tokenService.CreateToken(user));

            return BadRequest("Не удалось сделать ставку");
        }
        [HttpGet("GetUserBets")]
        public async Task<IEnumerable<UserBet>> GetUserBets(int id)
        {
            return await _unitOfWork.Bet.GetUserBets(id);
        }

        [HttpPut("SaveConfirmBets")]
        public async Task<ActionResult> SaveConfirmBets(MatchDTO matchDto)
        {
            var match = await _unitOfWork.Match.Get(matchDto.Id);

            if (match == null)
                return BadRequest("Матч не найден");

            var bets = _mapper.Map<IEnumerable<Bet>>(matchDto.Bets);

            _unitOfWork.Bet.SaveBetsResultMatch(bets);

            if (!await _unitOfWork.Complete())
                return BadRequest("Не удалось сохранить результаты ставок");

            _unitOfWork.Bet.DefineUserBets(match.Id);

            if (await _unitOfWork.Complete())
                return Ok("Сохранено");

            return BadRequest("Не удалось сохранить");
        }

    }
}
