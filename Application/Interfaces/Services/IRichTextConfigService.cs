namespace WebApplication1.Application.Interfaces.Services;

public interface IRichTextConfigService
{
    int MaxBodyLength { get; }
    string[] AllowedImageExtensions { get; }
    int MaxImageSizeBytes { get; }
    string RichContentImageFolder { get; }
}
