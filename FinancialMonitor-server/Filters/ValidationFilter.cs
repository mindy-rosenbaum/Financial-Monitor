using FluentValidation;

namespace FinancialMonitor.Filters
{
    public class ValidationFilter<T> : IEndpointFilter
    {
        public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
        {
            var validator = context.HttpContext.RequestServices.GetService<IValidator<T>>();

            if (validator is not null)
            {
                var entity = context.Arguments.OfType<T>().FirstOrDefault();
                if (entity is not null)
                {
                    var results = await validator.ValidateAsync(entity);
                    if (!results.IsValid)
                    {
                        return Results.ValidationProblem(results.ToDictionary());
                    }
                }
            }
            return await next(context);
        }
    }
}
