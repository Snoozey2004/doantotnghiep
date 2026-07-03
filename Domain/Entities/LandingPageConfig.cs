namespace WebApplication1.Domain.Entities;

public class LandingPageConfig
{
    public Guid Id { get; set; }
    public Guid ProvinceId { get; set; }
    public string ThemeColor { get; set; } = string.Empty;
    public string FontFamily { get; set; } = string.Empty;
    public string BackgroundUrl { get; set; } = string.Empty;
    public string Layout { get; set; } = string.Empty;
    public string SectionColorsJson { get; set; } = string.Empty;
    public string SectionOrderJson { get; set; } = string.Empty;
    public string SectionVisibilityJson { get; set; } = string.Empty;
    // Nội dung tùy chỉnh từng section (slogan/description/stats/specialties/culture…)
    // do editor sửa; lưu JSON opaque, merge đè lên provinceData ở frontend.
    public string SectionContentJson { get; set; } = string.Empty;
    public Province? Province { get; set; }
    public ICollection<UIBlock> Blocks { get; set; } = new List<UIBlock>();
}
