using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IUIBlockRepository
{
    Task<UIBlock?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<UIBlock>> GetByConfigIdAsync(Guid configId, CancellationToken cancellationToken);
    Task AddAsync(UIBlock block, CancellationToken cancellationToken);
    Task UpdateAsync(UIBlock block, CancellationToken cancellationToken);
    Task DeleteAsync(UIBlock block, CancellationToken cancellationToken);
}
