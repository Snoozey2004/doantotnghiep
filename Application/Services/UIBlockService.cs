using AutoMapper;
using WebApplication1.Application.DTOs.UIBlockDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class UIBlockService : IUIBlockService
{
    private readonly IUIBlockRepository _blockRepository;
    private readonly ILandingPageConfigRepository _configRepository;
    private readonly IMapper _mapper;

    public UIBlockService(IUIBlockRepository blockRepository, ILandingPageConfigRepository configRepository, IMapper mapper)
    {
        _blockRepository = blockRepository;
        _configRepository = configRepository;
        _mapper = mapper;
    }

    public async Task<UIBlockDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var block = await _blockRepository.GetByIdAsync(id, cancellationToken);
        return block is null ? null : _mapper.Map<UIBlockDto>(block);
    }

    public async Task<List<UIBlockDto>> GetByConfigIdAsync(Guid configId, CancellationToken cancellationToken)
    {
        var blocks = await _blockRepository.GetByConfigIdAsync(configId, cancellationToken);
        return _mapper.Map<List<UIBlockDto>>(blocks);
    }

    public async Task<UIBlockDto> CreateAsync(Guid configId, UIBlockCreateDto dto, CancellationToken cancellationToken)
    {
        var config = await _configRepository.GetByIdAsync(configId, cancellationToken);
        if (config is null)
        {
            throw new InvalidOperationException("Landing page config not found.");
        }

        var block = _mapper.Map<UIBlock>(dto);
        block.Id = Guid.NewGuid();
        block.LandingPageConfigId = configId;
        await _blockRepository.AddAsync(block, cancellationToken);
        return _mapper.Map<UIBlockDto>(block);
    }

    public async Task<UIBlockDto?> UpdateAsync(Guid id, UIBlockUpdateDto dto, CancellationToken cancellationToken)
    {
        var block = await _blockRepository.GetByIdAsync(id, cancellationToken);
        if (block is null)
        {
            return null;
        }

        _mapper.Map(dto, block);
        await _blockRepository.UpdateAsync(block, cancellationToken);
        return _mapper.Map<UIBlockDto>(block);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var block = await _blockRepository.GetByIdAsync(id, cancellationToken);
        if (block is null)
        {
            return false;
        }

        await _blockRepository.DeleteAsync(block, cancellationToken);
        return true;
    }
}
