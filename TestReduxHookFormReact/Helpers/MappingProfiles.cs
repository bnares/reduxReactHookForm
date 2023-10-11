using AutoMapper;
using TestReduxHookFormReact.DTO;
using TestReduxHookFormReact.Entity;

namespace TestReduxHookFormReact.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();
        }
    }
}
