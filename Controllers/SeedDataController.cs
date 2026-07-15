using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services.Interfaces;
using WebApplication1.Application.DTOs.ProductInfographicsDTOs;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.Interfaces.Services;
using System;
using System.Threading.Tasks;
using System.Threading;
using System.Text.Json;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/seed")]
public class SeedDataController : ControllerBase
{
    private readonly IProductInfographicService _service;
    private readonly IProductService _productService;
    private readonly IProvinceService _provinceService;

    public SeedDataController(
        IProductInfographicService service,
        IProductService productService,
        IProvinceService provinceService)
    {
        _service = service;
        _productService = productService;
        _provinceService = provinceService;
    }

    // ─── Seed cũ chỉ cho Phở Hà Nội (giữ lại để tương thích) ───────────────
    [HttpPost("infographics")]
    public async Task<IActionResult> SeedInfographics()
    {
        var hanoi = await _provinceService.GetBySlugAsync("ha-noi", CancellationToken.None);
        if (hanoi == null)
            return BadRequest(new { message = "Không tìm thấy tỉnh Hà Nội để seed đặc sản." });

        var product = await _productService.GetBySlugAsync("pho-ha-noi", CancellationToken.None);
        Guid productId;
        if (product == null)
        {
            var createdProduct = await _productService.CreateAsync(new ProductCreateDto
            {
                ProvinceId = hanoi.Id,
                Name = "Phở Hà Nội",
                Slug = "pho-ha-noi",
                
                ImageUrl = "/Images/pho-bo-ha-noi.jpeg",
                IsPublished = true,
                IsFeatured = true
            }, CancellationToken.None);
            productId = createdProduct.Id;
        }
        else
        {
            productId = product.Id;
        }

        var existing = await _service.GetByProductIdAsync(productId);
        Guid infographicId;
        if (existing != null)
        {
            infographicId = existing.Id;
            if (existing.Blocks != null && existing.Blocks.Count > 0)
                return Ok(new { message = "Đã có dữ liệu infographic (có blocks), không cần seed.", infographicId = existing.Id });
        }
        else
        {
            infographicId = await _service.CreateAsync(new CreateProductInfographicDto { ProductId = productId });
        }

        await _service.CreateBlockAsync(new CreateInfographicBlockDto
        {
            ProductInfographicId = infographicId,
            BlockType = "Hero",
            LayoutType = "HeroBanner",
            SortOrder = 0,
            IsVisible = true,
            DataJson = "{\"title\":\"Phở Hà Nội\",\"subtitle\":\"Hương vị truyền thống ngàn năm\",\"image\":\"/Images/pho-bo-ha-noi.jpeg\"}"
        });

        await _service.CreateBlockAsync(new CreateInfographicBlockDto
        {
            ProductInfographicId = infographicId,
            BlockType = "Content",
            LayoutType = "ImageLeftTextRight",
            SortOrder = 1,
            IsVisible = true,
            DataJson = "{\"title\":\"Nước dùng tinh túy\",\"content\":\"Hầm xương bò nhiều giờ liền để có độ ngọt thanh đặc trưng, kết hợp cùng các loại thảo mộc như quế, hồi, thảo quả.\",\"image\":\"/Images/am-thuc-viet-nam-2-1751938296.jpg\"}"
        });

        await _service.PublishAsync(infographicId, true);
        return Ok(new { message = "Seed infographic mẫu thành công!", infographicId });
    }

