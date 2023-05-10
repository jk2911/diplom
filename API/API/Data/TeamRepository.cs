using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TeamRepository : ITeam
    {
        private DataContext _context;
        public TeamRepository(DataContext context)
        {
            _context = context;
        }
        public void Create(Team item)
        {
            _context.Team.Add(item);
        }

        public void Delete(Team item)
        {
            _context.Team.Remove(item);
        }

        public async Task<Team> Get(int id)
        {
            return await _context.Team.FindAsync(id);
        }

        public async Task<IEnumerable<Team>> GetAll()
        {
            return await _context.Team.ToListAsync();
        }

        public async Task<Team?> GetTeamByName(string name)
        {
            return await _context.Team.FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<Team?> GetTeamInRegionByName(string name, Region region)
        {
            return await _context.Team.
                FirstOrDefaultAsync(team => team.Name == name && team.RegionId == region.Id);
        }

        public void Update(Team item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
        
    }
}
