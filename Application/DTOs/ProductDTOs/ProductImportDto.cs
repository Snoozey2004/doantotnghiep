namespace WebApplication1.Application.DTOs.ProductDTOs;

public class ProductImportDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }

    public string ProvinceSlug { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}