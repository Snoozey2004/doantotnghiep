using WebApplication1.Application.DTOs.MapMarkerDTOs;

namespace WebApplication1.Application.Interfaces.Services;

public interface IMapMarkerService
{
    Task<IReadOnlyList<MapMarkerDto>> GetAllAsync(CancellationToken cancellationToken);
    Task SaveAllAsync(IEnumerable<MapMarkerDto> markers, CancellationToken cancellationToken);
}
