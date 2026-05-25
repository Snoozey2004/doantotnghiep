namespace WebApplication1.Application.DTOs.ProvinceDTOs;

public class ProvinceCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Overview { get; set; } = string.Empty;
    public string KeyFeatures { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string Introduction { get; set; } = string.Empty;
    public string IntroductionEn { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Tags { get; set; } = string.Empty;
    public bool IsHighlighted { get; set; }
    public int HighlightOrder { get; set; }
    public string Slug { get; set; } = string.Empty;
}
