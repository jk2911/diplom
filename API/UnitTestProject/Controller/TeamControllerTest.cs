using API.Controllers;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace UnitTestProject.Controller
{
    [TestClass]
    public class TeamControllerTest
    {
        [TestMethod]
        public void CreateTeam()
        {
            var unitOfWork = new Mock<IUnitOfWork>();
            var mapper = new Mock<IMapper>();

            TeamController teamController = new TeamController(unitOfWork.Object, mapper.Object);

            TeamDTO teamDTO = new TeamDTO
            {
                Name= "Barcelona",
                Region="Spain"
            };

            var result = teamController.CreateTeam(teamDTO);

            Assert.IsNotNull(result);
        }
    }
}
