using FluentValidation;
using TestReduxHookFormReact.DTO;

namespace TestReduxHookFormReact.Entity.Validators
{
    public class UserValidator : AbstractValidator<CreateUserDto>
    {
        public UserValidator()
        {
            
            RuleFor(x => x.Name).Length(1, 100);
            RuleFor(x=>x.Surname).Length(1, 200);
            RuleFor(x => x.Email).EmailAddress();
            RuleFor(x => x.Age).InclusiveBetween(0, 120);
        }
    }
}
