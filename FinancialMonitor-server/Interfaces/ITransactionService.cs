using FinancialMonitor.Models;

namespace FinancialMonitor.Interfaces
{
    public interface ITransactionService
    {
        Task<bool> ProcessTransactionAsync(Transaction transaction);
        Task<IEnumerable<Transaction>> GetRecentTransactionsAsync();
    }
}
