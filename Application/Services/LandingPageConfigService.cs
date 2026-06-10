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

    private LandingPageConfigDto ToDto(LandingPageConfig config)
    {
        var dto = _mapper.Map<LandingPageConfigDto>(config);
        dto.SectionColors = DeserializeSectionColors(config.SectionColorsJson);
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
