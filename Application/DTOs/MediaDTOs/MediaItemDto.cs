namespace WebApplication1.Application.DTOs.MediaDTOs;

public class MediaItemDto
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string MediaType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Tags { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsHighlighted { get; set; }
    public int RevisionNumber { get; set; }
    public DateTime? LastUpdatedAt { get; set; }
    public string VersionHistoryJson { get; set; } = "[]";
}
