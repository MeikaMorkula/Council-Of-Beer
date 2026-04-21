using BeerData.Repository;
using BeerLogic.Interface;
using BeerLogic.Mapper;
using BeerLogic.Service;
using BeerLogic.Utility;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:8081",
                "http://localhost:5173",
                "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton(sp =>
{
    var cloudName = builder.Configuration["Cloudinary:CloudName"];
    var apiKey = builder.Configuration["Cloudinary:ApiKey"];
    var apiSecret = builder.Configuration["Cloudinary:ApiSecret"];

    if (string.IsNullOrWhiteSpace(cloudName) ||
        string.IsNullOrWhiteSpace(apiKey) ||
        string.IsNullOrWhiteSpace(apiSecret))
    {
        throw new InvalidOperationException("Cloudinary configuration is missing.");
    }

    var account = new Account(cloudName, apiKey, apiSecret);
    return new Cloudinary(account);
});

builder.Services.AddScoped<CloudinaryHandlerService>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("DefaultConnection is missing or empty.");
}

builder.Services.AddScoped<IDbConnection>(_ => new NpgsqlConnection(connectionString));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // change to true later if you are fully on HTTPS
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["JwtConfig:Issuer"],
        ValidAudience = builder.Configuration["JwtConfig:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JwtConfig:Key"]!)
        ),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

// Repos / services
builder.Services.AddScoped<IUserRepo>(_ => new UserRepo(connectionString));
builder.Services.AddScoped<IBeerRepo>(_ => new BeerRepo(connectionString));
builder.Services.AddScoped<ISocialRepo>(_ => new SocialRepo(connectionString));
builder.Services.AddScoped<Mapper>();
builder.Services.AddScoped<BeerService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<SocialService>();
builder.Services.AddScoped<IPasswordHasher, Bcrypt>();

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapGet("/", () => Results.Content(
    "<h1>BackEnd is running!</h1><a href='/health'>Check health</a>",
    "text/html"
)).AllowAnonymous();

app.MapHealthChecks("/health").AllowAnonymous();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();