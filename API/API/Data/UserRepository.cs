using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public void Create(User item)
        {
            _context.User.Add(item);
        }

        public void Delete(User item)
        {
            _context.User.Remove(item);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.User.ToListAsync();
        }

        public async Task<User> Get(int id)
        {
            return await _context.User.FindAsync(id);
        }

        public void Update(User item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }

        public async Task<bool> UserExists(string email)
        {
            return await _context.User.AnyAsync(x => x.Email == email);
        }

        public async Task<User> GetUserByPhone(string email)
        {
            return await _context.User.
                FirstOrDefaultAsync(x => x.Email.Equals(email));
        }

        public async Task<User> CreateAsync(User user)
        {
            //var result = _context.User.AddAsync(user);


            //return await _context.User.AddAsync(user);
            return null;
        }
    }
}
