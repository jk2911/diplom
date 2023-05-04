using API.Entities;

namespace API.Interfaces
{
    public interface IRegion : IRepository<Region>
    {
        Task<Region> GetRegionByName(string name);
        Task<IEnumerable<Region>> GetRegionsTodaysMatches();
        Task<int> GetCountMatches(int id);
    }
}
