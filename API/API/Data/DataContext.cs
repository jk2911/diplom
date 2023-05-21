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
        public virtual DbSet<UserChampBet> UserChampBets { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer(@"data source=localhost; Initial Catalog=Bet; Integrated Security=False; trustservercertificate=True; MultipleActiveResultSets=True;User Id = bet_user; Password = 12345678");
        }
        public DataContext()
        {
            //AddInfoInDatabase();
            //Spain();
            //Germany();
            //England();
            //Portugal();
            //Denmark();
        }

        public void AddInfoInDatabase()
        {
            Database.EnsureDeletedAsync().Wait();
            Database.EnsureCreatedAsync().Wait();

            IHashPassword hash = new HashPasswordService();

            User user = new User
            {
                Email = "333",
                Password = hash.CreateHash("333"),
                Role="admin"
            };

            User user1 = new User
            {
                Email = "444",
                Password = hash.CreateHash("444"),
                Role = "user",
                Money = 200
            };

            User user2 = new User
            {
                Email = "555",
                Password = hash.CreateHash("555"),
                Role = "bukmeker"
            };

            User.AddAsync(user);
            User.AddAsync(user1);
            User.AddAsync(user2);

            SaveChangesAsync().Wait();

            Region region = new Region
            {
                Name = "Мир",
                isPopular = true
            };

            Region.Add(region);

            SaveChangesAsync().Wait();
        }

        public void Spain()
        {
            Region region = new Region
            {
                Name = "Испания",
                isPopular = true,
                Image = "https://localhost:7167/images/regions/spain.png"
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "Ла лига",
                Region = region,
                IsPopular = true, 
                Image = "https://localhost:7167/images/championships/Laliga.jpg"
            };

            Championship.Add(championship);

            Team team = new Team
            {
                Region = region,
                Name = "Барселона",
                Image = "https://localhost:7167/images/teams/Barcelona-logo-2048x1152.jpg"
            };

            Team team1 = new Team
            {
                Region = region,
                Name = "Реал Мадрид",
                Image = "https://localhost:7167/images/teams/RealMadrid.jpg"
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

            //Тотал 2.5

            bet = new Bet
            {
                Name = "Тотал",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Больше 2.5",
                Value = 2.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Меньше 2.5",
                Value = 1.11f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

         ///

            match = new Match
            {
                Home = team,
                Away = team1,
                HomeGoal = 1,
                AwayGoal = 0,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

            //

            championship = new Championship
            {
                Name = "Сегунда",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            team = new Team
            {
                Region = region,
                Name = "Уэска",
            };

            team1 = new Team
            {
                Region = region,
                Name = "Леванте",
            };

            Team.Add(team);
            Team.Add(team1);

            SaveChangesAsync().Wait();

             cht = new ChampTeams
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

             match = new Match
            {
                Home = team,
                Away = team1,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

             bet = new Bet
            {
                Name = "Исход",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

             betValue = new BetValue
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
        }

        public void Germany()
        {
            Region region = new Region
            {
                Name = "Германия",
                isPopular = true
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "Bundesliga",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);

            Team team = new Team
            {
                Region = region,
                Name = "Bayern Munich",
            };

            Team team1 = new Team
            {
                Region = region,
                Name = "Borussia Dortmund",
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

            ///

            bet = new Bet
            {
                Name = "Тотал",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Больше 2.5",
                Value = 2.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Меньше 2.5",
                Value = 1.11f,
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

            championship = new Championship
            {
                Name = "Bundesliga 2",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            team = new Team
            {
                Region = region,
                Name = "Падерборн",
            };

            team1 = new Team
            {
                Region = region,
                Name = "Санкт-Паули",
            };

            Team.Add(team);
            Team.Add(team1);

            SaveChangesAsync().Wait();

            cht = new ChampTeams
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

            match = new Match
            {
                Home = team,
                Away = team1,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

            bet = new Bet
            {
                Name = "Исход",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
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
        }

        public void England()
        {
            Region region = new Region
            {
                Name = "Англия",
                isPopular = true
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "Премьер-Лига",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);

            Team team = new Team
            {
                Region = region,
                Name = "Манчестер Сити",
            };

            Team team1 = new Team
            {
                Region = region,
                Name = "Челси",
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

            //

            bet = new Bet
            {
                Name = "Тотал",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Больше 2.5",
                Value = 2.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Меньше 2.5",
                Value = 1.11f,
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

            championship = new Championship
            {
                Name = "Чемпионшип",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            team = new Team
            {
                Region = region,
                Name = "Суонси",
            };

            team1 = new Team
            {
                Region = region,
                Name = "Норвич",
            };

            Team.Add(team);
            Team.Add(team1);

            SaveChangesAsync().Wait();

            cht = new ChampTeams
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

            match = new Match
            {
                Home = team,
                Away = team1,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

            bet = new Bet
            {
                Name = "Исход",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
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
        }

        public void Portugal()
        {
            Region region = new Region
            {
                Name = "Португалия",
                isPopular = false
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "Чемпионат Португалии",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);

            Team team = new Team
            {
                Region = region,
                Name = "Бенфика",
            };

            Team team1 = new Team
            {
                Region = region,
                Name = "Порту",
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

            //

            bet = new Bet
            {
                Name = "Тотал",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Больше 2.5",
                Value = 2.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Меньше 2.5",
                Value = 1.11f,
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

            championship = new Championship
            {
                Name = "Вторая лига",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            team = new Team
            {
                Region = region,
                Name = "Марфа",
            };

            team1 = new Team
            {
                Region = region,
                Name = "Тондела",
            };

            Team.Add(team);
            Team.Add(team1);

            SaveChangesAsync().Wait();

            cht = new ChampTeams
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

            match = new Match
            {
                Home = team,
                Away = team1,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

            bet = new Bet
            {
                Name = "Исход",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
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
        }
        public void Denmark()
        {
            Region region = new Region
            {
                Name = "Дания",
                isPopular = false
            };

            Region.Add(region);
            SaveChangesAsync().Wait();

            Championship championship = new Championship
            {
                Name = "Суперлига",
                Region = region,
                IsPopular = true
            };

            Championship.Add(championship);

            Team team = new Team
            {
                Region = region,
                Name = "Копенгаген",
            };

            Team team1 = new Team
            {
                Region = region,
                Name = "Норшелланн",
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

            //

            bet = new Bet
            {
                Name = "Тотал",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Больше 2.5",
                Value = 2.1f,
                Bet = bet
            };

            BetValue.Add(betValue);
            SaveChangesAsync().Wait();

            betValue = new BetValue
            {
                Name = "Меньше 2.5",
                Value = 1.11f,
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

            championship = new Championship
            {
                Name = "Первый дивизион",
                Region = region,
                IsPopular = false
            };

            Championship.Add(championship);
            SaveChangesAsync().Wait();

            team = new Team
            {
                Region = region,
                Name = "Нествед",
            };

            team1 = new Team
            {
                Region = region,
                Name = "Вайле",
            };

            Team.Add(team);
            Team.Add(team1);

            SaveChangesAsync().Wait();

            cht = new ChampTeams
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

            match = new Match
            {
                Home = team,
                Away = team1,
                Championship = championship,
                DateTime = DateTime.Now
            };

            Match.Add(match);
            SaveChangesAsync().Wait();

            bet = new Bet
            {
                Name = "Исход",
                Match = match
            };

            Bet.Add(bet);
            SaveChangesAsync().Wait();

            betValue = new BetValue
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
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Match>().HasOne(a => a.Home).WithMany(a => a.HomeTeams).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Match>().HasOne(a => a.Away).WithMany(a => a.AwayTeams).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChampTeams>().HasOne(a => a.Team).WithMany(a => a.ChampTeams).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
