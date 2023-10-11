using Microsoft.EntityFrameworkCore;
using TestReduxHookFormReact.Entity;

namespace TestReduxHookFormReact
{
    public class UserSeeder
    {
        private readonly AppDbContext _context;

        public UserSeeder(AppDbContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (_context.Database.CanConnect())
            {
                var pendingMigrations = _context.Database.GetPendingMigrations();
                if(pendingMigrations != null && pendingMigrations.Any())
                {
                    _context.Database.Migrate();
                }
                if (!_context.Users.Any())
                {
                    var users = GetUsers();
                    _context.Users.AddRange(users);
                    _context.SaveChanges();
                }
            }
        }


        private IEnumerable<User> GetUsers() { 
            var users = new List<User>()
            {
                new User()
                {
                    Name = "Piotr",
                    Surname = "Ostrouch",
                    Age = 30,
                    Email = "piotr@o2.pl",
                },
                new User()
                {
                    Name = "Ola",
                    Surname="Bolanowska",
                    Age = 20,
                    Email = "ola@o2.pl"
                }
            };
            return users;
        }
    }
}
