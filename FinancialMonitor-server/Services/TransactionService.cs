using FinancialMonitor.Data;
using FinancialMonitor.Hubs;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Models;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace FinancialMonitor.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly FinanceDbContext _context;
        private readonly IHubContext<TransactionHub> _hubContext;
        private static readonly ConcurrentDictionary<Guid, Transaction> _cache = new();

        public TransactionService(FinanceDbContext context, IHubContext<TransactionHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task<bool> ProcessTransactionAsync(Transaction transaction)
        {
            // 1. שמירה בזיכרון ה-RAM (לגישה מיידית)
            _cache.TryAdd(transaction.Id, transaction);

            // 2. שמירה בבסיס הנתונים SQLite
            _context.Transactions.Add(transaction);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                // שליחת עדכון בזמן אמת לכל הלקוחות המחוברים
                await _hubContext.Clients.All.SendAsync("ReceiveTransactionUpdate", transaction);
            }
            return result > 0;
        }

        public IEnumerable<Transaction> GetRecentTransactions()
        {
            // שליפה מהירה מה-RAM ללא פנייה ל-DB
            return _cache.Values.OrderByDescending(t => t.Timestamp).Take(10);
        }
    }

}
