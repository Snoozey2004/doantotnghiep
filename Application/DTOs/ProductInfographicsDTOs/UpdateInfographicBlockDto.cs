public class UpdateInfographicBlockDto
{
    public string BlockType { get; set; }
        = string.Empty;
    public string LayoutType { get; set; }
        = string.Empty;
    public int SortOrder { get; set; }
    public bool IsVisible { get; set; }
    public string DataJson { get; set; }
        = string.Empty;
}