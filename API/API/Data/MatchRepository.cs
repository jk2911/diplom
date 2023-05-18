using API.DTOs;
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

        public async Task<IEnumerable<Match>> GetCalendarOfChampionshipsMatches(int championshipId)
        {
            return await _context.Match.
                Where(m => m.ChampionshipId== championshipId && m.HomeGoal == null).
                OrderBy(m=>m.DateTime).
                ToListAsync();
        }

        public async Task<IEnumerable<Match>> GetCalendarOfTeamsMatches(int teamId)
        {
            return await _context.Match.
                Where(m => (m.HomeId == teamId || m.AwayId == teamId) && m.HomeGoal == null).
                OrderBy(m => m.DateTime).
                ToListAsync();
        }

        public async Task<IEnumerable<Match>> GetChampionshipMatchResults(int championshipId)
        {
            return await _context.Match.
                Where(m => m.ChampionshipId == championshipId && m.HomeGoal != null).
                OrderBy(m => m.DateTime).
                ToListAsync();
        }

        public async Task<IEnumerable<Match>> GetTeamsMatchResults(int teamId)
        {
            return await _context.Match.
                Where(m => (m.HomeId == teamId || m.AwayId == teamId) && m.HomeGoal != null).
                OrderByDescending(m => m.DateTime).
                ToListAsync();
        }

        public async Task<IEnumerable<Match>> GetUpcomingMatches()
        {
            var date = new DateTime();

            return await _context.Match.
                Where(x=>x.DateTime.Date==date.Date).
                ToListAsync();
        }

        public async Task<IEnumerable<Championship>> GetUpcomingMatchesSortedByChampionships()
        {
            var upcomingMatches = new List<Championship>();
            var date = DateTime.Now;

            var matches = await _context.Match.
                Where(m => m.DateTime.Date == date.Date && m.HomeGoal == null).
                ToListAsync();

            var championshipId = matches.
                Select(c => c.ChampionshipId).
                Distinct();

            foreach(int i in championshipId)
            {
                var championship = _context.Championship.Find(i);
                championship.Matches = matches.
                    Where(m => m.ChampionshipId == i).ToList();
                upcomingMatches.Add(championship);
            }

            return upcomingMatches;    
        }

        public void Update(Match item)
        {
            foreach(var bet in item.Bets)
            {
                foreach(var betValue in bet.Values)
                {
                    _context.Entry(betValue).State = EntityState.Modified;
                }

                _context.Entry(bet).State = EntityState.Modified;
            }

            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
