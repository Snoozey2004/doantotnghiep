namespace WebApplication1.Application.DTOs.MediaDTOs;

public class UploadResultDto
{
    public string FileName { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public long Size { get; set; }
}
