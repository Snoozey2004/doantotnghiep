namespace WebApplication1.Domain.Entities;

public class MediaItem
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string MediaType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property ImageUrls (JSON array of additional image URLs).
    public string ImageUrls { get; set; } = "[]";
    public string Description { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property Tags.
    public string Tags { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsFeatured { get; set; }
    // MANUAL MIGRATION REQUIRED: added property IsHighlighted.
    public bool IsHighlighted { get; set; }
    // MANUAL MIGRATION REQUIRED: added property RevisionNumber.
    public int RevisionNumber { get; set; }
    // MANUAL MIGRATION REQUIRED: added property LastUpdatedAt.
    public DateTime? LastUpdatedAt { get; set; }
    // MANUAL MIGRATION REQUIRED: added property VersionHistoryJson.
    public string VersionHistoryJson { get; set; } = "[]";
    public Province? Province { get; set; }
}
