﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Match
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public int HomeId { get; set; }
        public virtual Team Home { get; set; }
        public int AwayId { get; set; }
        public virtual Team Away { get; set; }
        public int ChampionshipId { get; set; }
        public virtual Championship Championship { get; set; }
        public int? HomeGoal { get; set; }
        public int? AwayGoal { get; set; }
        public virtual ICollection<Bet> Bets { get; set; }
        public Match()
        {
            Bets = new List<Bet>();
        }
    }
}
