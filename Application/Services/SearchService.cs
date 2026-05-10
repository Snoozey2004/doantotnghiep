using AutoMapper;
using WebApplication1.Application.DTOs.SearchDTOs;
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

    public async Task<SearchResultDto> SearchAsync(string? keyword, string? region, decimal? minPrice, decimal? maxPrice, CancellationToken cancellationToken)
    {
        var provinces = await _searchRepository.SearchProvincesAsync(keyword, region, cancellationToken);
        var products = await _searchRepository.SearchProductsAsync(keyword, minPrice, maxPrice, cancellationToken);

        return new SearchResultDto
        {
            Provinces = _mapper.Map<List<Application.DTOs.ProvinceDTOs.ProvinceDto>>(provinces),
            Products = _mapper.Map<List<Application.DTOs.ProductDTOs.ProductDto>>(products)
        };
    }
}
