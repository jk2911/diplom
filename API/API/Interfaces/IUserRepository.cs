using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository:IRepository<User>
    {
        Task<bool> UserExists(string email); 
        Task<User> GetUserByPhone(string email);
        Task<User> CreateAsync(User user);
    }
}
