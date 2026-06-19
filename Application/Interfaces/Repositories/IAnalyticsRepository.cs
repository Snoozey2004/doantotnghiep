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

    // Content Statistics Methods
    /// <summary>Count posts by category.</summary>
    Task<Dictionary<string, int>> CountPostsByCategoryAsync(Guid? provinceId, CancellationToken cancellationToken);

    /// <summary>Count media items by type (image, video, etc.).</summary>
    Task<Dictionary<string, int>> CountMediaByTypeAsync(Guid? provinceId, CancellationToken cancellationToken);

    /// <summary>Count provinces by region.</summary>
    Task<Dictionary<string, int>> CountProvincesByRegionAsync(CancellationToken cancellationToken);

    /// <summary>Get total content (posts + media) count per province.</summary>
    Task<Dictionary<string, int>> GetContentPerProvinceAsync(CancellationToken cancellationToken);

    /// <summary>Get featured vs non-featured content counts.</summary>
    Task<Dictionary<string, int>> GetFeaturedVsNormalCountsAsync(CancellationToken cancellationToken);

    /// <summary>Get post count for a specific province.</summary>
    Task<int> CountPostsByProvinceAsync(Guid provinceId, CancellationToken cancellationToken);

    /// <summary>Get media count for a specific province.</summary>
    Task<int> CountMediaByProvinceAsync(Guid provinceId, CancellationToken cancellationToken);

    /// <summary>Get page_view, specialty_click, craft_click counts grouped by provinceId.</summary>
    Task<List<ProvinceInteractionRow>> GetProvinceInteractionsAsync(CancellationToken cancellationToken);
}

public record ProvinceInteractionRow(Guid ProvinceId, int PageViews, int SpecialtyClicks, int CraftClicks);