    // ─── Seed đầy đủ 4 đặc sản Hà Nội ──────────────────────────────────────
    [HttpPost("hanoi-specialties")]
    public async Task<IActionResult> SeedHanoiSpecialties()
    {
        var hanoi = await _provinceService.GetBySlugAsync("ha-noi", CancellationToken.None);
        if (hanoi == null)
            return BadRequest(new { message = "Không tìm thấy tỉnh Hà Nội." });

        var results = new List<object>();

        // ── 1. Phở Hà Nội ──────────────────────────────────────────────────
        results.Add(await SeedSpecialty(hanoi.Id, new ProductCreateDto
        {
            ProvinceId = hanoi.Id,
            Name = "Phở Hà Nội",
            Slug = "pho-ha-noi",
            
            ImageUrl = "/Images/pho-bo-ha-noi.jpeg",
            IsPublished = true,
            IsFeatured = true
        }, new List<CreateInfographicBlockDto>
        {
            new() {
                BlockType = "Hero", LayoutType = "HeroBanner", SortOrder = 0, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Phở Hà Nội",
                    subtitle = "Hương vị biểu tượng của thủ đô nghìn năm văn hiến",
                    image = "/Images/pho-bo-ha-noi.jpeg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageLeftTextRight", SortOrder = 1, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Giới thiệu",
                    content = "Phở Hà Nội là món ăn biểu tượng của thủ đô, xuất hiện từ đầu thế kỷ XX và dần trở thành đại diện tiêu biểu của ẩm thực Việt Nam trên toàn thế giới. Điểm đặc trưng nằm ở nước dùng trong, ngọt thanh được ninh từ xương bò nhiều giờ liền kết hợp cùng các loại gia vị như quế, hồi, thảo quả và gừng nướng.",
                    image = "/Images/am-thuc-viet-nam-2-1751938296.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageRightTextLeft", SortOrder = 2, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Nguồn gốc lịch sử",
                    content = "Phở được cho là hình thành tại khu vực đồng bằng Bắc Bộ vào đầu thế kỷ XX, sau đó phát triển mạnh tại Hà Nội và trở thành món ăn gắn liền với văn hóa phố cổ. Những gánh phở rong trên đường phố Hà Nội xưa đã trở thành ký ức không thể phai mờ của bao thế hệ người Hà Thành.",
                    image = "/Images/Landingpagehanoi/pexels-thanhhoa-tran-640546-1621248.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Statistics", SortOrder = 3, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Phở Hà Nội qua các con số",
                    stats = new[] {
                        new { value = "100+", label = "Năm lịch sử" },
                        new { value = "50+", label = "Quốc gia biết đến" },
                        new { value = "300+", label = "Quán phở tại Hà Nội" },
                        new { value = "1M+", label = "Bát phở mỗi ngày" }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "TextOnly", SortOrder = 4, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Đặc điểm nổi bật",
                    content = "Nước dùng trong, thơm tự nhiên từ xương bò ninh lâu. Bánh phở mềm, dai vừa phải. Thịt bò tái hoặc chín thái mỏng. Ăn kèm hành lá, rau thơm, quẩy nóng. Phở Hà Nội không dùng giá đỗ hay rau húng quế như phở Nam – sự tinh tế, tối giản chính là bản sắc của phở Bắc."
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Timeline", SortOrder = 5, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Hành trình phát triển của Phở",
                    items = new[] {
                        new { year = "1900s", title = "Khởi nguồn", content = "Phở xuất hiện đầu tiên tại vùng Nam Định – Hà Nội dưới dạng gánh hàng rong." },
                        new { year = "1930s", title = "Lan rộng phố cổ", content = "Các tiệm phở cố định xuất hiện tại phố Hàng Đồng, Hàng Gai – trở thành nét văn hóa đặc trưng." },
                        new { year = "1954", title = "Di cư vào Nam", content = "Người Hà Nội mang phở vào Sài Gòn, tạo nên nhánh phở Nam với nhiều điểm khác biệt." },
                        new { year = "1990s", title = "Ra thế giới", content = "Cộng đồng người Việt hải ngoại mang phở ra thế giới, phở trở thành món ăn Việt quốc tế." },
                        new { year = "2024", title = "Di sản ẩm thực", content = "Phở Hà Nội được đề cử là Di sản Văn hóa Phi vật thể cấp quốc gia." }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Quote", SortOrder = 6, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    quote = "Một bát phở Hà Nội không chỉ là bữa ăn – đó là ký ức, là tình yêu với mảnh đất nghìn năm.",
                    author = "Nhà văn Nguyễn Tuân"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "FAQ", SortOrder = 7, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Thường gặp về Phở Hà Nội",
                    items = new[] {
                        new { question = "Phở Hà Nội khác phở Sài Gòn ở điểm nào?", answer = "Phở Hà Nội có nước dùng trong hơn, ít ngọt hơn, không dùng giá đỗ và rau húng quế. Phở Nam thường có vị ngọt hơn và ăn kèm nhiều rau sống." },
                        new { question = "Địa chỉ ăn phở ngon tại Hà Nội?", answer = "Phở Thìn Bờ Hồ (Đinh Tiên Hoàng), Phở Bát Đàn (Bát Đàn), Phở Gia Truyền Bát Đàn, Phở Lý Quốc Sư là những địa chỉ nổi tiếng." },
                        new { question = "Nên ăn phở vào thời điểm nào trong ngày?", answer = "Phở Hà Nội truyền thống được ăn vào buổi sáng. Một bát phở nóng trong buổi sáng se lạnh là trải nghiệm không thể bỏ qua khi đến Hà Nội." }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "CTA", SortOrder = 8, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Khám phá thêm đặc sản Hà Nội",
                    description = "Hà Nội còn vô số món ngon chờ bạn thưởng thức. Hãy khám phá thêm nhé!",
                    buttonText = "Xem đặc sản khác",
                    buttonUrl = "/province/ha-noi"
                })
            }
        }));

        // ── 2. Bún Chả Hà Nội ─────────────────────────────────────────────
        results.Add(await SeedSpecialty(hanoi.Id, new ProductCreateDto
        {
            ProvinceId = hanoi.Id,
            Name = "Bún Chả Hà Nội",
            Slug = "bun-cha-ha-noi",
            
            ImageUrl = "/Images/Landingpagehanoi/pexels-nhavan-33082608.jpg",
            IsPublished = true,
            IsFeatured = true
        }, new List<CreateInfographicBlockDto>
        {
            new() {
                BlockType = "Hero", LayoutType = "HeroBanner", SortOrder = 0, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Bún Chả Hà Nội",
                    subtitle = "Hương khói than hoa quyện trong từng sợi bún trắng",
                    image = "/Images/Landingpagehanoi/pexels-nhavan-33082608.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageLeftTextRight", SortOrder = 1, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Giới thiệu",
                    content = "Bún chả là món ăn đặc trưng của người Hà Nội, gắn liền với những buổi trưa hè mùi khói than thơm phức trên các con phố. Món ăn gồm bún tươi trắng mịn, chả nướng thơm và bát nước chấm chua ngọt hài hòa – một sự kết hợp hoàn hảo không thể tách rời.",
                    image = "/Images/Landingpagehanoi/pexels-nhavan-36930584.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Statistics", SortOrder = 2, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Bún Chả trong con số",
                    stats = new[] {
                        new { value = "80+", label = "Năm tồn tại" },
                        new { value = "2016", label = "Obama thưởng thức" },
                        new { value = "200+", label = "Quán tại Hà Nội" },
                        new { value = "3", label = "Thành phần chính" }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageRightTextLeft", SortOrder = 3, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Hương vị đặc trưng",
                    content = "Chả thường có hai loại: chả miếng (thịt ba chỉ ướp nướng) và chả viên (thịt xay vo viên). Nước chấm pha từ nước mắm, giấm, đường, tỏi ớt – chua chua ngọt ngọt, thêm đu đủ và cà rốt bào sợi. Ăn kèm rau sống tươi mát là rau húng quế, xà lách, kinh giới.",
                    image = "/Images/Landingpagehanoi/pexels-nhavan-36930586.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Quote", SortOrder = 4, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    quote = "Đây là thứ tôi muốn ăn mỗi ngày nếu có thể – đơn giản mà hoàn hảo.",
                    author = "Cựu Tổng thống Barack Obama (2016)"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "TextOnly", SortOrder = 5, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Trải nghiệm thưởng thức",
                    content = "Ngồi trên những chiếc ghế nhựa nhỏ ven đường, hít hà mùi khói than thơm lừng, cuốn bún với chả nướng cùng mớ rau tươi rồi nhúng vào bát nước chấm – đó là trải nghiệm bún chả thuần chất Hà Nội mà không nơi nào có thể thay thế được."
                })
            },
            new() {
                BlockType = "Content", LayoutType = "FAQ", SortOrder = 6, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Hỏi đáp về Bún Chả",
                    items = new[] {
                        new { question = "Bún chả Hà Nội nổi tiếng nhất ở đâu?", answer = "Bún Chả Hương Liên (Lê Văn Hưu) – nơi Obama từng ghé thăm, Bún Chả Đắc Kim (Hàng Mành), và nhiều quán vỉa hè trên phố Đinh Tiên Hoàng." },
                        new { question = "Nên ăn bún chả vào bữa nào?", answer = "Bún chả thường được ăn vào bữa trưa, khoảng 11h-13h. Đây là thói quen ẩm thực của người Hà Nội từ bao đời nay." },
                        new { question = "Bún chả có phải món ăn lành mạnh không?", answer = "Bún chả tương đối cân bằng với bún cung cấp tinh bột, thịt nướng cung cấp protein, và rau sống giúp bổ sung chất xơ, vitamin." }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "CTA", SortOrder = 7, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Khám phá ẩm thực Hà Nội",
                    description = "Hãy khám phá thêm nhiều đặc sản hấp dẫn khác của thủ đô nghìn năm văn hiến.",
                    buttonText = "Xem thêm đặc sản",
                    buttonUrl = "/province/ha-noi"
                })
            }
        }));

