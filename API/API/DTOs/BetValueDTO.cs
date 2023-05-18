using API.Entities;
using System.Text.Json.Serialization;

namespace API.DTOs
{
    public class BetValueDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public int BetId { get; set; }
    }
}
