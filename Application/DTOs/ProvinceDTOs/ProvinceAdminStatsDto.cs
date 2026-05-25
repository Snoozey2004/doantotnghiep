namespace WebApplication1.Application.DTOs.ProvinceDTOs;

public class ProvinceAdminStatsDto
{
    public Guid ProvinceId { get; set; }
    public int PostCount { get; set; }
    public int MediaCount { get; set; }
    public int HighlightedPostCount { get; set; }
    public int HighlightedMediaCount { get; set; }
}
