using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class InfographicBlockConfiguration
    : IEntityTypeConfiguration<InfographicBlock>
{
     public void Configure(
         EntityTypeBuilder<InfographicBlock> builder)
     {
          builder.HasKey(x => x.Id);

          builder.Property(x => x.BlockType)
              .HasConversion<int>();

          builder.Property(x => x.LayoutType)
              .HasConversion<int>();

          builder.Property(x => x.DataJson)
              .HasColumnType("text");

          builder.HasIndex(x => new
          {
               x.ProductInfographicId,
               x.SortOrder
          });
     }
}