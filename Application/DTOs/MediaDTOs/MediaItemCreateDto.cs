namespace WebApplication1.Application.DTOs.MediaDTOs;

public class MediaItemCreateDto
{
    public Guid ProvinceId { get; set; }
    public string MediaType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    /// <summary>Multiple URLs for gallery collections.</summary>
    public List<string> Urls { get; set; } = new();
    public string Description { get; set; } = string.Empty;
    public string Tags { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsHighlighted { get; set; }
}
