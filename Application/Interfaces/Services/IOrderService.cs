using WebApplication1.Application.DTOs.OrderDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IOrderService
{
    Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<OrderDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken);
    Task<OrderDto> CreateAsync(Guid? userId, OrderCreateDto dto, CancellationToken cancellationToken);
    Task<OrderDto?> UpdateStatusAsync(Guid id, OrderStatusUpdateDto dto, CancellationToken cancellationToken);
}
