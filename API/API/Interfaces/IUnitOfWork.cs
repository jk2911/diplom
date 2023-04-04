namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository User { get; }
        IBet Bet { get; }
        IChampionship Championship { get; }
        IChampTeams ChampTeams { get; }
        IRegion Region { get; }
        ISeason Season { get; }
        ITeam Team { get; }
        IMatch Match { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
