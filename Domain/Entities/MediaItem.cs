namespace WebApplication1.Domain.Entities;

public class MediaItem
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string MediaType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsFeatured { get; set; }
    public Province? Province { get; set; }
}
