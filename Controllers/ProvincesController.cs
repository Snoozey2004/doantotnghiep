using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.ProvinceDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProvincesController : ControllerBase
{
    private readonly IProvinceService _provinceService;

    public ProvincesController(IProvinceService provinceService)
    {
        _provinceService = provinceService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProvinceDto>>> GetAll(CancellationToken cancellationToken)
    {
        var provinces = await _provinceService.GetAllAsync(cancellationToken);
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

    [HttpPost]
    public async Task<ActionResult<ProvinceDto>> Create([FromBody] ProvinceCreateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = province.Id }, province);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ProvinceDto>> Update(Guid id, [FromBody] ProvinceUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceService.UpdateAsync(id, dto, cancellationToken);
        return province is null ? NotFound() : Ok(province);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _provinceService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
