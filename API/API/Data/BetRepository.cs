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

        public void AddBet(Match match, string name, int count)
        {
            var bet = new Bet
            {
                Name = name,
                MatchId = match.Id,
            };

            _context.Bet.Add(bet);
            _context.SaveChanges();

            var betValues = new List<BetValue>();

            for (int i = 0; i < count; i++)
            {
                _context.BetValue.Add(new BetValue
                {
                    Name = "Исход " + (i + 1),
                    Value = 1f,
                    BetId = bet.Id
                });
            }
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

        public async Task<bool> IsOutcomeInMatch(Match match, string name)
        {
            var bet = match.Bets.FirstOrDefault(b=>b.Name==name);
             
            if (bet==null)
            {
                return false;
            }
            return true;
        }

        public void Update(Bet item)
        {
            _context.Entry(item).State= EntityState.Modified;
        }
    }
}
