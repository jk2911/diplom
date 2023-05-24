namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUser User { get; }
        IBet Bet { get; }
        IChampionship Championship { get; }
        IRegion Region { get; }
        ITeam Team { get; }
        IMatch Match { get; }
        ICard Card { get; }
        IHistoryBankAccount History { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
