using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.LandingPageConfigDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LandingPageConfigsController : ControllerBase
{
    private readonly ILandingPageConfigService _configService;

    public LandingPageConfigsController(ILandingPageConfigService configService)
    {
        _configService = configService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LandingPageConfigDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var config = await _configService.GetByIdAsync(id, cancellationToken);
        return config is null ? NotFound() : Ok(config);
    }

    [HttpGet("province/{provinceId:guid}")]
    public async Task<ActionResult<LandingPageConfigDto>> GetByProvinceId(Guid provinceId, CancellationToken cancellationToken)
    {
        var config = await _configService.GetByProvinceIdAsync(provinceId, cancellationToken);
        return config is null ? NotFound() : Ok(config);
    }

    [HttpGet("province/slug/{slug}")]
    public async Task<ActionResult<LandingPageConfigDto>> GetByProvinceSlug(string slug, CancellationToken cancellationToken)
    {
        var config = await _configService.GetByProvinceSlugAsync(slug, cancellationToken);
        return config is null ? NotFound() : Ok(config);
    }

    [HttpPost]
    public async Task<ActionResult<LandingPageConfigDto>> Create([FromBody] LandingPageConfigCreateDto dto, CancellationToken cancellationToken)
    {
        var config = await _configService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = config.Id }, config);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<LandingPageConfigDto>> Update(Guid id, [FromBody] LandingPageConfigUpdateDto dto, CancellationToken cancellationToken)
    {
        var config = await _configService.UpdateAsync(id, dto, cancellationToken);
        return config is null ? NotFound() : Ok(config);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _configService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
