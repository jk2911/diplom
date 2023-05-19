using API.Controllers.Base;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BetController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BetController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("AddBet/{matchId:int}/{count:int}")]
        public async Task<ActionResult> AddBet(int matchId, int count)
        {
            string? name = Request.Form["name"];

            if (name == null || name.Length < 2)
                return BadRequest("Слишком короткий исход");

            if (count == 0)
                return BadRequest("Количество исходов равно 0");

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
                return BadRequest("");

            _unitOfWork.Bet.DoBet(betId, userId, amount);

            user.Money -= amount;

            _unitOfWork.User.Update(user);

            _unitOfWork.User.DoBet(userId, amount);

            if (await _unitOfWork.Complete())
                return Ok();

            return BadRequest("Не удалось сделать ставку");
        }

    }
}
