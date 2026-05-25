namespace WebApplication1.Application.DTOs.SearchDTOs;

public class SearchItemDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? VideoUrl { get; set; }
    public string ItemType { get; set; } = string.Empty; // Province, Post, Media, Product
    public Guid? ProvinceId { get; set; }
    public string? ProvinceName { get; set; }
    public string? Slug { get; set; }
    public string? Region { get; set; }
    public string? Category { get; set; }
    public string? MediaType { get; set; }
    public string Tags { get; set; } = string.Empty;
    public bool IsHighlighted { get; set; }
    public int RelevanceScore { get; set; } // 0-100, where 100 is most relevant
    public DateTime CreatedAt { get; set; }
}
