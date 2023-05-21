﻿using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BetRepository : IBet
    {
        private DataContext _context;
        public BetRepository(DataContext context)
        {
            _context = context;
        }

        public void AddBet(Match match, string name, int count)
        {
            var bet = new Bet
            {
                Name = name,
                MatchId = match.Id,
            };

            _context.Bet.Add(bet);
            _context.SaveChanges();

            var betValues = new List<BetValue>();

            for (int i = 0; i < count; i++)
            {
                _context.BetValue.Add(new BetValue
                {
                    Name = "Исход " + (i + 1),
                    Value = 1f,
                    BetId = bet.Id
                });
            }
        }

        public void Create(Bet item)
        {
            _context.Bet.Add(item);
        }

        public void DefineUserBets(int matchId)
        {
            var match = _context.Match.Find(matchId);

            if (match == null) return;

            foreach(var bet in match.Bets)
            {
                foreach(var betValue in bet.Values)
                {
                    var userBets = _context.UserBets.
                        Where(b => b.BetValueId == betValue.Id);

                    foreach (var userBet in userBets)
                    {
                        var user = _context.User.
                            FirstOrDefault(u => u.Id == userBet.UserId);

                        if (user != null)
                        {
                            if (betValue.IsConfirm == true && userBet.IsWin == null)
                            {
                                user.Money += userBet.Money * userBet.Value;

                                userBet.IsWin = true;
                            }
                            else if (betValue.IsConfirm == false && userBet.IsWin == null)
                            {
                                userBet.IsWin = false;
                            }

                            _context.Entry(userBet).State = EntityState.Modified;
                            _context.Entry(user).State = EntityState.Modified;
                        }
                    }
                }
            }
        }

        public void Delete(Bet bet)
        {
            _context.Bet.Remove(bet);
        }

        public void DoBet(int betId, int userId, float amount)
        {
            var betValue = _context.BetValue.Find(betId);

            if (betValue == null) { return; }

            var user = _context.User.Find(userId);

            if (user == null) { return; }

            var userBet = new UserBet
            {
                UserId = userId,
                BetValueId = betId,
                Money = amount, 
                Value = betValue.Value
            };

            _context.UserBets.Add(userBet);
        }

        public async Task<Bet> Get(int id)
        {
            return await _context.Bet.FindAsync(id);
        }

        public async Task<IEnumerable<Bet>> GetAll()
        {
            return await _context.Bet.ToListAsync();
        }

        public async Task<BetValue> GetBetValue(int id)
        {
            return await _context.BetValue.FindAsync(id);
        }

        public async Task<IEnumerable<UserBet>> GetUserBets(int userId)
        {
            var userBets = await _context.UserBets.
                Where(i=>i.UserId==userId).
                ToListAsync();

            return userBets;
        }

        public async Task<bool> IsOutcomeInMatch(Match match, string name)
        {
            var bet = match.Bets.FirstOrDefault(b => b.Name == name);

            if (bet == null)
            {
                return false;
            }
            return true;
        }

        public void SaveBetsResultMatch(IEnumerable<Bet> bets)
        {
            foreach(var bet in bets)
            {
                foreach (var betValue in bet.Values)
                {
                    _context.Entry(betValue).State = EntityState.Modified;
                }
            }
        }

        public void Update(Bet item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
