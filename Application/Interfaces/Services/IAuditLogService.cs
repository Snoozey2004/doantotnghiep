namespace WebApplication1.Application.Interfaces.Services;

public interface IAuditLogService
{
    Task LogAsync(string message, CancellationToken cancellationToken);
}
