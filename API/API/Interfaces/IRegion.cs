using API.Entities;

namespace API.Interfaces
{
    public interface IRegion : IRepository<Region>
    {
        Task<Region> GetRegionByName(string name);
        Task<IEnumerable<Region>> GetRegionsUpcomingMatches();
        Task<int> GetCountMatches(int id);
        Task<IEnumerable<Region>> GetAllRegionsSortedByName();
    }
}
