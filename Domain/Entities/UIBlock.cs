namespace WebApplication1.Domain.Entities;

public class UIBlock
{
    public Guid Id { get; set; }
    public Guid LandingPageConfigId { get; set; }
    public string BlockType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ContentJson { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsEnabled { get; set; } = true;
    public LandingPageConfig? LandingPageConfig { get; set; }
}
