namespace WebApplication1.Application.Interfaces.Services;

public interface IEmailNotificationService
{
    Task SendAsync(string toEmail, string subject, string htmlBody, CancellationToken cancellationToken);
}
