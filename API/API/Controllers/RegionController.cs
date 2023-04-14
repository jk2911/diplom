using API.Controllers.Base;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RegionController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RegionController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("get-regions")]
        public async Task<IEnumerable<RegionDTO>> Get()
        {
            var regions = await _unitOfWork.Region.GetAll();

            return _mapper.Map<IEnumerable<RegionDTO>>(regions);
        }
    }
}
