using AutoMapper;
using System.Text.Json;
using WebApplication1.Application.DTOs.LandingPageConfigDTOs;
using WebApplication1.Application.DTOs.UIBlockDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class LandingPageConfigService : ILandingPageConfigService
{
    private readonly ILandingPageConfigRepository _configRepository;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IMapper _mapper;

    public LandingPageConfigService(
        ILandingPageConfigRepository configRepository,
        IProvinceRepository provinceRepository,
        IMapper mapper)
    {
        _configRepository = configRepository;
        _provinceRepository = provinceRepository;
        _mapper = mapper;
    }

    private static Dictionary<string, string> DeserializeSectionColors(string json)
    {
        if (string.IsNullOrEmpty(json)) return new Dictionary<string, string>();
        try { return JsonSerializer.Deserialize<Dictionary<string, string>>(json) ?? new Dictionary<string, string>(); }
        catch { return new Dictionary<string, string>(); }
    }

    private static string SerializeSectionColors(Dictionary<string, string>? dict) =>
        dict != null && dict.Count > 0 ? JsonSerializer.Serialize(dict) : string.Empty;

    private static List<string> DeserializeSectionOrder(string json)
    {
        if (string.IsNullOrEmpty(json)) return new List<string>();
        try { return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>(); }
        catch { return new List<string>(); }
    }

    private static string SerializeSectionOrder(List<string>? list) =>
        list != null && list.Count > 0 ? JsonSerializer.Serialize(list) : string.Empty;

    private static Dictionary<string, bool> DeserializeSectionVisibility(string json)
    {
        if (string.IsNullOrEmpty(json)) return new Dictionary<string, bool>();
        try { return JsonSerializer.Deserialize<Dictionary<string, bool>>(json) ?? new Dictionary<string, bool>(); }
        catch { return new Dictionary<string, bool>(); }
    }

    private static string SerializeSectionVisibility(Dictionary<string, bool>? dict) =>
        dict != null && dict.Count > 0 ? JsonSerializer.Serialize(dict) : string.Empty;

    // Nội dung section: lưu/đọc JSON opaque (object lồng mảng do editor sửa).
    private static JsonElement? DeserializeSectionContent(string json)
    {
        if (string.IsNullOrWhiteSpace(json)) return null;
        try { return JsonSerializer.Deserialize<JsonElement>(json); }
        catch { return null; }
    }

    private static string SerializeSectionContent(JsonElement? el) =>
        el.HasValue ? el.Value.GetRawText() : string.Empty;

    private LandingPageConfigDto ToDto(LandingPageConfig config)
    {
        var dto = _mapper.Map<LandingPageConfigDto>(config);
        dto.SectionColors = DeserializeSectionColors(config.SectionColorsJson);
        dto.SectionOrder = DeserializeSectionOrder(config.SectionOrderJson);
        dto.SectionVisibility = DeserializeSectionVisibility(config.SectionVisibilityJson);
        dto.SectionContent = DeserializeSectionContent(config.SectionContentJson);
        return dto;
    }

    public async Task<LandingPageConfigDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var config = await _configRepository.GetByIdAsync(id, cancellationToken);
        return config is null ? null : ToDto(config);
    }

    public async Task<LandingPageConfigDto?> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        var config = await _configRepository.GetByProvinceIdAsync(provinceId, cancellationToken);
        return config is null ? null : ToDto(config);
    }

    public async Task<LandingPageConfigDto?> GetByProvinceSlugAsync(string slug, CancellationToken cancellationToken)
    {
        var config = await _configRepository.GetByProvinceSlugAsync(slug, cancellationToken);
        return config is null ? null : ToDto(config);
    }

    public async Task<IEnumerable<ProvinceBackgroundDto>> GetAllBackgroundsAsync(CancellationToken cancellationToken)
    {
        var pairs = await _configRepository.GetAllBackgroundsAsync(cancellationToken);
        return pairs.Select(p => new ProvinceBackgroundDto(p.Slug, p.BackgroundUrl));
    }

    public async Task<LandingPageConfigDto> CreateAsync(LandingPageConfigCreateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(dto.ProvinceId, cancellationToken);
        if (province is null)
        {
            throw new InvalidOperationException("Province not found.");
        }

        var config = _mapper.Map<LandingPageConfig>(dto);
        config.Id = Guid.NewGuid();
        config.SectionColorsJson = SerializeSectionColors(dto.SectionColors);
        config.SectionOrderJson = SerializeSectionOrder(dto.SectionOrder);
        config.SectionVisibilityJson = SerializeSectionVisibility(dto.SectionVisibility);
        config.SectionContentJson = SerializeSectionContent(dto.SectionContent);
        config.Blocks = dto.Blocks.Select(MapCreateBlock).ToList();
        await _configRepository.AddAsync(config, cancellationToken);
        return ToDto(config);
    }

    public async Task<LandingPageConfigDto?> UpdateAsync(Guid id, LandingPageConfigUpdateDto dto, CancellationToken cancellationToken)
    {
        var config = await _configRepository.GetByIdAsync(id, cancellationToken);
        if (config is null)
        {
            return null;
        }

        _mapper.Map(dto, config);
        config.SectionColorsJson = SerializeSectionColors(dto.SectionColors);
        if (dto.SectionOrder != null)
            config.SectionOrderJson = SerializeSectionOrder(dto.SectionOrder);
        if (dto.SectionVisibility != null)
            config.SectionVisibilityJson = SerializeSectionVisibility(dto.SectionVisibility);
        if (dto.SectionContent != null)
            config.SectionContentJson = SerializeSectionContent(dto.SectionContent);
        if (dto.Blocks != null)
            config.Blocks = dto.Blocks.Select(block => MapUpdateBlock(block, config.Id)).ToList();
        await _configRepository.UpdateAsync(config, cancellationToken);
        return ToDto(config);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var config = await _configRepository.GetByIdAsync(id, cancellationToken);
        if (config is null)
        {
            return false;
        }

        await _configRepository.DeleteAsync(config, cancellationToken);
        return true;
    }

    private static UIBlock MapCreateBlock(UIBlockCreateDto dto)
    {
        return new UIBlock
        {
            Id = Guid.NewGuid(),
            BlockType = dto.BlockType,
            Title = dto.Title,
            ContentJson = dto.ContentJson,
            SortOrder = dto.SortOrder,
            IsEnabled = dto.IsEnabled
        };
    }

    private static UIBlock MapUpdateBlock(UIBlockUpdateDto dto, Guid configId)
    {
        return new UIBlock
        {
            Id = dto.Id ?? Guid.NewGuid(),
            LandingPageConfigId = configId,
            BlockType = dto.BlockType,
            Title = dto.Title,
            ContentJson = dto.ContentJson,
            SortOrder = dto.SortOrder,
            IsEnabled = dto.IsEnabled
        };
    }
}
