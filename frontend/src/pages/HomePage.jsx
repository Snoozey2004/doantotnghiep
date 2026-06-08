import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useCallback, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import HomeCharts from "../components/landing/HomeCharts.jsx";
import phoImage from "/Images/pho-bo-ha-noi.jpeg";
import hueImage from "/Images/bunbohue.jpg";
import huTieuImage from "/Images/hutieu.jpg";
import thangLongImage from "/Images/dsvh-hoang-thanh-thang-long.png";
import hueCitadelImage from "/Images/kinhdophuxuan.jpg";
import heroLandscape from "/Images/homepage.png";
import homeInfoImage from "/Images/homeinfo.png";
import heroBg0 from "/Images/background0.jpg";
import heroBg1 from "/Images/background1.jpg";
import heroBg2 from "/Images/background2.jpg";
import heroBg3 from "/Images/background3.jpg";
import heroBg4 from "/Images/background4.jpg";
import heroBg5 from "/Images/background5.jpg";
import heroBg6 from "/Images/background6.jpg";

const heroBgs = [heroBg0, heroBg1, heroBg2, heroBg3, heroBg4, heroBg5, heroBg6];
import congCuoiDoiMoiImage from "/Images/congcuocdoimoi.jpg";
import thongNhat1975Image from "/Images/1975.jpg";
import nhaNuocVanLangImage from "/Images/nhanuocvanlang.jpg";
import bachDangImage from "/Images/bachdang.jpg";
import dienBienPhuImage from "/Images/dienbienphu.jpg";
import tetNguyenDanImage from "/Images/tetnguyendan.jpg";
import tetTrungThuImage from "/Images/tettrungthu.jpg";
import quocKhanhImage from "/Images/quockhanhvietnam.jpg";
import gioToHungVuongImage from "/Images/gotohungvuong.jpg";
import vanmieuImage from "/Images/vanmieu.jpg";
import codoHueImage from "/Images/dsvn-co-do-hue.png";
import vinhHaLongImage from "/Images/vinhhalong.jpg";

