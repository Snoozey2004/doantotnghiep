using WebApplication1.Domain.Enums;

namespace WebApplication1.Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public ICollection<ProductOffer> Offers { get; set; } = new List<ProductOffer>();
    public Guid ProvinceId { get; set; }
    public Province Province { get; set; } = null!;
    public ICollection<ProductShop> Shops { get; set; } = new List<ProductShop>();
    public ICollection<ProductGallery> Galleries { get; set; } = new List<ProductGallery>();
    public ProductInfographic? Infographic { get; set; }
    public ProductType Type { get; set; } = ProductType.Sellable;
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; }
}