using WebApplication1.Application.DTOs.AnalyticsDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IAnalyticsService
{
    Task<AnalyticsEventDto> TrackAsync(AnalyticsEventCreateDto dto, CancellationToken cancellationToken);
    Task<AnalyticsSummaryDto> GetSummaryAsync(Guid? provinceId, Guid? productId, CancellationToken cancellationToken);
    Task<AnalyticsSummaryDto> GetAdminOverviewAsync(CancellationToken cancellationToken);

    /// <summary>Get comprehensive content statistics (categories, media types, regions, featured counts, etc.).</summary>
    Task<ContentStatsDto> GetContentStatsAsync(Guid? provinceId, CancellationToken cancellationToken);
}
