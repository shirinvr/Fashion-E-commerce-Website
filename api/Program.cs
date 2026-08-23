using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using api.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Add controllers
builder.Services.AddControllers();

// Add DbContext with SQL Server connection string
builder.Services.AddDbContext<EcommerceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    // options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<EncryptionService>();

// Register Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

builder.Services.AddScoped<IDynamicService, DynamicService>();
builder.Services.AddScoped<IDynamicRepository, DynamicRepository>();


// ADDED — Read XML API Method Mapping File
var xmlFilePath = Path.Combine(builder.Environment.ContentRootPath, "Config.xml");
XDocument apiMappings = XDocument.Load(xmlFilePath);
builder.Services.AddSingleton(apiMappings);


var app = builder.Build();

// Use CORS
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.MapControllers(); // Map controller endpoints

// Set URL for Swagger to use https://localhost:5001
app.Urls.Add("https://localhost:5001");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
