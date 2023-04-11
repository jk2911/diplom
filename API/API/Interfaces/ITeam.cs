using API.Entities;

namespace API.Interfaces
{
    public interface ITeam : IRepository<Team>
    {
        Task<Team> GetTeamByName(string name);
    }
}
