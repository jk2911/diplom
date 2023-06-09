﻿using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class RegionDTO
    {
        [Required] public int Id { get; set; }
        [Required] public string Name { get; set; }
        [Required] public IEnumerable<ChampionshipDTO> Championships { get; set; } = new List<ChampionshipDTO>();
    }
}
