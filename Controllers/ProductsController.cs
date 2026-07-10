using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetAll(CancellationToken cancellationToken)
    {
        var products = await _productService.GetAllAsync(cancellationToken);
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var product = await _productService.GetByIdAsync(id, cancellationToken);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpGet("province/{provinceId:guid}")]
    public async Task<ActionResult<List<ProductDto>>> GetByProvinceId(Guid provinceId, CancellationToken cancellationToken)
    {
        var products = await _productService.GetByProvinceIdAsync(provinceId, cancellationToken);
        return Ok(products);
    }

    [HttpGet("province/slug/{slug}")]
    public async Task<ActionResult<List<ProductDto>>> GetByProvinceSlug(string slug, CancellationToken cancellationToken)
    {
        var products = await _productService.GetByProvinceSlugAsync(slug, cancellationToken);
        return Ok(products);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ProductDto>> GetBySlug(
        string slug,
        CancellationToken cancellationToken)
    {
        var product = await _productService.GetBySlugAsync(
            slug,
            cancellationToken);

        return product is null
            ? NotFound()
            : Ok(product);
    }

    [HttpGet("seller/{sellerId:guid}")]
    public async Task<ActionResult<List<ProductDto>>> GetBySellerId(Guid sellerId, CancellationToken cancellationToken)
    {
        var products = await _productService.GetBySellerIdAsync(sellerId, cancellationToken);
        return Ok(products);
    }

    [HttpPost]
    [Authorize(Roles = "0,Admin,1,Editor,3,Seller")]
    public async Task<ActionResult<ProductDto>> Create([FromBody] ProductCreateDto dto, CancellationToken cancellationToken)
    {
        var product = await _productService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "0,Admin,1,Editor,3,Seller")]
    public async Task<ActionResult<ProductDto>> Update(Guid id, [FromBody] ProductUpdateDto dto, CancellationToken cancellationToken)
    {
        var product = await _productService.UpdateAsync(id, dto, cancellationToken);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "0,Admin,1,Editor,3,Seller")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _productService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
