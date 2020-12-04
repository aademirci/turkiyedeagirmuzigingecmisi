using System;

namespace Domain
{
    public class UserAnecdote
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AnecdoteId { get; set; }
        public virtual Anecdote Anecdote { get; set; }
        public DateTime DateFaved { get; set; }
        public bool IsOwner { get; set; }
    }
}