using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IProvinceRepository
{
    Task<List<Province>> GetAllAsync(CancellationToken cancellationToken);
    Task<Province?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<Province?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task AddAsync(Province province, CancellationToken cancellationToken);
    Task UpdateAsync(Province province, CancellationToken cancellationToken);
    Task DeleteAsync(Province province, CancellationToken cancellationToken);
}
