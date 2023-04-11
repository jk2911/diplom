using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class TeamDTO
    {
        [Required] public int Id { get; set; }
        [Required] public string Name { get; set; }
        [Required] public int? RegionId { get; set; }
        [Required] public string Region { get; set; }
    }
}
