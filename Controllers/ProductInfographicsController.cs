using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.ProductInfographicsDTOs;
using WebApplication1.Services.Interfaces;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/product-infographics")]
public class ProductInfographicsController : ControllerBase
{
    private readonly IProductInfographicService _service;
    private readonly IProductService _productService;

    public ProductInfographicsController(
        IProductInfographicService service,
        IProductService productService)
    {
        _service = service;
        _productService = productService;
    }

    // Lấy infographic theo ProductId
    [HttpGet("product/{productId:guid}")]
    public async Task<IActionResult> GetByProductId(
        Guid productId)
    {
        var infographic =
            await _service.GetByProductIdAsync(
                productId);

        if (infographic == null)
        {
            return NotFound();
        }

        return Ok(infographic);
    }

    // Lấy infographic theo ProductSlug
    [HttpGet("product-slug/{slug}")]
    public async Task<IActionResult> GetByProductSlug(string slug)
    {
        var product = await _productService.GetBySlugAsync(slug, CancellationToken.None);
        if (product == null)
        {
            return NotFound(new { message = "Không tìm thấy sản phẩm" });
        }

        var infographic = await _service.GetByProductIdAsync(product.Id);
        if (infographic == null)
        {
            return NotFound(new { message = "Infographic chưa được xuất bản hoặc không tồn tại" });
        }

        return Ok(infographic);
    }

    // Tạo infographic mới
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody]
        CreateProductInfographicDto dto)
    {
        var id =
            await _service.CreateAsync(dto);

        return Ok(new
        {
            Id = id
        });
    }

    // Update toàn bộ infographic
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody]
        CreateProductInfographicDto dto)
    {
        await _service.UpdateAsync(
            id,
            dto);

        return NoContent();
    }

    // Tạo block mới
    [HttpPost("blocks")]
    public async Task<IActionResult> CreateBlock(
        [FromBody]
        CreateInfographicBlockDto dto)
    {
        var id =
            await _service.CreateBlockAsync(dto);

        return Ok(new
        {
            Id = id
        });
    }

    // Update block
    [HttpPut("block/{blockId:guid}")]
    public async Task<IActionResult> UpdateBlock(
        Guid blockId,
        [FromBody]
        UpdateInfographicBlockDto dto)
    {
        await _service.UpdateBlockAsync(
            blockId,
            dto);

        return NoContent();
    }

    // Xóa block
    [HttpDelete("block/{blockId:guid}")]
    public async Task<IActionResult> DeleteBlock(
        Guid blockId)
    {
        await _service.DeleteBlockAsync(
            blockId);

        return NoContent();
    }

    // Sắp xếp lại block
    [HttpPut("blocks/reorder")]
    public async Task<IActionResult> ReorderBlocks(
        [FromBody]
        List<ReorderInfographicBlockDto> items)
    {
        await _service.ReorderBlocksAsync(
            items);

        return NoContent();
    }

    // Xuất bản / Hủy xuất bản
    [HttpPut("{id:guid}/publish")]
    public async Task<IActionResult> Publish(
        Guid id,
        [FromBody]
        PublishInfographicDto dto)
    {
        await _service.PublishAsync(id, dto.IsPublished);
        return NoContent();
    }
}

public class PublishInfographicDto
{
    public bool IsPublished { get; set; }
}