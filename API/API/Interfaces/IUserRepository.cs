using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository:IRepository<User>
    {
        Task<bool> UserExists(string phone); 
        Task<User> GetUserByPhone(string phone);
    }
}
