using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TeamController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TeamController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("create-team")]
        public async Task<ActionResult<TeamDTO>> CreateTeam([FromBody] CreateTeamDto createTeam)
        {
            Team team = _mapper.Map<Team>(createTeam);

            if (createTeam.RegionId != 0)
            {

                var region = await _unitOfWork.Region.Get(createTeam.RegionId);

                if (region == null) return BadRequest("Region doesn`t exists");

                var teamExists = await _unitOfWork.Team.GetTeamByName(createTeam.Name);

                if (teamExists != null) return BadRequest("Such a team already exists");

                team.Region = region;
            }
            else
                team.Region = await _unitOfWork.Region.Get(1);

            _unitOfWork.Team.Create(team);

            if (!await _unitOfWork.Complete())
                return BadRequest("Failed to create team");

            TeamDTO teamDTO = _mapper.Map<TeamDTO>(team);

            return teamDTO;
        }
    }
}
