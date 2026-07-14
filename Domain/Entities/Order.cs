using WebApplication1.Domain.Enums;

namespace WebApplication1.Domain.Entities;

public class Order
{
    public Guid Id { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public decimal TotalAmount { get; set; }
    
    public string ShippingName { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingPhone { get; set; } = string.Empty;
    public string? Notes { get; set; }
    
    public Guid? CustomerId { get; set; }
    public User? Customer { get; set; }
    
    public Guid SellerId { get; set; }
    public User Seller { get; set; } = null!;
    
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
