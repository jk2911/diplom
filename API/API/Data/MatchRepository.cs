using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MatchRepository : IMatch
    {
        private DataContext _context;
        public MatchRepository(DataContext context)
        {
            _context = context;
        }

        public void Create(Match item)
        {
            _context.Match.Add(item);
        }

        public void Delete(Match item)
        {
            _context.Match.Remove(item);
        }

        public async Task<Match> Get(int id)
        {
            return await _context.Match.FindAsync(id);
        }

        public async Task<IEnumerable<Match>> GetAll()
        {
            return await _context.Match.ToListAsync();
        }

        public async Task<IEnumerable<Match>> GetUpcomingMatches()
        {
            var date = new DateTime();

            return await _context.Match.
                Where(x=>x.DateTime.Date==date.Date).
                ToListAsync();
        }

        public void Update(Match item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
