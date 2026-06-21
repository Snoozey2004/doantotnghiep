namespace WebApplication1.Application.DTOs.ProductInfographicsDTOs;

public class CreateInfographicBlockDto
{
    public Guid ProductInfographicId { get; set; }
    public string LayoutType { get; set; } = string.Empty;
    public string BlockType { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsVisible { get; set; }
    public string DataJson { get; set; } = string.Empty;
}