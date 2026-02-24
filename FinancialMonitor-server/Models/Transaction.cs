using System.ComponentModel.DataAnnotations;

namespace FinancialMonitor.Models
{
    public record Transaction
    {
        public required Guid Id { get; init; }
        public required decimal Amount { get; init; }
        public required string Currency { get; init; }
        public required TransactionStatus Status { get; init; }
        public required DateTime Timestamp { get; init; }

        public DateTime ProcessedAt { get; init; } = DateTime.UtcNow;
    }

    public enum TransactionStatus
    {
        Pending,
        Completed,
        Failed
    }
}
