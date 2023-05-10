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

        [HttpGet("get-regions")]
        public async Task<IEnumerable<Region>> Get()
        {
            return await _unitOfWork.Region.GetAllRegionsSortedByName();
        }

        [HttpGet("get-regions-upcoming-matches")]
        public async Task<IEnumerable<RegionsUpcomingMatchesDTO>> GetRegionsUpcomingMatches()
        {
            var regions = await _unitOfWork.Region.GetRegionsTodaysMatches();

            return _mapper.Map<IEnumerable<RegionsUpcomingMatchesDTO>>(regions);
        }

        [HttpPost("create-region")]
        public async Task<ActionResult> CreateRegion()
        {
            var req = Request.Form;

            string? name = req["name"];
            var image = req.Files["image"];

            if (name == null || name.Length < 3)
                return BadRequest("Длина названия должна быть минимум 3 символа");

            var regionExists  = await _unitOfWork.Region.GetRegionByName(name);

            if (regionExists != null)
                return BadRequest("Такой регион уже существует");

            var pathImage = image == null ? "" : 
                _photoService.AddPhoto(Request,"images/regions/"+image.FileName, image);

            var newRegion = new Region
            {
                Name = name,
                Image = pathImage
            };

            _unitOfWork.Region.Create(newRegion);

            if(await _unitOfWork.Complete())
                return Ok("Регион создан");

            return BadRequest("Не удалось создать регион");
        }
    }
}
