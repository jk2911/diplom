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

        public async Task<Region> GetRegionByName(string name)
        {
#pragma warning disable CS8603 // Возможно, возврат ссылки, допускающей значение NULL.
            return await _context.Region.
                FirstOrDefaultAsync(x => x.Name == name);
#pragma warning restore CS8603 // Возможно, возврат ссылки, допускающей значение NULL.
        }

        public void Update(Region item)
        {
           _context.Entry(item).State=EntityState.Modified;
        }
    }
}
