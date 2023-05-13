using API.Controllers;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Service;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Controllers
{
    public class Team
    {
        [Fact]
        public async void GetTeam()
        {
            IUnitOfWork unitOfWork = new UnitOfWork();
            IPhotoService photoService = new PhotoService();
            IMapper mapper;

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfiles());
            });
            mapper = mapperConfig.CreateMapper();

            var teamController = new TeamController(unitOfWork, mapper, photoService);

            var team = await teamController.GetTeam(1);

            if (team == null)
                return;

            Assert.Equal(team.Id, 1);

            Assert.Equal(team.Name, "Барселона");
        }
    }
}
