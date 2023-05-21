using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class BetValue
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public bool? IsConfirm { get; set; } = null;
        public int BetId { get; set; }
        [JsonIgnore]
        public virtual Bet Bet { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserBet> UserBets { get; set; }

        public BetValue()
        {
            this.UserBets = new List<UserBet>();
        }
    }
}
