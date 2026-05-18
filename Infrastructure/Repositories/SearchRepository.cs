using System.Globalization;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class SearchRepository : ISearchRepository
{
    private readonly AppDbContext _dbContext;

    public SearchRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Province>> SearchProvincesAsync(string? keyword, string? region, string? tags, CancellationToken cancellationToken)
    {
        var provinces = await _dbContext.Provinces
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var normalizedKeyword = NormalizeText(keyword);
        var normalizedRegion = NormalizeText(region);
        var normalizedTags = ParseTags(tags);

        var filtered = provinces.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(normalizedKeyword))
        {
            filtered = filtered.Where(p =>
                ContainsNormalized(p.Name, normalizedKeyword) ||
                ContainsNormalized(p.Description, normalizedKeyword) ||
                ContainsNormalized(p.Overview, normalizedKeyword) ||
                ContainsNormalized(p.KeyFeatures, normalizedKeyword) ||
                ContainsNormalized(p.Tags, normalizedKeyword));
        }

        if (!string.IsNullOrWhiteSpace(normalizedRegion))
        {
            filtered = filtered.Where(p => NormalizeText(p.Region) == normalizedRegion);
        }

        if (normalizedTags.Count > 0)
        {
            filtered = filtered.Where(p => normalizedTags.Any(tag => ContainsNormalized(p.Tags, tag)));
        }

        return filtered
            .OrderByDescending(p => p.IsHighlighted)
            .ThenBy(p => p.Name)
            .ToList();
    }

    public async Task<List<Post>> SearchPostsAsync(string? keyword, Guid? provinceId, string? category, string? tags, CancellationToken cancellationToken)
    {
        var posts = await _dbContext.Posts
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var normalizedKeyword = NormalizeText(keyword);
        var normalizedCategory = NormalizeText(category);
        var normalizedTags = ParseTags(tags);

        var filtered = posts.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(normalizedKeyword))
        {
            filtered = filtered.Where(p =>
                ContainsNormalized(p.Title, normalizedKeyword) ||
                ContainsNormalized(p.Content, normalizedKeyword) ||
                ContainsNormalized(p.ContentEn, normalizedKeyword) ||
                ContainsNormalized(p.Tags, normalizedKeyword));
        }

        if (provinceId.HasValue && provinceId != Guid.Empty)
        {
            filtered = filtered.Where(p => p.ProvinceId == provinceId.Value);
        }

        if (!string.IsNullOrWhiteSpace(normalizedCategory))
        {
            filtered = filtered.Where(p => NormalizeText(p.Category) == normalizedCategory);
        }

        if (normalizedTags.Count > 0)
        {
            filtered = filtered.Where(p => normalizedTags.Any(tag => ContainsNormalized(p.Tags, tag)));
        }

        return filtered
            .OrderByDescending(p => p.IsHighlighted)
            .ThenByDescending(p => p.CreatedAt)
            .ToList();
    }

    public async Task<List<MediaItem>> SearchMediaAsync(string? keyword, Guid? provinceId, string? mediaType, string? tags, CancellationToken cancellationToken)
    {
        var mediaItems = await _dbContext.MediaItems
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var normalizedKeyword = NormalizeText(keyword);
        var normalizedMediaType = NormalizeText(mediaType);
        var normalizedTags = ParseTags(tags);

        var filtered = mediaItems.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(normalizedKeyword))
        {
            filtered = filtered.Where(m =>
                ContainsNormalized(m.Title, normalizedKeyword) ||
                ContainsNormalized(m.Description, normalizedKeyword) ||
                ContainsNormalized(m.Tags, normalizedKeyword));
        }

        if (provinceId.HasValue && provinceId != Guid.Empty)
        {
            filtered = filtered.Where(m => m.ProvinceId == provinceId.Value);
        }

        if (!string.IsNullOrWhiteSpace(normalizedMediaType))
        {
            filtered = filtered.Where(m => NormalizeText(m.MediaType) == normalizedMediaType);
        }

        if (normalizedTags.Count > 0)
        {
            filtered = filtered.Where(m => normalizedTags.Any(tag => ContainsNormalized(m.Tags, tag)));
        }

        return filtered
            .OrderByDescending(m => m.IsHighlighted)
            .ThenBy(m => m.SortOrder)
            .ToList();
    }

    public async Task<List<Product>> SearchProductsAsync(string? keyword, decimal? minPrice, decimal? maxPrice, CancellationToken cancellationToken)
    {
        var query = _dbContext.Products.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(p => p.Name.ToLower().Contains(keyword.ToLower()) || p.Description.ToLower().Contains(keyword.ToLower()));
        }

        if (minPrice.HasValue)
        {
            query = query.Where(p => p.Price >= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= maxPrice.Value);
        }

        return await query.ToListAsync(cancellationToken);
    }

    private static string NormalizeText(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return string.Empty;
        }

        var normalized = value.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var builder = new StringBuilder(normalized.Length);

        foreach (var c in normalized)
        {
            var category = CharUnicodeInfo.GetUnicodeCategory(c);
            if (category == UnicodeCategory.NonSpacingMark)
            {
                continue;
            }

            if (c == 'đ' || c == 'Đ')
            {
                builder.Append('d');
                continue;
            }

            if (category != UnicodeCategory.NonSpacingMark)
            {
                builder.Append(c);
            }
        }

        return builder.ToString().Normalize(NormalizationForm.FormC);
    }

    private static bool ContainsNormalized(string? source, string normalizedKeyword)
    {
        if (string.IsNullOrWhiteSpace(source) || string.IsNullOrWhiteSpace(normalizedKeyword))
        {
            return false;
        }

        return NormalizeText(source).Contains(normalizedKeyword);
    }

    private static List<string> ParseTags(string? tags)
    {
        if (string.IsNullOrWhiteSpace(tags))
        {
            return new List<string>();
        }

        return tags
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(NormalizeText)
            .Where(tag => !string.IsNullOrWhiteSpace(tag))
            .ToList();
    }
}
