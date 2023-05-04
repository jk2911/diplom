using API.Entities;
using API.Interfaces;
using API.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Team> Team { get; set; }
        public virtual DbSet<Championship> Championship { get; set; }
        public virtual DbSet<ChampTeams> ChampTeams { get; set; }
        public virtual DbSet<Bet> Bet { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<Match> Match { get; set; }
        public virtual DbSet<MatchStatistic> MatchStatistic { get; set; }
        public virtual DbSet<BetValue> BetValue { get; set; }
        public virtual DbSet<UserBet> UserBets { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer(@"data source=localhost; Initial Catalog=Bet; Integrated Security=False; trustservercertificate=True; MultipleActiveResultSets=True;User Id = bet_user; Password = 12345678");
        }
        public DataContext()
        {
            AddInfoInDatabase();
        }

        public void AddInfoInDatabase()
        {
            Database.EnsureDeletedAsync().Wait();
            Database.EnsureCreatedAsync().Wait();

            IHashPassword hash = new HashPasswordService();

            User user = new User
            {
                Email = "333",
                Password = hash.CreateHash("333")
            };

            User user1 = new User
            {
                Email = "444",
                Password = hash.CreateHash("444"),
                Role = "user"
            };

            User.AddAsync(user);
            User.AddAsync(user1);

            SaveChangesAsync().Wait();

            Region region = new Region
            {
                Name = "Мир",
                isPopular = false
            };

            Region.Add(region);

            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Испания",
                isPopular = true
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "La Liga",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);

            Team team = new Team
            {
                Region = region,
                Name = "Barcelona",
            };

            Team team1 = new Team
            {
                Region = region,
                Name = "Real Madrid",
            };

            Team.Add(team);
            Team.Add(team1);

            SaveChangesAsync().Wait();

            championship = new Championship
            {
                Name = "Сегунда",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            ChampTeams cht = new ChampTeams
            {
                Championship = championship,
                Team = team,
            };

            ChampTeams.Add(cht);

            SaveChangesAsync().Wait();

            cht = new ChampTeams
            {
                Championship = championship,
                Team = team1,
            };

            ChampTeams.Add(cht);

            SaveChangesAsync().Wait();

            Match match = new Match
            {
                Home = team,
                Away = team1,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

            Bet bet = new Bet
            {
                Name = "Исход",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            BetValue betValue = new BetValue
            {
                Name = "П1",
                Value = 1.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "П2",
                Value = 2.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "X",
                Value = 1.6f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            /////

            bet = new Bet
            {
                Name = "Двойной шанс",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "1X",
                Value = 1.34f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "12",
                Value = 1.37f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "X2",
                Value = 1.67f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Англия",
                isPopular = true,
            };

            Region.Add(region);

            championship = new Championship
            {
                Name = "Премьер-лига",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            championship = new Championship
            {
                Name = "Чемпионшип",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Германия",
                isPopular = false,
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            championship = new Championship
            {
                Name = "Бундеслига",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Франция",
                isPopular = true
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            championship = new Championship
            {
                Name = "Лига 1",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Италия",
                isPopular = false
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            championship = new Championship
            {
                Name = "Серия А",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Португалия",
                isPopular = true
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Match>().HasOne(a => a.Home).WithMany(a => a.HomeTeams).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Match>().HasOne(a => a.Away).WithMany(a => a.AwayTeams).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChampTeams>().HasOne(a => a.Team).WithMany(a => a.ChampTeams).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
