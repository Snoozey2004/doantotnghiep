using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class AuditLogService : IAuditLogService
{
    private readonly ILogger<AuditLogService> _logger;

    public AuditLogService(ILogger<AuditLogService> logger)
    {
        _logger = logger;
    }

    public Task LogAsync(string message, CancellationToken cancellationToken)
    {
        _logger.LogInformation("AUDIT: {Message}", message);
        return Task.CompletedTask;
    }
}
