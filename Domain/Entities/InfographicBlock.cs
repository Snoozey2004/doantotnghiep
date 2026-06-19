public class InfographicBlock
{
     public Guid Id { get; set; }
     public Guid ProductInfographicId { get; set; }
     public ProductInfographic ProductInfographic { get; set; } = null!;
     public InfographicBlockType BlockType { get; set; }
     public InfographicLayoutType LayoutType { get; set; }
     public int SortOrder { get; set; }
     public bool IsVisible { get; set; } = true;
     public string DataJson { get; set; } = string.Empty;
     public DateTime CreatedAt { get; set; }
     public DateTime UpdatedAt { get; set; }
}