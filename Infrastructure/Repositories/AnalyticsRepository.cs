using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class AnalyticsRepository : IAnalyticsRepository
{
    private readonly AppDbContext _dbContext;

    public AnalyticsRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(AnalyticsEvent analyticsEvent, CancellationToken cancellationToken)
    {
        _dbContext.AnalyticsEvents.Add(analyticsEvent);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> CountAsync(string eventType, Guid? provinceId, Guid? productId, CancellationToken cancellationToken)
    {
        var query = _dbContext.AnalyticsEvents.AsNoTracking().Where(e => e.EventType == eventType);

        if (provinceId.HasValue)
        {
            query = query.Where(e => e.ProvinceId == provinceId);
        }

        if (productId.HasValue)
        {
            query = query.Where(e => e.ProductId == productId);
        }

        return await query.CountAsync(cancellationToken);
    }

    public Task<int> CountProvincesAsync(CancellationToken cancellationToken)
        => _dbContext.Provinces.AsNoTracking().CountAsync(cancellationToken);

    public Task<int> CountPostsAsync(CancellationToken cancellationToken)
        => _dbContext.Posts.AsNoTracking().CountAsync(cancellationToken);

    public Task<int> CountMediaAsync(CancellationToken cancellationToken)
        => _dbContext.MediaItems.AsNoTracking().CountAsync(cancellationToken);

    public Task<int> CountProductsAsync(CancellationToken cancellationToken)
        => _dbContext.Products.AsNoTracking().CountAsync(cancellationToken);

    public Task<int> CountHighlightedProvincesAsync(CancellationToken cancellationToken)
        => _dbContext.Provinces.AsNoTracking().CountAsync(p => p.IsHighlighted, cancellationToken);

    public Task<int> CountHighlightedPostsAsync(CancellationToken cancellationToken)
        => _dbContext.Posts.AsNoTracking().CountAsync(p => p.IsHighlighted, cancellationToken);

    public Task<int> CountHighlightedMediaAsync(CancellationToken cancellationToken)
        => _dbContext.MediaItems.AsNoTracking().CountAsync(m => m.IsHighlighted, cancellationToken);

    public async Task<Dictionary<string, int>> CountPostsByCategoryAsync(Guid? provinceId, CancellationToken cancellationToken)
    {
        var query = _dbContext.Posts.AsNoTracking();

        if (provinceId.HasValue)
        {
            query = query.Where(p => p.ProvinceId == provinceId);
        }

        return await query
            .GroupBy(p => p.Category)
            .Select(g => new { Category = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.Category ?? "Uncategorized", x => x.Count, cancellationToken);
    }

    public async Task<Dictionary<string, int>> CountMediaByTypeAsync(Guid? provinceId, CancellationToken cancellationToken)
    {
        var query = _dbContext.MediaItems.AsNoTracking();

        if (provinceId.HasValue)
        {
            query = query.Where(m => m.ProvinceId == provinceId);
        }

        return await query
            .GroupBy(m => m.MediaType)
            .Select(g => new { MediaType = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.MediaType ?? "Unknown", x => x.Count, cancellationToken);
    }

    public async Task<Dictionary<string, int>> CountProvincesByRegionAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Provinces.AsNoTracking()
            .GroupBy(p => p.Region)
            .Select(g => new { Region = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.Region ?? "Unknown", x => x.Count, cancellationToken);
    }

    public async Task<Dictionary<string, int>> GetContentPerProvinceAsync(CancellationToken cancellationToken)
    {
        var postCounts = await _dbContext.Posts.AsNoTracking()
            .GroupBy(p => p.ProvinceId)
            .Select(g => new { ProvinceId = g.Key, Count = g.Count() })
            .ToListAsync(cancellationToken);

        var mediaCounts = await _dbContext.MediaItems.AsNoTracking()
            .GroupBy(m => m.ProvinceId)
            .Select(g => new { ProvinceId = g.Key, Count = g.Count() })
            .ToListAsync(cancellationToken);

        var provinceNames = await _dbContext.Provinces.AsNoTracking()
            .ToDictionaryAsync(p => p.Id, p => p.Name, cancellationToken);

        var result = new Dictionary<string, int>();

        foreach (var province in provinceNames)
        {
            var posts = postCounts.FirstOrDefault(pc => pc.ProvinceId == province.Key)?.Count ?? 0;
            var media = mediaCounts.FirstOrDefault(mc => mc.ProvinceId == province.Key)?.Count ?? 0;
            result[province.Value] = posts + media;
        }

        return result;
    }

    public async Task<Dictionary<string, int>> GetFeaturedVsNormalCountsAsync(CancellationToken cancellationToken)
    {
        var featuredPosts = await _dbContext.Posts.AsNoTracking().CountAsync(p => p.IsHighlighted, cancellationToken);
        var normalPosts = await _dbContext.Posts.AsNoTracking().CountAsync(p => !p.IsHighlighted, cancellationToken);
        var featuredMedia = await _dbContext.MediaItems.AsNoTracking().CountAsync(m => m.IsHighlighted, cancellationToken);
        var normalMedia = await _dbContext.MediaItems.AsNoTracking().CountAsync(m => !m.IsHighlighted, cancellationToken);

        return new Dictionary<string, int>
        {
            { "Featured Posts", featuredPosts },
            { "Normal Posts", normalPosts },
            { "Featured Media", featuredMedia },
            { "Normal Media", normalMedia }
        };
    }

    public Task<int> CountPostsByProvinceAsync(Guid provinceId, CancellationToken cancellationToken)
        => _dbContext.Posts.AsNoTracking().CountAsync(p => p.ProvinceId == provinceId, cancellationToken);

    public Task<int> CountMediaByProvinceAsync(Guid provinceId, CancellationToken cancellationToken)
        => _dbContext.MediaItems.AsNoTracking().CountAsync(m => m.ProvinceId == provinceId, cancellationToken);

    public async Task<List<ProvinceInteractionRow>> GetProvinceInteractionsAsync(CancellationToken cancellationToken)
    {
        var relevant = new[] { "page_view", "specialty_click", "craft_click" };
        var grouped = await _dbContext.AnalyticsEvents.AsNoTracking()
            .Where(e => e.ProvinceId != null && relevant.Contains(e.EventType))
            .GroupBy(e => new { e.ProvinceId, e.EventType })
            .Select(g => new { g.Key.ProvinceId, g.Key.EventType, Count = g.Count() })
            .ToListAsync(cancellationToken);

        var byProvince = grouped.GroupBy(r => r.ProvinceId!.Value);
        return byProvince.Select(g => new ProvinceInteractionRow(
            g.Key,
            g.FirstOrDefault(r => r.EventType == "page_view")?.Count ?? 0,
            g.FirstOrDefault(r => r.EventType == "specialty_click")?.Count ?? 0,
            g.FirstOrDefault(r => r.EventType == "craft_click")?.Count ?? 0
        )).ToList();
    }
}
