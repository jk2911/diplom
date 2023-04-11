using System.ComponentModel.DataAnnotations;

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
        public int MatchStatisticId { get; set; }
        public virtual MatchStatistic Statistic { get; set; } = new MatchStatistic();
        public virtual ICollection<Bet> Bets { get; set; }
        public Match()
        {
            Bets = new List<Bet>();
        }
    }
}
