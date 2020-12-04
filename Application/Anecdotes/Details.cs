using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Anecdotes
{
    public class Details
    {
        public class Query : IRequest<AnecdoteDTO>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AnecdoteDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AnecdoteDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var anecdote = await _context.Anecdotes.FindAsync(request.Id);

                if (anecdote == null)
                    throw new RestException(HttpStatusCode.NotFound, new { anecdote = "Not found" });

                var anecdoteToReturn = _mapper.Map<Anecdote, AnecdoteDTO>(anecdote);

                return anecdoteToReturn;
            }
        }
    }
}