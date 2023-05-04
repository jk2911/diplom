﻿using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChampionshipController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ChampionshipController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("all-championships")]
        public async Task<IEnumerable<Championship>> GetAllChampionships()
        {
            return await _unitOfWork.Championship.GetAll();
        }

        //[HttpGet("championships-sorted-by-regions")]
        //public async Task<IEnumerable<ChampionshipSortedByRegionDTO>> GetChampionshipsByRegions()
        //{
        //    var regions = await _unitOfWork.Region.GetRegionsTodaysMatches();

        //    var championshipSortedByRegions = new List<ChampionshipSortedByRegionDTO>();

        //    foreach (var region in regions)
        //    {
        //        var regionChampionships = _unitOfWork.Championship.
        //            GetChampionshipsTodaysMatchesByRegion(region.Id);

        //        championshipSortedByRegions.Add(new ChampionshipSortedByRegionDTO
        //        {
        //            Id = region.Id,
        //            Region = region.Name,
        //            CountMatches = await _unitOfWork.Region.GetCountMatches(region.Id),
        //            Championships = _mapper.Map<ICollection<ChampionshipDTO>>(region.Championships)
        //        });
        //    }

        //    return championshipSortedByRegions;
        //}



        [HttpPost("add-team/{championshipId:int}-{teamId:int}")]
        public async Task<ActionResult> AddTeamInChampionship(int championshipId, int teamId)
        {
            Team team = await _unitOfWork.Team.Get(teamId);

            Championship championship = await _unitOfWork.Championship.Get(championshipId);

            if (team == null) return NotFound("Team not founded");

            if(championship == null) return NotFound("Championship not founded");

            var IsTeamInChampionship = await _unitOfWork.Championship.TeamExistsInChampionship(championship.Id, team.Id);

            if (IsTeamInChampionship) return BadRequest("Team is already in the championship");

            _unitOfWork.Championship.AddTeamInChampionship(championship.Id, team.Id);

            if(await _unitOfWork.Complete())
                return Ok("Team is added to the championship");

            return BadRequest("Failed to add team in championship");
        }


        [HttpDelete("delete-championship/{championshipId:int}")]
        public async Task<ActionResult> deleteChampionship(int championshipId)
        {
            Championship championship = await _unitOfWork.Championship.Get(championshipId);

            if (championship == null) return NotFound("Championship not founded");

            _unitOfWork.Championship.Delete(championship);

            if (await _unitOfWork.Complete())
                return Ok("Championship delete");

            return BadRequest("Failed to delete championship");
        }
    }
}
