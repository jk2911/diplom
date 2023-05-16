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

        [HttpGet("UpcomingMatches")]
        public async Task<IEnumerable<UpcomingMatchesDTO>> GetUpComingMatches()
        {
            var regions = await _unitOfWork.Region.GetRegionsTodaysMatches();

            return _mapper.Map<IEnumerable<UpcomingMatchesDTO>>(regions);
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
    }
}
