using WebApplication1.Application.DTOs.MediaDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IFileStorageService
{
    Task<UploadResultDto> SaveAsync(IFormFile file, string? subFolder, CancellationToken cancellationToken);
}
