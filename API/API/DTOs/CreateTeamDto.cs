using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateTeamDto
    {
        [Required] public string Name { get; set; }
        [Required] public int RegionId { get; set; } = 0;
    }
}
