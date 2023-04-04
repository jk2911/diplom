using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BetRepository : IBet
    {
        private DataContext _context;
        public BetRepository(DataContext context)
        {
            _context = context;
        }

        public void Create(Bet item)
        {
            _context.Bet.Add(item);
        }

        public void Delete(Bet bet)
        {
            _context.Bet.Remove(bet);
        }

        public async Task<Bet> Get(int id)
        {
            return await _context.Bet.FindAsync(id);
        }

        public async Task<IEnumerable<Bet>> GetAll()
        {
            return await _context.Bet.ToListAsync();
        }

        public void Update(Bet item)
        {
            _context.Entry(item).State= EntityState.Modified;
        }
    }
}
