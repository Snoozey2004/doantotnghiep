namespace WebApplication1.Domain.Entities;

public class OrderItem
{
    public Guid Id { get; set; }
    
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    
    public Guid ProductOfferId { get; set; }
    public ProductOffer ProductOffer { get; set; } = null!;
    
    public string ProductName { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
}
