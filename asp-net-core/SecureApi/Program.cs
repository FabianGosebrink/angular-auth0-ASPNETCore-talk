using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using SecureApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAllOrigins",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                    });
});

string auth0Audience = builder.Configuration["Auth0:Audience"];
string auth0Domain = builder.Configuration["Auth0:Domain"];
string clientId = builder.Configuration["Auth0:ClientId"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
     .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, c =>
     {
         c.Authority = auth0Domain;
         c.Audience = auth0Audience;
         c.TokenValidationParameters = new TokenValidationParameters
         {
             ValidAudience = auth0Audience,
             ValidIssuer = auth0Domain,
             NameClaimType = ClaimTypes.NameIdentifier
         };
     });

// builder.Services.AddAuthorization();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("access:api", policy =>
    {
        policy.Requirements.Add(new UserApiScopeHandlerRequirement("access:api"));
        policy.RequireClaim("azp", clientId);
        policy.RequireClaim("iss", auth0Domain);
    });

    options.AddPolicy("read:weather", policy => policy.Requirements.Add(new UserApiScopeHandlerRequirement("read:weather")));
});

builder.Services.AddSingleton<IAuthorizationHandler, UserApiScopeHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
