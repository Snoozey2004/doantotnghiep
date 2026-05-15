using AutoMapper;
using WebApplication1.Application.DTOs.ProvinceDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class ProvinceService : IProvinceService
{
    private readonly IProvinceRepository _provinceRepository;
    private readonly IMapper _mapper;

    public ProvinceService(IProvinceRepository provinceRepository, IMapper mapper)
    {
        _provinceRepository = provinceRepository;
        _mapper = mapper;
    }

    public async Task<List<ProvinceDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        var provinces = await _provinceRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<List<ProvinceDto>>(provinces);
    }

    public async Task<ProvinceDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(id, cancellationToken);
        return province is null ? null : _mapper.Map<ProvinceDto>(province);
    }

    public async Task<ProvinceDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetBySlugAsync(slug, cancellationToken);
        return province is null ? null : _mapper.Map<ProvinceDto>(province);
    }

    public async Task<List<ProvinceDto>> SearchAsync(string? keyword, string? region, CancellationToken cancellationToken)
    {
        var provinces = await _provinceRepository.SearchAsync(keyword, region, cancellationToken);
        return _mapper.Map<List<ProvinceDto>>(provinces);
    }

    public async Task<List<ProvinceRelatedDto>> GetRelatedAsync(Guid id, CancellationToken cancellationToken)
    {
        var relatedProvinces = await _provinceRepository.GetRelatedAsync(id, cancellationToken);
        return _mapper.Map<List<ProvinceRelatedDto>>(relatedProvinces);
    }

    public async Task<ProvinceDto?> UpdateHighlightsAsync(Guid id, ProvinceHighlightUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(id, cancellationToken);
        if (province is null)
        {
            return null;
        }

        province.IsHighlighted = dto.IsHighlighted;
        province.HighlightOrder = dto.HighlightOrder;
        await _provinceRepository.UpdateAsync(province, cancellationToken);
        return _mapper.Map<ProvinceDto>(province);
    }

    public async Task<ProvinceDto?> UpdateTagsAsync(Guid id, ProvinceTagUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(id, cancellationToken);
        if (province is null)
        {
            return null;
        }

        province.Tags = dto.Tags;
        await _provinceRepository.UpdateAsync(province, cancellationToken);
        return _mapper.Map<ProvinceDto>(province);
    }

    public async Task<ProvinceAdminStatsDto?> GetStatsAsync(Guid id, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(id, cancellationToken);
        if (province is null)
        {
            return null;
        }

        var stats = await _provinceRepository.GetStatsAsync(id, cancellationToken);
        return new ProvinceAdminStatsDto
        {
            ProvinceId = id,
            PostCount = stats.PostCount,
            MediaCount = stats.MediaCount,
            HighlightedPostCount = stats.HighlightedPostCount,
            HighlightedMediaCount = stats.HighlightedMediaCount
        };
    }

    public async Task<ProvinceDto> CreateAsync(ProvinceCreateDto dto, CancellationToken cancellationToken)
    {
        var province = _mapper.Map<Province>(dto);
        province.Id = Guid.NewGuid();
        await _provinceRepository.AddAsync(province, cancellationToken);
        return _mapper.Map<ProvinceDto>(province);
    }

    public async Task<ProvinceDto?> UpdateAsync(Guid id, ProvinceUpdateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(id, cancellationToken);
        if (province is null)
        {
            return null;
        }

        _mapper.Map(dto, province);
        await _provinceRepository.UpdateAsync(province, cancellationToken);
        return _mapper.Map<ProvinceDto>(province);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(id, cancellationToken);
        if (province is null)
        {
            return false;
        }

        await _provinceRepository.DeleteAsync(province, cancellationToken);
        return true;
    }
}
