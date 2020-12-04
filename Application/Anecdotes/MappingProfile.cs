using AutoMapper;
using Domain;

namespace Application.Anecdotes
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Anecdote, AnecdoteDTO>();
            CreateMap<UserAnecdote, FaveeDTO>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}