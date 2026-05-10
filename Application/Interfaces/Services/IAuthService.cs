using WebApplication1.Application.DTOs.AuthDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto, CancellationToken cancellationToken);
    Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken cancellationToken);
}
