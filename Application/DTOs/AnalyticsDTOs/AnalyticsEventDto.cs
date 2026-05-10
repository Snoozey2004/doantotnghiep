namespace WebApplication1.Application.DTOs.AnalyticsDTOs;

public class AnalyticsEventDto
{
    public Guid Id { get; set; }
    public Guid? ProvinceId { get; set; }
    public Guid? ProductId { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string MetadataJson { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
