using Microsoft.EntityFrameworkCore;
using WebApplication1.Domain.Entities;
using WebApplication1.Domain.Enums;

namespace WebApplication1.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Province> Provinces => Set<Province>();
    public DbSet<LandingPageConfig> LandingPageConfigs => Set<LandingPageConfig>();
    public DbSet<UIBlock> UIBlocks => Set<UIBlock>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductGallery> ProductGalleries => Set<ProductGallery>();
    public DbSet<User> Users => Set<User>();
    public DbSet<ProductShop> ProductShops => Set<ProductShop>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<MediaItem> MediaItems => Set<MediaItem>();
    public DbSet<AnalyticsEvent> AnalyticsEvents => Set<AnalyticsEvent>();
    public DbSet<ProductInfographic> ProductInfographics
        => Set<ProductInfographic>();
    public DbSet<InfographicBlock> InfographicBlocks
        => Set<InfographicBlock>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Province>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(200);
            entity.Property(x => x.Slug).IsRequired().HasMaxLength(200);
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.HasOne(x => x.LandingPageConfig)
                .WithOne(x => x.Province)
                .HasForeignKey<LandingPageConfig>(x => x.ProvinceId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<LandingPageConfig>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.ThemeColor).HasMaxLength(50);
            entity.Property(x => x.FontFamily).HasMaxLength(100);
            entity.Property(x => x.BackgroundUrl).HasColumnType("text");
            entity.Property(x => x.Layout).HasMaxLength(100);
            entity.Property(x => x.SectionColorsJson).HasColumnType("text");
            entity.Property(x => x.SectionOrderJson).HasColumnType("text");
            entity.Property(x => x.SectionVisibilityJson).HasColumnType("text");
            entity.Property(x => x.SectionContentJson).HasColumnType("text");
            entity.HasMany(x => x.Blocks)
                .WithOne(x => x.LandingPageConfig)
                .HasForeignKey(x => x.LandingPageConfigId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<UIBlock>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.BlockType).IsRequired().HasMaxLength(50);
            entity.Property(x => x.Title).HasMaxLength(200);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(200);
            entity.Property(x => x.Price).HasColumnType("decimal(18,2)");
            entity.HasOne(x => x.Province)
                .WithMany(p => p.Products)
                .HasForeignKey(x => x.ProvinceId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(x => x.Infographic)
                .WithOne(x => x.Product)
                .HasForeignKey<ProductInfographic>(x => x.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProductGallery>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.ImageUrl)
                .IsRequired();

            entity.HasOne(x => x.Product)
                .WithMany(x => x.Galleries)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Title).IsRequired().HasMaxLength(200);
            entity.Property(x => x.Category).HasMaxLength(100);
            entity.Property(x => x.Slug).IsRequired().HasMaxLength(200);
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.HasOne(x => x.Province)
                .WithMany(p => p.Posts)
                .HasForeignKey(x => x.ProvinceId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<MediaItem>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.MediaType).IsRequired().HasMaxLength(50);
            entity.Property(x => x.Title).HasMaxLength(200);
            entity.HasOne(x => x.Province)
                .WithMany(p => p.MediaItems)
                .HasForeignKey(x => x.ProvinceId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<AnalyticsEvent>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.EventType).IsRequired().HasMaxLength(100);
            entity.HasOne(x => x.Province)
                .WithMany()
                .HasForeignKey(x => x.ProvinceId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(x => x.Product)
                .WithMany()
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.FullName).IsRequired().HasMaxLength(200);
            entity.Property(x => x.Email).IsRequired().HasMaxLength(200);
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(x => x.Role)
                .HasConversion<int>()
                .HasDefaultValue(UserRole.Customer)
                .HasSentinel(UserRole.Customer);
            entity.Property(x => x.IsApproved)
                .HasDefaultValue(true)
                .HasSentinel(true);
        });

        modelBuilder.Entity<ProductShop>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.ShopName).IsRequired().HasMaxLength(200);
            entity.Property(x => x.ShopUrl).IsRequired();
            entity.Property(x => x.Platform).HasMaxLength(50);
            entity.HasOne(x => x.Product)
                .WithMany(p => p.Shops)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.ApplyConfiguration(
            new ProductInfographicConfiguration());

        modelBuilder.ApplyConfiguration(
            new InfographicBlockConfiguration());
    }
}
