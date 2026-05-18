using WebApplication1.Application.DTOs.MediaDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class FileStorageService : IFileStorageService
{
    private readonly IWebHostEnvironment _environment;
    private static readonly Dictionary<string, int> FileCounters = new();

    // Allowed MIME types
    private static readonly HashSet<string> AllowedMimeTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/quicktime",
        "video/x-m4v",
        "video/webm",
        "application/pdf"
    };

    // Allowed file extensions
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".gif", ".webp",
        ".mp4", ".mov", ".m4v", ".webm",
        ".pdf"
    };

    private const long MaxFileSize = 25_000_000; // 25 MB

    public FileStorageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<UploadResultDto> SaveAsync(IFormFile file, string? subFolder, CancellationToken cancellationToken)
    {
        return await SaveAsync(file, subFolder, null, null, null, cancellationToken);
    }

    public async Task<UploadResultDto> SaveAsync(IFormFile file, string? subFolder, string? provinceId, string? provinceName, string? mediaType, CancellationToken cancellationToken)
    {
        // Validate file
        ValidateFile(file);

        if (file.Length <= 0)
        {
            throw new InvalidOperationException("Empty file.");
        }

        var uploadsRoot = Path.Combine(_environment.ContentRootPath, "frontend/Images/uploads");
        var folder = string.IsNullOrWhiteSpace(subFolder) ? uploadsRoot : Path.Combine(uploadsRoot, subFolder);
        Directory.CreateDirectory(folder);

        var extension = Path.GetExtension(file.FileName);
        string fileName;

        // Generate custom filename if province info is provided
        if (!string.IsNullOrWhiteSpace(provinceId) && !string.IsNullOrWhiteSpace(provinceName) && !string.IsNullOrWhiteSpace(mediaType))
        {
            // Format: {provinceName}_{mediaType}_{counter}.{ext}
            var sanitizedProvinceName = provinceName.Replace(" ", "-").Replace(".", "-");
            var counterKey = $"{sanitizedProvinceName}_{mediaType}";

            if (!FileCounters.ContainsKey(counterKey))
            {
                FileCounters[counterKey] = 1;
            }
            else
            {
                FileCounters[counterKey]++;
            }

            fileName = $"{sanitizedProvinceName}_{mediaType}_{FileCounters[counterKey]}{extension}";
        }
        else if (!string.IsNullOrWhiteSpace(provinceName) && !string.IsNullOrWhiteSpace(mediaType))
        {
            // For new provinces without ID (create form): {provinceName}_{mediaType}_{counter}.{ext}
            var sanitizedProvinceName = provinceName.Replace(" ", "-").Replace(".", "-");
            var counterKey = $"temp_{mediaType}";

            if (!FileCounters.ContainsKey(counterKey))
            {
                FileCounters[counterKey] = 1;
            }
            else
            {
                FileCounters[counterKey]++;
            }

            fileName = $"{sanitizedProvinceName}_{mediaType}_{FileCounters[counterKey]}{extension}";
        }
        else
        {
            // Default behavior: sanitized filename with GUID
            var sanitizedName = Path.GetFileNameWithoutExtension(file.FileName)
                .Replace(" ", "-")
                .Replace("..", "-");
            fileName = $"{sanitizedName}-{Guid.NewGuid():N}{extension}";
        }

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

    private static void ValidateFile(IFormFile file)
    {
        if (file == null)
        {
            throw new InvalidOperationException("File is required.");
        }

        // Check file size
        if (file.Length > MaxFileSize)
        {
            throw new InvalidOperationException($"File size exceeds maximum allowed size of {MaxFileSize / 1_000_000}MB.");
        }

        // Check file extension
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(extension))
        {
            throw new InvalidOperationException($"File type '{extension}' is not allowed. Allowed types: {string.Join(", ", AllowedExtensions)}");
        }

        // Check MIME type
        if (!AllowedMimeTypes.Contains(file.ContentType))
        {
            throw new InvalidOperationException($"File MIME type '{file.ContentType}' is not allowed.");
        }

        // Validate filename doesn't contain path traversal attempts
        var fileName = Path.GetFileName(file.FileName);
        if (fileName != file.FileName || fileName.Contains("..") || fileName.Contains("/") || fileName.Contains("\\"))
        {
            throw new InvalidOperationException("Invalid filename detected.");
        }
    }
}
