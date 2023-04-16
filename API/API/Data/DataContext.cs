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
            //AddInfoInDatabase();
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
                Name = "Мир"
            };

            Region.Add(region);

            SaveChangesAsync().Wait();

            region = new Region
            {
                Name = "Испания"
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "La Liga",
                Region = region,
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
                Championship = championship
            };

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
