using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.Data;
using WebApplication1.Repositories.Interfaces;

namespace WebApplication1.Repositories;

public class ProductInfographicRepository
    : IProductInfographicRepository
{
    private readonly AppDbContext _context;

    public ProductInfographicRepository(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<ProductInfographic?> GetByProductIdAsync(
        Guid productId)
    {
        return await _context.ProductInfographics
            .Include(x => x.Blocks)
            .FirstOrDefaultAsync(x =>
                x.ProductId == productId);
    }

    public async Task<ProductInfographic?> GetByIdAsync(
        Guid infographicId)
    {
        return await _context.ProductInfographics
            .Include(x => x.Blocks)
            .FirstOrDefaultAsync(x =>
                x.Id == infographicId);
    }

    public async Task<bool> ExistsByProductIdAsync(
        Guid productId)
    {
        return await _context
            .ProductInfographics
            .AnyAsync(x =>
                x.ProductId == productId);
    }

    public async Task<bool> ProductExistsAsync(
        Guid productId)
    {
        return await _context.Products
            .AnyAsync(x => x.Id == productId);
    }

    public void Update(
    ProductInfographic infographic)
    {
        _context.ProductInfographics
            .Update(infographic);
    }

    public void UpdateBlock(
        InfographicBlock block)
    {
        _context.InfographicBlocks
            .Update(block);
    }

    public async Task<InfographicBlock?>
        GetBlockByIdAsync(Guid blockId)
    {
        return await _context.InfographicBlocks
            .FirstOrDefaultAsync(x => x.Id == blockId);
    }

    public async Task AddBlockAsync(
        InfographicBlock block)
    {
        await _context.InfographicBlocks
            .AddAsync(block);
    }

    public void RemoveBlock(
        InfographicBlock block)
    {
        _context.InfographicBlocks
            .Remove(block);
    }

    public async Task AddAsync(
        ProductInfographic infographic)
    {
        await _context.ProductInfographics
            .AddAsync(infographic);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}