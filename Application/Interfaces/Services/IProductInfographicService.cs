using WebApplication1.Application.DTOs.ProductInfographicsDTOs;

namespace WebApplication1.Services.Interfaces;

public interface IProductInfographicService
{
    Task<ProductInfographicDto?> GetByProductIdAsync(Guid productId);
    Task<Guid> CreateAsync(
        CreateProductInfographicDto dto);
    Task UpdateAsync(
        Guid infographicId,
        CreateProductInfographicDto dto);
    Task<Guid> CreateBlockAsync(
        CreateInfographicBlockDto dto);
    Task UpdateBlockAsync(
        Guid blockId,
        UpdateInfographicBlockDto dto);
    Task DeleteBlockAsync(
        Guid blockId);
    Task ReorderBlocksAsync(
        List<ReorderInfographicBlockDto> items);
    Task PublishAsync(
        Guid infographicId,
        bool isPublished);
}