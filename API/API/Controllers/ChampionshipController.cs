using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Service;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChampionshipController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public ChampionshipController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("get-championships")]
        public async Task<IEnumerable<Championship>> GetAllChampionships()
        {
            return await _unitOfWork.Championship.GetAll();
        }

        
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

        [HttpPost("CreateChampionship")]
        public async Task<ActionResult> CreateChampionship()
        {
            var req = Request.Form;

            string? name = req["name"];
            string? regionName = req["region"];
            var image = req.Files["image"];

            if (name == null || name.Length < 3)
                return BadRequest("Длина названия должна быть минимум 3 символа");



            var region = await _unitOfWork.Region.GetRegionByName(regionName);

            if (region == null) return NotFound("Регион не найден");

            var pathImage = image == null ? "" : 
                _photoService.AddPhoto(Request, "images/championships/" + image.FileName, image);

            var championship = new Championship
            {
                Name = name,
                Region = region,
                Image = pathImage
            };

            _unitOfWork.Championship.Create(championship);

            if(await  _unitOfWork.Complete())
                return Ok("Чемпионат создан");

            return BadRequest("Не удалось создать");
        }
    }
}
