namespace FinancialMonitor.DTOs
{
    public record TransactionRequest(
      Guid TransactionId,
      decimal Amount,
      string Currency,
      string Status, // Pending | Completed | Failed
      DateTime Timestamp
  );
}
