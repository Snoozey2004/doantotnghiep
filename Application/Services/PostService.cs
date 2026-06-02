using AutoMapper;
using System.Globalization;
using System.Text.Json;
using System.Text;
using System.Text.RegularExpressions;
using WebApplication1.Application.DTOs.PostDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IHtmlSanitizationService _htmlSanitizationService;
    private readonly IMapper _mapper;

    public PostService(
        IPostRepository postRepository, 
        IProvinceRepository provinceRepository, 
        IHtmlSanitizationService htmlSanitizationService,
        IMapper mapper)
    {
        _postRepository = postRepository;
        _provinceRepository = provinceRepository;
        _htmlSanitizationService = htmlSanitizationService;
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

        AppendPostVersionSnapshot(post);

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

        AppendPostVersionSnapshot(post);

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
        post.Slug = await BuildUniqueSlugAsync(dto.Slug, dto.Title, cancellationToken);
        var createdAt = DateTime.UtcNow;
        post.Id = Guid.NewGuid();
        post.CreatedAt = createdAt;
        post.RevisionNumber = 1;
        post.LastUpdatedAt = createdAt;
        post.VersionHistoryJson = "[]";

        // Sanitize Body before saving
        if (!string.IsNullOrEmpty(post.Body))
        {
            post.Body = _htmlSanitizationService.Sanitize(post.Body);
        }

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

        var previousRevision = post.RevisionNumber;

        AppendPostVersionSnapshot(post);

        _mapper.Map(dto, post);
        post.LastUpdatedAt = DateTime.UtcNow;
        post.RevisionNumber = previousRevision + 1;

        // Sanitize Body before saving
        if (!string.IsNullOrEmpty(post.Body))
        {
            post.Body = _htmlSanitizationService.Sanitize(post.Body);
        }

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

    public async Task<List<PostVersionDto>> GetVersionsAsync(Guid id, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        if (post is null)
        {
            return new List<PostVersionDto>();
        }

        var snapshots = ParsePostHistory(post.VersionHistoryJson);
        return snapshots.Select(s => new PostVersionDto
        {
            RevisionNumber = s.RevisionNumber,
            SnapshotAt = s.SnapshotAt,
            Title = s.Title,
            Description = s.Description,
            Body = s.Body,
            ContentEn = s.ContentEn,
            Category = s.Category,
            ImageUrl = s.ImageUrl,
            VideoUrl = s.VideoUrl,
            Slug = s.Slug,
            Tags = s.Tags,
            IsHighlighted = s.IsHighlighted,
            HighlightOrder = s.HighlightOrder
        }).ToList();
    }

    private static void AppendPostVersionSnapshot(Post post)
    {
        var history = ParsePostHistory(post.VersionHistoryJson);
        history.Add(new PostVersionSnapshot
        {
            RevisionNumber = post.RevisionNumber,
            SnapshotAt = post.LastUpdatedAt ?? post.CreatedAt,
            Title = post.Title,
            Description = post.Description,
            Body = post.Body,
            ContentEn = post.ContentEn,
            Category = post.Category,
            ImageUrl = post.ImageUrl,
            VideoUrl = post.VideoUrl,
            Slug = post.Slug,
            Tags = post.Tags,
            IsHighlighted = post.IsHighlighted,
            HighlightOrder = post.HighlightOrder
        });

        post.VersionHistoryJson = JsonSerializer.Serialize(history);
    }

    private static List<PostVersionSnapshot> ParsePostHistory(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return new List<PostVersionSnapshot>();
        }

        try
        {
            return JsonSerializer.Deserialize<List<PostVersionSnapshot>>(json) ?? new List<PostVersionSnapshot>();
        }
        catch
        {
            return new List<PostVersionSnapshot>();
        }
    }

    private async Task<string> BuildUniqueSlugAsync(string? slug, string title, CancellationToken cancellationToken)
    {
        var baseSlug = NormalizeSlug(string.IsNullOrWhiteSpace(slug) ? title : slug);
        if (string.IsNullOrWhiteSpace(baseSlug))
        {
            baseSlug = $"post-{DateTime.UtcNow:yyyyMMddHHmmss}";
        }

        var candidate = baseSlug;
        var suffix = 2;

        while (await _postRepository.GetBySlugAsync(candidate, cancellationToken) is not null)
        {
            candidate = $"{baseSlug}-{suffix}";
            suffix++;
        }

        return candidate;
    }

    private static string NormalizeSlug(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return string.Empty;
        }

        var normalized = value.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var builder = new StringBuilder(normalized.Length);

        foreach (var character in normalized)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(character);
            if (unicodeCategory == UnicodeCategory.NonSpacingMark)
            {
                continue;
            }

            builder.Append(character == 'đ' ? 'd' : character);
        }

        return Regex.Replace(builder.ToString(), "[^a-z0-9]+", "-").Trim('-');
    }

    private sealed class PostVersionSnapshot
    {
        public int RevisionNumber { get; set; }
        public DateTime SnapshotAt { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public string ContentEn { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty;
        public bool IsHighlighted { get; set; }
        public int HighlightOrder { get; set; }
    }
}
