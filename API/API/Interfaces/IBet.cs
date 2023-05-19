using API.Entities;

namespace API.Interfaces
{
    public interface IBet:IRepository<Bet>
    {
        void AddBet(Match match, string name, int count);
        Task<bool> IsOutcomeInMatch(Match match, string name);
        Task<BetValue> GetBetValue(int id);
        void DoBet(int betId, int userId, float amount);
        Task<IEnumerable<UserBet>> GetUserBets(int userId);
    }
}
