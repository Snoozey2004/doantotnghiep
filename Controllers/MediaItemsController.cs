using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.MediaDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaItemsController : ControllerBase
{
    private readonly IMediaItemService _mediaService;

    public MediaItemsController(IMediaItemService mediaService)
    {
        _mediaService = mediaService;
    }

    [HttpGet]
    public async Task<ActionResult<List<MediaItemDto>>> GetAll(CancellationToken cancellationToken)
    {
        var items = await _mediaService.GetAllAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MediaItemDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var item = await _mediaService.GetByIdAsync(id, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpGet("province/{provinceId:guid}")]
    public async Task<ActionResult<List<MediaItemDto>>> GetByProvinceId(Guid provinceId, CancellationToken cancellationToken)
    {
        var items = await _mediaService.GetByProvinceIdAsync(provinceId, cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<ActionResult<MediaItemDto>> Create([FromBody] MediaItemCreateDto dto, CancellationToken cancellationToken)
    {
        var item = await _mediaService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<ActionResult<MediaItemDto>> Update(Guid id, [FromBody] MediaItemUpdateDto dto, CancellationToken cancellationToken)
    {
        var item = await _mediaService.UpdateAsync(id, dto, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _mediaService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
