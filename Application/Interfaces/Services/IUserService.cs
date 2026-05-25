using WebApplication1.Application.DTOs.AuthDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IUserService
{
    Task<List<UserDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<UserDto?> UpdateAsync(Guid id, UserAdminUpdateDto dto, CancellationToken cancellationToken);
    Task<UserDto?> UpdateApprovalAsync(Guid id, bool isApproved, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
    Task<UserDto?> UpdateProfileAsync(Guid id, UserProfileUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> UpdatePasswordAsync(Guid id, UserPasswordUpdateDto dto, CancellationToken cancellationToken);
}
