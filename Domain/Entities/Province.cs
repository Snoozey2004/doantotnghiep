namespace WebApplication1.Domain.Entities;

public class Province
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property Overview.
    public string Overview { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property KeyFeatures.
    public string KeyFeatures { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property Introduction.
    public string Introduction { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property IntroductionEn.
    public string IntroductionEn { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property Body.
    public string Body { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property Tags.
    public string Tags { get; set; } = string.Empty;
    // MANUAL MIGRATION REQUIRED: added property IsHighlighted.
    public bool IsHighlighted { get; set; }
    // MANUAL MIGRATION REQUIRED: added property HighlightOrder.
    public int HighlightOrder { get; set; }
    public string Slug { get; set; } = string.Empty;
    public LandingPageConfig? LandingPageConfig { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<MediaItem> MediaItems { get; set; } = new List<MediaItem>();
}
