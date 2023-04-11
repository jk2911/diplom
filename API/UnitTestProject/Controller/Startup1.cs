using Microsoft.Owin;
using Owin;
using System;
using System.Threading.Tasks;

[assembly: OwinStartup(typeof(UnitTestProject.Controller.Startup1))]

namespace UnitTestProject.Controller
{
    public class Startup1
    {
        public void Configuration(IAppBuilder app)
        {
            // Дополнительные сведения о настройке приложения см. на странице https://go.microsoft.com/fwlink/?LinkID=316888
        }
    }
}
