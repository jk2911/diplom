using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Team
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }    
        public string Region { get; set; }
        public virtual ICollection<ChampTeams> ChampTeams { get; set; } 
        public virtual ICollection<Match> HomeTeams { get; set; }
        public virtual ICollection<Match> AwayTeams { get; set; }
        public Team()
        {
            ChampTeams= new List<ChampTeams>();
            HomeTeams= new List<Match>();
            AwayTeams= new List<Match>();
        }

    }
}
