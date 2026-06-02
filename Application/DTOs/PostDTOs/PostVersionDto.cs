namespace WebApplication1.Application.DTOs.PostDTOs;

public class PostVersionDto
{
    public int RevisionNumber { get; set; }
    public DateTime SnapshotAt { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string ContentEn { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Tags { get; set; } = string.Empty;
    public bool IsHighlighted { get; set; }
    public int HighlightOrder { get; set; }
}
