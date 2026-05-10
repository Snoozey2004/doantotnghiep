namespace WebApplication1.Domain.Entities;

public class AnalyticsEvent
{
    public Guid Id { get; set; }
    public Guid? ProvinceId { get; set; }
    public Guid? ProductId { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string MetadataJson { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Province? Province { get; set; }
    public Product? Product { get; set; }
}
