namespace WebApplication1.Domain.Entities;

public class ProductShop
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string ShopName { get; set; } = string.Empty;
    public string ShopUrl { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty; // e.g. Shopee, Lazada, Facebook, Website
    public string? ImageUrl { get; set; } = string.Empty;

    public Product Product { get; set; } = null!;
}
