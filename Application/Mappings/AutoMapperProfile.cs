using AutoMapper;
using WebApplication1.Application.DTOs.AnalyticsDTOs;
using WebApplication1.Application.DTOs.LandingPageConfigDTOs;
using WebApplication1.Application.DTOs.MediaDTOs;
using WebApplication1.Application.DTOs.PostDTOs;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.DTOs.ProvinceDTOs;
using WebApplication1.Application.DTOs.UIBlockDTOs;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Mappings;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Province, ProvinceDto>();
        CreateMap<Province, ProvinceRelatedDto>(); // Slug maps automatically by convention.
        CreateMap<ProvinceCreateDto, Province>();
        CreateMap<ProvinceUpdateDto, Province>();

        CreateMap<LandingPageConfig, LandingPageConfigDto>()
            .ForMember(dest => dest.SectionColors, opt => opt.Ignore())
            .ForMember(dest => dest.SectionOrder, opt => opt.Ignore())
            .ForMember(dest => dest.SectionVisibility, opt => opt.Ignore());

        CreateMap<LandingPageConfigCreateDto, LandingPageConfig>()
            .ForMember(dest => dest.SectionColorsJson, opt => opt.Ignore())
            .ForMember(dest => dest.SectionOrderJson, opt => opt.Ignore())
            .ForMember(dest => dest.SectionVisibilityJson, opt => opt.Ignore());

        CreateMap<LandingPageConfigUpdateDto, LandingPageConfig>()
            .ForMember(dest => dest.SectionColorsJson, opt => opt.Ignore())
            .ForMember(dest => dest.SectionOrderJson, opt => opt.Ignore())
            .ForMember(dest => dest.SectionVisibilityJson, opt => opt.Ignore())
            .ForMember(dest => dest.Blocks, opt => opt.Ignore())
            .ForMember(dest => dest.Province, opt => opt.Ignore())
            .ForMember(dest => dest.ProvinceId, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        CreateMap<UIBlock, UIBlockDto>();
        CreateMap<UIBlockCreateDto, UIBlock>();
        CreateMap<UIBlockUpdateDto, UIBlock>();

        CreateMap<Product, ProductDto>();
        CreateMap<ProductOffer, ProductOfferDto>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : string.Empty));
        CreateMap<ProductOfferDto, ProductOffer>();
        CreateMap<ProductCreateDto, Product>();
        CreateMap<ProductUpdateDto, Product>();

        CreateMap<ProductShop, ProductShopDto>();
        CreateMap<ProductShopDto, ProductShop>();

        CreateMap<Post, PostDto>();
        CreateMap<PostCreateDto, Post>();
        CreateMap<PostUpdateDto, Post>();

        CreateMap<MediaItem, MediaItemDto>()
            .ForMember(dest => dest.Urls, opt => opt.MapFrom(src => MediaMappingHelper.DeserializeUrls(src.UrlsJson)));
        CreateMap<MediaItemCreateDto, MediaItem>()
            .ForMember(dest => dest.UrlsJson, opt => opt.MapFrom(src => MediaMappingHelper.SerializeUrls(src.Urls)));
        CreateMap<MediaItemUpdateDto, MediaItem>()
            .ForMember(dest => dest.UrlsJson, opt => opt.MapFrom(src => MediaMappingHelper.SerializeUrls(src.Urls)));

        CreateMap<AnalyticsEvent, AnalyticsEventDto>();
        CreateMap<AnalyticsEventCreateDto, AnalyticsEvent>();

        CreateMap<User, Application.DTOs.AuthDTOs.UserDto>();
        CreateMap<Application.DTOs.AuthDTOs.UserAdminUpdateDto, User>();
        CreateMap<Application.DTOs.AuthDTOs.UserProfileUpdateDto, User>();
    }
}

/// <summary>Helper methods for MediaItem JSON serialization in AutoMapper.
/// Avoids expression tree issues with optional arguments.</summary>
internal static class MediaMappingHelper
{
    public static List<string> DeserializeUrls(string? urlsJson)
    {
        if (string.IsNullOrEmpty(urlsJson))
            return new List<string>();
        try
        {
            return System.Text.Json.JsonSerializer.Deserialize<List<string>>(urlsJson) ?? new List<string>();
        }
        catch
        {
            return new List<string>();
        }
    }

    public static string SerializeUrls(List<string>? urls)
    {
        if (urls == null || urls.Count == 0)
            return "[]";
        return System.Text.Json.JsonSerializer.Serialize(urls);
    }
}
