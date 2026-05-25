namespace WebApplication1.Application.DTOs.SearchDTOs;

public class SearchFilterDto
{
    public string? Keyword { get; set; }
    public string? Region { get; set; }
    public Guid? ProvinceId { get; set; }
    public string? Category { get; set; } // History, Culture, Tourism, Cuisine, Festival
    public string? MediaType { get; set; } // Image, Video
    public string? Tags { get; set; } // Comma-separated tags
    public string? ContentType { get; set; } // All, Province, Post, Media, Product
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SortBy { get; set; } = "relevance"; // relevance, date, highlight
}
