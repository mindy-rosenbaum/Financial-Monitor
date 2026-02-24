using Microsoft.AspNetCore.SignalR;

namespace FinancialMonitor.Hubs
{
    public class TransactionHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReceiveStatus", "Connected to Real-time Monitor");
            await base.OnConnectedAsync();
        }
    }
}
