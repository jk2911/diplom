namespace API.DTOs
{
    public class ChampionshipDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPopular { get; set; }
        public IEnumerable<MatchDTO> Matches { get; set; } = new List<MatchDTO>();
    }
}
