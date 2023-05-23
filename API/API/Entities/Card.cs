using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Card
    {
        [Key]
        public int Id { get; set; }

        public string Number { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

    }
}
