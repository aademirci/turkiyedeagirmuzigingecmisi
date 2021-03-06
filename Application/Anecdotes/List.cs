using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Anecdotes
{
    public class List
    {
        public class Query : IRequest<List<AnecdoteDTO>> { }

        public class Handler : IRequestHandler<Query, List<AnecdoteDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AnecdoteDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var anecdotes = await _context.Anecdotes.ToListAsync();

                return _mapper.Map<List<Anecdote>, List<AnecdoteDTO>>(anecdotes);
            }
        }
    }
}