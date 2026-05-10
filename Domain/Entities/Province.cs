namespace WebApplication1.Domain.Entities;

public class Province
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public LandingPageConfig? LandingPageConfig { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<MediaItem> MediaItems { get; set; } = new List<MediaItem>();
}
