using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ChampionshipRepository : IChampionship
    {
        private DataContext _context;
        public ChampionshipRepository(DataContext context)
        {
            _context = context;
        }

        public void AddTeamInChampionship(int championshipId, int teamId)
        {
            var champTeams = new ChampTeams
            {
                ChampionshipId = championshipId,
                TeamId = teamId
            };

            _context.ChampTeams.Add(champTeams);

            _context.SaveChangesAsync().Wait();
        }

        public void Create(Championship item)
        {
            _context.Championship.Add(item);
        }

        public void Delete(Championship item)
        {
            _context.Championship.Remove(item);
        }

        public async Task<Championship> Get(int id)
        {
            return await _context.Championship.FindAsync(id);
        }

        public async Task<IEnumerable<Championship>> GetAll()
        {
            return await _context.Championship.ToListAsync();
        }

        public async Task<bool> TeamExistsInChampionship(int championshipId, int teamId)
        {
            var champTeams = await _context.ChampTeams.
                FirstOrDefaultAsync(x => x.TeamId == teamId && x.ChampionshipId == championshipId);

            if (champTeams != null) return true;

            return false;
        }

        public void Update(Championship item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
