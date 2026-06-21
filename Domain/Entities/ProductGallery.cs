using WebApplication1.Domain.Entities;

public class ProductGallery
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}