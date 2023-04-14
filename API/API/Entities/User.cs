﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public virtual ICollection<UserBet> UserBets { get; set; }
        public User()
        {
            this.UserBets = new List<UserBet>();
        }
    }
}
