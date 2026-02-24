using FinancialMonitor.DTOs;
using FluentValidation;

namespace FinancialMonitor.Validators
{
    public class TransactionRequestValidator : AbstractValidator<TransactionRequest>
    {
        public TransactionRequestValidator()
        {
            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("Amount must be greater than zero.");

            RuleFor(x => x.Currency)
                .NotEmpty()
                .Length(3).WithMessage("Currency must be exactly 3 characters (e.g., USD).");

            RuleFor(x => x.Status)
                .IsEnumName(typeof(FinancialMonitor.Models.TransactionStatus), caseSensitive: false)
                .WithMessage("Invalid status. Allowed: Pending, Completed, Failed.");
        }
    }
}
