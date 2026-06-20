public class ProductInfographicDto
{
    public Guid Id { get; set; }

    public Guid ProductId { get; set; }

    public string Status { get; set; } = string.Empty;

    public List<InfographicBlockDto> Blocks { get; set; }
        = [];
}