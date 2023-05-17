using System.ComponentModel.DataAnnotations;
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
        public int cornerHome { get; set; } = 0;
        public int cornerAway { get; set; } = 0;
        public int shotsHome { get; set; } = 0;
        public int shotsAway { get; set; } = 0;
        public int shotsInTargetHome { get; set; } = 0;
        public int shotsInTargetAway { get; set; } = 0;
        public int saveHome { get; set; } = 0;
        public int saveAway { get; set; } = 0;
        public int possession { get; set; } = 50;
        public int foulsHome { get; set; } = 0;
        public int foulsAway { get; set; } = 0;
        public int offsideHome { get; set; } = 0;
        public int offsideAway { get; set; } = 0;
        public int yellowCardHome { get; set; } = 0;
        public int yellowCardAway { get; set; } = 0;
        public int redCardHome { get; set; } = 0;
        public int redCardAway { get; set; } = 0;
        public virtual ICollection<Bet> Bets { get; set; }
        public Match()
        {
            Bets = new List<Bet>();
        }
    }
}
