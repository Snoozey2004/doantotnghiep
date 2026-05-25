using Microsoft.EntityFrameworkCore;
using System.Text.Json;
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

        var seeds = new[]
        {
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Hà Nội",
                    Slug = "ha-noi",
                    Description = "Thủ đô nghìn năm tuổi lưu giữ di sản, ẩm thực tinh tế và nhịp sống thanh lịch của người Tràng An.",
                    Overview = "Hương vị nghìn năm văn hiến",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b45309",
                    HeroImage: "/Images/dsvh-hoang-thanh-thang-long.png",
                    IntroImage: "/Images/pho-bo-ha-noi.jpeg",
                    Specialties: new[] { new LandingItem("Phở Hà Nội", "Nước dùng trong, vị ngọt thanh và bánh phở mềm mượt đặc trưng.", "Phố cổ Hà Nội", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Chả cá Lã Vọng", "Cá nướng nghệ, ăn kèm bún và thì là.", "Phố Chả Cá", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Bánh tôm Hồ Tây", "Giòn rụm, béo ngậy và ngập tràn hương vị hồ.", "Hồ Tây", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Hồ Gươm", "Biểu tượng của Hà Nội với vẻ đẹp thơ mộng giữa lòng phố cổ.", "", "/Images/homepage.png"), new LandingItem("Hoàng thành Thăng Long", "Di sản thế giới lưu giữ dấu ấn kinh kỳ ngàn năm.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Phố cổ Hà Nội", "Nhịp sống chậm rãi, nghệ thuật và ẩm thực đường phố.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Gióng", "Lễ hội truyền thống tôn vinh tinh thần thượng võ và văn hóa Thăng Long.", "", "/Images/homepage.png"), new LandingItem("Làng nghề Bát Tràng", "Không gian gốm sứ cổ truyền kết hợp sáng tạo đương đại.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvh-hoang-thanh-thang-long.png", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Hồ Chí Minh",
                    Slug = "ho-chi-minh",
                    Description = "Thành phố năng động bậc nhất Việt Nam với nhịp sống hiện đại, giao thoa văn hóa và ẩm thực đường phố đa sắc.",
                    Overview = "Năng lượng hiện đại giữa lòng phương Nam",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b91c1c",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Cơm tấm", "Hạt gạo tấm thơm, sườn nướng đậm vị và nước mắm chua ngọt.", "Sài Gòn xưa", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Bánh mì Sài Gòn", "Vỏ giòn, nhân đầy đặn với pate và rau thơm.", "Quận 1", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Hủ tiếu Nam Vang", "Nước dùng ngọt thanh, tôm thịt đầy đặn.", "Chợ Lớn", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Nhà thờ Đức Bà", "Biểu tượng kiến trúc Pháp giữa trung tâm thành phố.", "", "/Images/homepage.png"), new LandingItem("Bưu điện Trung tâm", "Không gian cổ kính với hơi thở thời thuộc địa.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Phố đi bộ Nguyễn Huệ", "Trung tâm lễ hội và văn hóa đương đại của Sài Gòn.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Áo dài", "Tôn vinh nét đẹp truyền thống trong nhịp sống hiện đại.", "", "/Images/homepage.png"), new LandingItem("Chợ Bến Thành", "Điểm hẹn văn hóa, ẩm thực và mua sắm đặc trưng Nam Bộ.", "", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Hải Phòng",
                    Slug = "hai-phong",
                    Description = "Thành phố hoa phượng đỏ mang hơi thở biển cả, ẩm thực hải sản phong phú và kiến trúc Pháp cổ.",
                    Overview = "Thành phố cảng rực rỡ sắc biển",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#dc2626",
                    HeroImage: "/Images/dsvn-vinh-ha-long.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Bánh đa cua", "Sợi bánh đa đỏ, nước dùng cua đậm đà.", "Quận Lê Chân", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Nem cua bể", "Nhân hải sản đầy đặn, vỏ giòn rụm.", "Đồ Sơn", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Hải sản Cát Bà", "Tươi ngon, chế biến đa dạng từ biển.", "Cát Bà", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Đảo Cát Bà", "Thiên đường nghỉ dưỡng với rừng quốc gia và biển xanh.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Bãi biển Đồ Sơn", "Điểm đến biển nổi tiếng miền Bắc.", "", "/Images/homepage.png"), new LandingItem("Nhà hát lớn Hải Phòng", "Dấu ấn kiến trúc Pháp cổ giữa lòng thành phố.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội chọi trâu Đồ Sơn", "Lễ hội truyền thống đậm chất dân gian vùng biển.", "", "/Images/homepage.png"), new LandingItem("Làng nghề điêu khắc đá", "Nghề thủ công lâu đời tạo nên nét văn hóa riêng.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/dsvn-vinh-ha-long.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Đà Nẵng",
                    Slug = "da-nang",
                    Description = "Đà Nẵng hội tụ bãi biển đẹp, kiến trúc hiện đại và ẩm thực miền Trung tinh tế.",
                    Overview = "Thành phố đáng sống bên bờ biển",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0ea5e9",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Mì Quảng", "Sợi mì vàng, nước dùng sánh và đậm vị.", "Ngũ Hành Sơn", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Bánh tráng cuốn thịt heo", "Thịt mềm, rau sống và mắm nêm thơm nồng.", "Hải Châu", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Hải sản Mỹ Khê", "Hải sản tươi sống chế biến tinh gọn.", "Biển Mỹ Khê", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Cầu Rồng", "Biểu tượng kiến trúc hiện đại của thành phố.", "", "/Images/homepage.png"), new LandingItem("Bà Nà Hills", "Không gian châu Âu trên đỉnh núi.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Biển Mỹ Khê", "Một trong những bãi biển đẹp nhất châu Á.", "", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội pháo hoa", "Sự kiện quốc tế rực rỡ trên sông Hàn.", "", "/Images/homepage.png"), new LandingItem("Làng đá Non Nước", "Tinh hoa điêu khắc đá truyền thống.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Cần Thơ",
                    Slug = "can-tho",
                    Description = "Thủ phủ miền Tây với chợ nổi, vườn trái cây và ẩm thực mộc mạc đậm tình.",
                    Overview = "Hơi thở miền Tây sông nước",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#16a34a",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Bánh xèo", "Vỏ giòn rụm, nhân tôm thịt đầy đặn.", "Ninh Kiều", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Lẩu mắm", "Đậm đà hương vị miền Tây.", "Cái Răng", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Vú sữa", "Trái cây đặc sản ngọt thanh.", "Phong Điền", "/Images/homepage.png") },
                    Tourism: new[] { new LandingItem("Chợ nổi Cái Răng", "Nét văn hóa đặc trưng trên sông nước.", "", "/Images/homepage.png"), new LandingItem("Bến Ninh Kiều", "Biểu tượng của Cần Thơ về đêm.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Vườn trái cây", "Trải nghiệm miệt vườn xanh mát.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Đờn ca tài tử", "Di sản âm nhạc Nam Bộ.", "", "/Images/homepage.png"), new LandingItem("Lễ hội bánh dân gian", "Tôn vinh ẩm thực miền Tây.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Huế",
                    Slug = "hue",
                    Description = "Vùng đất cố đô với di sản cung đình, ẩm thực tinh tế và nhịp sống trầm lắng.",
                    Overview = "Kinh kỳ trầm mặc giữa dòng Hương",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#7c3aed",
                    HeroImage: "/Images/dsvn-co-do-hue.png",
                    IntroImage: "/Images/bunbohue.jpg",
                    Specialties: new[] { new LandingItem("Bún bò Huế", "Nước dùng cay nồng, đậm đà hương sả.", "Kinh thành Huế", "/Images/bunbohue.jpg"), new LandingItem("Bánh bèo", "Nhỏ xinh, mềm mịn và đậm vị.", "Phố cổ Huế", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Chè Huế", "Phong phú với vị ngọt thanh.", "Sông Hương", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Đại Nội", "Di sản cung đình nổi bật của triều Nguyễn.", "", "/Images/dsvn-co-do-hue.png"), new LandingItem("Chùa Thiên Mụ", "Ngôi chùa cổ kính bên dòng sông Hương.", "", "/Images/homepage.png"), new LandingItem("Lăng Khải Định", "Kiến trúc giao thoa Đông - Tây.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Nhã nhạc cung đình", "Di sản văn hóa phi vật thể UNESCO.", "", "/Images/homepage.png"), new LandingItem("Festival Huế", "Sự kiện văn hóa nghệ thuật quốc tế.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/dsvn-co-do-hue.png", "/Images/bunbohue.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Tuyên Quang",
                    Slug = "tuyen-quang",
                    Description = "Vùng đất lịch sử với núi rừng hùng vĩ, lễ hội đèn Trung thu độc đáo.",
                    Overview = "Sắc xanh núi rừng và lễ hội Trung thu",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#15803d",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Bánh gai", "Dẻo thơm, nhân đậu xanh ngọt bùi.", "Hàm Yên", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Cam sành", "Vị ngọt thanh, thơm dịu.", "Hàm Yên", "/Images/homepage.png"), new LandingItem("Thịt trâu gác bếp", "Hương khói núi rừng đậm đà.", "Na Hang", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Na Hang", "Hồ nước xanh giữa núi rừng hoang sơ.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Suối khoáng Mỹ Lâm", "Nghỉ dưỡng giữa thiên nhiên.", "", "/Images/homepage.png"), new LandingItem("Tân Trào", "Khu di tích lịch sử cách mạng.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội Thành Tuyên", "Lễ hội đèn Trung thu rực rỡ.", "", "/Images/homepage.png"), new LandingItem("Hát then", "Nghệ thuật dân gian của người Tày.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/caphethainguyen.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Lào Cai",
                    Slug = "lao-cai",
                    Description = "Vùng cao Tây Bắc với ruộng bậc thang, khí hậu mát lạnh và văn hóa đa sắc tộc.",
                    Overview = "Sắc màu Tây Bắc và mây trời Sa Pa",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0f766e",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Thắng cố", "Món ăn truyền thống của người Mông.", "Bắc Hà", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Rượu táo mèo", "Hương thơm đặc trưng vùng cao.", "Sa Pa", "/Images/homepage.png"), new LandingItem("Cá hồi Sa Pa", "Tươi ngon nuôi trong khí hậu lạnh.", "Sa Pa", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Sa Pa", "Thiên đường nghỉ dưỡng trên mây.", "", "/Images/homepage.png"), new LandingItem("Fansipan", "Nóc nhà Đông Dương hùng vĩ.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Chợ Bắc Hà", "Phiên chợ sắc màu vùng cao.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Gầu Tào", "Nét văn hóa đặc sắc của người Mông.", "", "/Images/homepage.png"), new LandingItem("Chợ tình Sa Pa", "Không gian giao lưu văn hóa.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/caphethainguyen.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Thái Nguyên",
                    Slug = "thai-nguyen",
                    Description = "Vùng đất trung du nổi tiếng với chè thơm, đồi núi trùng điệp và lịch sử cách mạng.",
                    Overview = "Hương trà xanh ngát giữa vùng trung du",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#166534",
                    HeroImage: "/Images/caphethainguyen.jpg",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Trà Tân Cương", "Hương thơm dịu, vị chát ngọt hậu.", "Tân Cương", "/Images/caphethainguyen.jpg"), new LandingItem("Bánh chưng Bờ Đậu", "Dẻo thơm, nhân đậm đà.", "Phú Lương", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Nem chua Đại Từ", "Vị chua nhẹ, thơm cay.", "Đại Từ", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Hồ Núi Cốc", "Hồ nước thơ mộng giữa đồi chè.", "", "/Images/homepage.png"), new LandingItem("Bảo tàng Văn hóa các dân tộc", "Không gian lưu giữ di sản văn hóa.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Đồi chè Tân Cương", "Khung cảnh xanh ngát trải dài.", "", "/Images/caphethainguyen.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội chè", "Tôn vinh văn hóa trà Việt.", "", "/Images/homepage.png"), new LandingItem("Hát then", "Nghệ thuật dân gian của người Tày.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/caphethainguyen.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png", "/Images/nha-hang-hai-san-nha-trang.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Phú Thọ",
                    Slug = "phu-tho",
                    Description = "Quê hương vua Hùng với di sản văn hóa sâu sắc, lễ hội truyền thống và làn điệu dân ca.",
                    Overview = "Đất tổ cội nguồn dân tộc",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#92400e",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Bánh tai", "Bánh gạo mềm, nhân thịt đậm đà.", "Việt Trì", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Cọ ỏm", "Món ăn dân dã vùng trung du.", "Đoan Hùng", "/Images/homepage.png"), new LandingItem("Rêu đá", "Đặc sản hiếm của vùng núi.", "Thanh Sơn", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Khu di tích Đền Hùng", "Nơi hội tụ tinh thần dân tộc Việt.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Suối khoáng Thanh Thủy", "Điểm nghỉ dưỡng thư giãn.", "", "/Images/homepage.png"), new LandingItem("Đồi chè Long Cốc", "Cảnh sắc đồi chè bồng bềnh.", "", "/Images/caphethainguyen.jpg") },
                    Culture: new[] { new LandingItem("Hát xoan", "Di sản văn hóa phi vật thể của nhân loại.", "", "/Images/homepage.png"), new LandingItem("Lễ hội Đền Hùng", "Lễ hội lớn nhất cả nước mỗi tháng 3 âm lịch.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/dsvh-hoang-thanh-thang-long.png", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/caphethainguyen.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Bắc Ninh",
                    Slug = "bac-ninh",
                    Description = "Vùng đất Kinh Bắc nổi tiếng với dân ca quan họ, làng nghề truyền thống và ẩm thực đặc trưng.",
                    Overview = "Quan họ ngọt ngào đất Kinh Bắc",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#a16207",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Bánh phu thê", "Ngọt thơm, tượng trưng cho hạnh phúc.", "Đình Bảng", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Nem Bùi", "Nem chua thơm mùi thính.", "Thuận Thành", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Cháo thái Đình Tổ", "Mềm mịn, đậm hương vị truyền thống.", "Yên Phong", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Đền Đô", "Di tích lịch sử nhà Lý.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Chùa Dâu", "Ngôi chùa cổ nhất Việt Nam.", "", "/Images/homepage.png"), new LandingItem("Làng tranh Đông Hồ", "Không gian nghệ thuật dân gian.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Dân ca quan họ", "Di sản văn hóa phi vật thể UNESCO.", "", "/Images/homepage.png"), new LandingItem("Lễ hội Lim", "Nơi hội tụ tinh hoa quan họ.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/caphethainguyen.jpg", "/Images/dsvn-vinh-ha-long.png" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Hưng Yên",
                    Slug = "hung-yen",
                    Description = "Hưng Yên gắn liền với Phố Hiến cổ, vườn nhãn ngọt lành và di sản văn hóa lâu đời.",
                    Overview = "Phố Hiến sầm uất một thời",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b45309",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Nhãn lồng", "Quả nhãn thơm ngọt nổi tiếng.", "Phố Hiến", "/Images/homepage.png"), new LandingItem("Bánh cuốn Phú Thị", "Mỏng mềm, chấm nước mắm thơm.", "Văn Lâm", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Chè sen", "Thanh mát, tinh tế.", "Tiên Lữ", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Tourism: new[] { new LandingItem("Phố Hiến", "Di tích lịch sử thương cảng xưa.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Chùa Chuông", "Ngôi chùa cổ kính linh thiêng.", "", "/Images/homepage.png"), new LandingItem("Vườn nhãn", "Không gian xanh mát mùa thu hoạch.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Lễ hội Phố Hiến", "Tái hiện nhịp sống thương cảng xưa.", "", "/Images/homepage.png"), new LandingItem("Hát chèo", "Nghệ thuật dân gian đặc trưng vùng đồng bằng.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/caphethainguyen.jpg", "/Images/dsvn-vinh-ha-long.png" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Ninh Bình",
                    Slug = "ninh-binh",
                    Description = "Ninh Bình nổi bật với quần thể Tràng An, cố đô Hoa Lư và cảnh sắc thiên nhiên tuyệt mỹ.",
                    Overview = "Non nước hữu tình đất cố đô",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#15803d",
                    HeroImage: "/Images/dsvn-vinh-ha-long.png",
                    IntroImage: "/Images/homepage.png",
                    Specialties: new[] { new LandingItem("Dê núi", "Thịt dê săn chắc, chế biến đa dạng.", "Hoa Lư", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Cơm cháy", "Giòn rụm, thơm mùi gạo nếp.", "Ninh Bình", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Gỏi cá nhệch", "Vị chua cay hòa quyện.", "Kim Sơn", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Tràng An", "Di sản thế giới với hang động và sông nước.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Tam Cốc", "Cảnh sắc sông núi nên thơ.", "", "/Images/homepage.png"), new LandingItem("Cố đô Hoa Lư", "Di tích lịch sử triều Đinh - Lê.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội Tràng An", "Tôn vinh di sản văn hóa thiên nhiên.", "", "/Images/homepage.png"), new LandingItem("Làng đá mỹ nghệ", "Nghề truyền thống lâu đời.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/dsvn-vinh-ha-long.png", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Quảng Trị",
                    Slug = "quang-tri",
                    Description = "Quảng Trị ghi dấu lịch sử hào hùng, cảnh quan biển và những di tích chiến tranh.",
                    Overview = "Miền đất lịch sử bên dòng Bến Hải",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#9a3412",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Bánh ít lá gai", "Dẻo thơm, nhân đậu xanh.", "Đông Hà", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Cháo vạt giường", "Đậm vị cá lóc và rau thơm.", "Triệu Phong", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Hải sản Cửa Tùng", "Tươi ngon vùng biển miền Trung.", "Cửa Tùng", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Cầu Hiền Lương", "Di tích lịch sử chia cắt hai miền.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Thành cổ Quảng Trị", "Dấu ấn chiến tranh và lịch sử.", "", "/Images/homepage.png"), new LandingItem("Biển Cửa Việt", "Bãi biển hoang sơ, thanh bình.", "", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Thống nhất", "Tưởng niệm và tri ân lịch sử.", "", "/Images/homepage.png"), new LandingItem("Làng nghề đan lát", "Nghề thủ công truyền thống.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Quảng Ngãi",
                    Slug = "quang-ngai",
                    Description = "Quảng Ngãi nổi bật với đảo Lý Sơn, biển xanh và văn hóa Sa Huỳnh.",
                    Overview = "Hơi thở biển đảo và núi non",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0f766e",
                    HeroImage: "/Images/dsvn-vinh-ha-long.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Tỏi Lý Sơn", "Tỏi thơm, vị cay dịu đặc trưng.", "Đảo Lý Sơn", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Cá bống sông Trà", "Cá kho đậm vị, thịt chắc.", "Sông Trà", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Bánh ít lá gai", "Món bánh truyền thống thơm ngon.", "Quảng Ngãi", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Đảo Lý Sơn", "Thiên đường biển đảo với núi lửa cổ.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Bãi biển Mỹ Khê", "Bãi biển trong xanh, mịn màng.", "", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Thành cổ Châu Sa", "Di tích văn hóa Sa Huỳnh.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Lễ khao lề thế lính Hoàng Sa", "Nghi lễ tưởng nhớ đội hùng binh Hoàng Sa.", "", "/Images/homepage.png"), new LandingItem("Hát bài chòi", "Di sản văn hóa miền Trung.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/dsvn-vinh-ha-long.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/homepage.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Gia Lai",
                    Slug = "gia-lai",
                    Description = "Gia Lai mang vẻ đẹp hoang sơ của núi rừng Tây Nguyên, văn hóa cồng chiêng và cà phê thơm.",
                    Overview = "Cao nguyên đại ngàn và hồ nước xanh",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#166534",
                    HeroImage: "/Images/caphethainguyen.jpg",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Cơm lam", "Gạo nướng trong ống tre thơm lừng.", "Pleiku", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Gà nướng", "Thịt gà đậm vị núi rừng.", "Kon Hà Nừng", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Cà phê Pleiku", "Hương cà phê mạnh mẽ, quyến rũ.", "Pleiku", "/Images/caphethainguyen.jpg") },
                    Tourism: new[] { new LandingItem("Biển Hồ", "Hồ nước xanh biếc giữa cao nguyên.", "", "/Images/homepage.png"), new LandingItem("Đồi chè Biển Hồ", "Đồi chè xanh trải dài.", "", "/Images/caphethainguyen.jpg"), new LandingItem("Thác Phú Cường", "Thác nước hùng vĩ giữa đại ngàn.", "", "/Images/dsvn-vinh-ha-long.png") },
                    Culture: new[] { new LandingItem("Không gian cồng chiêng", "Di sản văn hóa Tây Nguyên.", "", "/Images/homepage.png"), new LandingItem("Lễ hội mừng lúa mới", "Nghi lễ đặc trưng của người Jrai.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/caphethainguyen.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Khánh Hòa",
                    Slug = "khanh-hoa",
                    Description = "Khánh Hòa nổi tiếng với biển Nha Trang trong xanh, đảo đẹp và hải sản phong phú.",
                    Overview = "Nha Trang rực rỡ bên biển xanh",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0284c7",
                    HeroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Bún cá Nha Trang", "Nước dùng thanh, cá tươi ngọt.", "Nha Trang", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Nem nướng", "Nem thơm, ăn kèm bánh tráng.", "Ninh Hòa", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Yến sào", "Đặc sản quý của vùng biển.", "Đảo yến", "/Images/homepage.png") },
                    Tourism: new[] { new LandingItem("Vịnh Nha Trang", "Một trong những vịnh đẹp nhất thế giới.", "", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Đảo Hòn Mun", "Thiên đường lặn biển.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Tháp Bà Ponagar", "Di tích văn hóa Chăm.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội biển Nha Trang", "Sôi động, tôn vinh văn hóa biển.", "", "/Images/homepage.png"), new LandingItem("Lễ hội yến sào", "Tôn vinh nghề khai thác yến.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Lâm Đồng",
                    Slug = "lam-dong",
                    Description = "Lâm Đồng sở hữu thành phố Đà Lạt mát lành, rừng thông và văn hóa cà phê.",
                    Overview = "Đà Lạt mộng mơ giữa cao nguyên",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0f766e",
                    HeroImage: "/Images/caphethainguyen.jpg",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Cà phê Đà Lạt", "Hương thơm dịu, hậu vị ngọt.", "Đà Lạt", "/Images/caphethainguyen.jpg"), new LandingItem("Dâu tây", "Quả dâu đỏ mọng nổi tiếng.", "Đà Lạt", "/Images/homepage.png"), new LandingItem("Atiso", "Thảo dược thanh lọc cơ thể.", "Lâm Đồng", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Tourism: new[] { new LandingItem("Hồ Xuân Hương", "Biểu tượng thơ mộng của Đà Lạt.", "", "/Images/homepage.png"), new LandingItem("Đồi chè Cầu Đất", "Đồi chè xanh bạt ngàn.", "", "/Images/caphethainguyen.jpg"), new LandingItem("Thung lũng Tình Yêu", "Điểm đến lãng mạn giữa rừng thông.", "", "/Images/dsvn-vinh-ha-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội Hoa Đà Lạt", "Sự kiện văn hóa đặc trưng cao nguyên.", "", "/Images/homepage.png"), new LandingItem("Không gian cồng chiêng", "Di sản văn hóa Tây Nguyên.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/caphethainguyen.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Đắk Lắk",
                    Slug = "dak-lak",
                    Description = "Đắk Lắk nổi bật với cà phê Buôn Ma Thuột, văn hóa cồng chiêng và thác nước hùng vĩ.",
                    Overview = "Cao nguyên nắng gió và cà phê",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#92400e",
                    HeroImage: "/Images/caphethainguyen.jpg",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Cà phê Buôn Ma Thuột", "Đậm đà, thơm nồng đặc trưng.", "Buôn Ma Thuột", "/Images/caphethainguyen.jpg"), new LandingItem("Gà nướng bản Đôn", "Thịt gà thơm vị núi rừng.", "Buôn Đôn", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Cơm lam", "Gạo nếp nướng ống tre.", "Krông Ana", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Tourism: new[] { new LandingItem("Thác Dray Nur", "Thác nước hùng vĩ giữa rừng xanh.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Hồ Lắk", "Hồ nước tự nhiên lớn nhất Tây Nguyên.", "", "/Images/homepage.png"), new LandingItem("Buôn Đôn", "Làng văn hóa với truyền thống săn voi.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội cà phê", "Tôn vinh đặc sản Tây Nguyên.", "", "/Images/homepage.png"), new LandingItem("Cồng chiêng", "Di sản văn hóa Tây Nguyên.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/caphethainguyen.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Đồng Nai",
                    Slug = "dong-nai",
                    Description = "Đồng Nai sở hữu khu dự trữ sinh quyển, trái cây phong phú và không gian xanh rộng lớn.",
                    Overview = "Vùng đất cửa ngõ Đông Nam Bộ",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#15803d",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Gỏi cá Biên Hòa", "Vị chua cay hài hòa.", "Biên Hòa", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Bưởi Tân Triều", "Trái cây đặc sản ngọt thanh.", "Vĩnh Cửu", "/Images/homepage.png"), new LandingItem("Lẩu lá khổ qua", "Món ăn thanh mát đặc trưng.", "Đồng Nai", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Vườn quốc gia Cát Tiên", "Hệ sinh thái rừng nhiệt đới đa dạng.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Khu du lịch Bửu Long", "Hồ nước và núi đá nên thơ.", "", "/Images/homepage.png"), new LandingItem("Thác Giang Điền", "Thác nước mát lành.", "", "/Images/dsvn-vinh-ha-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội trái cây", "Sắc màu nông sản Đông Nam Bộ.", "", "/Images/homepage.png"), new LandingItem("Đờn ca tài tử", "Không gian âm nhạc Nam Bộ.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Tây Ninh",
                    Slug = "tay-ninh",
                    Description = "Tây Ninh là cửa ngõ Đông Nam Bộ, nổi bật với núi Bà Đen và ẩm thực độc đáo.",
                    Overview = "Núi Bà hùng vĩ và hương vị đặc sắc",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b45309",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Bánh tráng phơi sương", "Dẻo thơm, ăn kèm thịt luộc.", "Trảng Bàng", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Muối tôm", "Gia vị đậm đà nổi tiếng.", "Tây Ninh", "/Images/homepage.png"), new LandingItem("Bò tơ", "Thịt mềm, ngọt thơm.", "Gò Dầu", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Núi Bà Đen", "Ngọn núi linh thiêng cao nhất Nam Bộ.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Tòa thánh Cao Đài", "Kiến trúc độc đáo của đạo Cao Đài.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Hồ Dầu Tiếng", "Hồ nước rộng lớn và yên bình.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Lễ hội núi Bà", "Lễ hội tâm linh lớn của vùng.", "", "/Images/homepage.png"), new LandingItem("Ẩm thực chay", "Văn hóa ẩm thực gắn với đạo Cao Đài.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Vĩnh Long",
                    Slug = "vinh-long",
                    Description = "Vĩnh Long nằm giữa sông Tiền và sông Hậu, nổi bật với vườn trái cây và chợ nổi.",
                    Overview = "Miệt vườn trù phú bên sông Tiền",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#16a34a",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/homepage.png",
                    Specialties: new[] { new LandingItem("Bánh xèo", "Vỏ giòn, nhân tôm thịt đầy đặn.", "Vĩnh Long", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Cam sành", "Vị ngọt thanh mát.", "Trà Ôn", "/Images/homepage.png"), new LandingItem("Cá tai tượng", "Cá chiên giòn đặc trưng miền Tây.", "Cù lao An Bình", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Cù lao An Bình", "Du lịch miệt vườn yên bình.", "", "/Images/homepage.png"), new LandingItem("Chợ nổi Trà Ôn", "Nét văn hóa giao thương sông nước.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Lò gạch Mang Thít", "Di sản kiến trúc độc đáo.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Đờn ca tài tử", "Âm nhạc truyền thống miền Tây.", "", "/Images/homepage.png"), new LandingItem("Làng nghề gốm", "Nghề truyền thống lâu đời.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Đồng Tháp",
                    Slug = "dong-thap",
                    Description = "Đồng Tháp nổi tiếng với đồng sen, vườn quốc gia Tràm Chim và ẩm thực dân dã.",
                    Overview = "Sen hồng và miền đất hiền hòa",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b91c1c",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/homepage.png",
                    Specialties: new[] { new LandingItem("Cá lóc nướng trui", "Món ăn dân dã, thơm lừng.", "Sa Đéc", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Hủ tiếu Sa Đéc", "Sợi hủ tiếu dai, nước dùng ngọt.", "Sa Đéc", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Nem Lai Vung", "Nem chua ngọt thơm.", "Lai Vung", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Tourism: new[] { new LandingItem("Vườn quốc gia Tràm Chim", "Khu sinh thái ngập nước nổi tiếng.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Làng hoa Sa Đéc", "Thiên đường hoa rực rỡ.", "", "/Images/homepage.png"), new LandingItem("Đồng sen", "Khung cảnh sen nở thơ mộng.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Lễ hội sen", "Tôn vinh biểu tượng Đồng Tháp.", "", "/Images/homepage.png"), new LandingItem("Làng nghề bánh phồng", "Nghề truyền thống lâu đời.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Cà Mau",
                    Slug = "ca-mau",
                    Description = "Cà Mau là vùng đất cuối trời Nam với rừng ngập mặn, biển cả và hải sản phong phú.",
                    Overview = "Cực Nam Tổ quốc giữa rừng và biển",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#065f46",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/nha-hang-hai-san-nha-trang.jpg",
                    Specialties: new[] { new LandingItem("Cua Cà Mau", "Cua chắc thịt, thơm ngọt.", "Năm Căn", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Lẩu mắm", "Đậm đà hương vị miền Tây.", "Cà Mau", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Ba khía", "Món ăn dân dã đặc trưng.", "Rạch Gốc", "/Images/homepage.png") },
                    Tourism: new[] { new LandingItem("Mũi Cà Mau", "Điểm cực Nam Tổ quốc.", "", "/Images/homepage.png"), new LandingItem("Rừng U Minh", "Rừng ngập mặn đặc trưng.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Đầm Thị Tường", "Đầm nước rộng lớn miền Tây.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Lễ hội Nghinh Ông", "Nghi lễ cầu mùa của ngư dân.", "", "/Images/homepage.png"), new LandingItem("Đờn ca tài tử", "Âm nhạc truyền thống miền Tây.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "An Giang",
                    Slug = "an-giang",
                    Description = "An Giang gắn liền với núi Cấm, mùa nước nổi và văn hóa đa dạng.",
                    Overview = "Sắc màu biên giới và mùa nước nổi",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#15803d",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/homepage.png",
                    Specialties: new[] { new LandingItem("Bún cá Châu Đốc", "Nước dùng thơm nghệ, cá lóc tươi.", "Châu Đốc", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Mắm Châu Đốc", "Đặc sản đậm đà miền biên giới.", "Châu Đốc", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Gà đốt Ô Thum", "Gà nướng thơm vị sả.", "Tri Tôn", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Núi Cấm", "Điểm hành hương nổi tiếng.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Rừng tràm Trà Sư", "Cảnh sắc xanh mát mùa nước nổi.", "", "/Images/homepage.png"), new LandingItem("Chợ Châu Đốc", "Giao thương sôi động vùng biên.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Bà Chúa Xứ", "Lễ hội tâm linh lớn nhất miền Tây.", "", "/Images/homepage.png"), new LandingItem("Văn hóa Khmer", "Sắc màu văn hóa đa dạng vùng biên.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Quảng Ninh",
                    Slug = "quang-ninh",
                    Description = "Quảng Ninh là điểm đến nổi tiếng với vịnh Hạ Long, đảo Cô Tô và ẩm thực biển phong phú.",
                    Overview = "Vịnh Hạ Long kỳ quan thế giới",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0ea5e9",
                    HeroImage: "/Images/dsvn-vinh-ha-long.png",
                    IntroImage: "/Images/dsvn-vinh-ha-long.png",
                    Specialties: new[] { new LandingItem("Chả mực", "Mực giã tay, thơm ngon đặc trưng.", "Hạ Long", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Sá sùng", "Đặc sản quý của biển.", "Vân Đồn", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Sam biển", "Món ăn độc đáo vùng biển.", "Móng Cái", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Vịnh Hạ Long", "Kỳ quan thiên nhiên thế giới.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Yên Tử", "Thiền viện và cảnh sắc linh thiêng.", "", "/Images/homepage.png"), new LandingItem("Đảo Cô Tô", "Thiên đường biển đảo.", "", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Yên Tử", "Hành hương về đất Phật.", "", "/Images/homepage.png"), new LandingItem("Văn hóa than", "Dấu ấn công nhân mỏ.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/dsvn-vinh-ha-long.png", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Cao Bằng",
                    Slug = "cao-bang",
                    Description = "Cao Bằng nổi bật với thác Bản Giốc, động Ngườm Ngao và văn hóa dân tộc Tày.",
                    Overview = "Thác nước kỳ vĩ và núi rừng biên giới",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0f766e",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Bánh cuốn Cao Bằng", "Bánh mềm, nước dùng xương thơm.", "Thành phố Cao Bằng", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Lạp xưởng", "Hương vị đậm đà vùng biên.", "Trùng Khánh", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Hạt dẻ", "Đặc sản mùa thu Cao Bằng.", "Trùng Khánh", "/Images/homepage.png") },
                    Tourism: new[] { new LandingItem("Thác Bản Giốc", "Thác nước lớn nhất Việt Nam.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Động Ngườm Ngao", "Hang động kỳ ảo.", "", "/Images/homepage.png"), new LandingItem("Hồ Thang Hen", "Hồ nước xanh giữa núi đá.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Hát then", "Di sản văn hóa của người Tày.", "", "/Images/homepage.png"), new LandingItem("Lễ hội Lồng Tồng", "Lễ hội cầu mùa.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/caphethainguyen.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/dsvn-vinh-ha-long.png", "/Images/nha-hang-hai-san-nha-trang.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Lạng Sơn",
                    Slug = "lang-son",
                    Description = "Lạng Sơn nổi tiếng với núi đá, chợ biên giới và ẩm thực vịt quay.",
                    Overview = "Xứ Lạng thơ mộng nơi cửa khẩu",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#9a3412",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Vịt quay", "Da giòn, thịt thơm vị mắc mật.", "Thành phố Lạng Sơn", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Khâu nhục", "Thịt mềm, đậm vị.", "Cao Lộc", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Bánh áp chao", "Bánh rán giòn nóng.", "Lạng Sơn", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Mẫu Sơn", "Khí hậu mát lạnh quanh năm.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Động Tam Thanh", "Danh thắng nổi tiếng xứ Lạng.", "", "/Images/homepage.png"), new LandingItem("Chợ Đông Kinh", "Trung tâm thương mại biên giới.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Culture: new[] { new LandingItem("Lễ hội Kỳ Lừa", "Lễ hội truyền thống xứ Lạng.", "", "/Images/homepage.png"), new LandingItem("Hát sli", "Dân ca của người Nùng.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Lai Châu",
                    Slug = "lai-chau",
                    Description = "Lai Châu sở hữu núi non hùng vĩ, ruộng bậc thang và văn hóa dân tộc đa dạng.",
                    Overview = "Mây núi đại ngàn và bản sắc vùng cao",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#0f766e",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Thịt trâu gác bếp", "Đậm vị khói của núi rừng.", "Tam Đường", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Xôi tím", "Xôi nếp nương thơm dẻo.", "Sìn Hồ", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Rượu ngô", "Hương vị đặc trưng vùng cao.", "Phong Thổ", "/Images/homepage.png") },
                    Tourism: new[] { new LandingItem("Đèo Ô Quy Hồ", "Một trong tứ đại đỉnh đèo.", "", "/Images/dsvn-vinh-ha-long.png"), new LandingItem("Ruộng bậc thang", "Cảnh sắc mùa lúa chín.", "", "/Images/homepage.png"), new LandingItem("Đỉnh Putaleng", "Nóc nhà thứ hai của Đông Dương.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Lễ hội Then Kin Pang", "Lễ hội của người Thái.", "", "/Images/homepage.png"), new LandingItem("Chợ phiên vùng cao", "Không gian giao lưu văn hóa.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/caphethainguyen.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Điện Biên",
                    Slug = "dien-bien",
                    Description = "Điện Biên lưu giữ chiến thắng lịch sử, núi rừng rộng lớn và văn hóa dân tộc độc đáo.",
                    Overview = "Điểm hẹn lịch sử và hùng vĩ Tây Bắc",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b45309",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Xôi nếp nương", "Dẻo thơm, hạt nếp bóng mẩy.", "Điện Biên", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Gà đen Tủa Chùa", "Thịt thơm, chắc.", "Tủa Chùa", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Rượu sâu chít", "Đặc sản núi rừng.", "Mường Ảng", "/Images/homepage.png") },
                    Tourism: new[] { new LandingItem("Đồi A1", "Di tích chiến thắng Điện Biên Phủ.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Hồ Pá Khoang", "Hồ nước trong xanh giữa núi.", "", "/Images/homepage.png"), new LandingItem("Cánh đồng Mường Thanh", "Cánh đồng lớn nhất Tây Bắc.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Lễ hội Hoa Ban", "Lễ hội mùa xuân của người Thái.", "", "/Images/homepage.png"), new LandingItem("Nghệ thuật múa xòe", "Điệu múa truyền thống Tây Bắc.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/caphethainguyen.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Sơn La",
                    Slug = "son-la",
                    Description = "Sơn La nổi bật với cao nguyên Mộc Châu, khí hậu mát mẻ và văn hóa dân tộc phong phú.",
                    Overview = "Mùa hoa ban nở giữa núi rừng",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#15803d",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/caphethainguyen.jpg",
                    Specialties: new[] { new LandingItem("Bê chao Mộc Châu", "Thịt bê mềm, thơm.", "Mộc Châu", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Sữa tươi Mộc Châu", "Sữa tươi ngọt thanh.", "Mộc Châu", "/Images/homepage.png"), new LandingItem("Táo mèo", "Quả rừng chua ngọt.", "Bắc Yên", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Tourism: new[] { new LandingItem("Cao nguyên Mộc Châu", "Thảo nguyên xanh mát quanh năm.", "", "/Images/homepage.png"), new LandingItem("Đồi chè Mộc Châu", "Đồi chè trải dài bạt ngàn.", "", "/Images/caphethainguyen.jpg"), new LandingItem("Ngũ động Bản Ôn", "Hang động đẹp giữa núi.", "", "/Images/dsvn-vinh-ha-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội Hết Chá", "Nghi lễ đặc sắc của người Thái.", "", "/Images/homepage.png"), new LandingItem("Múa xòe", "Điệu múa truyền thống Tây Bắc.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/caphethainguyen.jpg", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/pho-bo-ha-noi.jpeg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Thanh Hóa",
                    Slug = "thanh-hoa",
                    Description = "Thanh Hóa hội tụ di sản văn hóa, bãi biển Sầm Sơn và ẩm thực phong phú.",
                    Overview = "Đất địa linh và biển xanh",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#9a3412",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Nem chua", "Chua cay, thơm mùi lá.", "Thanh Hóa", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Bánh gai Tứ Trụ", "Bánh dẻo thơm, nhân đậu xanh.", "Thọ Xuân", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Hải sản Sầm Sơn", "Tươi ngon từ biển.", "Sầm Sơn", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Thành nhà Hồ", "Di sản thế giới với kiến trúc đá.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Biển Sầm Sơn", "Bãi biển nổi tiếng miền Bắc.", "", "/Images/homepage.png"), new LandingItem("Suối cá Cẩm Lương", "Kỳ quan thiên nhiên độc đáo.", "", "/Images/dsvn-vinh-ha-long.png") },
                    Culture: new[] { new LandingItem("Lễ hội Lam Kinh", "Tưởng nhớ vua Lê Lợi.", "", "/Images/homepage.png"), new LandingItem("Hò sông Mã", "Làn điệu dân gian xứ Thanh.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Nghệ An",
                    Slug = "nghe-an",
                    Description = "Nghệ An là quê hương Chủ tịch Hồ Chí Minh, với bãi biển đẹp và ẩm thực đậm đà.",
                    Overview = "Miền quê xứ Nghệ giàu truyền thống",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#b91c1c",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Cháo lươn", "Nước dùng đậm đà, lươn thơm.", "Vinh", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Nhút Thanh Chương", "Món ăn dân dã từ mít non.", "Thanh Chương", "/Images/homepage.png"), new LandingItem("Cam Vinh", "Cam mọng nước, thơm ngọt.", "Vinh", "/Images/pho-bo-ha-noi.jpeg") },
                    Tourism: new[] { new LandingItem("Làng Sen", "Quê hương Chủ tịch Hồ Chí Minh.", "", "/Images/dsvh-hoang-thanh-thang-long.png"), new LandingItem("Biển Cửa Lò", "Bãi biển sôi động miền Trung.", "", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Đảo Lan Châu", "Điểm ngắm hoàng hôn tuyệt đẹp.", "", "/Images/homepage.png") },
                    Culture: new[] { new LandingItem("Dân ca ví giặm", "Di sản văn hóa phi vật thể UNESCO.", "", "/Images/homepage.png"), new LandingItem("Lễ hội đền Cuông", "Lễ hội truyền thống xứ Nghệ.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                )),
            new ProvinceSeed(
                new Province
                {
                    Id = Guid.NewGuid(),
                    Name = "Hà Tĩnh",
                    Slug = "ha-tinh",
                    Description = "Hà Tĩnh nổi bật với bãi biển hoang sơ, núi Hồng Lĩnh và văn hóa dân ca đặc sắc.",
                    Overview = "Dải đất miền Trung trầm mặc",
                    Region = string.Empty,
                    ImageUrl = string.Empty,
                    VideoUrl = string.Empty,
                    Introduction = string.Empty,
                    IntroductionEn = string.Empty,
                    Body = string.Empty,
                    Tags = string.Empty,
                    IsHighlighted = false,
                    HighlightOrder = 0
                },
                new ProvinceLandingFallback(
                    AccentColor: "#92400e",
                    HeroImage: "/Images/homepage.png",
                    IntroImage: "/Images/am-thuc-viet-nam-2-1751938296.jpg",
                    Specialties: new[] { new LandingItem("Kẹo cu đơ", "Ngọt thơm vị lạc và mật mía.", "Hồng Lĩnh", "/Images/am-thuc-viet-nam-2-1751938296.jpg"), new LandingItem("Bún bò Đức Thọ", "Nước dùng đậm vị.", "Đức Thọ", "/Images/pho-bo-ha-noi.jpeg"), new LandingItem("Mực nhảy", "Hải sản tươi ngon.", "Thiên Cầm", "/Images/nha-hang-hai-san-nha-trang.jpg") },
                    Tourism: new[] { new LandingItem("Biển Thiên Cầm", "Bãi biển hoang sơ, thơ mộng.", "", "/Images/nha-hang-hai-san-nha-trang.jpg"), new LandingItem("Núi Hồng Lĩnh", "Ngọn núi gắn với truyền thuyết.", "", "/Images/homepage.png"), new LandingItem("Khu lưu niệm Nguyễn Du", "Không gian văn hóa của đại thi hào.", "", "/Images/dsvh-hoang-thanh-thang-long.png") },
                    Culture: new[] { new LandingItem("Dân ca ví giặm", "Nét văn hóa dân gian đặc sắc.", "", "/Images/homepage.png"), new LandingItem("Lễ hội Nguyễn Du", "Tôn vinh giá trị văn học.", "", "/Images/am-thuc-viet-nam-2-1751938296.jpg") },
                    Gallery: new[] { "/Images/homepage.png", "/Images/am-thuc-viet-nam-2-1751938296.jpg", "/Images/pho-bo-ha-noi.jpeg", "/Images/nha-hang-hai-san-nha-trang.jpg", "/Images/dsvn-vinh-ha-long.png", "/Images/caphethainguyen.jpg" }
                ))
        };

        foreach (var seed in seeds)
        {
            seed.Province.ImageUrl = seed.Fallback.HeroImage;
            seed.Province.Region = ResolveRegion(seed.Province.Slug);
            seed.Province.Tags = BuildTags(seed.Province.Description, seed.Fallback);
        }

        dbContext.Provinces.AddRange(seeds.Select(x => x.Province));
        await dbContext.SaveChangesAsync(cancellationToken);

        dbContext.LandingPageConfigs.AddRange(seeds.Select(x => CreateLandingConfig(x.Province, x.Fallback)));
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static LandingPageConfig CreateLandingConfig(Province province, ProvinceLandingFallback fallback)
    {
        var configId = Guid.NewGuid();

        return new LandingPageConfig
        {
            Id = configId,
            ProvinceId = province.Id,
            ThemeColor = fallback.AccentColor,
            FontFamily = "Inter",
            BackgroundUrl = fallback.HeroImage,
            Layout = "default",
            Blocks = new List<UIBlock>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "hero",
                    Title = province.Name,
                    ContentJson = Serialize(new
                    {
                        title = province.Name,
                        subtitle = province.Overview,
                        description = province.Description,
                        imageUrl = fallback.HeroImage
                    }),
                    SortOrder = 1,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "intro",
                    Title = "Giới thiệu",
                    ContentJson = Serialize(new
                    {
                        title = province.Name,
                        subtitle = province.Overview,
                        description = province.Description,
                        imageUrl = fallback.IntroImage
                    }),
                    SortOrder = 2,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "richText",
                    Title = "Nội dung",
                    ContentJson = Serialize(new
                    {
                        html = province.Body
                    }),
                    SortOrder = 3,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "highlights",
                    Title = "Điểm nhấn",
                    ContentJson = Serialize(new
                    {
                        title = "Điểm nhấn",
                        description = province.Description,
                        items = Array.Empty<string>()
                    }),
                    SortOrder = 4,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "specialties",
                    Title = "Đặc sản",
                    ContentJson = Serialize(new
                    {
                        title = "Đặc sản",
                        items = fallback.Specialties
                    }),
                    SortOrder = 5,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "tourism",
                    Title = "Du lịch",
                    ContentJson = Serialize(new
                    {
                        title = "Du lịch",
                        items = fallback.Tourism
                    }),
                    SortOrder = 6,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "culture",
                    Title = "Văn hóa",
                    ContentJson = Serialize(new
                    {
                        title = "Văn hóa",
                        items = fallback.Culture
                    }),
                    SortOrder = 7,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "gallery",
                    Title = "Thư viện ảnh",
                    ContentJson = Serialize(new
                    {
                        title = "Thư viện ảnh",
                        images = fallback.Gallery
                    }),
                    SortOrder = 8,
                    IsEnabled = true
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    LandingPageConfigId = configId,
                    BlockType = "cta",
                    Title = "CTA",
                    ContentJson = "{}",
                    SortOrder = 9,
                    IsEnabled = true
                }
            }
        };
    }

    private static string ResolveRegion(string slug)
    {
        return slug switch
        {
            "da-nang" or "hue" or "quang-tri" or "quang-ngai" or "khanh-hoa" or "lam-dong" or "nghe-an" or "ha-tinh" or "thanh-hoa" => "Central",
            "ho-chi-minh" or "can-tho" or "dong-nai" or "tay-ninh" or "vinh-long" or "dong-thap" or "ca-mau" or "an-giang" => "South",
            _ => "North"
        };
    }

    private static string BuildTags(string description, ProvinceLandingFallback fallback)
    {
        var tags = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "Culture",
            "Tourism",
            "Cuisine"
        };

        if (ContainsAny(description, "di sản", "lịch sử", "cố đô", "chiến thắng", "kinh kỳ", "cách mạng") ||
            fallback.Tourism.Any(item => ContainsAny(item.Name, "Thành", "Đền", "Cổ", "Di tích", "Lăng", "Hoàng thành")))
        {
            tags.Add("History");
        }

        if (fallback.Culture.Any(item => ContainsAny(item.Name, "Lễ", "Festival", "hội")) ||
            ContainsAny(description, "lễ hội"))
        {
            tags.Add("Festival");
        }

        return string.Join(",", tags);
    }

    private static bool ContainsAny(string value, params string[] keywords)
    {
        return keywords.Any(keyword => value.Contains(keyword, StringComparison.OrdinalIgnoreCase));
    }

    private static string Serialize(object value)
    {
        return JsonSerializer.Serialize(value, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false
        });
    }

    private sealed record ProvinceSeed(Province Province, ProvinceLandingFallback Fallback);
    private sealed record ProvinceLandingFallback(string AccentColor, string HeroImage, string IntroImage, IReadOnlyList<LandingItem> Specialties, IReadOnlyList<LandingItem> Tourism, IReadOnlyList<LandingItem> Culture, IReadOnlyList<string> Gallery);
    private sealed record LandingItem(string Name, string Description, string Origin, string Image);
}