export default function HomePage() {
  const navigate = useNavigate();
  const aodaiImage = "/Images/aodaitrang.jpg";
  const caTruImage = "/Images/catru.jpg";
  const muaRoiImage = "/Images/muaroi.jpg";
  const ngayDocLapImage = "/Images/ngaydoclapdantoc.jpg";
  const hienDaiHoiNhapImage = "/Images/hiendaivietnamhoinhap.jpg";
  const mapVietnamImage = "/Images/mapvn.jpg";

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % heroBgs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [hasTransformed, setHasTransformed] = useState(false);
  const mapRef = useRef(null);
  const imgRef = useRef(null);
  const dragState = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const rafRef = useRef(null);
  const hasTransformedRef = useRef(false);

  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  const clampOffset = (offset, scale) => {
    const el = mapRef.current;
    if (!el) return offset;
    const maxX = (el.clientWidth * (scale - 1)) / 2;
    const maxY = (el.clientHeight * (scale - 1)) / 2;
    return { x: clamp(offset.x, -maxX, maxX), y: clamp(offset.y, -maxY, maxY) };
  };

  const applyTransform = (mode = false) => {
    const img = imgRef.current;
    if (!img) return;
    const { x, y } = offsetRef.current;
    const s = scaleRef.current;
    img.style.transition =
      mode === true
        ? "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : mode === "zoom"
        ? "transform 0.08s ease-out"
        : "none";
    img.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    const now = s !== 1 || x !== 0 || y !== 0;
    if (now !== hasTransformedRef.current) {
      hasTransformedRef.current = now;
      setHasTransformed(now);
    }
  };

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const delta = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
        const factor = 1 - delta * 0.0008;
        const prevScale = scaleRef.current;
        const nextScale = clamp(prevScale * factor, 1, 6);
        if (nextScale === prevScale) return;

        const rect = el.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const ratio = nextScale / prevScale;
        const newOffset = {
          x: mouseX - ratio * (mouseX - offsetRef.current.x),
          y: mouseY - ratio * (mouseY - offsetRef.current.y),
        };

        scaleRef.current = nextScale;
        offsetRef.current = clampOffset(newOffset, nextScale);
        applyTransform("zoom");
      });
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: offsetRef.current.x,
        originY: offsetRef.current.y,
      };
      el.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      offsetRef.current = clampOffset(
        { x: dragState.current.originX + dx, y: dragState.current.originY + dy },
        scaleRef.current
      );
      applyTransform(false);
    };

    const handleMouseUp = () => {
      dragState.current = null;
      el.style.cursor = "grab";
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const landmarks = [
    {
      name: "Văn Miếu",
      category: "Di tích lịch sử",
      description: "Được dựng từ năm 1070 dưới triều Lý Thánh Tông, Văn Miếu là nơi thờ Khổng Tử và tôn vinh đạo học của dân tộc. Đây là biểu tượng tiêu biểu cho truyền thống hiếu học và văn hiến Việt Nam.",
      position: "left",
      image: vanmieuImage
    },
    {
      name: "Cố đô Huế",
      category: "Di sản văn hóa",
      description: "Khi nhà Nguyễn chọn Huế làm kinh đô vào đầu thế kỷ XIX, nơi đây trở thành trung tâm chính trị và văn hóa của đất nước. Quần thể di tích vẫn lưu giữ đậm dấu ấn kiến trúc cung đình và bản sắc miền Trung.",
      position: "right",
      image: codoHueImage
    },
    {
      name: "Vịnh Hạ Long",
      category: "Danh thắng du lịch",
      description: "Qua hàng triệu năm kiến tạo địa chất, Vịnh Hạ Long hình thành quần thể hàng nghìn đảo đá vôi giữa làn nước xanh. Đây vừa là kỳ quan thiên nhiên, vừa gắn với truyền thuyết và đời sống cư dân vùng biển.",
      position: "left",
      image: vinhHaLongImage
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
      year: "2879 TCN",
      title: "Nhà nước Văn Lang",
      description: "Theo truyền thuyết, các Vua Hùng lập nên nhà nước Văn Lang – nhà nước đầu tiên của người Việt cổ, mở đầu thời kỳ dựng nước và hình thành nền văn minh lúa nước ở lưu vực sông Hồng.",
      image: nhaNuocVanLangImage,
      accent: null
    },
    {
      year: "1010",
      title: "Dời đô ra Thăng Long",
      description: "Vua Lý Thái Tổ ban Chiếu dời đô từ Hoa Lư ra Đại La, đặt tên Thăng Long. Sự kiện mở ra thời kỳ phát triển rực rỡ, đặt nền móng cho kinh đô và văn hiến Đại Việt.",
      image: thangLongImage,
      accent: null
    },
    {
      year: "1288",
      title: "Đại thắng Bạch Đằng",
      description: "Hưng Đạo Vương Trần Quốc Tuấn lãnh đạo quân dân Đại Việt đại phá quân Nguyên Mông lần thứ ba trên sông Bạch Đằng, bảo vệ vững chắc nền độc lập dân tộc.",
      image: bachDangImage,
      accent: null
    },
    {
      year: "1802",
      title: "Kinh đô Phú Xuân",
      description: "Gia Long thống nhất đất nước, lập triều Nguyễn và chọn Phú Xuân (Huế) làm kinh đô. Từ đây, Huế trở thành trung tâm chính trị, văn hóa và nghi lễ của cả nước.",
      image: hueCitadelImage,
      accent: null
    },
    {
      year: "1945",
      title: "Khai sinh nước Việt Nam",
      description: "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa, mở ra kỷ nguyên độc lập dân tộc và tự do cho nhân dân Việt Nam.",
      image: ngayDocLapImage,
      accent: null
    },
    {
      year: "1954",
      title: "Chiến thắng Điện Biên Phủ",
      description: "Ngày 7/5/1954, quân dân Việt Nam đại thắng tập đoàn cứ điểm Điện Biên Phủ, chấm dứt ách thực dân Pháp gần một thế kỷ, mở đường cho Hiệp định Genève và nền độc lập dân tộc.",
      image: dienBienPhuImage,
      accent: null
    },
    {
      year: "1975",
      title: "Non sông liền một dải",
      description: "Chiến dịch Hồ Chí Minh toàn thắng ngày 30/4/1975, đất nước thống nhất sau hơn 20 năm chia cắt, mở ra kỷ nguyên hòa bình và xây dựng đất nước.",
      image: thongNhat1975Image,
      accent: null
    },
    {
      year: "1986",
      title: "Công cuộc Đổi Mới",
      description: "Đại hội Đảng lần VI khởi xướng công cuộc Đổi Mới, chuyển sang kinh tế thị trường định hướng xã hội chủ nghĩa, tạo đà cho Việt Nam phát triển vượt bậc.",
      image: congCuoiDoiMoiImage,
      accent: null
    },
    {
      year: "2026",
      title: "Việt Nam hiện tại",
      description: "Việt Nam hội nhập sâu rộng, trở thành điểm đến hấp dẫn toàn cầu, đồng thời kiên trì gìn giữ và phát huy bản sắc văn hóa của 54 dân tộc anh em.",
      image: hienDaiHoiNhapImage,
      accent: null
    }
  ];

  const festivals = [
    {
      time: "Mùng 1 tháng Giêng âm lịch",
      title: "Tết Nguyên Đán",
      description: "Tết Nguyên Đán là lễ hội lớn nhất và thiêng liêng nhất trong năm của người Việt, đánh dấu sự chuyển giao giữa năm cũ và năm mới theo lịch âm. Đây là dịp để các gia đình đoàn tụ, thăm viếng tổ tiên, trao nhau lời chúc tốt đẹp và cùng đón chờ một năm mới bình an, thịnh vượng. Hình ảnh đặc trưng của Tết là cành đào, cành mai, bánh chưng bánh tét, mâm ngũ quả và tiếng pháo hoa rộn ràng khắp mọi miền đất nước.",
      position: "left",
      image: tetNguyenDanImage
    },
    {
      time: "Rằm tháng Tám âm lịch",
      title: "Tết Trung Thu",
      description: "Tết Trung Thu hay còn gọi là Tết trông trăng, diễn ra vào đêm rằm tháng Tám — thời điểm trăng tròn và sáng nhất trong năm. Lễ hội gắn liền với hình ảnh đèn lồng đủ màu sắc, bánh nướng, bánh dẻo và điệu múa lân rộn ràng. Đây là ngày hội đặc biệt dành cho thiếu nhi, nơi các em được rước đèn, phá cỗ dưới ánh trăng và nghe kể những câu chuyện cổ tích về chú Cuội, chị Hằng.",
      position: "right",
      image: tetTrungThuImage
    },
    {
      time: "Ngày 2 tháng 9 dương lịch",
      title: "Ngày Quốc khánh Việt Nam",
      description: "Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa. Hàng năm, ngày Quốc khánh được tổ chức trọng thể với lễ diễu binh, bắn pháo hoa rực rỡ và các hoạt động văn hóa, thể thao sôi nổi trên khắp cả nước, là dịp để toàn dân tưởng nhớ và tri ân công lao của các thế hệ đã hi sinh vì độc lập dân tộc.",
      position: "left",
      image: quocKhanhImage
    },
    {
      time: "Mùng 10 tháng 3 âm lịch",
      title: "Giỗ Tổ Hùng Vương",
      description: "Giỗ Tổ Hùng Vương là ngày lễ quốc gia để tưởng nhớ và tri ân công lao dựng nước của các Vua Hùng — những người đặt nền móng cho nhà nước Văn Lang đầu tiên của dân tộc Việt. Lễ hội Đền Hùng tại Phú Thọ thu hút hàng triệu người hành hương từ khắp nơi về tụ hội, thể hiện đạo lý \"uống nước nhớ nguồn\" — giá trị văn hóa cốt lõi của người Việt Nam.",
      position: "right",
      image: gioToHungVuongImage
    }
  ];

  const cultureCards = [
    {
      image: aodaiImage,
      kicker: "Trang phục truyền thống",
      title: "Áo dài",
      description: "Áo dài xuất phát từ áo ngũ thân và được hoàn thiện qua nhiều giai đoạn lịch sử để trở thành trang phục biểu tượng của người Việt. Từ học đường đến lễ cưới hay các sự kiện văn hóa, áo dài luôn gắn với vẻ đẹp thanh lịch, kín đáo và duyên dáng.",
      imageClass: "is-aodai"
    },
    {
      image: caTruImage,
      kicker: "Nghệ thuật cung đình",
      title: "Ca trù",
      description: "Ca trù có nguồn gốc lâu đời, từng phát triển mạnh trong không gian cung đình, đình làng và chốn tao nhân mặc khách. Đây là loại hình nghệ thuật kết hợp thơ, nhạc và nhịp phách, phản ánh chiều sâu văn hóa bác học Việt Nam.",
      imageClass: ""
    },
    {
      image: muaRoiImage,
      kicker: "Di sản dân gian",
      title: "Múa rối nước",
      description: "Múa rối nước xuất phát từ các làng quê đồng bằng Bắc Bộ, nơi người nông dân sáng tạo sân khấu trên mặt nước để kể chuyện mùa màng, làng xóm và truyền thuyết dân gian. Loại hình này là di sản nghệ thuật dân gian rất độc đáo.",
      imageClass: ""
    }
  ];

  return (
    <MainLayout>
      <main className="home-landing home-storyboard">
        <section className="home-hero-card">
          {heroBgs.map((src, i) => (
            <div
              key={i}
              className="home-hero-bg"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === bgIndex ? 1 : 0,
              }}
            />
          ))}
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
              <button type="button" className="btn btn-hero" onClick={() => navigate('/search?keyword=')}>
                Khám phá ngay
              </button>
            </div>
          </motion.div>
        </section>

        <section className="home-info-banner">
          <motion.img
            src={homeInfoImage}
            alt="Thông tin tổng quan Việt Nam"
            className="home-info-banner__img"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </section>

        <section className="home-section home-festivals-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <span className="section-kicker">Lễ hội cả nước</span>
              <h2>Những Lễ Hội Tiêu Biểu</h2>
            </div>
            <div className="home-festivals-zigzag">
              {festivals.map((item) => (
                <motion.article
                  key={item.title}
                  className={`home-festival-row ${item.position === 'right' ? 'is-reversed' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="home-festival-image">
                    {item.image
                      ? <img src={item.image} alt={item.title} />
                      : <div className="home-festival-placeholder" />
                    }
                  </div>
                  <div className="home-festival-content">
                    <span className="home-festival-time">{item.time}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <HomeCharts />

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
                  <div className="home-landmark-image">
                    <img src={item.image} alt={item.name} />
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
              {historyFlow.map((item, index) => {
                const isLeft = index % 2 === 0;
                const card = (
                  <div className="home-timeline-card">
                    <div className="home-timeline-image">
                      {item.image
                        ? <img src={item.image} alt={item.title} />
                        : <div className="home-timeline-image-placeholder" style={{ background: item.accent }} />
                      }
                    </div>
                    <div className="home-timeline-body">
                      <span className="home-timeline-year-badge">{item.year}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={item.year}
                    className="home-timeline-row"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.08 }}
                  >
                    <div className="home-timeline-col home-timeline-col--left">
                      {isLeft && card}
                    </div>
                    <div className="home-timeline-center">
                      <div className="home-timeline-line home-timeline-line--top" />
                      <div className="home-timeline-dot" />
                      <div className="home-timeline-line home-timeline-line--bottom" />
                    </div>
                    <div className="home-timeline-col home-timeline-col--right">
                      {!isLeft && card}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <div className="section-heading section-heading--center">
              <h2>Bản Sắc Văn Hóa</h2>
            </div>
            <div className="home-culture-grid">
              {cultureCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="home-culture-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                >
                  <div className="home-culture-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={item.imageClass}
                    />
                    <div className="home-culture-image-overlay" />
                  </div>
                  <div className="home-culture-body">
                    <span className="home-culture-kicker">{item.kicker}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-map-section">
          <div className="container">
            <div className="home-map-layout">
              <div className="home-map-info">
                <span className="section-kicker">Địa lý & lãnh thổ</span>
                <h2>Khám Phá Bản Đồ Việt Nam</h2>
                <p>Việt Nam trải dài hơn 1.650 km từ địa đầu Hà Giang đến mũi Cà Mau, với diện tích đất liền khoảng 331.000 km² và đường bờ biển dài hơn 3.260 km. Thủ đô Hà Nội ở phía Bắc và thành phố Hồ Chí Minh ở phía Nam là hai đô thị lớn nhất, là trung tâm kinh tế, văn hóa và chính trị của cả nước.</p>
                <p>Lãnh thổ quốc gia bao gồm vùng đất liền, vùng biển và hai quần đảo Hoàng Sa và Trường Sa — là phần lãnh thổ thiêng liêng không thể tách rời của Tổ quốc Việt Nam.</p>
                <ul className="home-map-stats">
                  <li>
                    <span className="home-map-stat-num">34</span>
                    <span>tỉnh thành</span>
                    <span className="home-map-stat-note">(sau sáp nhập từ 63 tỉnh thành)</span>
                  </li>
                  <li><span className="home-map-stat-num">3.260 km</span><span>đường bờ biển</span></li>
                  <li><span className="home-map-stat-num">54</span><span>dân tộc</span></li>
                </ul>
                <p className="home-map-hint-text">🖱 Cuộn chuột để zoom · Kéo để di chuyển</p>
              </div>

              <div
                className="home-map-image"
                ref={mapRef}
                title="Cuộn chuột để phóng to / thu nhỏ"
              >
                <img
                  ref={imgRef}
                  src={mapVietnamImage}
                  alt="Bản đồ Việt Nam"
                  draggable="false"
                  style={{ transformOrigin: "center center", userSelect: "none", pointerEvents: "none" }}
                />
                {hasTransformed && (
                  <button
                    className="home-map-reset"
                    onClick={() => {
                      scaleRef.current = 1;
                      offsetRef.current = { x: 0, y: 0 };
                      applyTransform(true);
                    }}
                    title="Về mặc định"
                  >
                    ↺ Mặc định
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
