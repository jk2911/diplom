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
            var championships = item.Championships.
                Select(c=>c.Id).
                ToList();

            foreach(var i in championships)
            {
                var matches = _context.Match.Where(m => m.ChampionshipId == i);

                foreach(var match in matches)
                {
                    foreach(var bet in match.Bets)
                    {
                        foreach(var betValue in bet.Values)
                        {
                            var userBets = _context.UserBets.
                                Where(ub => ub.BetValueId == betValue.Id);

                            foreach(var userBet in userBets)
                            {
                                var user = userBet.User;

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

        public async Task<IEnumerable<Region>> GetAllRegionsSortedByName()
        {
            var regions = await _context.Region.
                OrderBy(x => x.Name).
                ToListAsync();

            regions.ForEach(
                x => x.Championships = x.Championships.OrderBy(x => x.IsPopular).
                     OrderBy(x => x.Name).ToList());

            return regions;
        }

        public async Task<int> GetCountMatches(int id)
        {
            int count = 0;

            var date = new DateTime();

            var championships = await _context.Championship.
                Where(x => x.Id == id).
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

        public async Task<IEnumerable<Region>> GetRegionsUpcomingMatches()
        {
            var date = DateTime.Now;

            var regions = new List<Region>();
            var championships = new List<Championship>();

            var championshipsId = await _context.Match.
                Where(x => x.DateTime.Date == date.Date && x.HomeGoal == null).
                Select(x => x.ChampionshipId).
                Distinct().
                ToListAsync();

            championshipsId.ForEach(x => championships.Add(_context.Championship.Find(x)));

            var regionsId = championships.
                Select(x => x.RegionId).
                Distinct().
                ToList();

            regionsId.ForEach(x => regions.Add(_context.Region.Find(x)));

            regions.ForEach(x => x.Championships = championships.
                Where(y => y.RegionId == x.Id).
                ToList());

            return regions;
        }

        public void Update(Region item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
