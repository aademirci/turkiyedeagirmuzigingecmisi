using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Anecdotes
{
    public class Delete
    {
        public class Command : IRequest
                {
                    public int Id { get; set; }
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
                            throw new Exception("Could not find anecdote");

                        _context.Remove(anecdote);

                        var success = await _context.SaveChangesAsync() > 0;
        
                        if (success) return Unit.Value;
        
                        throw new Exception("Problem saving changes"); 
                    }
                }
    }
}