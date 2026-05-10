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

    public PostsController(IPostService postService)
    {
        _postService = postService;
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

    [HttpPost]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<ActionResult<PostDto>> Create([FromBody] PostCreateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<ActionResult<PostDto>> Update(Guid id, [FromBody] PostUpdateDto dto, CancellationToken cancellationToken)
    {
        var post = await _postService.UpdateAsync(id, dto, cancellationToken);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin,Editor")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _postService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
