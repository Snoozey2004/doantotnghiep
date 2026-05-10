using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class UIBlockRepository : IUIBlockRepository
{
    private readonly AppDbContext _dbContext;

    public UIBlockRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UIBlock?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.UIBlocks.FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
    }

    public async Task<List<UIBlock>> GetByConfigIdAsync(Guid configId, CancellationToken cancellationToken)
    {
        return await _dbContext.UIBlocks
            .AsNoTracking()
            .Where(b => b.LandingPageConfigId == configId)
            .OrderBy(b => b.SortOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(UIBlock block, CancellationToken cancellationToken)
    {
        _dbContext.UIBlocks.Add(block);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(UIBlock block, CancellationToken cancellationToken)
    {
        _dbContext.UIBlocks.Update(block);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(UIBlock block, CancellationToken cancellationToken)
    {
        _dbContext.UIBlocks.Remove(block);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
