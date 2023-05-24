using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context = new DataContext();
        public UnitOfWork() { }

        public IUser User => new UserRepository(_context);

        public IBet Bet => new BetRepository(_context);

        public IChampionship Championship => new ChampionshipRepository(_context);

        public IRegion Region => new RegionRepository(_context);

        public ITeam Team => new TeamRepository(_context);

        public IMatch Match => new MatchRepository(_context);

        public ICard Card => new CardRepository(_context);
        public IHistoryBankAccount History => new HistoryBankAccountRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
