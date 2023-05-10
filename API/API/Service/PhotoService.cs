using API.Entities;
using API.Interfaces;
using Azure.Core;
using System.IO;

namespace API.Service
{
    public class PhotoService : IPhotoService
    {
        public string AddPhoto(HttpRequest request, string path, IFormFile image)
        {
            using (var stream = new FileStream(path, FileMode.Create))
            {
                image.CopyTo(stream);
            }
            return request.Scheme + "://" + request.Host.ToUriComponent() + "/" + path;
        }

        public void RemovePhoto(string name)
        {
            throw new NotImplementedException();
        }
    }
}
