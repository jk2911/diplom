using API.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Services
{
    public class HashPassword
    {
        [Fact]
        public void ShouldThrowInvalidPassword()
        {
            var password = string.Empty;

            var hashPassword = new HashPasswordService();

            Assert.Throws<Exception>(() => hashPassword.CreateHash(password));

        }
    }
}
