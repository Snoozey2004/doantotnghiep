using WebApplication1.Application.DTOs.ProductDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IProductService
{
    Task<List<ProductDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<ProductDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<List<ProductDto>> GetByProvinceSlugAsync(string provinceSlug, CancellationToken cancellationToken);
    Task<List<ProductDto>> GetBySellerIdAsync(Guid sellerId, CancellationToken cancellationToken);
    Task<ProductDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<ProductDto> CreateAsync(ProductCreateDto dto, CancellationToken cancellationToken);
    Task<ProductDto?> UpdateAsync(Guid id, ProductUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
