using API.Entities;
using System.Text.Json.Serialization;

namespace API.DTOs
{
    public class BetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? MatchId { get; set; }
        public virtual IEnumerable<BetValueDTO> Values { get; set; } = new List<BetValueDTO>();
    }
}
