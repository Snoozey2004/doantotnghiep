using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.MediaDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
    private readonly IFileStorageService _fileStorageService;

    public UploadsController(IFileStorageService fileStorageService)
    {
        _fileStorageService = fileStorageService;
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Editor")]
    [RequestSizeLimit(25_000_000)]
    public async Task<ActionResult<UploadResultDto>> Upload([FromForm] UploadRequestDto request, CancellationToken cancellationToken)
    {
        if (request.File is null)
        {
            return BadRequest("File is required.");
        }

        var result = await _fileStorageService.SaveAsync(request.File, request.Folder, cancellationToken);
        return Ok(result);
    }
}
