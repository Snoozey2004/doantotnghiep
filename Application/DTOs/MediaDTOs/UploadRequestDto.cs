using Microsoft.AspNetCore.Http;

namespace WebApplication1.Application.DTOs.MediaDTOs;

public class UploadRequestDto
{
    public IFormFile File { get; set; } = default!;
    public string? Folder { get; set; }
}
