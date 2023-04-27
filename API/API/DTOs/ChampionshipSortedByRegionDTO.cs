using API.Entities;

namespace API.DTOs
{
    public class ChampionshipSortedByRegionDTO
    {
        public int Id { get; set; }
        public string Region { get; set; }
        public ICollection<ChampionshipDTO> Championships { get; set; }
    }
}
