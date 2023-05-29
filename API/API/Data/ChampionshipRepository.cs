using API.DTOs;
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

            _context.ChampTeams.AddAsync(champTeams);
        }

        public void Create(Championship item)
        {
            _context.Championship.Add(item);
        }

        public void Delete(Championship item)
        {
            var matches = _context.Match.Where(m => m.ChampionshipId == item.Id);

            foreach (var match in matches)
            {
                foreach (var bet in match.Bets)
                {
                    foreach (var betValue in bet.Values)
                    {
                        var userBets = _context.UserBets.
                            Where(ub => ub.BetValueId == betValue.Id);

                        foreach (var userBet in userBets)
                        {
                            var user = userBet.User;

                            if (userBet.IsWin == null)
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
                    }
                }
            }

            _context.Championship.Remove(item);
        }

        public void DeleteTeamFromChampionship(int championshipId, int teamId)
        {
            var champTeam = _context.ChampTeams.
                FirstOrDefault(c=> championshipId == c.ChampionshipId && teamId==c.TeamId);

            _context.ChampTeams.Remove(champTeam);

            var matches = _context.Match.
                Where(m=>m.ChampionshipId==championshipId && (m.HomeId==teamId || m.AwayId==teamId));
            foreach (var match in matches)
            {
                foreach (var bet in match.Bets)
                {
                    foreach (var betValue in bet.Values)
                    {
                        var userBets = _context.UserBets.
                            Where(ub => ub.BetValueId == betValue.Id);

                        foreach (var userBet in userBets)
                        {
                            var user = userBet.User;

                            if (userBet.IsWin == null)
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
                    }
                }

                _context.Match.Remove(match);
            }
        }

        public async Task<Championship> Get(int id)
        {
            return await _context.Championship.FindAsync(id);
        }

        public async Task<IEnumerable<Championship>> GetAll()
        {
            return await _context.Championship.ToListAsync();
        }

        public async Task<Championship?> GetChampionshipInRegionByName(string name, Region region)
        {
            return await _context.Championship.
                FirstOrDefaultAsync(ch => ch.Name == name && ch.RegionId == region.Id);
        }

        public async Task<IEnumerable<Championship>> GetChampionshipsTodaysMatchesByRegion(int regionId)
        {
            var champioships = await _context.Championship.
                Where(x=>x.RegionId == regionId).
                ToListAsync();

            return null;
        }

        public async Task<IEnumerable<Championship>> GetRegionalChampionships(int regionId)
        {
            return await _context.Championship.
                Where(ch => ch.RegionId == regionId).
                ToListAsync();
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
