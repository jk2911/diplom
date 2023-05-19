using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class UserChampBet
    {
        [Key]
        public int ChampTeamsId { get; set; }
        public virtual ChampTeams ChampTeams { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public float Value { get; set; } = 0;
    }
}
