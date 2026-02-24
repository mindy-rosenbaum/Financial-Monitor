using FinancialMonitor.Data;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Models;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FinancialMonitor.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly FinanceDbContext _context;
        private readonly ITransactionNotificationService _notificationService;
        private readonly IDistributedCache _cache;
        private const string CacheKey = "RecentTransactions";

        public TransactionService(FinanceDbContext context, ITransactionNotificationService notificationService, IDistributedCache cache)
        {
            _context = context;
            _notificationService = notificationService;
            _cache = cache;
        }

        public async Task<bool> ProcessTransactionAsync(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                await _cache.RemoveAsync(CacheKey);
                await _notificationService.NotifyNewTransactionAsync(transaction);
            }
            return result > 0;
        }

        public async Task<IEnumerable<Transaction>> GetRecentTransactionsAsync()
        {
            var cachedData = await _cache.GetStringAsync(CacheKey);

            if (!string.IsNullOrEmpty(cachedData))
            {
                return JsonSerializer.Deserialize<List<Transaction>>(cachedData) ?? new List<Transaction>();
            }

            var transactions = await _context.Transactions
                .OrderByDescending(t => t.Timestamp)
                .Take(10)
                .ToListAsync();

            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5) 
            };

           await _cache.SetStringAsync(CacheKey, JsonSerializer.Serialize(transactions), options);

            return transactions;
        }
    }
}
