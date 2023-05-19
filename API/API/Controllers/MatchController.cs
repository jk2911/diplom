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

        public MatchController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetUpcomingMatches")]
        public async Task<IEnumerable<UpcomingMatchesDTO>> GetUpcomingMatches()
        {
            var matches = await _unitOfWork.Match.
                GetUpcomingMatchesSortedByChampionships();

            return _mapper.Map<IEnumerable<UpcomingMatchesDTO>>(matches);
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
        [HttpPost("EditMatch")]
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
            };

            _unitOfWork.Match.Create(match);

            if(await _unitOfWork.Complete())
                return Ok();

            return BadRequest();
        }
        public static DateTime getDate(string date, string time)
        {

            return DateTime.Parse(date + " " + time);
        }
    }
}
