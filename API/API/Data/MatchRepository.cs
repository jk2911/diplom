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
            var bets = item.Bets.ToList();

            _context.Match.Add(item);

            foreach(var bet in bets)
            {
                var betValues = bet.Values.ToList();

                bet.MatchId = item.Id;

                _context.Bet.Add(bet);

                foreach(var i in betValues){
                    i.BetId = bet.Id;

                    _context.BetValue.Add(i);
                }
            }
        }

        public void Delete(Match item)
        {
            foreach(var bet in item.Bets)
            {
                foreach(var betValue in bet.Values)
                {
                    var userBets = _context.UserBets.Where(ub => ub.BetValueId == betValue.Id).
                        ToList();

                    foreach (var userBet in userBets)
                    {
                        var user = _context.User.Find(userBet.UserId);

                        if (user != null && userBet.IsWin == null)
                        {
                            user.Money += userBet.Money;

                            HistoryBankAccount history = new HistoryBankAccount()
                            {
                                Status = "Удаление матча",
                                Money = userBet.Money,
                                Date = DateTime.Now,
                                User = user
                            };

                            _context.HistoryBankAccounts.Add(history);

                            _context.Entry(user).State = EntityState.Modified;
                        }

                    }

                    _context.BetValue.Remove(betValue);
                }

                _context.Bet.Remove(bet);
            }

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
            var date = DateTime.Now;
            var tomorrow = DateTime.Now.AddDays(1);

            var matches = await _context.Match.
                Where(m => (m.DateTime.Date == date.Date || m.DateTime.Date == tomorrow.Date) && m.HomeGoal == null).
                ToListAsync();

            return matches;
        }

        public async Task<IEnumerable<Championship>> GetUpcomingMatchesSortedByChampionships()
        {
            var upcomingMatches = new List<Championship>();
            var date = DateTime.Now;
            var tomorrow = DateTime.Now.AddDays(1);

            var matches = await _context.Match.
                Where(m => (m.DateTime.Date == date.Date || m.DateTime.Date == tomorrow.Date) && m.HomeGoal == null).
                ToListAsync();

            var championshipId = matches.
                Select(c => c.ChampionshipId).
                Distinct();

            foreach(int i in championshipId)
            {
                var championship = _context.Championship.Find(i);

                championship.Matches = null;

                championship.Matches = matches.
                    Where(m => m.ChampionshipId == i).
                    ToList();

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
