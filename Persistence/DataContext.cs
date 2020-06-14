using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Anecdote> Anecdotes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

        }
    }
}