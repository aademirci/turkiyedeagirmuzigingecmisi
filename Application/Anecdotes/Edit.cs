using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Anecdotes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var anecdote = await _context.Anecdotes.FindAsync(request.Id);

                if (anecdote == null)
                    throw new RestException(HttpStatusCode.NotFound, new {anecdote = "Not found"});

                anecdote.Title = request.Title ?? anecdote.Title;
                anecdote.Description = request.Description ?? anecdote.Description;
                anecdote.Category = request.Category ?? anecdote.Category;
                anecdote.Date = request.Date ?? anecdote.Date;
                anecdote.City = request.City ?? anecdote.City;
                anecdote.Venue = request.Venue ?? anecdote.Venue;
                

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}