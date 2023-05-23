using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public CardController(IUnitOfWork unitOfWork, IMapper mapper, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet("GetCards")]
        public async Task<IEnumerable<Card>> GetCards()
        {
            return await _unitOfWork.Card.GetAll();
        }
        [HttpGet("GetUserCards")]
        public async Task<IEnumerable<Card>> GetUserCards(int id)
        {
            return await _unitOfWork.Card.GetUserCards(id);
        }

        [HttpPost("AddCard")]
        public async Task<ActionResult> AddCard(CreateCardDTO cardDTO)
        {
            var amount = cardDTO.Amount;

            var card = _mapper.Map<Card>(cardDTO);

            var user = await _unitOfWork.User.Get(card.UserId);

            if (user == null)
                return BadRequest("Пользователь не найден");

            _unitOfWork.Card.Create(card);

            user.Money += amount;

            if (await _unitOfWork.Complete())
                return Ok(await _tokenService.CreateToken(user));

            return BadRequest("Не удалось добавить карту");
        }
    }
}
