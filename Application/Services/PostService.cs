using AutoMapper;
using WebApplication1.Application.DTOs.PostDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IMapper _mapper;

    public PostService(IPostRepository postRepository, IProvinceRepository provinceRepository, IMapper mapper)
    {
        _postRepository = postRepository;
        _provinceRepository = provinceRepository;
        _mapper = mapper;
    }

    public async Task<List<PostDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        var posts = await _postRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<List<PostDto>>(posts);
    }

    public async Task<PostDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        return post is null ? null : _mapper.Map<PostDto>(post);
    }

    public async Task<PostDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetBySlugAsync(slug, cancellationToken);
        return post is null ? null : _mapper.Map<PostDto>(post);
    }

    public async Task<List<PostDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        var posts = await _postRepository.GetByProvinceIdAsync(provinceId, cancellationToken);
        return _mapper.Map<List<PostDto>>(posts);
    }

    public async Task<List<PostDto>> SearchAsync(string? keyword, Guid? provinceId, string? category, CancellationToken cancellationToken)
    {
        var posts = await _postRepository.SearchAsync(keyword, provinceId, category, cancellationToken);
        return _mapper.Map<List<PostDto>>(posts);
    }

    public async Task<PostDto?> UpdateHighlightsAsync(Guid id, PostHighlightUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        if (post is null)
        {
            return null;
        }

        post.IsHighlighted = dto.IsHighlighted;
        post.HighlightOrder = dto.HighlightOrder;
        post.LastUpdatedAt = DateTime.UtcNow;
        post.RevisionNumber += 1;
        await _postRepository.UpdateAsync(post, cancellationToken);
        return _mapper.Map<PostDto>(post);
    }

    public async Task<PostDto?> UpdateTagsAsync(Guid id, PostTagUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        if (post is null)
        {
            return null;
        }

        post.Tags = dto.Tags;
        post.LastUpdatedAt = DateTime.UtcNow;
        post.RevisionNumber += 1;
        await _postRepository.UpdateAsync(post, cancellationToken);
        return _mapper.Map<PostDto>(post);
    }

    public async Task<PostDto> CreateAsync(PostCreateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(dto.ProvinceId, cancellationToken);
        if (province is null)
        {
            throw new InvalidOperationException("Province not found.");
        }

        var post = _mapper.Map<Post>(dto);
        var createdAt = DateTime.UtcNow;
        post.Id = Guid.NewGuid();
        post.CreatedAt = createdAt;
        post.RevisionNumber = 1;
        post.LastUpdatedAt = createdAt;
        await _postRepository.AddAsync(post, cancellationToken);
        return _mapper.Map<PostDto>(post);
    }

    public async Task<PostDto?> UpdateAsync(Guid id, PostUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        if (post is null)
        {
            return null;
        }

        _mapper.Map(dto, post);
        post.LastUpdatedAt = DateTime.UtcNow;
        post.RevisionNumber = post.RevisionNumber + 1;
        await _postRepository.UpdateAsync(post, cancellationToken);
        return _mapper.Map<PostDto>(post);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        if (post is null)
        {
            return false;
        }

        await _postRepository.DeleteAsync(post, cancellationToken);
        return true;
    }
}
