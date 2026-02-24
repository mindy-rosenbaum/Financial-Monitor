using Microsoft.EntityFrameworkCore;
using FinancialMonitor.Models;

namespace FinancialMonitor.Data
{
    public class FinanceDbContext : DbContext
    {
        public FinanceDbContext(DbContextOptions<FinanceDbContext> options):base(options)
        {
            
        }
        public DbSet<Transaction> Transactions => Set<Transaction>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 2);
            base.OnModelCreating(modelBuilder);
        }
    }
}
