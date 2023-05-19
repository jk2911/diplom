using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class ChampTeams
    {
        [Key]
        public int Id { get; set; }
        public int ChampionshipId { get; set; }
        public virtual Championship Championship { get; set; }
        public int TeamId { get; set; }
        public virtual Team Team { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserChampBet> UserChampBets { get; set; }
        public ChampTeams() { 
            UserChampBets = new List<UserChampBet>();
        }
    }
}
