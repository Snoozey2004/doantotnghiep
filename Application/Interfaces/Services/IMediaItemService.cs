using WebApplication1.Application.DTOs.MediaDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IMediaItemService
{
    Task<List<MediaItemDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<MediaItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<MediaItemDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<MediaItemDto> CreateAsync(MediaItemCreateDto dto, CancellationToken cancellationToken);
    Task<MediaItemDto?> UpdateAsync(Guid id, MediaItemUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
