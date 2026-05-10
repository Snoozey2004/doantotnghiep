using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.OrderDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OrderDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var order = await _orderService.GetByIdAsync(id, cancellationToken);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpGet("user/{userId:guid}")]
    public async Task<ActionResult<List<OrderDto>>> GetByUserId(Guid userId, CancellationToken cancellationToken)
    {
        var orders = await _orderService.GetByUserIdAsync(userId, cancellationToken);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> Create([FromBody] OrderCreateDto dto, CancellationToken cancellationToken)
    {
        var userId = GetUserIdFromClaims();
        var order = await _orderService.CreateAsync(userId, dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    [HttpPatch("{id:guid}/status")]
    [Authorize(Roles = "Admin,Editor,Seller")]
    public async Task<ActionResult<OrderDto>> UpdateStatus(Guid id, [FromBody] OrderStatusUpdateDto dto, CancellationToken cancellationToken)
    {
        var order = await _orderService.UpdateStatusAsync(id, dto, cancellationToken);
        return order is null ? NotFound() : Ok(order);
    }

    private Guid? GetUserIdFromClaims()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(ClaimTypes.Name); // Updated to ensure consistent formatting
        return Guid.TryParse(claim, out var id) ? id : null;
    }
}
