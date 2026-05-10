using AutoMapper;
using WebApplication1.Application.DTOs.AnalyticsDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IAnalyticsRepository _analyticsRepository;
    private readonly IMapper _mapper;

    public AnalyticsService(IAnalyticsRepository analyticsRepository, IMapper mapper)
    {
        _analyticsRepository = analyticsRepository;
        _mapper = mapper;
    }

    public async Task<AnalyticsEventDto> TrackAsync(AnalyticsEventCreateDto dto, CancellationToken cancellationToken)
    {
        var analyticsEvent = _mapper.Map<AnalyticsEvent>(dto);
        analyticsEvent.Id = Guid.NewGuid();
        analyticsEvent.CreatedAt = DateTime.UtcNow;
        await _analyticsRepository.AddAsync(analyticsEvent, cancellationToken);
        return _mapper.Map<AnalyticsEventDto>(analyticsEvent);
    }

    public async Task<AnalyticsSummaryDto> GetSummaryAsync(Guid? provinceId, Guid? productId, CancellationToken cancellationToken)
    {
        var pageViews = await _analyticsRepository.CountAsync("page_view", provinceId, null, cancellationToken);
        var productViews = await _analyticsRepository.CountAsync("product_view", provinceId, productId, cancellationToken);
        var interactions = await _analyticsRepository.CountAsync("interaction", provinceId, productId, cancellationToken);

        return new AnalyticsSummaryDto
        {
            PageViews = pageViews,
            ProductViews = productViews,
            Interactions = interactions
        };
    }
}
