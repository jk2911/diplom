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

            CreateMap<Region, UpcomingMatchesDTO>().
                ForMember(x=>x.Region, opt=>opt.MapFrom(x=>x.Name));
        }
    }
}
