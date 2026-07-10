using AutoMapper;
using System.Text.Json;
using WebApplication1.Application.DTOs.MediaDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class MediaItemService : IMediaItemService
{
    private readonly IMediaItemRepository _mediaRepository;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IMapper _mapper;

    public MediaItemService(IMediaItemRepository mediaRepository, IProvinceRepository provinceRepository, IMapper mapper)
    {
        _mediaRepository = mediaRepository;
        _provinceRepository = provinceRepository;
        _mapper = mapper;
    }

    public async Task<List<MediaItemDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        var items = await _mediaRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<List<MediaItemDto>>(items);
    }

    public async Task<MediaItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var item = await _mediaRepository.GetByIdAsync(id, cancellationToken);
        return item is null ? null : _mapper.Map<MediaItemDto>(item);
    }

    public async Task<List<MediaItemDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        var items = await _mediaRepository.GetByProvinceIdAsync(provinceId, cancellationToken);
        return _mapper.Map<List<MediaItemDto>>(items);
    }

    public async Task<List<MediaItemDto>> SearchAsync(Guid? provinceId, string? mediaType, bool? isFeatured, CancellationToken cancellationToken)
    {
        var items = await _mediaRepository.SearchAsync(provinceId, mediaType, isFeatured, cancellationToken);
        return _mapper.Map<List<MediaItemDto>>(items);
    }

    public async Task<MediaItemDto?> UpdateHighlightsAsync(Guid id, MediaItemHighlightUpdateDto dto, CancellationToken cancellationToken)
    {
        var item = await _mediaRepository.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        AppendMediaVersionSnapshot(item);

        item.IsHighlighted = dto.IsHighlighted;
        item.LastUpdatedAt = DateTime.UtcNow;
        item.RevisionNumber += 1;
        await _mediaRepository.UpdateAsync(item, cancellationToken);
        return _mapper.Map<MediaItemDto>(item);
    }

    public async Task<MediaItemDto?> UpdateTagsAsync(Guid id, MediaItemTagUpdateDto dto, CancellationToken cancellationToken)
    {
        var item = await _mediaRepository.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        AppendMediaVersionSnapshot(item);

        item.Tags = dto.Tags;
        item.LastUpdatedAt = DateTime.UtcNow;
        item.RevisionNumber += 1;
        await _mediaRepository.UpdateAsync(item, cancellationToken);
        return _mapper.Map<MediaItemDto>(item);
    }

    public async Task<MediaItemDto> CreateAsync(MediaItemCreateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(dto.ProvinceId, cancellationToken);
        if (province is null)
        {
            throw new InvalidOperationException("Province not found.");
        }

        var item = _mapper.Map<MediaItem>(dto);
        var createdAt = DateTime.UtcNow;
        item.Id = Guid.NewGuid();
        item.RevisionNumber = 1;
        item.LastUpdatedAt = createdAt;
        item.VersionHistoryJson = "[]";
        // Keep the single Url field in sync with the first gallery URL
        if (string.IsNullOrEmpty(item.Url) && dto.Urls?.Count > 0)
        {
            item.Url = dto.Urls[0];
        }
        await _mediaRepository.AddAsync(item, cancellationToken);
        return _mapper.Map<MediaItemDto>(item);
    }

    public async Task<MediaItemDto?> UpdateAsync(Guid id, MediaItemUpdateDto dto, CancellationToken cancellationToken)
    {
        var item = await _mediaRepository.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        var previousRevision = item.RevisionNumber;

        AppendMediaVersionSnapshot(item);

        _mapper.Map(dto, item);
        item.LastUpdatedAt = DateTime.UtcNow;
        item.RevisionNumber = previousRevision + 1;
        await _mediaRepository.UpdateAsync(item, cancellationToken);
        return _mapper.Map<MediaItemDto>(item);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var item = await _mediaRepository.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return false;
        }

        await _mediaRepository.DeleteAsync(item, cancellationToken);
        return true;
    }

    private static void AppendMediaVersionSnapshot(MediaItem item)
    {
        var history = ParseMediaHistory(item.VersionHistoryJson);
        history.Add(new MediaVersionSnapshot
        {
            RevisionNumber = item.RevisionNumber,
            SnapshotAt = item.LastUpdatedAt ?? DateTime.UtcNow,
            MediaType = item.MediaType,
            Title = item.Title,
            Url = item.Url,
            Description = item.Description,
            Tags = item.Tags,
            SortOrder = item.SortOrder,
            IsFeatured = item.IsFeatured,
            IsHighlighted = item.IsHighlighted
        });

        item.VersionHistoryJson = JsonSerializer.Serialize(history);
    }

    private static List<MediaVersionSnapshot> ParseMediaHistory(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return new List<MediaVersionSnapshot>();
        }

        try
        {
            return JsonSerializer.Deserialize<List<MediaVersionSnapshot>>(json) ?? new List<MediaVersionSnapshot>();
        }
        catch
        {
            return new List<MediaVersionSnapshot>();
        }
    }

    private sealed class MediaVersionSnapshot
    {
        public int RevisionNumber { get; set; }
        public DateTime SnapshotAt { get; set; }
        public string MediaType { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty;
        public int SortOrder { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsHighlighted { get; set; }
    }
}
