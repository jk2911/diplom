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

        [HttpGet("upcoming-matches")]
        public async Task<IEnumerable<UpcomingMatchesDTO>> GetUpComingMatches()
        {

            var regions = await _unitOfWork.Region.GetRegionsTodaysMatches();

            return _mapper.Map<IEnumerable<UpcomingMatchesDTO>>(regions);
        }
    }
}
