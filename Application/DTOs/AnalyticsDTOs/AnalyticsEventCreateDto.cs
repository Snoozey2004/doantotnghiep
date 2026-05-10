namespace WebApplication1.Application.DTOs.AnalyticsDTOs;

public class AnalyticsEventCreateDto
{
    public Guid? ProvinceId { get; set; }
    public Guid? ProductId { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string MetadataJson { get; set; } = string.Empty;
}
