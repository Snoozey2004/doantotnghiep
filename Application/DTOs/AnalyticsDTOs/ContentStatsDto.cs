namespace WebApplication1.Application.DTOs.AnalyticsDTOs;

/// <summary>
/// Comprehensive content statistics for provinces and content management analytics.
/// Supports breakdown by category, media type, region, and featured status.
/// </summary>
public class ContentStatsDto
{
    /// <summary>Total count of all posts across the system or a province.</summary>
    public int TotalPostCount { get; set; }

    /// <summary>Total count of all media items (images/videos) across the system or a province.</summary>
    public int TotalMediaCount { get; set; }

    /// <summary>Count of featured/highlighted posts.</summary>
    public int FeaturedPostCount { get; set; }

    /// <summary>Count of featured/highlighted media items.</summary>
    public int FeaturedMediaCount { get; set; }

    /// <summary>Count of posts by category (e.g., "history" => 5, "culture" => 3).</summary>
    public Dictionary<string, int> PostsByCategory { get; set; } = new();

    /// <summary>Count of media items by type (e.g., "image" => 10, "video" => 5).</summary>
    public Dictionary<string, int> MediaByType { get; set; } = new();

    /// <summary>Count of provinces by region (e.g., "North" => 10, "South" => 12).</summary>
    public Dictionary<string, int> ProvincesByRegion { get; set; } = new();

    /// <summary>Count of total content (posts + media) per province.</summary>
    public Dictionary<string, int> ContentPerProvince { get; set; } = new();

    /// <summary>Breakdown of featured vs non-featured content.</summary>
    public Dictionary<string, int> FeaturedVsNormal { get; set; } = new();

    /// <summary>Timestamp when these statistics were generated.</summary>
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