        // ── 3. Bánh Cuốn Hà Nội ───────────────────────────────────────────
        results.Add(await SeedSpecialty(hanoi.Id, new ProductCreateDto
        {
            ProvinceId = hanoi.Id,
            Name = "Bánh Cuốn Hà Nội",
            Slug = "banh-cuon-ha-noi",
            
            ImageUrl = "/Images/Landingpagehanoi/pexels-nhavan-36930594.jpg",
            IsPublished = true,
            IsFeatured = false
        }, new List<CreateInfographicBlockDto>
        {
            new() {
                BlockType = "Hero", LayoutType = "HeroBanner", SortOrder = 0, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Bánh Cuốn Hà Nội",
                    subtitle = "Tinh tế từ lớp vỏ mỏng tang, thơm hương nhân thịt nấm",
                    image = "/Images/Landingpagehanoi/pexels-nhavan-36930594.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageLeftTextRight", SortOrder = 1, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Giới thiệu",
                    content = "Bánh cuốn Hà Nội là sự kết hợp tinh tế giữa lớp bánh mỏng làm từ bột gạo hấp, nhân thịt heo băm xào cùng mộc nhĩ và hành khô. Điểm đặc biệt là lớp vỏ bánh mỏng như tờ giấy, trong suốt lấp lánh, cuộn nhân vừa khéo léo.",
                    image = "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-35775552.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "TextOnly", SortOrder = 2, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Nghệ thuật tráng bánh",
                    content = "Tráng bánh cuốn là một nghệ thuật đòi hỏi sự khéo léo và kiên nhẫn. Bột gạo được pha loãng, đổ một lớp mỏng lên mặt vải căng trên nồi nước sôi. Chỉ vài chục giây, lớp bánh trong suốt đã chín và được nhẹ nhàng cuộn lại với nhân thịt thơm ngon."
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Statistics", SortOrder = 3, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Bánh Cuốn qua con số",
                    stats = new[] {
                        new { value = "200+", label = "Năm lịch sử" },
                        new { value = "3", label = "Thành phần chính" },
                        new { value = "30s", label = "Thời gian tráng 1 bánh" },
                        new { value = "5⭐", label = "Điểm du lịch ẩm thực" }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageRightTextLeft", SortOrder = 4, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Nước chấm – linh hồn của bánh cuốn",
                    content = "Nước chấm bánh cuốn Hà Nội được pha từ nước mắm ngon, chua từ chanh, ngọt từ đường và thêm vài lát ớt. Khác với bánh cuốn miền Nam, bánh cuốn Hà Nội ăn kèm chả lụa thơm mềm và hành phi giòn rụm.",
                    image = "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-35775572.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Quote", SortOrder = 5, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    quote = "Một đĩa bánh cuốn Hà Nội vào buổi sáng mang lại cảm giác bình yên và nhẹ nhàng như chính tâm hồn người Hà Thành.",
                    author = "Nhà nghiên cứu ẩm thực Việt Nam"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "FAQ", SortOrder = 6, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Hỏi đáp về Bánh Cuốn",
                    items = new[] {
                        new { question = "Bánh cuốn Hà Nội có gì khác so với bánh cuốn vùng khác?", answer = "Bánh cuốn Hà Nội nổi bật với lớp vỏ mỏng, trong, ăn kèm chả lụa và hành phi. Bánh cuốn Nam Định thường không có nhân, còn bánh cuốn Sài Gòn có thêm giá đỗ và nhiều rau sống hơn." },
                        new { question = "Ăn bánh cuốn vào buổi nào tốt nhất?", answer = "Bánh cuốn thường được ăn vào buổi sáng. Nhiều quán chỉ mở từ 6h đến 10h sáng, vì vậy hãy đến sớm để thưởng thức khi bánh còn nóng hổi nhất." },
                        new { question = "Bánh cuốn ngon nhất Hà Nội ở đâu?", answer = "Bánh Cuốn Bà Hoành (Tô Hiến Thành), Bánh Cuốn Thanh Vân (Hàng Gà), và những quán nhỏ trong ngõ phố cổ là những địa chỉ được người Hà Nội tin tưởng." }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "CTA", SortOrder = 7, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Khám phá ẩm thực Hà Nội",
                    description = "Còn nhiều món đặc sản hấp dẫn đang chờ bạn khám phá tại thủ đô.",
                    buttonText = "Xem thêm đặc sản",
                    buttonUrl = "/province/ha-noi"
                })
            }
        }));

