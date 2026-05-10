using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IAnalyticsRepository
{
    Task AddAsync(AnalyticsEvent analyticsEvent, CancellationToken cancellationToken);
    Task<int> CountAsync(string eventType, Guid? provinceId, Guid? productId, CancellationToken cancellationToken);
}
