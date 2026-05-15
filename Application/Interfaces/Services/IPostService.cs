using WebApplication1.Application.DTOs.PostDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IPostService
{
    Task<List<PostDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<PostDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<PostDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<List<PostDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<List<PostDto>> SearchAsync(string? keyword, Guid? provinceId, string? category, CancellationToken cancellationToken);
    Task<PostDto?> UpdateHighlightsAsync(Guid id, PostHighlightUpdateDto dto, CancellationToken cancellationToken);
    Task<PostDto?> UpdateTagsAsync(Guid id, PostTagUpdateDto dto, CancellationToken cancellationToken);
    Task<PostDto> CreateAsync(PostCreateDto dto, CancellationToken cancellationToken);
    Task<PostDto?> UpdateAsync(Guid id, PostUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
