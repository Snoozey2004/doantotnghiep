using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface ISearchRepository
{
    Task<List<Province>> SearchProvincesAsync(string? keyword, string? region, string? tags, CancellationToken cancellationToken);
    Task<List<Post>> SearchPostsAsync(string? keyword, Guid? provinceId, string? category, string? tags, CancellationToken cancellationToken);
    Task<List<MediaItem>> SearchMediaAsync(string? keyword, Guid? provinceId, string? mediaType, string? tags, CancellationToken cancellationToken);
    Task<List<Product>> SearchProductsAsync(string? keyword, decimal? minPrice, decimal? maxPrice, CancellationToken cancellationToken);
}
