using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ChangePassword
    {
        [Required] public int Id { get; set; }
        [Required] public string OldPassword { get; set; }

        [Required] public string NewPassword { get; set; }

    }
}
