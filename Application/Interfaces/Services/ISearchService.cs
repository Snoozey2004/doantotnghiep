using WebApplication1.Application.DTOs.SearchDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface ISearchService
{
    Task<SearchResultDto> SearchAsync(SearchFilterDto filter, CancellationToken cancellationToken);
    Task<List<string>> GetSuggestionsAsync(string keyword, CancellationToken cancellationToken);
    Task<List<SearchItemDto>> GetRelatedContentAsync(Guid provinceId, string? theme, CancellationToken cancellationToken);
}
