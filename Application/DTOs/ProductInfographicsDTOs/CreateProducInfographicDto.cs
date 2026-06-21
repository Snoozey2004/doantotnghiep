namespace WebApplication1.Application.DTOs.ProductInfographicsDTOs;

public class CreateProductInfographicDto
{
    public Guid ProductId { get; set; }
    public List<CreateInfographicBlockDto> Blocks { get; set; } = new();
}