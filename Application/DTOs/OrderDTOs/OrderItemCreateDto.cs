namespace WebApplication1.Application.DTOs.OrderDTOs;

public class OrderItemCreateDto
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}
