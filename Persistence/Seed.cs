using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Alper Demirci",
                        UserName = "aademirci",
                        Email = "aalperdemirci@gmail.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if(!context.Anecdotes.Any())
            {
                var anecdotes = new List<Anecdote>
                {
                    new Anecdote
                    {
                        Title = "Egzotik Band ve Exorcist Child Konseri",
                        Date = new DateTime(1981, 5, 30),
                        Description = "Türkiye’de 1980 sonrası rock hareketinin ilk konseri olduğu kabul edilir. Exorcist Child, Devil’in o zamanlardaki adıydı.",
                        Category = "konser",
                        City = "Istanbul",
                        Venue = "Fitaş Sineması",
                        UserAnecdotes = new List<UserAnecdote>
                        {
                            new UserAnecdote
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateFaved = DateTime.Now
                            }
                        }
                    },
                    new Anecdote
                    {
                        Title = "Egzotik Band Konseri",
                        Date = new DateTime(1981, 9, 5),
                        Description = "Egzotik Band’in ikinci konseriydi.",
                        Category = "konser",
                        City = "Istanbul",
                        Venue = "Fitaş Sineması",
                        UserAnecdotes = new List<UserAnecdote>
                        {
                            new UserAnecdote
                            {
                                AppUserId = "b",
                                IsOwner = true,
                                DateFaved = DateTime.Now
                            },
                            new UserAnecdote
                            {
                                AppUserId = "a",
                                IsOwner = false,
                                DateFaved = DateTime.Now
                            }
                        }
                    }
                };

                await context.Anecdotes.AddRangeAsync(anecdotes);
                await context.SaveChangesAsync();
            }
        }
    }
}