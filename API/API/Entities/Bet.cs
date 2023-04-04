using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Bet
    {
        [Key]
        public int Id { get; set; }
        public float P1 { get; set; }
        public float P2 { get; set; }



    }
}
