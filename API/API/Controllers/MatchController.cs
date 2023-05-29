using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MatchController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICreatingBet _creatingBet;

        public MatchController(IUnitOfWork unitOfWork, IMapper mapper, ICreatingBet creatingBet)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _creatingBet = creatingBet;
        }

        [HttpGet("GetUpcomingMatches")]
        public async Task<IEnumerable<UpcomingMatchesDTO>> GetUpcomingMatches()
        {
            var todaysMatches = await _unitOfWork.Match.
                GetUpcomingMatches();

            var championships = await _unitOfWork.Match.
                GetUpcomingMatchesSortedByChampionships();

            championships = championships.
                OrderBy(c => c.IsPopular).
                OrderBy(c => c.Region.Name);

            var upcomingMatches = _mapper.Map<IEnumerable<UpcomingMatchesDTO>>(championships);

            foreach (var i in upcomingMatches)
            {
                i.Matches = todaysMatches.
                    Where(m => m.ChampionshipId == i.Championship.Id).
                    OrderBy(m=>m.DateTime).
                    ToList();
            }

            return upcomingMatches;
        }

        [HttpGet("GetCalendarOfChampionshipMatches")]
        public async Task<IEnumerable<Match>> GetCalendarOfChampionshipsMatches(int id)
        {
            return await _unitOfWork.Match.
                GetCalendarOfChampionshipsMatches(id);
        }

        [HttpGet("GetChampionshipMatchResults")]
        public async Task<IEnumerable<Match>> GetChampionshipMatchResults(int id)
        {
            return await _unitOfWork.Match.
                GetChampionshipMatchResults(id);
        }

        [HttpGet("GetCalendarOfTeamsMatches")]
        public async Task<IEnumerable<Match>> GetCalendarOfTeamsMatches(int id)
        {
            return await _unitOfWork.Match.
                GetCalendarOfTeamsMatches(id);
        }

        [HttpGet("GetTeamsMatchResults")]
        public async Task<IEnumerable<Match>> GetTeamsMatchResults(int id)
        {
            return await _unitOfWork.Match.
                GetTeamsMatchResults(id);
        }
        [HttpGet("GetMatch")]
        public async Task<Match> GetMatch(int id)
        {
            return await _unitOfWork.Match.Get(id);
        }
        [HttpPut("EditMatch")]
        public async Task<ActionResult> EditMatch(MatchDTO matchDTO)
        {
            var match = _mapper.Map<Match>(matchDTO);

            _unitOfWork.Match.Update(match);

            if(await _unitOfWork.Complete())
                return Ok();

            return BadRequest("Не удалось сохранить");
        }
        [HttpPost("CreateMatch")]
        public async Task<ActionResult> CreateMatch()
        {
            var req = Request;
            var date = getDate(req.Form["date"], req.Form["time"]);
            var match = new Match
            {
                HomeId = Convert.ToInt32(req.Form["homeid"]),
                AwayId = Convert.ToInt32(req.Form["awayid"]),
                ChampionshipId = Convert.ToInt32(req.Form["championshipid"]),
                DateTime = date,
                Bets = _creatingBet.CreateBet()
            };

            _unitOfWork.Match.Create(match);

            if(await _unitOfWork.Complete())
                return Ok();

            return BadRequest();
        }
        [HttpDelete("DeleteMatch")]
        public async Task<ActionResult> DeleteMatch(int id)
        {
            var match = await _unitOfWork.Match.Get(id);

            if (match == null)
                return BadRequest("Матч не найден");

            _unitOfWork.Match.Delete(match);

            if (await _unitOfWork.Complete())
                return Ok("Матч удален");

            return BadRequest("Не удалось удалить матч");
        }
        public static DateTime getDate(string date, string time)
        {

            return DateTime.Parse(date + " " + time);
        }
    }
}
