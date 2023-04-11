using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Championship
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int RegionId { get; set; }
        public virtual Region Region { get; set; }
        public bool IsPopular { get; set; } = true;
        [JsonIgnore]
        public virtual ICollection<ChampTeams> ChampTeams { get; set; }
        [JsonIgnore]
        public virtual ICollection<Match> Matches { get; set; }
        public Championship()
        {
            ChampTeams= new List<ChampTeams>();
            Matches = new List<Match>();
        }

    }
}
