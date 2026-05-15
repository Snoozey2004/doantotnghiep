using Microsoft.EntityFrameworkCore;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Infrastructure.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext dbContext, CancellationToken cancellationToken)
    {
        if (await dbContext.Provinces.AsNoTracking().AnyAsync(cancellationToken))
        {
            return;
        }

        var haNoi = new Province
        {
            Id = Guid.NewGuid(),
            Name = "Hà Nội",
            Slug = "ha-noi",
            Region = "Miền Bắc",
            Description = "Thủ đô ngàn năm văn hiến.",
            Overview = "Trung tâm chính trị, văn hoá và lịch sử.",
            KeyFeatures = "Phố cổ, Hồ Gươm, Văn Miếu",
            ImageUrl = "/uploads/sample/ha-noi.jpg",
            VideoUrl = "https://www.youtube.com/embed/5qap5aO4i9A",
            Introduction = "Hà Nội là trái tim của Việt Nam.",
            IntroductionEn = "Hanoi is the heart of Vietnam.",
            Tags = "history,culture,capital",
            IsHighlighted = true,
            HighlightOrder = 1
        };

        var daNang = new Province
        {
            Id = Guid.NewGuid(),
            Name = "Đà Nẵng",
            Slug = "da-nang",
            Region = "Miền Trung",
            Description = "Thành phố đáng sống.",
            Overview = "Đô thị biển năng động.",
            KeyFeatures = "Cầu Rồng, Bà Nà Hills",
            ImageUrl = "/uploads/sample/da-nang.jpg",
            VideoUrl = "https://www.youtube.com/embed/5qap5aO4i9A",
            Introduction = "Đà Nẵng nổi bật với bãi biển dài.",
            IntroductionEn = "Da Nang is known for its coastline.",
            Tags = "tourism,beach",
            IsHighlighted = true,
            HighlightOrder = 2
        };

        var hoChiMinh = new Province
        {
            Id = Guid.NewGuid(),
            Name = "TP. Hồ Chí Minh",
            Slug = "tp-ho-chi-minh",
            Region = "Miền Nam",
            Description = "Trung tâm kinh tế sôi động.",
            Overview = "Đầu tàu kinh tế của Việt Nam.",
            KeyFeatures = "Chợ Bến Thành, Nhà thờ Đức Bà",
            ImageUrl = "/uploads/sample/ho-chi-minh.jpg",
            VideoUrl = "https://www.youtube.com/embed/5qap5aO4i9A",
            Introduction = "TP.HCM hiện đại và năng động.",
            IntroductionEn = "Ho Chi Minh City is modern and vibrant.",
            Tags = "cuisine,nightlife",
            IsHighlighted = false,
            HighlightOrder = 0
        };

        dbContext.Provinces.AddRange(haNoi, daNang, hoChiMinh);

        dbContext.Posts.AddRange(
            new Post
            {
                Id = Guid.NewGuid(),
                ProvinceId = haNoi.Id,
                Title = "Lịch sử Thăng Long",
                Slug = "lich-su-thang-long",
                Category = "history",
                Content = "Hành trình hơn 1000 năm lịch sử.",
                ContentEn = "A millennium of history.",
                ImageUrl = "/uploads/sample/ha-noi-history.jpg",
                Tags = "history,capital",
                IsHighlighted = true,
                HighlightOrder = 1,
                RevisionNumber = 1,
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow
            },
            new Post
            {
                Id = Guid.NewGuid(),
                ProvinceId = daNang.Id,
                Title = "Ẩm thực Đà Nẵng",
                Slug = "am-thuc-da-nang",
                Category = "cuisine",
                Content = "Mì Quảng và hải sản tươi ngon.",
                ContentEn = "Mi Quang and fresh seafood.",
                ImageUrl = "/uploads/sample/da-nang-food.jpg",
                Tags = "cuisine,seafood",
                IsHighlighted = false,
                HighlightOrder = 0,
                RevisionNumber = 1,
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow
            }
        );

        dbContext.MediaItems.AddRange(
            new MediaItem
            {
                Id = Guid.NewGuid(),
                ProvinceId = haNoi.Id,
                MediaType = "image",
                Title = "Hồ Gươm",
                Url = "/uploads/sample/ho-guom.jpg",
                Description = "Biểu tượng Hà Nội.",
                Tags = "landmark",
                SortOrder = 1,
                IsFeatured = true,
                IsHighlighted = true
            },
            new MediaItem
            {
                Id = Guid.NewGuid(),
                ProvinceId = daNang.Id,
                MediaType = "image",
                Title = "Cầu Rồng",
                Url = "/uploads/sample/cau-rong.jpg",
                Description = "Biểu tượng Đà Nẵng.",
                Tags = "tourism",
                SortOrder = 1,
                IsFeatured = true,
                IsHighlighted = false
            }
        );

        var haNoiConfig = new LandingPageConfig
        {
            Id = Guid.NewGuid(),
            ProvinceId = haNoi.Id,
            ThemeColor = "#2563eb",
            FontFamily = "Inter",
            BackgroundUrl = "/uploads/sample/ha-noi-bg.jpg",
            Layout = "default",
            Blocks = new List<UIBlock>
            {
                new UIBlock
                {
                    Id = Guid.NewGuid(),
                    BlockType = "hero",
                    Title = "Hà Nội",
                    ContentJson = "{}",
                    SortOrder = 1,
                    IsEnabled = true
                },
                new UIBlock
                {
                    Id = Guid.NewGuid(),
                    BlockType = "intro",
                    Title = "Giới thiệu",
                    ContentJson = "{}",
                    SortOrder = 2,
                    IsEnabled = true
                }
            }
        };

        dbContext.LandingPageConfigs.Add(haNoiConfig);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
