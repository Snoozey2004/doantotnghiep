using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.Application.DTOs.OrderDTOs;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Enums;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto request)
    {
        Guid? customerId = null;
        if (User.Identity?.IsAuthenticated == true)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (Guid.TryParse(userIdStr, out var parsedId))
            {
                customerId = parsedId;
            }
        }

        try
        {
            var createdOrders = await _orderService.CreateOrdersAsync(request, customerId);
            return Ok(createdOrders);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("my-orders")]
    [Authorize]
    public async Task<IActionResult> GetMyOrders()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var customerId))
        {
            return Unauthorized();
        }

        var orders = await _orderService.GetOrdersForCustomerAsync(customerId);
        return Ok(orders);
    }

    [HttpGet("seller")]
    [Authorize]
    public async Task<IActionResult> GetSellerOrders()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var sellerId))
        {
            return Unauthorized();
        }

        // Kiểm tra xem User có phải là Admin hoặc Seller không (đơn giản hoá: lấy role)
        // Trong hệ thống này Role có thể lấy từ claim
        var roleClaim = User.FindFirstValue(ClaimTypes.Role);
        if (roleClaim != ((int)UserRole.Admin).ToString() && 
            roleClaim != UserRole.Admin.ToString() &&
            roleClaim != ((int)UserRole.Seller).ToString() &&
            roleClaim != UserRole.Seller.ToString())
        {
            return Forbid();
        }

        var orders = await _orderService.GetOrdersForSellerAsync(sellerId);
        return Ok(orders);
    }

    [HttpPut("{id}/status")]
    [Authorize]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusRequest request)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var roleClaim = User.FindFirstValue(ClaimTypes.Role);
        if (!Enum.TryParse<UserRole>(roleClaim, out var role))
        {
            return Forbid();
        }

        var success = await _orderService.UpdateOrderStatusAsync(id, request.Status, userId, role);
        if (!success)
        {
            return BadRequest(new { message = "Không thể cập nhật trạng thái đơn hàng. Bạn không có quyền hoặc đơn hàng không tồn tại." });
        }

        return NoContent();
    }
}

public class UpdateOrderStatusRequest
{
    public OrderStatus Status { get; set; }
}
