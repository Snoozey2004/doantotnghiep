using WebApplication1.Application.DTOs.ProductDTOs;

public class ProvinceProductsDto
{
    public string ProvinceName { get; set; } = string.Empty;
    public string ProvinceSlug { get; set; } = string.Empty;

    public List<ProductDto> Products { get; set; } = new();
}