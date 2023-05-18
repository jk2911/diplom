using API.Entities;

namespace API.Helpers
{
    public class AllBetValue
    {
        public IEnumerable<Bet> CreateBet()
        {
            var bets = new List<Bet>();
            var values = new List<BetValue>();

            #region 

            values.Add(new BetValue 
            {
                Name = "П1",
                Value = 1f
            });

            values.Add(new BetValue
            {
                Name = "П2",
                Value = 1f
            });

            values.Add(new BetValue
            {
                Name = "Х",
                Value = 1f
            });

            bets.Add(new Bet
            {
                Name = "Исход",
                Values = values.ToList()
            });

            values = new List<BetValue>();

            ////////

            values.Add(new BetValue
            {
                Name = "1Х",
                Value = 1f
            });

            values.Add(new BetValue
            {
                Name = "12",
                Value = 1f
            });

            values.Add(new BetValue
            {
                Name = "Х2",
                Value = 1f
            });

            bets.Add(new Bet
            {
                Name = "Двойной шанс",
                Values = values.ToList()
            });

            values = new List<BetValue>();

            ////////

            values.Add(new BetValue
            {
                Name = "Больше 2.5",
                Value = 1f
            });

            values.Add(new BetValue
            {
                Name = "12",
                Value = 1f
            });

            values.Add(new BetValue
            {
                Name = "Х2",
                Value = 1f
            });

            bets.Add(new Bet
            {
                Name = "Двойной шанс",
                Values = values.ToList()
            });

            values = new List<BetValue>();

            #endregion

            return bets;
        }
    }
}
