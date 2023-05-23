using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUser:IRepository<User>
    {
        Task<bool> UserExists(string email); 
        Task<User> GetUserByEmail(string email);
        Task<User> CreateAsync(User user);
        void DoBet(int userId, int betId, float amount);
        Task<IEnumerable<HistoryBankAccount>> GetHistoryBankAccounts(int userId);
    }
}
