using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface IProvinceRepository
{
    Task<List<Province>> GetAllAsync(CancellationToken cancellationToken);
    Task<Province?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<Province?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<List<Province>> SearchAsync(string? keyword, string? region, CancellationToken cancellationToken);
    Task<List<Province>> GetRelatedAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<ProvinceAdminStats> GetStatsAsync(Guid provinceId, CancellationToken cancellationToken);
    Task AddAsync(Province province, CancellationToken cancellationToken);
    Task UpdateAsync(Province province, CancellationToken cancellationToken);
    Task DeleteAsync(Province province, CancellationToken cancellationToken);
}

public record ProvinceAdminStats(int PostCount, int MediaCount, int HighlightedPostCount, int HighlightedMediaCount);
