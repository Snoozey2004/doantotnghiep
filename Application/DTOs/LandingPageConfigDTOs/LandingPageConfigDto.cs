using WebApplication1.Application.DTOs.UIBlockDTOs;

namespace WebApplication1.Application.DTOs.LandingPageConfigDTOs;

public class LandingPageConfigDto
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string ThemeColor { get; set; } = string.Empty;
    public string FontFamily { get; set; } = string.Empty;
    public string BackgroundUrl { get; set; } = string.Empty;
    public string Layout { get; set; } = string.Empty;
    public Dictionary<string, string> SectionColors { get; set; } = new();
    public List<UIBlockDto> Blocks { get; set; } = new();
}
