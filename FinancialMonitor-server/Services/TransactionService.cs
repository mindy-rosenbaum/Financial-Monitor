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
            _cache.TryAdd(transaction.Id, transaction);

            _context.Transactions.Add(transaction);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                await _hubContext.Clients.All.SendAsync("ReceiveTransactionUpdate", transaction);
            }
            return result > 0;
        }

        public IEnumerable<Transaction> GetRecentTransactions()
        {
            return _cache.Values.OrderByDescending(t => t.Timestamp).Take(10);
        }
    }
}
