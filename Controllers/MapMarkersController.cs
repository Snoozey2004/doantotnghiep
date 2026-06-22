using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.MapMarkerDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MapMarkersController : ControllerBase
{
    private readonly IMapMarkerService _service;

    public MapMarkersController(IMapMarkerService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MapMarkerDto>>> GetAll(CancellationToken cancellationToken)
    {
        return Ok(await _service.GetAllAsync(cancellationToken));
    }

    [HttpPut]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<IActionResult> SaveAll([FromBody] List<MapMarkerDto> markers, CancellationToken cancellationToken)
    {
        await _service.SaveAllAsync(markers ?? new List<MapMarkerDto>(), cancellationToken);
        return NoContent();
    }
}
