using FinancialMonitor.Data;
using FinancialMonitor.Endpoints;
using FinancialMonitor.Hubs;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Services;
using FinancialMonitor.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var allowedOrigins = builder.Configuration.GetValue<string>("AllowedOrigins")?.Split(',') ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var redisConnectionString = builder.Configuration.GetValue<string>("Redis:ConnectionString") ?? "localhost:6379";

builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
})
.AddStackExchangeRedis(redisConnectionString);

builder.Services.AddDistributedMemoryCache();

builder.Services.AddScoped<ITransactionNotificationService, TransactionNotificationService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

builder.Services.AddDbContext<FinanceDbContext>((options) =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddValidatorsFromAssemblyContaining<TransactionRequestValidator>();

var app = builder.Build();
app.UseCors("AllowAll");

app.MapHub<TransactionHub>("/transactionHub");
app.MapGet("/", () => "Financial Monitor API is running!");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FinanceDbContext>();
    db.Database.EnsureCreated();
}
app.MapTransactionEndpoints();
app.Run();
