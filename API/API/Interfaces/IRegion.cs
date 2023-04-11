using API.Entities;

namespace API.Interfaces
{
    public interface IRegion : IRepository<Region>
    {
        Task<Region> GetRegionByName(string name);
    }
}
