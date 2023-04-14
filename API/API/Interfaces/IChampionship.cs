using API.Entities;

namespace API.Interfaces
{
    public interface IChampionship : IRepository<Championship>
    {
        Task<bool> TeamExistsInChampionship(int championshipId, int teamId);
        void AddTeamInChampionship(int championshipId, int teamId);
    }
}
