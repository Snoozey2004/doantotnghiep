namespace WebApplication1.Domain.Entities;

public class LandingPageConfig
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string ThemeColor { get; set; } = string.Empty;
    public string FontFamily { get; set; } = string.Empty;
    public string BackgroundUrl { get; set; } = string.Empty;
    public string Layout { get; set; } = string.Empty;
    public Province? Province { get; set; }
    public ICollection<UIBlock> Blocks { get; set; } = new List<UIBlock>();
}
