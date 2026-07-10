namespace WebApplication1.Application.DTOs.ProductDTOs;

public class ProductOfferDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Guid SellerId { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string ShopName { get; set; } = string.Empty;
    public string ShopAddress { get; set; } = string.Empty;
    public string BusinessHours { get; set; } = string.Empty;
    public bool IsOpen { get; set; } = true;
}
