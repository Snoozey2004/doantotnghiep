using System.Text.RegularExpressions;

namespace WebApplication1.Application.Interfaces.Services;

public interface IHtmlSanitizationService
{
    string Sanitize(string? html);
    bool IsValidHtml(string? html);
}
