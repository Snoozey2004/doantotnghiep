namespace WebApplication1.Domain.Entities;

public class Post
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property ContentEn.
    public string ContentEn { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property Tags.
    public string Tags { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property IsHighlighted.
    public bool IsHighlighted { get; set; }
    // MANUAL MIGRATION REQUIRED: added property HighlightOrder.
    public int HighlightOrder { get; set; }
    // MANUAL MIGRATION REQUIRED: added property RevisionNumber.
    public int RevisionNumber { get; set; }
    // MANUAL MIGRATION REQUIRED: added property LastUpdatedAt.
    public DateTime? LastUpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Province? Province { get; set; }
}
