using Microsoft.AspNetCore.Http;

namespace WebApplication1.Application.DTOs.MediaDTOs;

public class UploadRequestDto
{
    public IFormFile File { get; set; } = default!;
    public string? Folder { get; set; }
    public string? ProvinceId { get; set; }
    public string? ProvinceName { get; set; }
    public string? MediaType { get; set; }
}
