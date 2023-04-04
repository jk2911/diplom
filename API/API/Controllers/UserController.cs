using API.Controllers.Base;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController :BaseApiController
    {
        [Authorize(Roles = "admin")]
        [HttpGet("user")]
        public string Get()
        {
            return "admin";
        }
        [Authorize(Roles = "user")]
        [HttpGet("user1")]
        public string Get1()
        {
            return "user";
        }
        [Authorize(Roles = "admin, user")]
        [HttpGet("user2")]
        public string Get2()
        {
            return "admin user";
        }
    }
}
