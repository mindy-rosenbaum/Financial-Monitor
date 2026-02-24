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

            group.MapPost("/", CreateTransaction)
                 .AddEndpointFilter<ValidationFilter<TransactionRequest>>();

            group.MapGet("/recent", GetRecentTransactions);
        }
        private static async Task<IResult> CreateTransaction(
         TransactionRequest request,
         ITransactionService service)
        {
            if (!Enum.TryParse<TransactionStatus>(request.Status, true, out var status))
            {
                var errorResponse = ApiResponse<object>.FailureResponse(
                "Validation failed",
                new List<string> { $"Invalid status: {request.Status}" });

                return Results.BadRequest(errorResponse);
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

            if (success)
            {
                var response = ApiResponse<Transaction>.SuccessResponse(
                transaction,
                "Transaction created successfully");

                return Results.Created($"/api/transactions/{transaction.Id}", response);
            }
            return Results.BadRequest(ApiResponse<object>.FailureResponse("Failed to process transaction"));
        }
        private static IResult GetRecentTransactions(ITransactionService service)
        {
            var transactions = service.GetRecentTransactions();
            var response = ApiResponse<IEnumerable<Transaction>>.SuccessResponse(
            transactions,
            "Recent transactions retrieved");

            return Results.Ok(response);
        }
    }
}
