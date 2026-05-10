using WebApplication1.Application.DTOs.UIBlockDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IUIBlockService
{
    Task<UIBlockDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<UIBlockDto>> GetByConfigIdAsync(Guid configId, CancellationToken cancellationToken);
    Task<UIBlockDto> CreateAsync(Guid configId, UIBlockCreateDto dto, CancellationToken cancellationToken);
    Task<UIBlockDto?> UpdateAsync(Guid id, UIBlockUpdateDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}