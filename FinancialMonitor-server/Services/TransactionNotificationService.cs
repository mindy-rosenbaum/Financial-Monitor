using FinancialMonitor.Hubs;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Models;
using Microsoft.AspNetCore.SignalR;

namespace FinancialMonitor.Services
{
    public class TransactionNotificationService : ITransactionNotificationService
    {
        private readonly IHubContext<TransactionHub> _hubContext;

        public TransactionNotificationService(IHubContext<TransactionHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifyNewTransactionAsync(Transaction transaction)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveTransactionUpdate", transaction);
        }
    }
}
