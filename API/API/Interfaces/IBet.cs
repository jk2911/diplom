using API.Entities;

namespace API.Interfaces
{
    public interface IBet:IRepository<Bet>
    {
        void AddBet(Match match, string name, int count);
    }
}
