using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IMediaItemRepository
{
    Task<List<MediaItem>> GetAllAsync(CancellationToken cancellationToken);
    Task<MediaItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<MediaItem>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<List<MediaItem>> SearchAsync(Guid? provinceId, string? mediaType, bool? isFeatured, CancellationToken cancellationToken);
    Task AddAsync(MediaItem item, CancellationToken cancellationToken);
    Task UpdateAsync(MediaItem item, CancellationToken cancellationToken);
    Task DeleteAsync(MediaItem item, CancellationToken cancellationToken);
}
