using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RegionController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public RegionController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("GetRegions")]
        public async Task<IEnumerable<Region>> Get()
        {
            return await _unitOfWork.Region.GetAllRegionsSortedByName();
        }

        [HttpGet("GetRegionsUpcomingMatches")]
        public async Task<IEnumerable<RegionsUpcomingMatchesDTO>> GetRegionsUpcomingMatches()
        {
            var regions = await _unitOfWork.Region.GetRegionsUpcomingMatches();

            return _mapper.Map<IEnumerable<RegionsUpcomingMatchesDTO>>(regions);
        }

        [HttpPost("CreateRegion")]
        public async Task<ActionResult> CreateRegion()
        {
            var req = Request.Form;

            string? name = req["name"];
            var image = req.Files["image"];

            if (name == null || name.Length < 3)
                return BadRequest("Длина названия должна быть минимум 3 символа");

            var regionExists = await _unitOfWork.Region.GetRegionByName(name);

            if (regionExists != null)
                return BadRequest("Такой регион уже существует");

            var pathImage = image == null ? null :
                _photoService.AddPhoto(Request, "images/regions/" + image.FileName, image);

            var newRegion = new Region
            {
                Name = name,
                Image = pathImage
            };

            _unitOfWork.Region.Create(newRegion);

            if (await _unitOfWork.Complete())
                return Ok("Регион создан");

            return BadRequest("Не удалось создать регион");
        }

        [HttpGet("GetRegion")]
        public async Task<Region> GetRegion(int id)
        {
            return await _unitOfWork.Region.Get(id);
        }

        [HttpDelete("DeleteRegion")]
        public async Task<ActionResult> DeleteRegion(int id)
        {
            var region = await _unitOfWork.Region.Get(id);

            if (region == null)
                return BadRequest("Регион не найден");

            _unitOfWork.Region.Delete(region);

            if (await _unitOfWork.Complete())
                return Ok("Регион удален");
                
            return BadRequest("Не удалось удалить регион");
        }
        [HttpPut("EditRegion/{id:int}")]
        public async Task<ActionResult> EditRegion(int id)
        {
            var region = await _unitOfWork.Region.Get(id);

            if (region == null)
                return BadRequest("Регион не найден");

            var req = Request.Form;

            string? name = req["name"];
            var image = req.Files["image"];

            if (name == null & image == null)
                return BadRequest();

            if (name.Length < 3)
                return BadRequest("Длина названия должна быть минимум 3 символа");

            if(name!=null)
                region.Name = name;

            if(image!= null)
                region.Image = _photoService.AddPhoto(Request, "images/regions/" + image.FileName, image);

            _unitOfWork.Region.Update(region);

            return Ok("Регион изменен");
        }
    }
}
