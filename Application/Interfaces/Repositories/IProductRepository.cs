using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync(CancellationToken cancellationToken);
    Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Product>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<List<Product>> GetByProvinceSlugAsync(string provinceSlug, CancellationToken cancellationToken);
    Task<List<Product>> GetBySellerIdAsync(Guid sellerId, CancellationToken cancellationToken);
    Task<Product?> GetBySlugAsync(
    string slug,
    CancellationToken cancellationToken);
    Task AddAsync(Product product, CancellationToken cancellationToken);
    Task UpdateAsync(Product product, CancellationToken cancellationToken);
    Task DeleteAsync(Product product, CancellationToken cancellationToken);
}
