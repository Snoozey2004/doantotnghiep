using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductOffersController : ControllerBase
{
    private readonly IProductOfferService _offerService;

    public ProductOffersController(IProductOfferService offerService)
    {
        _offerService = offerService;
    }

    [HttpGet("product/{productId}")]
    public async Task<ActionResult<List<ProductOfferDto>>> GetOffersByProduct(Guid productId, CancellationToken cancellationToken)
    {
        var offers = await _offerService.GetOffersByProductAsync(productId, cancellationToken);
        return Ok(offers);
    }

    [HttpGet("seller/{sellerId}")]
    public async Task<ActionResult<List<ProductOfferDto>>> GetOffersBySeller(Guid sellerId, CancellationToken cancellationToken)
    {
        var offers = await _offerService.GetOffersBySellerAsync(sellerId, cancellationToken);
        return Ok(offers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductOfferDto>> GetOffer(Guid id, CancellationToken cancellationToken)
    {
        var offer = await _offerService.GetOfferByIdAsync(id, cancellationToken);
        if (offer == null) return NotFound();
        return Ok(offer);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ProductOfferDto>> CreateOffer([FromBody] ProductOfferDto dto, CancellationToken cancellationToken)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var offer = await _offerService.CreateOfferAsync(userId, dto, cancellationToken);
        return CreatedAtAction(nameof(GetOffer), new { id = offer.Id }, offer);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<ProductOfferDto>> UpdateOffer(Guid id, [FromBody] ProductOfferDto dto, CancellationToken cancellationToken)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var offer = await _offerService.UpdateOfferAsync(id, userId, dto, cancellationToken);
        if (offer == null) return NotFound();
        return Ok(offer);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOffer(Guid id, CancellationToken cancellationToken)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var success = await _offerService.DeleteOfferAsync(id, userId, cancellationToken);
        if (!success) return NotFound();
        return NoContent();
    }
}
