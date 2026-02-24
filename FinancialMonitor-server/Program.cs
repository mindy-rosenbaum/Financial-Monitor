using FinancialMonitor.Data;
using FinancialMonitor.Endpoints;
using FinancialMonitor.Hubs;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Models;
using FinancialMonitor.Services;
using FinancialMonitor.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); 
    });
});

builder.Services.AddSignalR(options => {
    options.EnableDetailedErrors = true; 
});
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
