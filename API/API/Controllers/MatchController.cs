using API.Controllers.Base;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MatchController :BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MatchController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("/match-todays")]
        public async Task<ActionResult<IEnumerable<Match>>> GetTodaysMatches()
        {
            var matches = await _unitOfWork.Match.GetAll();

            return Ok(matches);
        }
    }
}
