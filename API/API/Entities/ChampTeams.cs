using System.ComponentModel.DataAnnotations;

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
    }
}
