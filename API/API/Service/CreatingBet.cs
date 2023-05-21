using API.Entities;
using API.Interfaces;
using System.Text.RegularExpressions;

namespace API.Service
{
    public class CreatingBet : ICreatingBet
    {
        public ICollection<Bet> CreateBet()
        {
            var bets = new List<Bet>();

            Bet bet = new Bet
            {
                Name = "Исход",
                Values = new List<BetValue>()
            };

            BetValue betValue = new BetValue
            {
                Name = "П1",
                Value = 1f
            };

            bet.Values.Add(betValue);

            betValue = new BetValue
            {
                Name = "П2",
                Value = 1f,
            };

            bet.Values.Add(betValue);

            betValue = new BetValue
            {
                Name = "X",
                Value = 1f,
            };

            bet.Values.Add(betValue);

            bets.Add(bet);

            bet = new Bet
            {
                Name = "Двойной шанс",
                Values = new List<BetValue>()
            };

            betValue = new BetValue
            {
                Name = "1X",
                Value = 1f
            };

            bet.Values.Add(betValue);

            betValue = new BetValue
            {
                Name = "12",
                Value = 1f
            };

            bet.Values.Add(betValue);

            betValue = new BetValue
            {
                Name = "X2",
                Value = 1f
            };

            bet.Values.Add(betValue);

            bets.Add(bet);

            bet = new Bet
            {
                Name = "Тотал",
                Values = new List<BetValue>()
            };

            betValue = new BetValue
            {
                Name = "Больше 2.5",
                Value = 1f
            };

            bet.Values.Add(betValue);

            betValue = new BetValue
            {
                Name = "Меньше 2.5",
                Value = 1f
            };

            bet.Values.Add(betValue);

            bets.Add(bet);

            return bets;
        }
    }
}
