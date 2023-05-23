using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CardRepository : ICard
    {
        private DataContext _context;

        public CardRepository(DataContext context)
        {
            _context = context;
        }
        public void Create(Card item)
        {
           _context.Cards.Add(item);
        }

        public void Delete(Card item)
        {
            _context.Cards.Remove(item);
        }

        public async Task<Card> Get(int id)
        {
            return await _context.Cards.FindAsync(id);
        }

        public async Task<IEnumerable<Card>> GetAll()
        {
            return await _context.Cards.ToListAsync();
        }

        public async Task<IEnumerable<Card>> GetUserCards(int userId)
        {
            return await _context.Cards.
                Where(c => c.UserId == userId).
                ToListAsync();
        }

        public void Update(Card item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