        // ── 4. Chè Hà Nội ─────────────────────────────────────────────────
        results.Add(await SeedSpecialty(hanoi.Id, new ProductCreateDto
        {
            ProvinceId = hanoi.Id,
            Name = "Chè Hà Nội",
            Slug = "che-ha-noi",
            
            ImageUrl = "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-36204083.jpg",
            IsPublished = true,
            IsFeatured = false
        }, new List<CreateInfographicBlockDto>
        {
            new() {
                BlockType = "Hero", LayoutType = "HeroBanner", SortOrder = 0, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Chè Hà Nội",
                    subtitle = "Ngọt ngào thanh mát – tinh hoa quà vặt đất kinh kỳ",
                    image = "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-36204083.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageLeftTextRight", SortOrder = 1, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Giới thiệu",
                    content = "Chè Hà Nội là một thế giới đa dạng và phong phú của những món tráng miệng truyền thống. Từ chè thập cẩm, chè sen, chè hạt sen nhãn nhục, đến chè bà ba hay chè đậu xanh – mỗi loại mang một hương vị riêng biệt, tinh tế và khó quên.",
                    image = "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-36850531.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Statistics", SortOrder = 2, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Chè Hà Nội qua con số",
                    stats = new[] {
                        new { value = "20+", label = "Loại chè truyền thống" },
                        new { value = "300+", label = "Năm lịch sử" },
                        new { value = "100%", label = "Nguyên liệu tự nhiên" },
                        new { value = "4", label = "Mùa thưởng thức" }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "ImageRightTextLeft", SortOrder = 3, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Các loại chè đặc sắc",
                    content = "Chè sen Hà Nội được nấu từ hạt sen trắng ngần, thêm long nhãn ngọt lịm và hương sen tinh khiết. Chè thập cẩm hội tụ nhiều nguyên liệu như hạt lựu, thạch, trân châu, đậu xanh. Chè khúc bạch thanh mát với những miếng thạch trắng ngần trong nước đường thơm hương hoa.",
                    image = "/Images/Landingpagehanoi/pexels-tbd-tuyen-859104985-36679417.jpg"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Timeline", SortOrder = 4, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Lịch sử chè Hà Nội",
                    items = new[] {
                        new { year = "Thế kỷ 17", title = "Xuất hiện tại cung đình", content = "Chè sen, chè hạt lựu được dâng lên vua chúa trong các bữa tiệc cung đình Thăng Long." },
                        new { year = "Thế kỷ 19", title = "Lan ra dân gian", content = "Chè bắt đầu được bán trên đường phố Hà Nội, trở thành món quà vặt bình dân yêu thích." },
                        new { year = "1950s", title = "Phố chè Hàng Đường", content = "Phố Hàng Đường trở thành trung tâm buôn bán bánh kẹo và chè truyền thống của Hà Nội." },
                        new { year = "2000s", title = "Sáng tạo hiện đại", content = "Nhiều loại chè mới xuất hiện kết hợp nguyên liệu truyền thống với phong cách hiện đại, thu hút giới trẻ." }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "Quote", SortOrder = 5, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    quote = "Một bát chè sen Hà Nội vào chiều hè, ngồi bên hồ Tây nhìn sen nở, đó là bình yên thuần khiết nhất.",
                    author = "Nhà thơ Xuân Diệu"
                })
            },
            new() {
                BlockType = "Content", LayoutType = "FAQ", SortOrder = 6, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Hỏi đáp về Chè Hà Nội",
                    items = new[] {
                        new { question = "Chè Hà Nội có mấy loại nổi tiếng?", answer = "Có thể kể đến: Chè sen, chè thập cẩm, chè khúc bạch, chè hạt lựu, chè đậu xanh đánh, chè bà ba, chè long nhãn hạt sen, chè sương sa." },
                        new { question = "Ăn chè Hà Nội ở đâu ngon?", answer = "Chè Bốn Mùa (Hàng Cân), Chè Hàng Đường (nhiều quán), Chè Nhà Thờ (khu vực Nhà Thờ Lớn), và phố Tống Duy Tân là những địa điểm nổi tiếng." },
                        new { question = "Chè Hà Nội phù hợp ăn theo mùa nào?", answer = "Mỗi loại chè phù hợp một mùa: Chè đậu xanh, chè hoa quả dầm mát lạnh cho mùa hè; Chè sen, chè hạt lựu ấm nóng cho mùa đông." }
                    }
                })
            },
            new() {
                BlockType = "Content", LayoutType = "CTA", SortOrder = 7, IsVisible = true,
                DataJson = JsonSerializer.Serialize(new {
                    title = "Khám phá thêm đặc sản Hà Nội",
                    description = "Hà Nội có vô vàn hương vị chờ bạn khám phá. Hãy tiếp tục hành trình ẩm thực!",
                    buttonText = "Xem thêm đặc sản",
                    buttonUrl = "/province/ha-noi"
                })
            }
        }));

        return Ok(new
        {
            message = "Seed 4 đặc sản Hà Nội thành công!",
            results
        });
    }

    // ─── Helper method để seed 1 đặc sản ────────────────────────────────────
    private async Task<object> SeedSpecialty(
        Guid provinceId,
        ProductCreateDto productDto,
        List<CreateInfographicBlockDto> blocks)
    {
        try
        {
            // Tìm hoặc tạo product
            var product = await _productService.GetBySlugAsync(productDto.Slug, CancellationToken.None);
            Guid productId;
            if (product == null)
            {
                var created = await _productService.CreateAsync(productDto, CancellationToken.None);
                productId = created.Id;
            }
            else
            {
                productId = product.Id;
            }

            // Tìm infographic hiện có
            var existing = await _service.GetByProductIdAsync(productId);
            Guid infographicId;

            if (existing != null)
            {
                infographicId = existing.Id;

                // Nếu đã có blocks thì xóa toàn bộ và seed lại
                if (existing.Blocks != null && existing.Blocks.Count > 0)
                {
                    foreach (var b in existing.Blocks.ToList())
                        await _service.DeleteBlockAsync(b.Id);
                }
            }
            else
            {
                infographicId = await _service.CreateAsync(new CreateProductInfographicDto { ProductId = productId });
            }

            // Thêm blocks
            int sortOrder = 0;
            foreach (var block in blocks)
            {
                block.ProductInfographicId = infographicId;
                block.SortOrder = sortOrder++;
                await _service.CreateBlockAsync(block);
            }

            // Publish
            await _service.PublishAsync(infographicId, true);

            return new { success = true, slug = productDto.Slug, productId, infographicId };
        }
        catch (Exception ex)
        {
            return new { success = false, slug = productDto.Slug, error = ex.Message };
        }
    }
}
