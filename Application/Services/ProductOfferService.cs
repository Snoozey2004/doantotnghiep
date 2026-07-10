using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Application.Services;

public class ProductOfferService : IProductOfferService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ProductOfferService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ProductOfferDto>> GetOffersByProductAsync(Guid productId, CancellationToken cancellationToken)
    {
        var offers = await _context.ProductOffers
            .Where(o => o.ProductId == productId)
            .ToListAsync(cancellationToken);
        return _mapper.Map<List<ProductOfferDto>>(offers);
    }

    public async Task<List<ProductOfferDto>> GetOffersBySellerAsync(Guid sellerId, CancellationToken cancellationToken)
    {
        var offers = await _context.ProductOffers
            .Where(o => o.SellerId == sellerId)
            .ToListAsync(cancellationToken);
        return _mapper.Map<List<ProductOfferDto>>(offers);
    }

    public async Task<ProductOfferDto?> GetOfferByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var offer = await _context.ProductOffers.FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
        return offer == null ? null : _mapper.Map<ProductOfferDto>(offer);
    }

    public async Task<ProductOfferDto> CreateOfferAsync(Guid sellerId, ProductOfferDto dto, CancellationToken cancellationToken)
    {
        var offer = _mapper.Map<ProductOffer>(dto);
        offer.Id = Guid.NewGuid();
        offer.SellerId = sellerId;

        _context.ProductOffers.Add(offer);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<ProductOfferDto>(offer);
    }

    public async Task<ProductOfferDto?> UpdateOfferAsync(Guid id, Guid sellerId, ProductOfferDto dto, CancellationToken cancellationToken)
    {
        var offer = await _context.ProductOffers.FirstOrDefaultAsync(o => o.Id == id && o.SellerId == sellerId, cancellationToken);
        if (offer == null) return null;

        offer.Price = dto.Price;
        offer.StockQuantity = dto.StockQuantity;
        offer.ShopName = dto.ShopName;
        offer.ShopAddress = dto.ShopAddress;
        offer.BusinessHours = dto.BusinessHours;
        offer.IsOpen = dto.IsOpen;

        await _context.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ProductOfferDto>(offer);
    }

    public async Task<bool> DeleteOfferAsync(Guid id, Guid sellerId, CancellationToken cancellationToken)
    {
        var offer = await _context.ProductOffers.FirstOrDefaultAsync(o => o.Id == id && o.SellerId == sellerId, cancellationToken);
        if (offer == null) return false;

        _context.ProductOffers.Remove(offer);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}
