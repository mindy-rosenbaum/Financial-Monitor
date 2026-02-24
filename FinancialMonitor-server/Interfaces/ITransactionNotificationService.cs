using FinancialMonitor.Models;

namespace FinancialMonitor.Interfaces
{
    public interface ITransactionNotificationService
    {
        Task NotifyNewTransactionAsync(Transaction transaction);
    }
}
