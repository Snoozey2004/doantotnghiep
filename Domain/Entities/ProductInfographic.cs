using WebApplication1.Domain.Entities;

public class ProductInfographic
{
    public Guid Id { get; set; }

    public Guid ProductId { get; set; }

    public Product Product { get; set; } = null!;

    public InfographicStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? PublishedAt { get; set; }

    public ICollection<InfographicBlock> Blocks { get; set; }
        = new List<InfographicBlock>();
}