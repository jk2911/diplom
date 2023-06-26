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
        public virtual DbSet<BetValue> BetValue { get; set; }
        public virtual DbSet<UserBet> UserBets { get; set; }
        public virtual DbSet<HistoryBankAccount> HistoryBankAccounts { get; set; }
        public virtual DbSet<Card> Cards { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer(@"data source=localhost; Initial Catalog=Bet; Integrated Security=False; trustservercertificate=True; MultipleActiveResultSets=True;User Id = bet_user; Password = 12345678");
        }
        public DataContext()
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Match>().HasOne(a => a.Home).WithMany(a => a.HomeTeams).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Match>().HasOne(a => a.Away).WithMany(a => a.AwayTeams).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChampTeams>().HasOne(a => a.Team).WithMany(a => a.ChampTeams).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
