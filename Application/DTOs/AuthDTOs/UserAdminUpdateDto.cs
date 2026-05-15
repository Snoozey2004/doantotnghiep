using WebApplication1.Domain.Enums;

namespace WebApplication1.Application.DTOs.AuthDTOs;

public class UserAdminUpdateDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public bool IsApproved { get; set; }
}
