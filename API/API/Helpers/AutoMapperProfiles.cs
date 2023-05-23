using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles() {

            CreateMap<RegisterDto, User>();

            CreateMap<User, UserDto>();

            CreateMap<CreateTeamDto, Team>();

            CreateMap<Team, TeamDTO>().
                ForMember(x => x.Region, opt => opt.MapFrom(x => x.Region.Name));

            CreateMap<Region, RegionDTO>();

            CreateMap<Championship, ChampionshipDTO>();

            CreateMap<Match, MatchDTO>();

            CreateMap<Championship, UpcomingMatchesDTO>().
                ForMember(x => x.Championship, opt => opt.MapFrom(x => x));

            CreateMap<Region, RegionsUpcomingMatchesDTO>().
                ForMember(x=>x.Region, opt=>opt.MapFrom(x=>x.Name));

            CreateMap<MatchDTO, Match>();

            CreateMap<BetDTO, Bet>();

            CreateMap<BetValueDTO, BetValue>();

            CreateMap<Bet, BetDTO>();

            CreateMap<BetValue, BetValueDTO>();

            CreateMap<CreateCardDTO, Card>();
        }
    }
}
