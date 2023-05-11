using API.Entities;

namespace API.Interfaces
{
    public interface ITeam : IRepository<Team>
    {
        Task<Team?> GetTeamByName(string name);
        Task<Team?> GetTeamInRegionByName(string name, Region region);
        Task<IEnumerable<Team>> GetRegionalTeams(int regionId);
        Task<IEnumerable<Team>> GetChampionshipTeams(int championshipId);
    }
}
