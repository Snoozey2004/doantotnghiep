using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.SearchDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly ISearchService _searchService;

    public SearchController(ISearchService searchService)
    {
        _searchService = searchService;
    }

    [HttpGet]
    public async Task<ActionResult<SearchResultDto>> Search(
        [FromQuery] string? keyword,
        [FromQuery] string? region,
        [FromQuery] Guid? provinceId,
        [FromQuery] string? category,
        [FromQuery] string? mediaType,
        [FromQuery] string? tags,
        [FromQuery] string? contentType,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? sortBy = "relevance",
        CancellationToken cancellationToken = default)
    {
        var filter = new SearchFilterDto
        {
            Keyword = keyword,
            Region = region,
            ProvinceId = provinceId,
            Category = category,
            MediaType = mediaType,
            Tags = tags,
            ContentType = contentType,
            Page = Math.Max(1, page),
            PageSize = Math.Min(100, Math.Max(1, pageSize)),
            SortBy = sortBy
        };

        var result = await _searchService.SearchAsync(filter, cancellationToken);
        return Ok(result);
    }

    [HttpGet("suggestions")]
    public async Task<ActionResult<List<string>>> GetSuggestions(
        [FromQuery] string keyword,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return Ok(new List<string>());

        var suggestions = await _searchService.GetSuggestionsAsync(keyword, cancellationToken);
        return Ok(suggestions);
    }

    [HttpGet("related/{provinceId}")]
    public async Task<ActionResult<List<SearchItemDto>>> GetRelatedContent(
        Guid provinceId,
        [FromQuery] string? theme,
        CancellationToken cancellationToken)
    {
        var results = await _searchService.GetRelatedContentAsync(provinceId, theme, cancellationToken);
        return Ok(results);
    }
}
