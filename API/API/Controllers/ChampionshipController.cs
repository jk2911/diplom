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

        [HttpGet("GetChampionships")]
        public async Task<IEnumerable<Championship>> GetAllChampionships()
        {
            return await _unitOfWork.Championship.GetAll();
        }

        
        [HttpPost("AddTeam/{championshipId:int}-{teamId:int}")]
        public async Task<ActionResult> AddTeamInChampionship(int championshipId, int teamId)
        {
            Team team = await _unitOfWork.Team.Get(teamId);

            Championship championship = await _unitOfWork.Championship.Get(championshipId);

            if (team == null) return NotFound("Команда не найдена");

            if(championship == null) return NotFound("Чемпионат не найден");

            var IsTeamInChampionship = await _unitOfWork.Championship.TeamExistsInChampionship(championship.Id, team.Id);

            if (IsTeamInChampionship) return BadRequest("Команда уже в чемпионате");

            _unitOfWork.Championship.AddTeamInChampionship(championship.Id, team.Id);

            if(await _unitOfWork.Complete())
                return Ok("Команда добавлена в чемпионат");

            return BadRequest("Failed to add team in championship");
        }
        [HttpDelete("DeleteTeam/{championshipId:int}-{teamId:int}")]
        public async Task<ActionResult> DeleteTeamFromChampionship(int championshipId, int teamId)
        {
            var championship = await _unitOfWork.Championship.Get(championshipId);

            if (championship == null)
                return NotFound("Чемпионат не найден");

            var team = await _unitOfWork.Team.Get(teamId);

            if (team == null) return NotFound("Команда не найдена");

            var teamExists =  await _unitOfWork.Championship.
                TeamExistsInChampionship(championshipId, teamId);

            if(!teamExists) return BadRequest("Такой команды нет в чемпионате");

            _unitOfWork.Championship.DeleteTeamFromChampionship(championshipId, teamId);

            if (await _unitOfWork.Complete())
                return Ok("Команда удалена из чемпионата");

            return BadRequest("Ошибка при удалении команды из чемпионата");
        }

        [HttpDelete("DeleteChampionship/{championshipId:int}")]
        public async Task<ActionResult> deleteChampionship(int championshipId)
        {
            Championship championship = await _unitOfWork.Championship.Get(championshipId);

            if (championship == null) return NotFound("Чемпионат не найден");

            _unitOfWork.Championship.Delete(championship);

            if (await _unitOfWork.Complete())
                return Ok("Чемпионат удален");

            return BadRequest("Не удалось удалить чемпионат");
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

            var championshipExists = await _unitOfWork.
                Championship.
                GetChampionshipInRegionByName(name, region);

            if (championshipExists != null)
                return BadRequest("Такой чемпионат уже существует в регионе");

            var championship = new Championship
            {
                Name = name,
                Region = region,
                Image = null
            };

            _unitOfWork.Championship.Create(championship);

            if (!await _unitOfWork.Complete())
                return BadRequest("Не удалось сохранить чемпионат");

            var pathImage = image == null ? "" :
                _photoService.AddPhoto(Request, "images/championships/" + championship.Id +".png", image);

            championship.Image = pathImage;

            _unitOfWork.Championship.Update(championship);


            if (await  _unitOfWork.Complete())
                return Ok("Чемпионат создан");

            return BadRequest("Не удалось создать");
        }
        [HttpGet("GetRegionalChampionships")]
        public async Task<IEnumerable<Championship>> GetRegionalChampionships(int regionId)
        {
            return await _unitOfWork.Championship.GetRegionalChampionships(regionId);
        }

        [HttpGet("GetChampionship")]
        public async Task<Championship> GetChampioship(int id) {
            return await _unitOfWork.Championship.Get(id);
        }

        [HttpGet("GetChampionshipTeams")]
        public async Task<IEnumerable<Team>> GetChampionshipTeams(int id)
        {
            return await _unitOfWork.Team.GetChampionshipTeams(id);
        }

        [HttpDelete("DeleteChampionship")]
        public async Task<ActionResult> DeleteChampionship(int id)
        {
            var championship = await _unitOfWork.Championship.Get(id);

            if (championship == null)
                return BadRequest("Чемпионат не найден");

            _unitOfWork.Championship.Delete(championship);

            if (await _unitOfWork.Complete())
                return Ok("Чемпионат удален");

            return BadRequest("Не удалось удалить чемпионат");
        }

        [HttpPut("EditChampionship")]
        public async Task<ActionResult> EditChampionship(int id)
        {
            var championship = await _unitOfWork.Championship.Get(id);

            if (championship == null)
                return BadRequest("Чемпионат не найден");

            var req = Request.Form;

            string? name = req["name"];
            var image = req.Files["image"];

            if (name == null & image == null)
                return BadRequest();

            if (name.Length < 3)
                return BadRequest("Длина названия должна быть минимум 3 символа");

            if (championship.Name != name)
            {
                var region = await _unitOfWork.Region.Get(championship.RegionId);

                var chExists = await _unitOfWork.Championship.
                    GetChampionshipInRegionByName(name, region);

                if (chExists != null)
                    return BadRequest("Такой чемпионат в регионе уже существует");
            }

            if (name != null)
                championship.Name = name;

            if (image != null)
            {
                if (championship.Image != null)
                    _photoService.RemovePhoto(championship.Image.Replace(Request.Scheme + "://" + Request.Host.ToUriComponent() + "/", ""));

                championship.Image = _photoService.AddPhoto(Request, "images/championships/" + image.FileName, image);
            }

            _unitOfWork.Championship.Update(championship);

            if (await _unitOfWork.Complete())
                return Ok("Чемпионат изменен");

            return BadRequest("Не удалось изменить чемпионат");
        }
    }
}
