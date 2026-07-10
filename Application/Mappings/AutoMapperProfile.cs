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
        CreateMap<ProductOffer, ProductOfferDto>();
        CreateMap<ProductOfferDto, ProductOffer>();
        CreateMap<ProductCreateDto, Product>();
        CreateMap<ProductUpdateDto, Product>();

        CreateMap<ProductShop, ProductShopDto>();
        CreateMap<ProductShopDto, ProductShop>();

        CreateMap<Post, PostDto>();
        CreateMap<PostCreateDto, Post>();
        CreateMap<PostUpdateDto, Post>();

        CreateMap<MediaItem, MediaItemDto>();
        CreateMap<MediaItemCreateDto, MediaItem>();
        CreateMap<MediaItemUpdateDto, MediaItem>();

        CreateMap<AnalyticsEvent, AnalyticsEventDto>();
        CreateMap<AnalyticsEventCreateDto, AnalyticsEvent>();

        CreateMap<User, Application.DTOs.AuthDTOs.UserDto>();
        CreateMap<Application.DTOs.AuthDTOs.UserAdminUpdateDto, User>();
        CreateMap<Application.DTOs.AuthDTOs.UserProfileUpdateDto, User>();
    }
}
