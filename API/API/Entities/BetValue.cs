using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class BetValue
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int BetId { get; set; }
        public virtual Bet Bet { get; set; }
    }
}
