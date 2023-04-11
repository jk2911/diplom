using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserDto
    {
        [Required] public int Id { get; set; }

        [Required] public string Email { get; set; }
        [Required] public string Token { get; set; }
        [Required] public string Role { get; set; }
    }
}
