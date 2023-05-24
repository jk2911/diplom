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
        //public bool isBlocked { get; set; } = false;

        [JsonIgnore]
        public virtual ICollection<UserBet> UserBets { get; set; }
        [JsonIgnore]
        public virtual ICollection<HistoryBankAccount> HistoryBankAccounts { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserChampBet> UserChampBets { get; set; }
        public virtual ICollection<Card> Cards { get; set; }
        public User()
        {
            UserBets = new List<UserBet>();
            HistoryBankAccounts = new List<HistoryBankAccount>();
            UserChampBets = new List<UserChampBet>();
            Cards = new List<Card>();
        }
    }
}
