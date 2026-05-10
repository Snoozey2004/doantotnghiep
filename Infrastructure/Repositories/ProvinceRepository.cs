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
