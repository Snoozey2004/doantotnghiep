using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Infrastructure.Repositories;

public class PostRepository : IPostRepository
{
    private readonly AppDbContext _dbContext;

    public PostRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Post>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Posts
            .AsNoTracking()
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<Post?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Posts.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<Post?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        return await _dbContext.Posts.FirstOrDefaultAsync(p => p.Slug == slug, cancellationToken);
    }

    public async Task<List<Post>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        return await _dbContext.Posts
            .AsNoTracking()
            .Where(p => p.ProvinceId == provinceId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<Post>> SearchAsync(string? keyword, Guid? provinceId, string? category, CancellationToken cancellationToken)
    {
        var query = _dbContext.Posts
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            var lowered = keyword.ToLower();
            query = query.Where(p => p.Title.ToLower().Contains(lowered)
                || p.Description.ToLower().Contains(lowered)
                || p.ContentEn.ToLower().Contains(lowered)
                || p.Tags.ToLower().Contains(lowered));
        }

        if (provinceId.HasValue)
        {
            query = query.Where(p => p.ProvinceId == provinceId.Value);
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            var categoryLowered = category.ToLower();
            query = query.Where(p => p.Category.ToLower() == categoryLowered);
        }

        return await query.OrderByDescending(p => p.CreatedAt).ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Post post, CancellationToken cancellationToken)
    {
        _dbContext.Posts.Add(post);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Post post, CancellationToken cancellationToken)
    {
        _dbContext.Posts.Update(post);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Post post, CancellationToken cancellationToken)
    {
        _dbContext.Posts.Remove(post);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
