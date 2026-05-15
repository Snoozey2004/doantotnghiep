using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class MediaItemRepository : IMediaItemRepository
{
    private readonly AppDbContext _dbContext;

    public MediaItemRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<MediaItem>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.MediaItems
            .AsNoTracking()
            .OrderBy(m => m.SortOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<MediaItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.MediaItems.FirstOrDefaultAsync(m => m.Id == id, cancellationToken);
    }

    public async Task<List<MediaItem>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        return await _dbContext.MediaItems
            .AsNoTracking()
            .Where(m => m.ProvinceId == provinceId)
            .OrderBy(m => m.SortOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<MediaItem>> SearchAsync(Guid? provinceId, string? mediaType, bool? isFeatured, CancellationToken cancellationToken)
    {
        var query = _dbContext.MediaItems
            .AsNoTracking()
            .AsQueryable();

        if (provinceId.HasValue)
        {
            query = query.Where(m => m.ProvinceId == provinceId.Value);
        }

        if (!string.IsNullOrWhiteSpace(mediaType))
        {
            var lowered = mediaType.ToLower();
            query = query.Where(m => m.MediaType.ToLower() == lowered);
        }

        if (isFeatured.HasValue)
        {
            query = query.Where(m => m.IsFeatured == isFeatured.Value);
        }

        return await query.OrderBy(m => m.SortOrder).ToListAsync(cancellationToken);
    }

    public async Task AddAsync(MediaItem item, CancellationToken cancellationToken)
    {
        _dbContext.MediaItems.Add(item);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(MediaItem item, CancellationToken cancellationToken)
    {
        _dbContext.MediaItems.Update(item);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(MediaItem item, CancellationToken cancellationToken)
    {
        _dbContext.MediaItems.Remove(item);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
