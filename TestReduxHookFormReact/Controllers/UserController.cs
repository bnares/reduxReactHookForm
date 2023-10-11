using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestReduxHookFormReact.DTO;
using TestReduxHookFormReact.Entity;

namespace TestReduxHookFormReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

       

        [HttpGet(Name ="GetUsers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            var dto = _mapper.Map<List<UserDto>>(users);
            return Ok(dto);
        }

        [HttpGet("{id}",Name ="GetUser")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null) return NotFound();
            return _mapper.Map<UserDto>(user);
        }

        [HttpPost("addUser")]
        public async Task<ActionResult<User>> CreateUser(CreateUserDto dto)
        {
            var user = _mapper.Map<User>(dto);
            _context.Users.Add(user);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return CreatedAtRoute("GetUser", new {Id=user.Id},user);
            }
            return BadRequest(new ProblemDetails { Title="Problem creating new user"});
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> RemoveUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null) return NotFound();
            _context.Users.Remove(user);
            var result = await _context.SaveChangesAsync();
            if (result>0) return Ok(id);
            return BadRequest(new ProblemDetails { Title = "Cant remove that user" });
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(dto.Id);
            if(user == null) return NotFound();
            _mapper.Map(dto,user);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok(user);
            }
            return BadRequest(new ProblemDetails { Title = "Problem updating users" });
        } 


    }


}
