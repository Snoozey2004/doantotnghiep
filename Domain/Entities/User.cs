using WebApplication1.Domain.Enums;

namespace WebApplication1.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Customer;
    public bool IsApproved { get; set; } = true;
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
