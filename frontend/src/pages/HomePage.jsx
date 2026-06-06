import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import phoImage from "/Images/pho-bo-ha-noi.jpeg";
import hueImage from "/Images/bunbohue.jpg";
import huTieuImage from "/Images/hutieu.jpg";
import thangLongImage from "/Images/dsvh-hoang-thanh-thang-long.png";
import hueCitadelImage from "/Images/kinhdophuxuan.jpg";
import heroLandscape from "/Images/homepage.png";

export default function HomePage() {
  const navigate = useNavigate();
  const aodaiImage = "/Images/aodaitrang.jpg";
  const caTruImage = "/Images/catru.jpg";
  const muaRoiImage = "/Images/muaroi.jpg";
  const ngayDocLapImage = "/Images/ngaydoclapdantoc.jpg";
  const hienDaiHoiNhapImage = "/Images/hiendaivietnamhoinhap.jpg";
  const mapVietnamImage = "/Images/mapvn.jpg";

  const landmarks = [
    {
      name: "Văn Miếu",
      category: "Di tích lịch sử",
      description: "Được dựng từ năm 1070 dưới triều Lý Thánh Tông, Văn Miếu là nơi thờ Khổng Tử và tôn vinh đạo học của dân tộc. Đây là biểu tượng tiêu biểu cho truyền thống hiếu học và văn hiến Việt Nam.",
      position: "left"
    },
    {
      name: "Cố đô Huế",
      category: "Di sản văn hóa",
      description: "Khi nhà Nguyễn chọn Huế làm kinh đô vào đầu thế kỷ XIX, nơi đây trở thành trung tâm chính trị và văn hóa của đất nước. Quần thể di tích vẫn lưu giữ đậm dấu ấn kiến trúc cung đình và bản sắc miền Trung.",
      position: "right"
    },
    {
      name: "Vịnh Hạ Long",
      category: "Danh thắng du lịch",
      description: "Qua hàng triệu năm kiến tạo địa chất, Vịnh Hạ Long hình thành quần thể hàng nghìn đảo đá vôi giữa làn nước xanh. Đây vừa là kỳ quan thiên nhiên, vừa gắn với truyền thuyết và đời sống cư dân vùng biển.",
      position: "left"
    }
  ];

  const culinaryHighlights = [
    {
      region: "Miền Bắc",
      title: "Phở Hà Nội",
      description: "Phở Hà Nội hình thành vào đầu thế kỷ XX trong không gian phố thị Bắc Bộ, từ những gánh phở rong quen thuộc. Nước dùng trong, vị ngọt xương hầm và hương quế hồi nhẹ tạo nên phong vị thanh tao, tinh tế của đất kinh kỳ.",
      image: phoImage
    },
    {
      region: "Miền Trung",
      title: "Bún bò Huế",
      description: "Bún bò Huế bắt nguồn từ vùng đất cố đô, nơi ẩm thực cung đình triều Nguyễn hòa quyện với khẩu vị đậm đà của người dân xứ Huế. Món ăn nổi bật bởi nước dùng thơm sả, mắm ruốc và vị cay nồng rất riêng của miền Trung.",
      image: hueImage
    },
    {
      region: "Miền Nam",
      title: "Hủ tiếu Nam Vang",
      description: "Hủ tiếu Nam Vang du nhập vào Nam Bộ qua giao thoa văn hóa của người Khmer, người Hoa và người Việt. Khi vào Việt Nam, món ăn được biến tấu với nước dùng ngọt thanh, sợi dai và topping phong phú, rất hợp với khẩu vị miền Nam.",
      image: huTieuImage
    }
  ];

  const historyFlow = [
    {
      year: "1010",
      title: "Kinh đô Thăng Long",
      description: "Năm 1010, vua Lý Thái Tổ ban Chiếu dời đô từ Hoa Lư ra Đại La và đặt tên là Thăng Long. Sự kiện này mở ra thời kỳ phát triển mới, đặt nền móng cho kinh đô và văn hiến Đại Việt.",
      image: thangLongImage
    },
    {
      year: "1802",
      title: "Kinh đô Phú Xuân",
      description: "Sau khi thống nhất đất nước, Gia Long chọn Phú Xuân làm kinh đô và xây dựng hệ thống cung điện, thành quách quy mô lớn. Từ đó, Huế trở thành trung tâm chính trị, văn hóa và nghi lễ của triều Nguyễn.",
      image: hueCitadelImage
    },
    {
      year: "1954",
      title: "Ngày độc lập dân tộc",
      description: "Mốc 1954 gắn với bước ngoặt giải phóng dân tộc, khép lại một giai đoạn dài kháng chiến và mở ra thời kỳ xây dựng đất nước mới. Đây là biểu tượng của ý chí tự chủ và đoàn kết của nhân dân Việt Nam.",
      image: ngayDocLapImage
    },
    {
      year: "Hiện đại",
      title: "Việt Nam hội nhập",
      description: "Trong thời kỳ hiện đại, Việt Nam vừa hội nhập sâu rộng vừa nỗ lực gìn giữ giá trị truyền thống. Bản sắc văn hóa tiếp tục được làm mới để song hành cùng nhịp sống đương đại.",
      image: hienDaiHoiNhapImage
    }
  ];

  const cultureCards = [
    {
      image: aodaiImage,
      title: "Áo dài",
      description: "Áo dài xuất phát từ áo ngũ thân và được hoàn thiện qua nhiều giai đoạn lịch sử để trở thành trang phục biểu tượng của người Việt. Từ học đường đến lễ cưới hay các sự kiện văn hóa, áo dài luôn gắn với vẻ đẹp thanh lịch, kín đáo và duyên dáng, đồng thời thể hiện tinh thần gìn giữ bản sắc dân tộc trong đời sống hiện đại."
    },
    {
      image: caTruImage,
      title: "Ca trù",
      description: "Ca trù có nguồn gốc lâu đời, từng phát triển mạnh trong không gian cung đình, đình làng và chốn tao nhân mặc khách. Đây là loại hình nghệ thuật kết hợp thơ, nhạc và nhịp phách, phản ánh chiều sâu văn hóa bác học Việt Nam và cho thấy sự tinh tế trong cách thưởng thức nghệ thuật của người xưa."
    },
    {
      image: muaRoiImage,
      title: "Múa rối nước",
      description: "Múa rối nước xuất phát từ các làng quê đồng bằng Bắc Bộ, nơi người nông dân sáng tạo sân khấu trên mặt nước để kể chuyện mùa màng, làng xóm và truyền thuyết dân gian. Loại hình này phản ánh đời sống lao động, sự hài hước và trí sáng tạo của người Việt, đồng thời là một di sản nghệ thuật dân gian rất độc đáo."
    }
  ];

  return (
    <MainLayout>
      <main className="home-landing home-storyboard">
        <section className="home-hero-card">
          <motion.div
            className="home-hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="home-hero-kicker">Bản sắc Việt Nam</span>
            <h1>Hành trình di sản &amp; bản sắc Việt Nam</h1>
            <p>
              Khám phá vẻ đẹp ẩm thực, lịch sử và văn hóa của 34 tỉnh thành theo một bố
              cục trang nhã, tối giản và giàu cảm xúc.
            </p>
            <div className="home-hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/search?keyword=')}>
                Khám phá ngay
              </button>
            </div>
          </motion.div>
        </section>

        <section className="home-section home-landmarks-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <span className="section-kicker">Khám phá địa danh</span>
              <h2>Khám phá địa danh du lịch và di tích lịch sử</h2>
            </div>
            <div className="home-landmarks-zigzag">
              {landmarks.map((item) => (
                <motion.article
                  key={item.name}
                  className={`home-landmark-row ${item.position === 'right' ? 'is-reversed' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="home-landmark-image home-landmark-image--placeholder">
                    <div className="home-landmark-image-label">Thêm hình sau</div>
                  </div>
                  <div className="home-landmark-content">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <h2>Tinh Hoa Ẩm Thực Ba Miền</h2>
            </div>
            <div className="home-region-grid">
              {culinaryHighlights.map((item) => (
                <motion.article
                  key={item.region}
                  className="home-region-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="home-region-image" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="home-region-body">
                    <span>{item.region}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-history-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <h2>Dòng Chảy Lịch Sử</h2>
            </div>
            <div className="home-timeline">
              {historyFlow.map((item, index) => (
                <motion.article
                  key={item.year}
                  className={`home-timeline-item ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="home-timeline-card">
                    <div className="home-timeline-image" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="home-timeline-body">
                      <span>{item.year}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-map-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <h2>Khám Phá Bản Đồ Việt Nam</h2>
            </div>
            <div className="home-map-card">
              <div className="home-map-image">
                <img src={mapVietnamImage} alt="Bản đồ Việt Nam" />
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <h2>Bản Sắc Văn Hóa</h2>
            </div>
            <div className="home-culture-grid">
              {cultureCards.map((item) => (
                <motion.article
                  key={item.title}
                  className="home-culture-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="home-culture-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={item.title === "Áo dài" ? "is-aodai" : ""}
                    />
                  </div>
                  <div className="home-culture-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
