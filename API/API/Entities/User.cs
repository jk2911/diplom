﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } = "admin";
    }
}
