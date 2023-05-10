namespace API.Interfaces
{
    public interface IPhotoService
    {
        string AddPhoto(HttpRequest request, string path, IFormFile image);
        void RemovePhoto(string name);
    }
}
