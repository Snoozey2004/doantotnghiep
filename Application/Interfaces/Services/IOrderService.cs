using WebApplication1.Application.DTOs.OrderDTOs;
using WebApplication1.Domain.Enums;

namespace WebApplication1.Application.Interfaces.Services;

public interface IOrderService
{
    Task<List<OrderDto>> CreateOrdersAsync(CreateOrderDto request, Guid? customerId);
    Task<List<OrderDto>> GetOrdersForCustomerAsync(Guid customerId);
    Task<List<OrderDto>> GetOrdersForSellerAsync(Guid sellerId);
    Task<OrderDto?> GetOrderByIdAsync(Guid id);
    Task<bool> UpdateOrderStatusAsync(Guid orderId, OrderStatus status, Guid userId, UserRole role);
}
