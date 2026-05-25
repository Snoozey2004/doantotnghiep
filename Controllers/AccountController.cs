using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.AuthDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AccountController : ControllerBase
{
    private readonly IUserService _userService;

    public AccountController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetMe(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var user = await _userService.GetByIdAsync(userId, cancellationToken);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPut("profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile([FromBody] UserProfileUpdateDto dto, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var user = await _userService.UpdateProfileAsync(userId, dto, cancellationToken);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPut("password")]
    public async Task<IActionResult> UpdatePassword([FromBody] UserPasswordUpdateDto dto, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var updated = await _userService.UpdatePasswordAsync(userId, dto, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    private Guid GetUserId()
    {
        var idValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(idValue, out var userId) ? userId : Guid.Empty;
    }
}
