using WebApplication1.Domain.Enums;

namespace WebApplication1.Application.DTOs.ProductDTOs;

public class ProductDto
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public decimal? Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; }
    public ProductType Type { get; set; }
}