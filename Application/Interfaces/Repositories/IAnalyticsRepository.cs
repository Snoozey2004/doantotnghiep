using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IAnalyticsRepository
{
    Task AddAsync(AnalyticsEvent analyticsEvent, CancellationToken cancellationToken);
    Task<int> CountAsync(string eventType, Guid? provinceId, Guid? productId, CancellationToken cancellationToken);
    Task<int> CountProvincesAsync(CancellationToken cancellationToken);
    Task<int> CountPostsAsync(CancellationToken cancellationToken);
    Task<int> CountMediaAsync(CancellationToken cancellationToken);
    Task<int> CountProductsAsync(CancellationToken cancellationToken);
    Task<int> CountHighlightedProvincesAsync(CancellationToken cancellationToken);
    Task<int> CountHighlightedPostsAsync(CancellationToken cancellationToken);
    Task<int> CountHighlightedMediaAsync(CancellationToken cancellationToken);
}
