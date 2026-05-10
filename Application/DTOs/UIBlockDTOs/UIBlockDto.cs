namespace WebApplication1.Application.DTOs.UIBlockDTOs;

public class UIBlockDto
{
    public Guid Id { get; set; }
    public Guid LandingPageConfigId { get; set; }
    public string BlockType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ContentJson { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsEnabled { get; set; }
}
