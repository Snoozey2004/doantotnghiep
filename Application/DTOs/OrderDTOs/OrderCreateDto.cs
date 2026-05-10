namespace WebApplication1.Application.DTOs.OrderDTOs;

public class OrderCreateDto
{
    public Guid? UserId { get; set; }
    public List<OrderItemCreateDto> Items { get; set; } = new();
}
