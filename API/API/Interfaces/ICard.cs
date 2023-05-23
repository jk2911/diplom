using API.Entities;

namespace API.Interfaces
{
    public interface ICard : IRepository<Card>
    {
        Task<IEnumerable<Card>> GetUserCards(int userId);
    }
}