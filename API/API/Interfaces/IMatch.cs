﻿using API.Entities;

namespace API.Interfaces
{
    public interface IMatch :IRepository<Match>
    {
        Task<IEnumerable<Match>> GetUpcomingMatches();
        Task<IEnumerable<Match>> GetCalendarOfChampionshipsMatches(int championshipId);
        Task<IEnumerable<Match>> GetChampionshipMatchResults(int championshipId);
    }
}
