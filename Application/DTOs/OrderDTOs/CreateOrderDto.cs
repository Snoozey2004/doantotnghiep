namespace WebApplication1.Application.DTOs.OrderDTOs;

public class CreateOrderDto
{
    public string ShippingName { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingPhone { get; set; } = string.Empty;
    public string? Notes { get; set; }
    
    public List<CreateOrderItemDto> Items { get; set; } = new();
}

public class CreateOrderItemDto
{
    public Guid ProductOfferId { get; set; }
    public int Quantity { get; set; }
}
