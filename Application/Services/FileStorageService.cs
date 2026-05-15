using WebApplication1.Application.DTOs.MediaDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class FileStorageService : IFileStorageService
{
    private readonly IWebHostEnvironment _environment;

    public FileStorageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<UploadResultDto> SaveAsync(IFormFile file, string? subFolder, CancellationToken cancellationToken)
    {
        if (file.Length <= 0)
        {
            throw new InvalidOperationException("Empty file.");
        }

        var uploadsRoot = Path.Combine(_environment.ContentRootPath, "frontend/Images/uploads");
        var folder = string.IsNullOrWhiteSpace(subFolder) ? uploadsRoot : Path.Combine(uploadsRoot, subFolder);
        Directory.CreateDirectory(folder);

        var extension = Path.GetExtension(file.FileName);
        var sanitizedName = Path.GetFileNameWithoutExtension(file.FileName)
            .Replace(" ", "-")
            .Replace("..", "-");
        var fileName = $"{sanitizedName}-{Guid.NewGuid():N}{extension}";
        var filePath = Path.Combine(folder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write);
        await file.CopyToAsync(stream, cancellationToken);

        var relativeFolder = string.IsNullOrWhiteSpace(subFolder) ? "uploads" : $"uploads/{subFolder}";
        var url = $"/{relativeFolder}/{fileName}";

        return new UploadResultDto
        {
            FileName = fileName,
            Url = url,
            Size = file.Length
        };
    }
}
