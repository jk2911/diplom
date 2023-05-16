using API.Entities;

namespace API.DTOs
{
    public class UpcomingMatchesDTO
    {
        public ChampionshipDTO Championship { get; set; }
        public IEnumerable<Match> Matches { get; set; } = new List<Match>();
    }
}
