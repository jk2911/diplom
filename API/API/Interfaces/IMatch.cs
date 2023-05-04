using API.Entities;

namespace API.Interfaces
{
    public interface IMatch :IRepository<Match>
    {
        Task<IEnumerable<Match>> GetUpcomingMatches();
    }
}
