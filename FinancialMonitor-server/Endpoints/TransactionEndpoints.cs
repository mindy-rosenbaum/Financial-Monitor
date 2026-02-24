using FinancialMonitor.DTOs;
using FinancialMonitor.Filters;
using FinancialMonitor.Interfaces;
using FinancialMonitor.Models;

namespace FinancialMonitor.Endpoints
{
    public static class TransactionEndpoints
    {
        public static void MapTransactionEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/transactions");

            group.MapPost("/", async (TransactionRequest request, ITransactionService service) =>
            {
                if (!Enum.TryParse<TransactionStatus>(request.Status, true, out var status))
                {
                    return Results.BadRequest("Invalid status value.");
                }

                var transaction = new Transaction
                {
                    Id = request.TransactionId == Guid.Empty ? Guid.NewGuid() : request.TransactionId,
                    Amount = request.Amount,
                    Currency = request.Currency,
                    Status = status,
                    Timestamp = request.Timestamp
                };

                var success = await service.ProcessTransactionAsync(transaction);

                return success
                    ? Results.Created($"/api/transactions/{transaction.Id}", transaction)
                    : Results.BadRequest("Failed to process transaction.");
            }).AddEndpointFilter<ValidationFilter<TransactionRequest>>(); 
            
            group.MapGet("/recent", (ITransactionService service) =>
            {
                return Results.Ok(service.GetRecentTransactions());
            });
        }
    }
}
