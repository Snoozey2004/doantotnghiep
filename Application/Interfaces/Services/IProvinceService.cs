using WebApplication1.Application.DTOs.ProvinceDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IProvinceService
{
    Task<List<ProvinceDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<ProvinceDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<ProvinceDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<ProvinceDto> CreateAsync(ProvinceCreateDto dto, CancellationToken cancellationToken);
    Task<ProvinceDto?> UpdateAsync(Guid id, ProvinceUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
