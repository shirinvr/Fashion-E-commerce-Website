using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
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

// Register Existing Services
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProduct_categoryService, Product_categoryService>();
builder.Services.AddScoped<IProduct_categoryRepository, Product_categoryRepository>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<IRoleMasterService, RoleMasterService>();
builder.Services.AddScoped<IRoleMasterRepository, RoleMasterRepository>();

// ADDED — Read XML API Method Mapping File
var xmlFilePath = Path.Combine(builder.Environment.ContentRootPath, "Config.xml");
XDocument apiMappings = XDocument.Load(xmlFilePath);
builder.Services.AddSingleton(apiMappings);

// ADDED — Register Dynamic Procedure Services
builder.Services.AddScoped<IDynamicService, DynamicService>();
builder.Services.AddScoped<IDynamicRepository, DynamicRepository>();

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
