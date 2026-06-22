using System.Text.Json;
using WebApplication1.Application.DTOs.MapMarkerDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class MapMarkerService : IMapMarkerService
{
    private readonly string _filePath;
    private static readonly SemaphoreSlim _lock = new(1, 1);
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true
    };

    public MapMarkerService(IWebHostEnvironment environment)
    {
        var dir = Path.Combine(environment.ContentRootPath, "App_Data");
        Directory.CreateDirectory(dir);
        _filePath = Path.Combine(dir, "map-markers.json");
    }

    public async Task<IReadOnlyList<MapMarkerDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        await _lock.WaitAsync(cancellationToken);
        try
        {
            if (!File.Exists(_filePath))
            {
                return Array.Empty<MapMarkerDto>();
            }

            var json = await File.ReadAllTextAsync(_filePath, cancellationToken);
            if (string.IsNullOrWhiteSpace(json))
            {
                return Array.Empty<MapMarkerDto>();
            }

            return JsonSerializer.Deserialize<List<MapMarkerDto>>(json, _jsonOptions) ?? new List<MapMarkerDto>();
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task SaveAllAsync(IEnumerable<MapMarkerDto> markers, CancellationToken cancellationToken)
    {
        await _lock.WaitAsync(cancellationToken);
        try
        {
            var json = JsonSerializer.Serialize(markers, _jsonOptions);
            await File.WriteAllTextAsync(_filePath, json, cancellationToken);
        }
        finally
        {
            _lock.Release();
        }
    }
}
