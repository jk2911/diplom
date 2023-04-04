using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserDto
    {

        [Required]
        public string Phone { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
