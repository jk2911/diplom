using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Coupon
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsUsed { get; set; } = false;
        public int? UserId { get; set; }
        public virtual User User { get; set; }
      
    }
}
