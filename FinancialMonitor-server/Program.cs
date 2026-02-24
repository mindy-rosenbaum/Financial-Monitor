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
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});
builder.Services.AddDistributedMemoryCache();

builder.Services.AddScoped<ITransactionNotificationService, TransactionNotificationService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

builder.Services.AddDbContext<FinanceDbContext>((options) =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddValidatorsFromAssemblyContaining<TransactionRequestValidator>();

var app = builder.Build();
app.UseCors();

app.MapHub<TransactionHub>("/transactionHub");
app.MapGet("/", () => "Financial Monitor API is running!");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FinanceDbContext>();
    db.Database.EnsureCreated();
}
app.MapTransactionEndpoints();
app.Run();
