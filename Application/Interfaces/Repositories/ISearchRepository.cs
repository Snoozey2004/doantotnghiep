using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface ISearchRepository
{
    Task<List<Province>> SearchProvincesAsync(string? keyword, string? region, CancellationToken cancellationToken);
    Task<List<Product>> SearchProductsAsync(string? keyword, decimal? minPrice, decimal? maxPrice, CancellationToken cancellationToken);

}
