using WebApplication1.Domain.Enums;

namespace WebApplication1.Domain.Entities;

public class ProductOffer
{
    public Guid Id { get; set; }
    
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public Guid SellerId { get; set; }
    public User Seller { get; set; } = null!;
    
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    
    public string ShopName { get; set; } = string.Empty;
    public string ShopAddress { get; set; } = string.Empty;
    public string BusinessHours { get; set; } = string.Empty;
    public bool IsOpen { get; set; } = true;
}
