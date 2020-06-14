using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Anecdotes
{
    public class Details
    {
        public class Query : IRequest<Anecdote>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Anecdote>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Anecdote> Handle(Query request, CancellationToken cancellationToken)
            {
                var anecdote = await _context.Anecdotes.FindAsync(request.Id);

                return anecdote;
            }
        }
    }
}