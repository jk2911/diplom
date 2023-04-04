using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Championship
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int RegionId { get; set; }
        public virtual Region Region { get; set; }
        public virtual ICollection<ChampTeams> ChampTeams { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        public Championship()
        {
            ChampTeams= new List<ChampTeams>();
            Matches = new List<Match>();
        }

    }
}
