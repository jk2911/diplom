using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository:IRepository<User>
    {
        Task<bool> UserExists(string email); 
        Task<User> GetUserByEmail(string email);
        Task<User> CreateAsync(User user);
        void DoBet(int userId, float amount);
        Task<IEnumerable<HistoryBankAccount>> GetHistoryBankAccounts(int userId);
    }
}
