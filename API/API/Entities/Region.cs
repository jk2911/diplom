using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Region
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Championship> Championships { get; set; }
        public Region()
        {
            Championships = new List<Championship>();
        }
    }
}
