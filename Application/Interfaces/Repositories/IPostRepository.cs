using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IPostRepository
{
    Task<List<Post>> GetAllAsync(CancellationToken cancellationToken);
    Task<Post?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<Post?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<List<Post>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task AddAsync(Post post, CancellationToken cancellationToken);
    Task UpdateAsync(Post post, CancellationToken cancellationToken);
    Task DeleteAsync(Post post, CancellationToken cancellationToken);
}
