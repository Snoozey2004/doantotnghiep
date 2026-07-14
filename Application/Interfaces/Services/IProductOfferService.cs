using WebApplication1.Application.DTOs.ProductDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IProductOfferService
{
    Task<List<ProductOfferDto>> GetOffersByProductAsync(Guid productId, CancellationToken cancellationToken);
    Task<List<ProductOfferDto>> GetOffersBySellerAsync(Guid sellerId, CancellationToken cancellationToken);
    Task<ProductOfferDto?> GetOfferByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<ProductOfferDto> CreateOfferAsync(Guid sellerId, ProductOfferDto dto, CancellationToken cancellationToken);
    Task<ProductOfferDto?> UpdateOfferAsync(Guid id, Guid sellerId, ProductOfferDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteOfferAsync(Guid id, Guid sellerId, CancellationToken cancellationToken);
}
