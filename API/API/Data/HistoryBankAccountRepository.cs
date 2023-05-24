using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HistoryBankAccountRepository : IHistoryBankAccount
    {
        private DataContext _context;
        public HistoryBankAccountRepository(DataContext context)
        {
            _context = context;
        }

        public void Create(HistoryBankAccount item)
        {
            _context.HistoryBankAccounts.Add(item);
        }

        public void Delete(HistoryBankAccount item)
        {
            _context.HistoryBankAccounts.Remove(item);
        }

        public async Task<HistoryBankAccount?> Get(int id)
        {
            return await _context.HistoryBankAccounts.FindAsync(id);
        }

        public async Task<IEnumerable<HistoryBankAccount>> GetAll()
        {
            return await _context.HistoryBankAccounts.
                ToListAsync();
        }

        public void Update(HistoryBankAccount item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
