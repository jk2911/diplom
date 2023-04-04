using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ChampTeamRepository : IChampTeams
    {
        private DataContext _context;
        public ChampTeamRepository(DataContext context)
        {
            _context = context;
        }
        public void Create(ChampTeams item)
        {
            _context.ChampTeams.Add(item);
        }

        public void Delete(ChampTeams item)
        {
            _context.ChampTeams.Remove(item);
        }

        public async Task<ChampTeams> Get(int id)
        {
            return await _context.ChampTeams.FindAsync(id);
        }

        public async Task<IEnumerable<ChampTeams>> GetAll()
        {
            return await _context.ChampTeams.ToListAsync();
        }

        public void Update(ChampTeams item)
        {
            _context.Entry(item).State=EntityState.Modified;
        }
    }
}
