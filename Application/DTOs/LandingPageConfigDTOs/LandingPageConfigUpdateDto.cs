using System.Text.Json;
using WebApplication1.Application.DTOs.UIBlockDTOs;

namespace WebApplication1.Application.DTOs.LandingPageConfigDTOs;

public class LandingPageConfigUpdateDto
{
    public string ThemeColor { get; set; } = string.Empty;
    public string FontFamily { get; set; } = string.Empty;
    public string BackgroundUrl { get; set; } = string.Empty;
    public string Layout { get; set; } = string.Empty;
    public Dictionary<string, string> SectionColors { get; set; } = new();
    public List<string>? SectionOrder { get; set; }
    public Dictionary<string, bool>? SectionVisibility { get; set; }
    public JsonElement? SectionContent { get; set; }
    public List<UIBlockUpdateDto>? Blocks { get; set; }
}
