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
        policy.WithOrigins("http://localhost:5173") // הכתובת של הריאקט
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // קריטי ל-SignalR 
    });
});

// 1. הוספת SignalR למערכת
builder.Services.AddSignalR(options => {
    options.EnableDetailedErrors = true; // זה ייתן לנו פירוט בשגיאות
});
// 2. רישום ה-Service שלנו (Scoped כי הוא משתמש ב-DbContext)
builder.Services.AddScoped<ITransactionService, TransactionService>();

// הגדרת SQLite
builder.Services.AddDbContext<FinanceDbContext>((options) =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// רישום אוטומטי של כל ה-Validators שנמצאים ב-Assembly
builder.Services.AddValidatorsFromAssemblyContaining<TransactionRequestValidator>();

var app = builder.Build();
app.UseCors();

// 3. הגדרת ה"נתיב" של ה-Hub (כאן הדפדפן יתחבר)
app.MapHub<TransactionHub>("/transactionHub");
app.MapGet("/", () => "Financial Monitor API is running!");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FinanceDbContext>();
    db.Database.EnsureCreated();
}
app.MapTransactionEndpoints();
app.Run();
