using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class AnalyticsRepository : IAnalyticsRepository
{
    private readonly AppDbContext _dbContext;

    public AnalyticsRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(AnalyticsEvent analyticsEvent, CancellationToken cancellationToken)
    {
        _dbContext.AnalyticsEvents.Add(analyticsEvent);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> CountAsync(string eventType, Guid? provinceId, Guid? productId, CancellationToken cancellationToken)
    {
        var query = _dbContext.AnalyticsEvents.AsNoTracking().Where(e => e.EventType == eventType);

        if (provinceId.HasValue)
        {
            query = query.Where(e => e.ProvinceId == provinceId);
        }

        if (productId.HasValue)
        {
            query = query.Where(e => e.ProductId == productId);
        }

        return await query.CountAsync(cancellationToken);
    }
}
