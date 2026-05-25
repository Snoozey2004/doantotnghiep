using WebApplication1.Application.DTOs.ProvinceDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IProvinceService
{
    Task<List<ProvinceDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<ProvinceDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<ProvinceDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<List<ProvinceDto>> SearchAsync(string? keyword, string? region, CancellationToken cancellationToken);
    Task<List<ProvinceRelatedDto>> GetRelatedAsync(Guid id, CancellationToken cancellationToken);
    Task<ProvinceDto?> UpdateHighlightsAsync(Guid id, ProvinceHighlightUpdateDto dto, CancellationToken cancellationToken);
    Task<ProvinceDto?> UpdateTagsAsync(Guid id, ProvinceTagUpdateDto dto, CancellationToken cancellationToken);
    Task<ProvinceAdminStatsDto?> GetStatsAsync(Guid id, CancellationToken cancellationToken);
    Task<ProvinceDto> CreateAsync(ProvinceCreateDto dto, CancellationToken cancellationToken);
    Task<ProvinceDto?> UpdateAsync(Guid id, ProvinceUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
