using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Region
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isPopular { get; set; } = false;
        [JsonIgnore]
        public virtual ICollection<Championship> Championships { get; set; }
        [JsonIgnore]
        public virtual ICollection<Team> Teams { get; set; }
        public Region()
        {
            Championships = new List<Championship>();
            Teams = new List<Team>();
        }
    }
}
