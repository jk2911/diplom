using API.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace API.Service
{
    public class HashPasswordService : IHashPassword    
    {
        public string CreateHash(string password)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(password));

            return Convert.ToBase64String(hash);
        }
    }
}
