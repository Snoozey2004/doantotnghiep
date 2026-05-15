using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class SearchRepository : ISearchRepository
{
    private readonly AppDbContext _dbContext;

    public SearchRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Province>> SearchProvincesAsync(string? keyword, string? region, CancellationToken cancellationToken)
    {
        var query = _dbContext.Provinces.AsNoTracking().AsQueryable();

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
            query = query.Where(p => p.Region.ToLower() == region.ToLower());
        }

        return await query.ToListAsync(cancellationToken);
    }

    public async Task<List<Product>> SearchProductsAsync(string? keyword, decimal? minPrice, decimal? maxPrice, CancellationToken cancellationToken)
    {
        var query = _dbContext.Products.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(p => p.Name.ToLower().Contains(keyword.ToLower()) || p.Description.ToLower().Contains(keyword.ToLower()));
        }

        if (minPrice.HasValue)
        {
            query = query.Where(p => p.Price >= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= maxPrice.Value);
        }

        return await query.ToListAsync(cancellationToken);
    }
}
