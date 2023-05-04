using API.Entities;

namespace API.DTOs
{
    public class RegionsUpcomingMatchesDTO
    {
        public int Id { get; set; }
        public string Region { get; set; }
        public IEnumerable<Championship> Championships { get; set; } = new List<Championship>();
    }
}
