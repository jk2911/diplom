using API.Controllers.Base;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChampionshipController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ChampionshipController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("all-championships")]
        public async Task<IEnumerable<Championship>> GetAllChampionships()
        {
            return await _unitOfWork.Championship.GetAll();
        }
    }
}
