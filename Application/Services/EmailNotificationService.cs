using System.Net;
using System.Net.Mail;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class EmailNotificationService : IEmailNotificationService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailNotificationService> _logger;

    public EmailNotificationService(IConfiguration configuration, ILogger<EmailNotificationService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, CancellationToken cancellationToken)
    {
        var section = _configuration.GetSection("Email:Smtp");
        var host = section["Host"];
        var fromEmail = section["FromEmail"];
        var fromName = section["FromName"] ?? "Vietnam Identity";

        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(fromEmail))
        {
            _logger.LogWarning("Email SMTP is not configured. Skip sending email to {Email}", toEmail);
            return;
        }

        var port = int.TryParse(section["Port"], out var smtpPort) ? smtpPort : 587;
        var enableSsl = !bool.TryParse(section["EnableSsl"], out var useSsl) || useSsl;
        var username = section["Username"];
        var password = section["Password"];

        using var message = new MailMessage
        {
            From = new MailAddress(fromEmail, fromName),
            Subject = subject,
            Body = htmlBody,
            IsBodyHtml = true
        };

        message.To.Add(toEmail);

        using var client = new SmtpClient(host, port)
        {
            EnableSsl = enableSsl
        };

        if (!string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password))
        {
            client.Credentials = new NetworkCredential(username, password);
        }

        cancellationToken.ThrowIfCancellationRequested();
        await client.SendMailAsync(message);
    }
}
