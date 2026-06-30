namespace WebApplication1.Application.DTOs.OrderDTOs;

public class OrderCreateDto
{
    public Guid? UserId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = "COD";
    public List<OrderItemCreateDto> Items { get; set; } = new();
}
