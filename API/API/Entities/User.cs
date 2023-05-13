using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } = "user";
        public float Money { get; set; } = 0;

        [JsonIgnore]
        public virtual ICollection<UserBet> UserBets { get; set; }
        [JsonIgnore]
        public virtual ICollection<HistoryBankAccount> HistoryBankAccounts { get; set; }
        public User()
        {
            this.UserBets = new List<UserBet>();
            this.HistoryBankAccounts = new List<HistoryBankAccount>();
        }
    }
}
