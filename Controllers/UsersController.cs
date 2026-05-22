using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.AuthDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "0,Admin")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    [Authorize(Roles = "0,Admin")]
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAll(CancellationToken cancellationToken)
    {
        var users = await _userService.GetAllAsync(cancellationToken);
        return Ok(users);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UserDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var user = await _userService.GetByIdAsync(id, cancellationToken);
        return user is null ? NotFound() : Ok(user);
    }


    [HttpPut("{id:guid}")]
    public async Task<ActionResult<UserDto>> Update(Guid id, [FromBody] UserAdminUpdateDto dto, CancellationToken cancellationToken)
    {
        var user = await _userService.UpdateAsync(id, dto, cancellationToken);
        return user is null ? NotFound() : Ok(user);
    }

    // New endpoint for approval-only updates to avoid accidental field overwrites
    [HttpPut("{id:guid}/approval")]
    public async Task<ActionResult<UserDto>> UpdateApproval(Guid id, [FromBody] UserApprovalDto dto, CancellationToken cancellationToken)
    {
        var user = await _userService.UpdateApprovalAsync(id, dto.IsApproved, cancellationToken);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _userService.DeleteAsync(id, cancellationToken);
        return result ? NoContent() : NotFound();
    }

    [HttpPut("{id:guid}/profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile(Guid id, [FromBody] UserProfileUpdateDto dto, CancellationToken cancellationToken)
    {
        var user = await _userService.UpdateProfileAsync(id, dto, cancellationToken);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPut("{id:guid}/password")]
    public async Task<ActionResult> UpdatePassword(Guid id, [FromBody] UserPasswordUpdateDto dto, CancellationToken cancellationToken)
    {
        var result = await _userService.UpdatePasswordAsync(id, dto, cancellationToken);
        return result ? Ok() : BadRequest("Invalid current password.");
    }
}

