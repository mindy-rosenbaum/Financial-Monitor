using FinancialMonitor.Models;

namespace FinancialMonitor.Interfaces
{
    public interface ITransactionService
    {
        Task<bool> ProcessTransactionAsync(Transaction transaction);
        IEnumerable<Transaction> GetRecentTransactions();
    }
}
