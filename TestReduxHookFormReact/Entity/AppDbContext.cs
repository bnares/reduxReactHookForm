using Microsoft.EntityFrameworkCore;

namespace TestReduxHookFormReact.Entity
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(item =>
            {
                item.Property(x => x.Surname).HasColumnType("varchar(200)");
                item.Property(x => x.Name).HasColumnType("varchar(100)");
                item.Property(x => x.Age).HasColumnType("int");
               
            });
        }
    }
}
