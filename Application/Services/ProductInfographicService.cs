using WebApplication1.Application.DTOs.ProductInfographicsDTOs;
using WebApplication1.Repositories.Interfaces;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Services;

public class ProductInfographicService
    : IProductInfographicService
{
    private readonly IProductInfographicRepository
        _repository;

    public ProductInfographicService(
        IProductInfographicRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProductInfographicDto?>
        GetByProductIdAsync(Guid productId)
    {
        var infographic =
            await _repository.GetByProductIdAsync(
                productId);

        if (infographic is null)
        {
            return null;
        }

        return new ProductInfographicDto
        {
            Id = infographic.Id,

            ProductId = infographic.ProductId,

            Status = infographic.Status.ToString(),

            Blocks = infographic.Blocks
                .OrderBy(x => x.SortOrder)
                .Select(x =>
                    new InfographicBlockDto
                    {
                        Id = x.Id,

                        BlockType =
                            x.BlockType.ToString(),

                        LayoutType =
                            x.LayoutType.ToString(),

                        SortOrder =
                            x.SortOrder,

                        DataJson =
                            x.DataJson
                    })
                .ToList()
        };
    }

    public async Task<Guid> CreateAsync(
    CreateProductInfographicDto dto)
    {
        var productExists =
            await _repository
                .ProductExistsAsync(
                    dto.ProductId);

        if (!productExists)
        {
            throw new Exception(
                "Product không tồn tại");
        }

        var existed =
            await _repository
                .ExistsByProductIdAsync(
                    dto.ProductId);

        if (existed)
        {
            throw new Exception(
                "Infographic đã tồn tại");
        }

        var infographic =
            new ProductInfographic
            {
                Id = Guid.NewGuid(),

                ProductId = dto.ProductId,

                Status =
                    InfographicStatus.Draft,

                CreatedAt =
                    DateTime.UtcNow,

                UpdatedAt =
                    DateTime.UtcNow
            };

        foreach (var block in dto.Blocks)
        {
            infographic.Blocks.Add(
                new InfographicBlock
                {
                    Id = Guid.NewGuid(),

                    BlockType =
                        Enum.Parse<InfographicBlockType>(
                            block.BlockType),

                    LayoutType =
                        Enum.Parse<InfographicLayoutType>(
                            block.LayoutType),

                    SortOrder =
                        block.SortOrder,

                    IsVisible =
                        block.IsVisible,

                    DataJson =
                        block.DataJson,

                    CreatedAt =
                        DateTime.UtcNow,

                    UpdatedAt =
                        DateTime.UtcNow
                });
        }

        await _repository
            .AddAsync(infographic);

        await _repository
            .SaveChangesAsync();

        return infographic.Id;
    }

    public async Task<Guid> CreateBlockAsync(CreateInfographicBlockDto dto)
    {
        var block = new InfographicBlock
        {
            Id = Guid.NewGuid(),

            ProductInfographicId =
                dto.ProductInfographicId,

            BlockType = Enum.Parse<InfographicBlockType>(
                    dto.BlockType),

            LayoutType = Enum.Parse<InfographicLayoutType>(
                    dto.LayoutType),

            IsVisible =
                dto.IsVisible,

            SortOrder =
                dto.SortOrder,

            DataJson =
                dto.DataJson,

            CreatedAt =
                DateTime.UtcNow,

            UpdatedAt =
                DateTime.UtcNow
        };

        await _repository
            .AddBlockAsync(block);

        await _repository
            .SaveChangesAsync();

        return block.Id;
    }

    public async Task UpdateAsync(
        Guid infographicId,
        CreateProductInfographicDto dto)
    {
        var infographic =
            await _repository
                .GetByIdAsync(
                    infographicId);

        if (infographic == null)
        {
            throw new Exception(
                "Infographic not found");
        }

        infographic.UpdatedAt =
            DateTime.UtcNow;

        // Remove old blocks explicitly to avoid EF Core change tracking state issues
        foreach (var oldBlock in infographic.Blocks.ToList())
        {
            _repository.RemoveBlock(oldBlock);
        }
        infographic.Blocks.Clear();

        foreach (var block in dto.Blocks)
        {
            var newBlock = new InfographicBlock
            {
                Id = Guid.NewGuid(),
                ProductInfographicId = infographic.Id,
                BlockType = Enum.Parse<InfographicBlockType>(block.BlockType),
                LayoutType = Enum.Parse<InfographicLayoutType>(block.LayoutType),
                SortOrder = block.SortOrder,
                IsVisible = block.IsVisible,
                DataJson = block.DataJson,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _repository.AddBlockAsync(newBlock);
        }

        await _repository
            .SaveChangesAsync();
    }

    public async Task UpdateBlockAsync(Guid blockId, UpdateInfographicBlockDto dto)
    {
        var block =
            await _repository
                .GetBlockByIdAsync(blockId);

        if (block == null)
            throw new Exception(
                "Block not found");

        block.BlockType = Enum.Parse<InfographicBlockType>(
            dto.BlockType);

        block.LayoutType = Enum.Parse<InfographicLayoutType>(
            dto.LayoutType);

        block.SortOrder =
            dto.SortOrder;

        block.DataJson =
            dto.DataJson;

        block.UpdatedAt =
            DateTime.UtcNow;

        await _repository
            .SaveChangesAsync();
    }

    public async Task DeleteBlockAsync(Guid blockId)
    {
        var block =
            await _repository
                .GetBlockByIdAsync(blockId);

        if (block == null)
            return;

        _repository.RemoveBlock(block);

        await _repository
            .SaveChangesAsync();
    }

    public async Task ReorderBlocksAsync(List<ReorderInfographicBlockDto> items)
    {
        foreach (var item in items)
        {
            var block =
                await _repository
                    .GetBlockByIdAsync(item.Id);

            if (block == null)
                continue;

            block.SortOrder =
                item.SortOrder;

            block.UpdatedAt =
                DateTime.UtcNow;
        }

        await _repository
            .SaveChangesAsync();
    }

    public async Task PublishAsync(Guid infographicId, bool isPublished)
    {
        var infographic =
            await _repository
                .GetByIdAsync(
                    infographicId);

        if (infographic == null)
            throw new Exception("Infographic not found");

        infographic.Status = isPublished 
            ? InfographicStatus.Published 
            : InfographicStatus.Draft;
            
        infographic.PublishedAt = isPublished ? DateTime.UtcNow : null;
        infographic.UpdatedAt = DateTime.UtcNow;

        await _repository.SaveChangesAsync();
    }
}