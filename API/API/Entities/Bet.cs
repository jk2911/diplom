using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Bet
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int MatchId { get; set; }
        public virtual Match Match { get; set; }
        public virtual ICollection<BetValue> Values { get; set; }
        public Bet()
        {
            Values = new List<BetValue>();
        }

    }
}
