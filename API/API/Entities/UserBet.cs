using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class UserBet
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int BetValueId { get; set; }
        public virtual BetValue BetValue { get; set; }
        public bool? IsWin { get; set; }
        public string Match { get; set; } = "";
        public float Value { get; set; }
        public float Money { get; set; }
    }
}
