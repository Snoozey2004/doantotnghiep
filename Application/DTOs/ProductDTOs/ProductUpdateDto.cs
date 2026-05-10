namespace WebApplication1.Application.DTOs.ProductDTOs;

public class ProductUpdateDto
{
    public Guid ProvinceId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
