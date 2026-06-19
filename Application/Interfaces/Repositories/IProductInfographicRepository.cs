namespace WebApplication1.Repositories.Interfaces;

public interface IProductInfographicRepository
{
     Task<ProductInfographic?> GetByProductIdAsync(Guid productId);
     Task<ProductInfographic?> GetByIdAsync(Guid infographicId);
     Task<bool> ExistsByProductIdAsync(Guid productId);
     Task<bool> ProductExistsAsync(Guid productId);
     void Update(ProductInfographic infographic);
     void UpdateBlock(InfographicBlock block);
     Task<InfographicBlock?> GetBlockByIdAsync(Guid blockId);
     Task AddBlockAsync(InfographicBlock block);
     void RemoveBlock(InfographicBlock block);
     Task AddAsync(ProductInfographic infographic);
     Task SaveChangesAsync();
}