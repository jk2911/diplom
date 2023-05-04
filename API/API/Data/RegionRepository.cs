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

        public async Task<int> GetCountMatches(int id)
        {
            int count = 0;

            var date = new DateTime();

            var championships = await _context.Championship.Where(x => x.Id == id).
                ToListAsync();

            if(championships.Count == 0)
                return 0;

            foreach (var championship in championships)
            {
                var matches = await _context.Match.Where(x => x.DateTime.Date == date.Date &&
                x.ChampionshipId == championship.Id).ToListAsync();
                count += matches.Count;
            }
            return count;
        }

        public async Task<Region> GetRegionByName(string name)
        {
#pragma warning disable CS8603 // Возможно, возврат ссылки, допускающей значение NULL.
            return await _context.Region.
                FirstOrDefaultAsync(x => x.Name == name);
#pragma warning restore CS8603 // Возможно, возврат ссылки, допускающей значение NULL.
        }

        public async Task<IEnumerable<Region>> GetRegionsTodaysMatches()
        {
            var date = DateTime.Now;

            var regions = new List<Region>();
            var championships = new List<Championship>();

            var championshipsId = await _context.Match.
                Where(x => x.DateTime.Date == date.Date).
                Select(x => x.ChampionshipId).
                Distinct().
                ToListAsync();

            championshipsId.ForEach(x => championships.Add(_context.Championship.Find(x)));

            var regionsId = championships.
                Select(x => x.Id).
                Distinct().
                ToList();

            regionsId.ForEach(x => regions.Add(_context.Region.Find(x)));

            return regions;
        }

        public void Update(Region item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
