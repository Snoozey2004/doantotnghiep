using WebApplication1.Application.DTOs.SearchDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface ISearchService
{
    Task<SearchResultDto> SearchAsync(string? keyword, string? region, decimal? minPrice, decimal? maxPrice, CancellationToken cancellationToken);
}
