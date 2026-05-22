using AutoMapper;
using WebApplication1.Application.DTOs.SearchDTOs;
using WebApplication1.Application.DTOs.PostDTOs;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.DTOs.ProvinceDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class SearchService : ISearchService
{
    private readonly ISearchRepository _searchRepository;
    private readonly IMapper _mapper;

    public SearchService(ISearchRepository searchRepository, IMapper mapper)
    {
        _searchRepository = searchRepository;
        _mapper = mapper;
    }

    public async Task<SearchResultDto> SearchAsync(SearchFilterDto filter, CancellationToken cancellationToken)
    {
        var results = new List<SearchItemDto>();

        // Search based on content type filter
        if (string.IsNullOrEmpty(filter.ContentType) || filter.ContentType.Equals("All", StringComparison.OrdinalIgnoreCase) || filter.ContentType.Equals("Province", StringComparison.OrdinalIgnoreCase))
        {
            var provinces = await _searchRepository.SearchProvincesAsync(filter.Keyword, filter.Region, filter.Tags, cancellationToken);
            results.AddRange(provinces.Select(p => new SearchItemDto
            {
                Id = p.Id,
                Title = p.Name,
                Description = p.Overview ?? p.Description,
                ImageUrl = p.ImageUrl,
                VideoUrl = p.VideoUrl,
                ItemType = "Province",
                Slug = p.Slug,
                Region = p.Region,
                Tags = p.Tags,
                IsHighlighted = p.IsHighlighted,
                RelevanceScore = CalculateRelevanceScore(p.Name, p.Description, p.Tags, filter.Keyword),
                CreatedAt = DateTime.UtcNow
            }));
        }

        if (string.IsNullOrEmpty(filter.ContentType) || filter.ContentType.Equals("All", StringComparison.OrdinalIgnoreCase) || filter.ContentType.Equals("Post", StringComparison.OrdinalIgnoreCase))
        {
            var posts = await _searchRepository.SearchPostsAsync(filter.Keyword, filter.ProvinceId, filter.Category, filter.Tags, cancellationToken);
            results.AddRange(posts.Select(p => new SearchItemDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Content,
                ImageUrl = p.ImageUrl,
                VideoUrl = p.VideoUrl,
                ItemType = "Post",
                ProvinceId = p.ProvinceId,
                Category = p.Category,
                Tags = p.Tags,
                IsHighlighted = p.IsHighlighted,
                RelevanceScore = CalculateRelevanceScore(p.Title, p.Content, p.Tags, filter.Keyword),
                CreatedAt = p.CreatedAt
            }));
        }

        if (string.IsNullOrEmpty(filter.ContentType) || filter.ContentType.Equals("All", StringComparison.OrdinalIgnoreCase) || filter.ContentType.Equals("Media", StringComparison.OrdinalIgnoreCase))
        {
            var media = await _searchRepository.SearchMediaAsync(filter.Keyword, filter.ProvinceId, filter.MediaType, filter.Tags, cancellationToken);
            results.AddRange(media.Select(m => new SearchItemDto
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                ImageUrl = m.MediaType.Equals("Image", StringComparison.OrdinalIgnoreCase) ? m.Url : null,
                VideoUrl = m.MediaType.Equals("Video", StringComparison.OrdinalIgnoreCase) ? m.Url : null,
                ItemType = "Media",
                ProvinceId = m.ProvinceId,
                MediaType = m.MediaType,
                Tags = m.Tags,
                IsHighlighted = m.IsHighlighted,
                RelevanceScore = CalculateRelevanceScore(m.Title, m.Description, m.Tags, filter.Keyword),
                CreatedAt = DateTime.UtcNow
            }));
        }

        if (string.IsNullOrEmpty(filter.ContentType) || filter.ContentType.Equals("All", StringComparison.OrdinalIgnoreCase) || filter.ContentType.Equals("Product", StringComparison.OrdinalIgnoreCase))
        {
            var products = await _searchRepository.SearchProductsAsync(filter.Keyword, null, null, cancellationToken);
            results.AddRange(products.Select(p => new SearchItemDto
            {
                Id = p.Id,
                Title = p.Name,
                Description = p.Description,
                ItemType = "Product",
                Tags = string.Empty,
                IsHighlighted = false,
                RelevanceScore = CalculateRelevanceScore(p.Name, p.Description, string.Empty, filter.Keyword),
                CreatedAt = DateTime.UtcNow
            }));
        }

        // Sort by relevance, then by highlight status
        results = results
            .OrderByDescending(r => r.IsHighlighted)
            .ThenByDescending(r => r.RelevanceScore)
            .ThenByDescending(r => r.CreatedAt)
            .ToList();

        // Pagination
        int totalCount = results.Count;
        int skipCount = (filter.Page - 1) * filter.PageSize;
        var paginatedResults = results.Skip(skipCount).Take(filter.PageSize).ToList();

        return new SearchResultDto
        {
            Results = paginatedResults,
            TotalCount = totalCount,
            Page = filter.Page,
            PageSize = filter.PageSize,
            // Legacy support
            Provinces = _mapper.Map<List<ProvinceDto>>(new List<object>()),
            Products = _mapper.Map<List<ProductDto>>(new List<object>())
        };
    }

    public async Task<List<string>> GetSuggestionsAsync(string keyword, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return new List<string>();

        var suggestions = new HashSet<string>();

        // Get province name suggestions
        var provinces = await _searchRepository.SearchProvincesAsync(keyword, null, null, cancellationToken);
        suggestions.UnionWith(provinces.Select(p => p.Name).Take(3));

        // Get post title suggestions
        var posts = await _searchRepository.SearchPostsAsync(keyword, null, null, null, cancellationToken);
        suggestions.UnionWith(posts.Select(p => p.Title).Take(3));

        // Get media title suggestions
        var media = await _searchRepository.SearchMediaAsync(keyword, null, null, null, cancellationToken);
        suggestions.UnionWith(media.Select(m => m.Title).Take(3));

        return suggestions.Take(5).ToList();
    }

    public async Task<List<SearchItemDto>> GetRelatedContentAsync(Guid provinceId, string? theme, CancellationToken cancellationToken)
    {
        var results = new List<SearchItemDto>();

        // Get the province to get its region and tags
        var provinces = await _searchRepository.SearchProvincesAsync(null, null, null, cancellationToken);
        var province = provinces.FirstOrDefault(p => p.Id == provinceId);

        if (province == null)
            return results;

        // Get related posts by theme/category
        if (!string.IsNullOrEmpty(theme))
        {
            var posts = await _searchRepository.SearchPostsAsync(null, provinceId, theme, null, cancellationToken);
            results.AddRange(posts.Select(p => new SearchItemDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Content,
                ImageUrl = p.ImageUrl,
                ItemType = "Post",
                ProvinceId = p.ProvinceId,
                Category = p.Category,
                Tags = p.Tags,
                IsHighlighted = p.IsHighlighted,
                RelevanceScore = 100,
                CreatedAt = p.CreatedAt
            }));
        }

        // Get related media
        var media = await _searchRepository.SearchMediaAsync(null, provinceId, null, null, cancellationToken);
        results.AddRange(media.Select(m => new SearchItemDto
        {
            Id = m.Id,
            Title = m.Title,
            Description = m.Description,
            ImageUrl = m.MediaType.Equals("Image", StringComparison.OrdinalIgnoreCase) ? m.Url : null,
            VideoUrl = m.MediaType.Equals("Video", StringComparison.OrdinalIgnoreCase) ? m.Url : null,
            ItemType = "Media",
            ProvinceId = m.ProvinceId,
            MediaType = m.MediaType,
            Tags = m.Tags,
            IsHighlighted = m.IsHighlighted,
            RelevanceScore = 80,
            CreatedAt = DateTime.UtcNow
        }));

        return results.OrderByDescending(r => r.IsHighlighted)
            .ThenByDescending(r => r.RelevanceScore)
            .Take(10)
            .ToList();
    }

    private int CalculateRelevanceScore(string title, string content, string tags, string? keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return 50;

        int score = 0;
        var keywordLower = keyword.ToLower();

        // Exact title match
        if (!string.IsNullOrEmpty(title) && title.ToLower().Equals(keywordLower))
            score += 100;
        // Title contains keyword
        else if (!string.IsNullOrEmpty(title) && title.ToLower().Contains(keywordLower))
            score += 70;

        // Content contains keyword
        if (!string.IsNullOrEmpty(content) && content.ToLower().Contains(keywordLower))
            score += 30;

        // Tags contain keyword
        if (!string.IsNullOrEmpty(tags) && tags.ToLower().Contains(keywordLower))
            score += 40;

        return Math.Min(score, 100);
    }
}
