using WebApplication1.Application.DTOs.LandingPageConfigDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface ILandingPageConfigService
{
    Task<LandingPageConfigDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<LandingPageConfigDto?> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<LandingPageConfigDto?> GetByProvinceSlugAsync(string slug, CancellationToken cancellationToken);
    Task<IEnumerable<ProvinceBackgroundDto>> GetAllBackgroundsAsync(CancellationToken cancellationToken);
    Task<LandingPageConfigDto> CreateAsync(LandingPageConfigCreateDto dto, CancellationToken cancellationToken);
    Task<LandingPageConfigDto?> UpdateAsync(Guid id, LandingPageConfigUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
