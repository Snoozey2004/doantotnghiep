using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class ProvinceRepository : IProvinceRepository
{
    private readonly AppDbContext _dbContext;

    public ProvinceRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Province>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Provinces
            .Include(p => p.LandingPageConfig)
            .ThenInclude(c => c.Blocks)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<Province?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Provinces
            .Include(p => p.LandingPageConfig)
            .ThenInclude(c => c.Blocks)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<Province?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        return await _dbContext.Provinces
            .Include(p => p.LandingPageConfig)
            .ThenInclude(c => c.Blocks)
            .FirstOrDefaultAsync(p => p.Slug == slug, cancellationToken);
    }

    public async Task<List<Province>> SearchAsync(string? keyword, string? region, CancellationToken cancellationToken)
    {
        var query = _dbContext.Provinces
            .Include(p => p.LandingPageConfig)
            .ThenInclude(c => c.Blocks)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            var lowered = keyword.ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(lowered)
                || p.Description.ToLower().Contains(lowered)
                || p.Overview.ToLower().Contains(lowered)
                || p.KeyFeatures.ToLower().Contains(lowered)
                || p.Tags.ToLower().Contains(lowered));
        }

        if (!string.IsNullOrWhiteSpace(region))
        {
            var regionLowered = region.ToLower();
            query = query.Where(p => p.Region.ToLower() == regionLowered);
        }

        return await query.ToListAsync(cancellationToken);
    }

    public async Task<List<Province>> GetRelatedAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        var province = await _dbContext.Provinces.AsNoTracking().FirstOrDefaultAsync(p => p.Id == provinceId, cancellationToken);
        if (province is null)
        {
            return new List<Province>();
        }

        var region = province.Region.ToLower();
        var tags = province.Tags.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(t => t.ToLower())
            .ToList();

        var query = _dbContext.Provinces
            .AsNoTracking()
            .Where(p => p.Id != provinceId);

        if (!string.IsNullOrWhiteSpace(province.Region))
        {
            query = query.Where(p => p.Region.ToLower() == region);
        }

        if (tags.Count > 0)
        {
            query = query.Where(p => tags.Any(tag => p.Tags.ToLower().Contains(tag)));
        }

        return await query.Take(6).ToListAsync(cancellationToken);
    }

    public async Task<ProvinceAdminStats> GetStatsAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        var postQuery = _dbContext.Posts.AsNoTracking().Where(p => p.ProvinceId == provinceId);
        var mediaQuery = _dbContext.MediaItems.AsNoTracking().Where(m => m.ProvinceId == provinceId);

        var postCount = await postQuery.CountAsync(cancellationToken);
        var mediaCount = await mediaQuery.CountAsync(cancellationToken);
        var highlightedPostCount = await postQuery.CountAsync(p => p.IsHighlighted, cancellationToken);
        var highlightedMediaCount = await mediaQuery.CountAsync(m => m.IsHighlighted, cancellationToken);

        return new ProvinceAdminStats(postCount, mediaCount, highlightedPostCount, highlightedMediaCount);
    }

    public async Task AddAsync(Province province, CancellationToken cancellationToken)
    {
        _dbContext.Provinces.Add(province);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Province province, CancellationToken cancellationToken)
    {
        _dbContext.Provinces.Update(province);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Province province, CancellationToken cancellationToken)
    {
        _dbContext.Provinces.Remove(province);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
