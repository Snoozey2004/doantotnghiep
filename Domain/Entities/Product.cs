namespace WebApplication1.Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public decimal? Price { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; }
    public Guid ProvinceId { get; set; }
    public Province Province { get; set; } = null!;
    public ICollection<OrderItem> OrderItems { get; set; }
    = new List<OrderItem>();
    public ICollection<ProductGallery> Galleries { get; set; }
    = new List<ProductGallery>();
    public ProductInfographic? Infographic { get; set; }
}