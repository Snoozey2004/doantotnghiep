using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.ProvinceDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProvincesController : ControllerBase
{
    private readonly IProvinceService _provinceService;
    private readonly IAuditLogService _auditLogService;

    public ProvincesController(IProvinceService provinceService, IAuditLogService auditLogService)
    {
        _provinceService = provinceService;
        _auditLogService = auditLogService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProvinceDto>>> GetAll(CancellationToken cancellationToken)
    {
        var provinces = await _provinceService.GetAllAsync(cancellationToken);
        return Ok(provinces);
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<ProvinceDto>>> Search([FromQuery] string? keyword, [FromQuery] string? region, CancellationToken cancellationToken)
    {
        var provinces = await _provinceService.SearchAsync(keyword, region, cancellationToken);
        return Ok(provinces);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProvinceDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var province = await _provinceService.GetByIdAsync(id, cancellationToken);
        return province is null ? NotFound() : Ok(province);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ProvinceDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var province = await _provinceService.GetBySlugAsync(slug, cancellationToken);
        return province is null ? NotFound() : Ok(province);
    }

    [HttpGet("{id:guid}/related")]
    public async Task<ActionResult<List<ProvinceRelatedDto>>> GetRelated(Guid id, CancellationToken cancellationToken)
    {
        var provinces = await _provinceService.GetRelatedAsync(id, cancellationToken);
        return Ok(provinces);
    }

    [HttpGet("{id:guid}/stats")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<ProvinceAdminStatsDto>> GetStats(Guid id, CancellationToken cancellationToken)
    {
        var stats = await _provinceService.GetStatsAsync(id, cancellationToken);
        return stats is null ? NotFound() : Ok(stats);
    }

    [HttpPost]
    public async Task<ActionResult<ProvinceDto>> Create([FromBody] ProvinceCreateDto dto, CancellationToken cancellationToken)
    {
        ProvinceDto province = await _provinceService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = province.Id }, province);
    }

    [HttpPut("{id:guid}/highlight")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<ProvinceDto>> UpdateHighlights(Guid id, [FromBody] ProvinceHighlightUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceService.UpdateHighlightsAsync(id, dto, cancellationToken);
        if (province is not null)
        {
            await _auditLogService.LogAsync($"Province highlight updated: {id} - IsHighlighted: {dto.IsHighlighted}, Order: {dto.HighlightOrder}", cancellationToken);
        }
        return province is null ? NotFound() : Ok(province);
    }

    [HttpPut("{id:guid}/tags")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<ProvinceDto>> UpdateTags(Guid id, [FromBody] ProvinceTagUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceService.UpdateTagsAsync(id, dto, cancellationToken);
        return province is null ? NotFound() : Ok(province);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ProvinceDto>> Update(Guid id, [FromBody] ProvinceUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceService.UpdateAsync(id, dto, cancellationToken);
        if (province is not null)
        {
            await _auditLogService.LogAsync($"Province updated: {province.Id} - {province.Name}", cancellationToken);
        }
        return province is null ? NotFound() : Ok(province);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _provinceService.DeleteAsync(id, cancellationToken);
        if (deleted)
        {
            await _auditLogService.LogAsync($"Province deleted: {id}", cancellationToken);
        }
        return deleted ? NoContent() : NotFound();
    }
}
