using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.DTOs.ProvinceDTOs;

namespace WebApplication1.Application.DTOs.SearchDTOs;

public class SearchResultDto
{
    public List<SearchItemDto> Results { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (TotalCount + PageSize - 1) / PageSize;

    // Legacy support for existing integrations
    public List<ProvinceDto> Provinces { get; set; } = new();
    public List<ProductDto> Products { get; set; } = new();
}
