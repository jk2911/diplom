using API.Entities;

namespace API.DTOs
{
    public class MatchDTO
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public int HomeId { get; set; }
        public int AwayId { get; set; } 
        public int ChampionshipId { get; set; }
        public int? HomeGoal { get; set; }
        public int? AwayGoal { get; set; }
        public virtual ICollection<BetDTO> Bets { get; set; }
    }
}
