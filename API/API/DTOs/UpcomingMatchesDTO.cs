namespace API.DTOs
{
    public class UpcomingMatchesDTO
    {
        public int Id { get; set; }
        public string Region { get; set; }
        public IEnumerable<ChampionshipDTO> Championships { get; set; } = new List<ChampionshipDTO>();
    }
}
