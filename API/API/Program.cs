using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using Stripe.BillingPortal;
using System.Configuration;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions { WebRootPath = "images" });

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // указывает, будет ли валидироваться издатель при валидации токена
            ValidateIssuer = true,
            // строка, представляющая издателя
            ValidIssuer = AuthOptions.ISSUER,
            // будет ли валидироваться потребитель токена
            ValidateAudience = true,
            // установка потребителя токена
            ValidAudience = AuthOptions.AUDIENCE,
            // будет ли валидироваться время существования
            ValidateLifetime = true,
            // установка ключа безопасности
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // валидация ключа безопасности
            ValidateIssuerSigningKey = true,
        };
    });

builder.Services.AddTransient<IHashPassword, HashPasswordService>();
builder.Services.AddTransient<ITokenService, API.Service.TokenService>();
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IPhotoService, PhotoService>();
builder.Services.AddTransient<ICreatingBet, CreatingBet>();


builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

var app = builder.Build();

StripeConfiguration.ApiKey = "pk_test_51NARb7Gz5uGo5QlBiaipOfWWZsSEdmBVLCzgIc2egWJnA6ejh0XbglOAKHrjagDkyoFc5rWj6YvuxWOEsjOYakg600sx98j5Ow";

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.UseStaticFiles("/images");

//app.UseCors(builder => builder.AllowAnyOrigin());

app.UseCors(options => options.WithOrigins("http://localhost:3000")//AllowAnyOrigin()
.WithMethods("POST", "GET", "DELETE", "PROPFIND", "PROPPATCH", "COPY", "MOVE", "DELETE", "MKCOL", "LOCK", "UNLOCK", "PUT", "GETLIB", "VERSION-CONTROL", "CHECKIN", "CHECKOUT", "UNCHECKOUT", "REPORT", "UPDATE", "CANCELUPLOAD", "HEAD", "OPTIONS", "FETCH", "POST")
.AllowAnyHeader()
.AllowCredentials());

app.MapControllers();

await app.RunAsync();

