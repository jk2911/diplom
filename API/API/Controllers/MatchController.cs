using API.Controllers.Base;
using API.Interfaces;
using AutoMapper;

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

    }
}
