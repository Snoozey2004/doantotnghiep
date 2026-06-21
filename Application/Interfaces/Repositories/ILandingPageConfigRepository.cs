using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Interfaces.Repositories;

public interface ILandingPageConfigRepository
{
    Task<LandingPageConfig?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<LandingPageConfig?> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken);
    Task<LandingPageConfig?> GetByProvinceSlugAsync(string slug, CancellationToken cancellationToken);
    Task<IEnumerable<(string Slug, string BackgroundUrl)>> GetAllBackgroundsAsync(CancellationToken cancellationToken);
    Task AddAsync(LandingPageConfig config, CancellationToken cancellationToken);
    Task UpdateAsync(LandingPageConfig config, CancellationToken cancellationToken);
    Task DeleteAsync(LandingPageConfig config, CancellationToken cancellationToken);
}
