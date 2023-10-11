using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using TestReduxHookFormReact;
using TestReduxHookFormReact.Controllers;
using TestReduxHookFormReact.DTO;
using TestReduxHookFormReact.Entity;
using TestReduxHookFormReact.Entity.Validators;
using TestReduxHookFormReact.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddFluentValidation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IValidator<CreateUserDto>, UserValidator>();
builder.Services.AddScoped<IValidator<UpdateUserDto>, UpdateUserDtoValidator>();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddCors();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    UserSeeder seeder = new UserSeeder(dbContext);
    seeder.Seed();
}
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

app.UseHttpsRedirection();
app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"); //AllowCredentails to allow send cookie data between our api and client
}); //Cors must be above UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
