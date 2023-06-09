﻿using API.Controllers.Base;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Text;

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

            if (cardDTO.Number.Length != 16)
                return BadRequest("В номере карты должны быть 16 цифр");

            var card = _mapper.Map<Card>(cardDTO);

            StringBuilder stringBuilder = new StringBuilder(card.Number);

            for(int i = 0; i < 16; i++)
            {
                if (i > 3 && i < 12)
                    stringBuilder[i] = '*';
            }

            card.Number = stringBuilder.ToString();

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
