using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Anecdote> Anecdotes { get; set; }
        public DbSet<UserAnecdote> UserAnecdotes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserAnecdote>(x => x.HasKey(ua => new {ua.AppUserId, ua.AnecdoteId}));

            builder.Entity<UserAnecdote>().HasOne(u => u.AppUser).WithMany(a => a.UserAnecdotes).HasForeignKey(u => u.AppUserId);
            builder.Entity<UserAnecdote>().HasOne(a => a.Anecdote).WithMany(u => u.UserAnecdotes).HasForeignKey(a => a.AnecdoteId);
        }
    }
}