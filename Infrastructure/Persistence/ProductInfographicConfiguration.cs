using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ProductInfographicConfiguration
    : IEntityTypeConfiguration<ProductInfographic>
{
    public void Configure(
        EntityTypeBuilder<ProductInfographic> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.ProductId)
             .IsUnique();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.HasOne(x => x.Product)
             .WithOne(x => x.Infographic)
             .HasForeignKey<ProductInfographic>(x => x.ProductId)
             .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Blocks)
            .WithOne(x => x.ProductInfographic)
            .HasForeignKey(x => x.ProductInfographicId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}