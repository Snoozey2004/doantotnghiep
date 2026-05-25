using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Order>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken);
    Task<Order?> GetByIdForUserAsync(Guid id, Guid userId, CancellationToken cancellationToken);
    Task AddAsync(Order order, CancellationToken cancellationToken);
    Task UpdateAsync(Order order, CancellationToken cancellationToken);
}
