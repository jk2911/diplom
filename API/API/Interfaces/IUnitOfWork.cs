namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository User { get; }
        IBet Bet { get; }
        IChampionship Championship { get; }
        IRegion Region { get; }
        ITeam Team { get; }
        IMatch Match { get; }
        ICard Card { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
