namespace WebApplication1.Application.DTOs.UIBlockDTOs;

public class UIBlockUpdateDto
{
    public Guid? Id { get; set; } = null;
    public string BlockType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ContentJson { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsEnabled { get; set; } = true;
}
