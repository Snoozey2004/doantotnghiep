using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.AnalyticsDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _analyticsService;

    public AnalyticsController(IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpPost("track")]
    public async Task<ActionResult<AnalyticsEventDto>> Track([FromBody] AnalyticsEventCreateDto dto, CancellationToken cancellationToken)
    {
        var result = await _analyticsService.TrackAsync(dto, cancellationToken);
        return Ok(result);
    }

    [HttpGet("summary")]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<ActionResult<AnalyticsSummaryDto>> GetSummary(
        [FromQuery] Guid? provinceId,
        [FromQuery] Guid? productId,
        CancellationToken cancellationToken)
    {
        var result = await _analyticsService.GetSummaryAsync(provinceId, productId, cancellationToken);
        return Ok(result);
    }
}
