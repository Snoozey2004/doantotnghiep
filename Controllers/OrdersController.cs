using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.OrderDTOs;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Enums;

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
        var userId = GetUserIdFromClaims();
        if (!userId.HasValue)
        {
            return Unauthorized();
        }

        var role = GetUserRole();
        if (role == UserRole.Customer)
        {
            var customerOrder = await _orderService.GetByIdForUserAsync(id, userId.Value, cancellationToken);
            return customerOrder is null ? NotFound() : Ok(customerOrder);
        }

        var order = await _orderService.GetByIdAsync(id, cancellationToken);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpGet("user/{userId:guid}")]
    public async Task<ActionResult<List<OrderDto>>> GetByUserId(Guid userId, CancellationToken cancellationToken)
    {
        var requesterId = GetUserIdFromClaims();
        if (!requesterId.HasValue)
        {
            return Unauthorized();
        }

        var role = GetUserRole();
        if (role == UserRole.Customer && requesterId.Value != userId)
        {
            return Forbid();
        }

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
    [Authorize(Roles = "0,Admin,1,Editor,2,Seller")]
    public async Task<ActionResult<OrderDto>> UpdateStatus(Guid id, [FromBody] OrderStatusUpdateDto dto, CancellationToken cancellationToken)
    {
        var order = await _orderService.UpdateStatusAsync(id, dto, cancellationToken);
        return order is null ? NotFound() : Ok(order);
    }

    private Guid? GetUserIdFromClaims()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(ClaimTypes.Name);
        return Guid.TryParse(claim, out var id) ? id : null;
    }

    private UserRole GetUserRole()
    {
        var roleClaim = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

        if (int.TryParse(roleClaim, out var numericRole) && Enum.IsDefined(typeof(UserRole), numericRole))
        {
            return (UserRole)numericRole;
        }

        return Enum.TryParse<UserRole>(roleClaim, true, out var parsedRole)
            ? parsedRole
            : UserRole.Customer;
    }
}
