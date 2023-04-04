using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RegionRepository : IRegion
    {
        private DataContext _context;
        public RegionRepository(DataContext context)
        {
            _context = context;
        }
        public void Create(Region item)
        {
            _context.Region.Add(item);
        }

        public void Delete(Region item)
        {
            _context.Region.Remove(item);
        }

        public async Task<Region> Get(int id)
        {
            return await _context.Region.FindAsync(id);
        }

        public async Task<IEnumerable<Region>> GetAll()
        {
            return await _context.Region.ToListAsync();
        }

        public void Update(Region item)
        {
           _context.Entry(item).State=EntityState.Modified;
        }
    }
}
