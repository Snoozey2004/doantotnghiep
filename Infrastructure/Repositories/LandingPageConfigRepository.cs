using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class LandingPageConfigRepository : ILandingPageConfigRepository
{
    private readonly AppDbContext _dbContext;

    public LandingPageConfigRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<LandingPageConfig?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.LandingPageConfigs
            .Include(c => c.Blocks)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
    }

    public async Task<LandingPageConfig?> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        return await _dbContext.LandingPageConfigs
            .Include(c => c.Blocks)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.ProvinceId == provinceId, cancellationToken);
    }

    public async Task<LandingPageConfig?> GetByProvinceSlugAsync(string slug, CancellationToken cancellationToken)
    {
        return await _dbContext.LandingPageConfigs
            .Include(c => c.Blocks)
            .Include(c => c.Province)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Province != null && c.Province.Slug == slug, cancellationToken);
    }

    public async Task<IEnumerable<(string Slug, string BackgroundUrl)>> GetAllBackgroundsAsync(CancellationToken cancellationToken)
    {
        var rows = await _dbContext.LandingPageConfigs
            .Where(c => c.Province != null && !string.IsNullOrEmpty(c.BackgroundUrl))
            .Include(c => c.Province)
            .AsNoTracking()
            .Select(c => new { c.Province!.Slug, c.BackgroundUrl })
            .ToListAsync(cancellationToken);
        return rows.Select(x => (x.Slug, x.BackgroundUrl));
    }

    public async Task AddAsync(LandingPageConfig config, CancellationToken cancellationToken)
    {
        _dbContext.LandingPageConfigs.Add(config);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(LandingPageConfig config, CancellationToken cancellationToken)
    {
        _dbContext.LandingPageConfigs.Update(config);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(LandingPageConfig config, CancellationToken cancellationToken)
    {
        _dbContext.LandingPageConfigs.Remove(config);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
