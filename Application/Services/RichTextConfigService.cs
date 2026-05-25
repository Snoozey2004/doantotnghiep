using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class RichTextConfigService : IRichTextConfigService
{
    public int MaxBodyLength => 50000; // 50KB of text
    public string[] AllowedImageExtensions => new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
    public int MaxImageSizeBytes => 5_000_000; // 5MB
    public string RichContentImageFolder => "rich-content";
}
