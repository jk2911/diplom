using API.Controllers;
using API.Data;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Moq;

namespace TestProject1
{
    public class UnitTest1
    {
        [Fact]
        public async void CreateTeam()
        {
            IUnitOfWork unitOfWork = new UnitOfWork();

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfiles());
            });
            IMapper mapper = mapperConfig.CreateMapper();

            TeamController teamController = new TeamController(unitOfWork, mapper);

            CreateTeamDto teamDTO = new CreateTeamDto
            {
                Name = "Bayern Munchen"
            };

            var result = await teamController.CreateTeam(teamDTO);

            var team = result.Value;

            Assert.Equal(team.Name, "Bayern Munchen");
        }
    }
}