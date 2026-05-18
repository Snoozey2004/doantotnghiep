using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.DTOs.PostDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly IAuditLogService _auditLogService;

    public PostsController(IPostService postService, IAuditLogService auditLogService)
    {
        _postService = postService;
        _auditLogService = auditLogService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PostDto>>> GetAll(CancellationToken cancellationToken)
    {
        var posts = await _postService.GetAllAsync(cancellationToken);
        return Ok(posts);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PostDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var post = await _postService.GetByIdAsync(id, cancellationToken);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<PostDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var post = await _postService.GetBySlugAsync(slug, cancellationToken);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpGet("province/{provinceId:guid}")]
    public async Task<ActionResult<List<PostDto>>> GetByProvinceId(Guid provinceId, CancellationToken cancellationToken)
    {
        var posts = await _postService.GetByProvinceIdAsync(provinceId, cancellationToken);
        return Ok(posts);
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<PostDto>>> Search(
        [FromQuery] string? keyword,
        [FromQuery] Guid? provinceId,
        [FromQuery] string? category,
        CancellationToken cancellationToken)
    {
        var posts = await _postService.SearchAsync(keyword, provinceId, category, cancellationToken);
        return Ok(posts);
    }

    [HttpPost]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<PostDto>> Create([FromBody] PostCreateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postService.CreateAsync(dto, cancellationToken);
        await _auditLogService.LogAsync($"Post created: {post.Id} - {post.Title}", cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<PostDto>> Update(Guid id, [FromBody] PostUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postService.UpdateAsync(id, dto, cancellationToken);
        if (post is not null)
        {
            await _auditLogService.LogAsync($"Post updated: {post.Id} - {post.Title}", cancellationToken);
        }
        return post is null ? NotFound() : Ok(post);
    }

    [HttpPut("{id:guid}/highlight")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<PostDto>> UpdateHighlight(Guid id, [FromBody] PostHighlightUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postService.UpdateHighlightsAsync(id, dto, cancellationToken);
        if (post is not null)
        {
            await _auditLogService.LogAsync($"Post highlight updated: {id} - IsHighlighted: {dto.IsHighlighted}, Order: {dto.HighlightOrder}", cancellationToken);
        }
        return post is null ? NotFound() : Ok(post);
    }

    [HttpPut("{id:guid}/tags")]
    [Authorize(Roles = "0,Admin,1,Editor")]
    public async Task<ActionResult<PostDto>> UpdateTags(Guid id, [FromBody] PostTagUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postService.UpdateTagsAsync(id, dto, cancellationToken);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _postService.DeleteAsync(id, cancellationToken);
        if (deleted)
        {
            await _auditLogService.LogAsync($"Post deleted: {id}", cancellationToken);
        }
        return deleted ? NoContent() : NotFound();
    }
}
