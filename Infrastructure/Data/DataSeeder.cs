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
            HighlightOrder = 1,
            Body = "<h2>Hà Nội - Thủ Đô Lịch Sử</h2><p>Hà Nội là thủ đô của Việt Nam, nổi tiếng với lịch sử hơn 1000 năm. Thành phố này là tâm điểm của văn hóa, chính trị và kinh tế của đất nước.</p><h3>Điểm Đến Nổi Bật</h3><ul><li><strong>Hồ Gươm</strong> - Biểu tượng của Hà Nội, với nhiều câu chuyện lịch sử thú vị</li><li><strong>Phố Cổ</strong> - Khu vực mua sắm sôi động với kiến trúc truyền thống</li><li><strong>Văn Miếu</strong> - Đại học đầu tiên của Việt Nam, được xây dựng vào thế kỷ 11</li></ul><p>Hà Nội không chỉ là một điểm đến du lịch tuyệt vời mà còn là nơi bạn có thể cảm nhận được bản sắc văn hóa độc đáo của Việt Nam.</p>"
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
            HighlightOrder = 2,
            Body = "<h2>Đà Nẵng - Thành Phố Biển Động</h2><p>Đà Nẵng là một trong những điểm đến du lịch hàng đầu ở Việt Nam, nổi tiếng với bãi biển tuyệt đẹp và khí hậu ôn hòa.</p><h3>Các Hoạt Động Không Nên Bỏ Qua</h3><ul><li><strong>Cầu Rồng</strong> - Biểu tượng của Đà Nẵng, được xây dựng theo hình rồng</li><li><strong>Bà Nà Hills</strong> - Khu nghỉ dưỡng trên núi với cầu vàng nổi tiếng</li><li><strong>Bãi Biển Mỹ Khê</strong> - Được xem là một trong những bãi biển đẹp nhất thế giới</li></ul><p>Đà Nẵng cũng là một trung tâm ẩm thực với nhiều đặc sản nổi tiếng như mì Quảng và hải sản tươi ngon.</p>"
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
            HighlightOrder = 0,
            Body = "<h2>TP. Hồ Chí Minh - Thành Phố Không Bao Giờ Ngủ</h2><p>TP. Hồ Chí Minh là thành phố lớn nhất Việt Nam, là trung tâm kinh tế và văn hóa của miền Nam. Với gần 10 triệu dân, đây là một thành phố sôi động và hiện đại.</p><h3>Những Điểm Tham Quan Chính</h3><ul><li><strong>Chợ Bến Thành</strong> - Một trong những chợ lâu đời nhất của thành phố</li><li><strong>Nhà Thờ Đức Bà</strong> - Một công trình kiến trúc Pháp đẹp và lịch sử</li><li><strong>Tôn Đức Thắng</strong> - Quản lý kinh tế, thương mại và giải trí</li></ul><p>TP. Hồ Chí Minh nổi tiếng với đời sống về đêm, ẩm thực phong phú, và cơ hội kinh doanh vô hạn.</p>"
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
                LastUpdatedAt = DateTime.UtcNow,
                Body = "<h2>Hành Trình 1000 Năm Lịch Sử Thăng Long - Hà Nội</h2><p>Thăng Long được gọi là Hà Nội ngày nay, là một thủ đô với lịch sử lâu đời hơn 1000 năm. Từ thế kỷ 7, nơi đây đã là một trung tâm chính trị, kinh tế và văn hóa quan trọng.</p><h3>Các Giai Đoạn Lịch Sử Chính</h3><ul><li><strong>Thời Trưởng Chinh (11-13)</strong> - Thăng Long được xây dựng thành thủ đô, xây dựng Lăng Tử Đàn và các công trình quan trọng khác</li><li><strong>Thời Lê-Trịnh (15-18)</strong> - Thăng Long trở thành một trong những thành phố lớn nhất Đông Nam Á</li><li><strong>Thời Pháp Thuộc (19-20)</strong> - Hà Nội được Pháp cải tạo thành Thủ đô của Đông Dương Pháp</li></ul><p><strong>Hôm nay</strong>, Hà Nội là một thành phố hiện đại nhưng vẫn giữ được những dấu tích lịch sử quý báu, là nhân chứng của hành trình dài của dân tộc Việt.</p>"
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
                LastUpdatedAt = DateTime.UtcNow,
                Body = "<h2>Khám Phá Ẩm Thực Độc Đáo Của Đà Nẵng</h2><p>Đà Nẵng nổi tiếng không chỉ vì cảnh quan tuyệt đẹp mà còn vì ẩm thực phong phú và độc đáo. Các món ăn tại đây kết hợp hài hòa giữa truyền thống và hiện đại.</p><h3>Những Món Ăn Không Nên Bỏ Qua</h3><ul><li><strong>Mì Quảng</strong> - Một chiếc mì được phủ mỏng với một lớp nước sốt đặc biệt, được rắc dưới đây bằng nước dùi</li><li><strong>Bánh Hoành Thánh</strong> - Các chiếc bánh nhân thịt lợn và tôm</li><li><strong>Hải Sản Tươi Ngon</strong> - Cua, tôm, mực được nấu theo nhiều cách khác nhau</li><li><strong>Bánh Mì Đà Nẵng</strong> - Bánh mì krispy với nhiều lựa chọn nhân</li></ul><p>Khi đến Đà Nẵng, hãy chắc chắn thưởng thức những đặc sản ẩm thực này tại các quán ăn bản địa để cảm nhận được hương vị thực sự của thành phố.</p>"
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
