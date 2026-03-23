using BeerData.Repository;
using BeerLogic.Interface;
using BeerLogic.Mapper;
using BeerLogic.Service;
using Npgsql;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("DefaultConnection is missing or empty.");
}

// Register DI services BEFORE builder.Build()
builder.Services.AddScoped<IDbConnection>(_ =>
    new NpgsqlConnection(connectionString));

builder.Services.AddScoped<IBeerRepo, BeerRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();

builder.Services.AddScoped<Mapper>();
builder.Services.AddScoped<BeerService>();
builder.Services.AddScoped<UserService>();
var app = builder.Build();

app.MapGet("/", () => Results.Ok("BackEnd is running!"));
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();