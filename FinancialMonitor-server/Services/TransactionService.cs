using FinancialMonitor.Data;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Models;
using System.Collections.Concurrent;

namespace FinancialMonitor.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly FinanceDbContext _context;
        private readonly ITransactionNotificationService _notificationService;
        private static readonly ConcurrentDictionary<Guid, Transaction> _cache = new();

        public TransactionService(FinanceDbContext context, ITransactionNotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<bool> ProcessTransactionAsync(Transaction transaction)
        {
            _cache.TryAdd(transaction.Id, transaction);

            _context.Transactions.Add(transaction);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                await _notificationService.NotifyNewTransactionAsync(transaction);
            }
            return result > 0;
        }

        public IEnumerable<Transaction> GetRecentTransactions()
        {
            return _cache.Values.OrderByDescending(t => t.Timestamp).Take(10);
        }
    }
}
