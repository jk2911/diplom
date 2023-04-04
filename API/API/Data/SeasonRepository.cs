using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeasonRepository : ISeason
    {
        private DataContext _context;
        public SeasonRepository(DataContext context)
        {
            _context = context;
        }
        public void Create(Season item)
        {
            _context.Season.Add(item);
        }

        public void Delete(Season item)
        {
            _context.Season.Remove(item);
        }

        public async Task<Season> Get(int id)
        {
            return await _context.Season.FindAsync(id);
        }

        public async Task<IEnumerable<Season>> GetAll()
        {
            return await _context.Season.ToListAsync();
        }

        public void Update(Season item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
