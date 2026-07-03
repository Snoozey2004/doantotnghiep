namespace WebApplication1.Application.DTOs.ProductDTOs;

public class ProductShopDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string ShopName { get; set; } = string.Empty;
    public string ShopUrl { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}
