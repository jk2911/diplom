﻿using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
using System.IO;
using API.Service;

namespace API.Controllers
{
    public class TeamController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public TeamController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        //[Authorize]
        [HttpPost("add-photo/{teamId:int}")]
        public async Task<ActionResult<string>> AddPhoto(int teamId)
        {
            var file = Request.Form.Files["image"];

            var team = await _unitOfWork.Team.Get(teamId);

            if (team == null) return NotFound("Team not found");

            var path = "images/teams/" + team.Name + ".png";

            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            team.Image = Request.Scheme + "://" + Request.Host.ToUriComponent() + "/images/teams/" + team.Name + ".png";

            _unitOfWork.Team.Update(team);

            return team.Image;
        }

        [HttpGet("get-teams")]
        public async Task<IEnumerable<Team>> GetTeams()
        {
            return await _unitOfWork.Team.GetAll();
        }

        [HttpPost("CreateTeam")]
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

            var teamExists = await _unitOfWork.
                Team.
                GetTeamInRegionByName(name, region);

            if (teamExists != null)
                return BadRequest("Такая команда уже существует в регионе");


            var pathImage = image == null ? "" :
                _photoService.AddPhoto(Request, "images/teams/" + image.FileName, image);

            var team = new Team
            {
                Name = name,
                Region = region,
                Image = pathImage
            };

            _unitOfWork.Team.Create(team);

            if (await _unitOfWork.Complete())
                return Ok("Команда создана");

            return BadRequest("Не удалось создать");
        }
    }
}
