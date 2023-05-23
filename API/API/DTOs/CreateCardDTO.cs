using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateCardDTO
    {
        [Required] public string Number { get; set; }
        [Required] public int UserId { get; set; }
        [Required] public float Amount { get; set; }
    }
}
