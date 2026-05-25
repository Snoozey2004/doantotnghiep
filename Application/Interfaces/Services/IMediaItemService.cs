using WebApplication1.Application.DTOs.MediaDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IMediaItemService
{
    Task<List<MediaItemDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<MediaItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<MediaItemDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<List<MediaItemDto>> SearchAsync(Guid? provinceId, string? mediaType, bool? isFeatured, CancellationToken cancellationToken);
    Task<MediaItemDto?> UpdateHighlightsAsync(Guid id, MediaItemHighlightUpdateDto dto, CancellationToken cancellationToken);
    Task<MediaItemDto?> UpdateTagsAsync(Guid id, MediaItemTagUpdateDto dto, CancellationToken cancellationToken);
    Task<MediaItemDto> CreateAsync(MediaItemCreateDto dto, CancellationToken cancellationToken);
    Task<MediaItemDto?> UpdateAsync(Guid id, MediaItemUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
