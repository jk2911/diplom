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
            var champTeams = _context.ChampTeams.Where(t => t.TeamId == item.Id);

            var matches = _context.Match.
                Where(m=>m.HomeId ==item.Id || m.AwayId ==item.Id);

            foreach(var i in champTeams)
            {
                _context.ChampTeams.Remove(i);
            }

            foreach(var i in matches)
            {
                _context.Match.Remove(i);
            }

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

        public async Task<IEnumerable<Team>> GetChampionshipTeams(int championshipId)
        {
            var teams = new List<Team>();

            foreach(var item in await _context.ChampTeams.ToListAsync())
            {
                if (item.ChampionshipId == championshipId)
                    teams.Add(item.Team);
            }

            return teams;
        }

        public async Task<IEnumerable<Team>> GetRegionalTeams(int regionId)
        {
            return await _context.Team.
                Where(t => t.RegionId == regionId).
                ToListAsync();
        }

        public async Task<Team?> GetTeamByName(string name)
        {
            return await _context.Team.
                FirstOrDefaultAsync(x => x.Name == name);
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
