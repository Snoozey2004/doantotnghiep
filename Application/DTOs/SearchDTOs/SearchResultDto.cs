using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.DTOs.ProvinceDTOs;

namespace WebApplication1.Application.DTOs.SearchDTOs;

public class SearchResultDto
{
    public List<ProvinceDto> Provinces { get; set; } = new();
    public List<ProductDto> Products { get; set; } = new();
}
