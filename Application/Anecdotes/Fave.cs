using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Anecdotes
{
    public class Fave
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var anecdote = await _context.Anecdotes.FindAsync(request.Id);

                if (anecdote == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Anecdote = "Could not find anecdote"});
                
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var fave = await _context.UserAnecdotes.SingleOrDefaultAsync(x => x.AnecdoteId == anecdote.Id && x.AppUserId == user.Id);

                if (fave != null)
                    throw new RestException(HttpStatusCode.BadRequest, new {Fave = "Already favourited this anecdote"});

                fave = new UserAnecdote
                {
                    Anecdote = anecdote,
                    AppUser = user,
                    IsOwner = false,
                    DateFaved = DateTime.Now
                };

                _context.UserAnecdotes.Add(fave);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}