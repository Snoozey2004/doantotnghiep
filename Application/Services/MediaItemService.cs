using AutoMapper;
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

    public async Task<MediaItemDto> CreateAsync(MediaItemCreateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(dto.ProvinceId, cancellationToken);
        if (province is null)
        {
            throw new InvalidOperationException("Province not found.");
        }

        var item = _mapper.Map<MediaItem>(dto);
        item.Id = Guid.NewGuid();
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

        _mapper.Map(dto, item);
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
}
