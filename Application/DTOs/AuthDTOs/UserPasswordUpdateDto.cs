namespace WebApplication1.Application.DTOs.AuthDTOs;

public class UserPasswordUpdateDto
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
