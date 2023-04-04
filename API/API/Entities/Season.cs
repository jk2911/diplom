using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Season
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<ChampTeams> ChampTeams { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        public Season()
        {
            ChampTeams = new List<ChampTeams>();
            Matches = new List<Match>();
        }
    }
}
