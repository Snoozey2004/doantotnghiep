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
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        CancellationToken cancellationToken)
    {
        var result = await _searchService.SearchAsync(keyword, region, minPrice, maxPrice, cancellationToken);
        return Ok(result);
    }
}
