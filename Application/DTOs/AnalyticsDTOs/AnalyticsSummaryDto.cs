namespace WebApplication1.Application.DTOs.AnalyticsDTOs;

public class AnalyticsSummaryDto
{
    public int PageViews { get; set; }
    public int ProductViews { get; set; }
    public int Interactions { get; set; }
    public int ProvinceCount { get; set; }
    public int PostCount { get; set; }
    public int MediaCount { get; set; }
    public int ProductCount { get; set; }
    public int HighlightedProvinceCount { get; set; }
    public int HighlightedPostCount { get; set; }
    public int HighlightedMediaCount { get; set; }
}
