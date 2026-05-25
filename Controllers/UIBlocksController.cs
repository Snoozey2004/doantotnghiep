using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.UIBlockDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UIBlocksController : ControllerBase
{
    private readonly IUIBlockService _blockService;

    public UIBlocksController(IUIBlockService blockService)
    {
        _blockService = blockService;
    }

    [HttpGet("config/{configId:guid}")]
    public async Task<ActionResult<List<UIBlockDto>>> GetByConfigId(Guid configId, CancellationToken cancellationToken)
    {
        var blocks = await _blockService.GetByConfigIdAsync(configId, cancellationToken);
        return Ok(blocks);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UIBlockDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var block = await _blockService.GetByIdAsync(id, cancellationToken);
        return block is null ? NotFound() : Ok(block);
    }

    [HttpPost("config/{configId:guid}")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<UIBlockDto>> Create(Guid configId, [FromBody] UIBlockCreateDto dto, CancellationToken cancellationToken)
    {
        var block = await _blockService.CreateAsync(configId, dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = block.Id }, block);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<UIBlockDto>> Update(Guid id, [FromBody] UIBlockUpdateDto dto, CancellationToken cancellationToken)
    {
        var block = await _blockService.UpdateAsync(id, dto, cancellationToken);
        return block is null ? NotFound() : Ok(block);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _blockService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
