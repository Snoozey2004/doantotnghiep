using AutoMapper;
using WebApplication1.Application.DTOs.AnalyticsDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IAnalyticsRepository _analyticsRepository;
    private readonly IMapper _mapper;

    public AnalyticsService(IAnalyticsRepository analyticsRepository, IMapper mapper)
    {
        _analyticsRepository = analyticsRepository;
        _mapper = mapper;
    }

    public async Task<AnalyticsEventDto> TrackAsync(AnalyticsEventCreateDto dto, CancellationToken cancellationToken)
    {
        var analyticsEvent = _mapper.Map<AnalyticsEvent>(dto);
        analyticsEvent.Id = Guid.NewGuid();
        analyticsEvent.CreatedAt = DateTime.UtcNow;
        await _analyticsRepository.AddAsync(analyticsEvent, cancellationToken);
        return _mapper.Map<AnalyticsEventDto>(analyticsEvent);
    }

    public async Task<AnalyticsSummaryDto> GetSummaryAsync(Guid? provinceId, Guid? productId, CancellationToken cancellationToken)
    {
        var pageViews = await _analyticsRepository.CountAsync("page_view", provinceId, null, cancellationToken);
        var productViews = await _analyticsRepository.CountAsync("product_view", provinceId, productId, cancellationToken);
        var interactions = await _analyticsRepository.CountAsync("interaction", provinceId, productId, cancellationToken);

        return new AnalyticsSummaryDto
        {
            PageViews = pageViews,
            ProductViews = productViews,
            Interactions = interactions
        };
    }

    public async Task<AnalyticsSummaryDto> GetAdminOverviewAsync(CancellationToken cancellationToken)
    {
        var pageViews = await _analyticsRepository.CountAsync("page_view", null, null, cancellationToken);
        var productViews = await _analyticsRepository.CountAsync("product_view", null, null, cancellationToken);
        var interactions = await _analyticsRepository.CountAsync("interaction", null, null, cancellationToken);

        var provinceCount = await _analyticsRepository.CountProvincesAsync(cancellationToken);
        var postCount = await _analyticsRepository.CountPostsAsync(cancellationToken);
        var mediaCount = await _analyticsRepository.CountMediaAsync(cancellationToken);
        var productCount = await _analyticsRepository.CountProductsAsync(cancellationToken);
        var highlightedProvinceCount = await _analyticsRepository.CountHighlightedProvincesAsync(cancellationToken);
        var highlightedPostCount = await _analyticsRepository.CountHighlightedPostsAsync(cancellationToken);
        var highlightedMediaCount = await _analyticsRepository.CountHighlightedMediaAsync(cancellationToken);

        return new AnalyticsSummaryDto
        {
            PageViews = pageViews,
            ProductViews = productViews,
            Interactions = interactions,
            ProvinceCount = provinceCount,
            PostCount = postCount,
            MediaCount = mediaCount,
            ProductCount = productCount,
            HighlightedProvinceCount = highlightedProvinceCount,
            HighlightedPostCount = highlightedPostCount,
            HighlightedMediaCount = highlightedMediaCount
        };
    }

    public Task<List<ProvinceInteractionRow>> GetProvinceInteractionsAsync(CancellationToken cancellationToken)
        => _analyticsRepository.GetProvinceInteractionsAsync(cancellationToken);

    public async Task<ContentStatsDto> GetContentStatsAsync(Guid? provinceId, CancellationToken cancellationToken)
    {
        var postsByCategory = await _analyticsRepository.CountPostsByCategoryAsync(provinceId, cancellationToken);
        var mediaByType = await _analyticsRepository.CountMediaByTypeAsync(provinceId, cancellationToken);
        var provincesByRegion = await _analyticsRepository.CountProvincesByRegionAsync(cancellationToken);
        var contentPerProvince = await _analyticsRepository.GetContentPerProvinceAsync(cancellationToken);
        var featuredVsNormal = await _analyticsRepository.GetFeaturedVsNormalCountsAsync(cancellationToken);

        int totalPosts, totalMedia, featuredPosts, featuredMedia;

        if (provinceId.HasValue)
        {
            totalPosts = await _analyticsRepository.CountPostsByProvinceAsync(provinceId.Value, cancellationToken);
            totalMedia = await _analyticsRepository.CountMediaByProvinceAsync(provinceId.Value, cancellationToken);

            // For province-specific stats, count only highlighted items for that province
            var highlightedPostsForProvince = postsByCategory.Values.Sum(); // Placeholder calculation
            var highlightedMediaForProvince = mediaByType.Values.Sum(); // Placeholder calculation

            featuredPosts = await _analyticsRepository.CountPostsAsync(cancellationToken);
            featuredMedia = await _analyticsRepository.CountMediaAsync(cancellationToken);
        }
        else
        {
            totalPosts = await _analyticsRepository.CountPostsAsync(cancellationToken);
            totalMedia = await _analyticsRepository.CountMediaAsync(cancellationToken);
            featuredPosts = await _analyticsRepository.CountHighlightedPostsAsync(cancellationToken);
            featuredMedia = await _analyticsRepository.CountHighlightedMediaAsync(cancellationToken);
        }

        return new ContentStatsDto
        {
            TotalPostCount = totalPosts,
            TotalMediaCount = totalMedia,
            FeaturedPostCount = featuredPosts,
            FeaturedMediaCount = featuredMedia,
            PostsByCategory = postsByCategory,
            MediaByType = mediaByType,
            ProvincesByRegion = provincesByRegion,
            ContentPerProvince = contentPerProvince,
            FeaturedVsNormal = featuredVsNormal,
            GeneratedAt = DateTime.UtcNow
        };
    }
}
