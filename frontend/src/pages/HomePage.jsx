import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import VietnamMap from "../components/map/VietnamMap.jsx";
import phoImage from "/Images/pho-bo-ha-noi.jpeg";
import hueImage from "/Images/bunbohue.jpg";
import halongImage from "/Images/nha-hang-hai-san-nha-trang.jpg";
import thangLongImage from "/Images/caphethainguyen.jpg";

export default function HomePage() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const featuredSpecialties = [
    {
      title: "Phở Hà Nội",
      location: "Hà Nội",
      description: "Hương vị thanh ngọt, tinh tế của thủ đô nghìn năm văn hiến.",
      image: phoImage
    },
    {
      title: "Bún bò Huế",
      location: "Huế",
      description: "Đậm đà, cay nồng và đầy tính nghệ thuật cung đình.",
      image: hueImage
    },
    {
      title: "Hải sản Nha Trang",
      location: "Khánh Hòa",
      description: "Tươi ngon từ biển xanh và nhịp sống rực rỡ miền Trung.",
      image: halongImage
    },
    {
      title: "Cà phê Tây Nguyên",
      location: "Đắk Lắk",
      description: "Hương thơm mạnh mẽ, lưu giữ tinh thần đại ngàn.",
      image: thangLongImage
    }
  ];

  const regionHighlights = [
    {
      title: "Miền Bắc",
      description: "Di sản nghìn năm, ẩm thực tinh tế, sắc màu lễ hội.",
      image: halongImage
    },
    {
      title: "Miền Trung",
      description: "Đất kinh kỳ, biển xanh và hương vị đậm đà.",
      image: hueImage
    },
    {
      title: "Tây Nguyên",
      description: "Cồng chiêng, cà phê và bản sắc đại ngàn.",
      image: thangLongImage
    },
    {
      title: "Miền Nam",
      description: "Sôi động, phóng khoáng, giao thoa văn hóa.",
      image: phoImage
    },
    {
      title: "Đồng bằng sông Cửu Long",
      description: "Sông nước hiền hòa và đặc sản miền Tây.",
      image: halongImage
    }
  ];

  const galleryItems = [
    { title: "Ẩm thực đường phố", image: phoImage },
    { title: "Cố đô Huế", image: hueImage },
    { title: "Kỳ quan vịnh Hạ Long", image: halongImage },
    { title: "Di sản Thăng Long", image: thangLongImage },
    { title: "Làng nghề truyền thống", image: phoImage },
    { title: "Lễ hội văn hóa", image: hueImage }
  ];

  const floatingSpecialties = [
    { name: "Phở Hà Nội", icon: "🍜", position: "left-6 top-8" },
    { name: "Bún bò Huế", icon: "🌶️", position: "right-6 top-32" },
    { name: "Bánh mì Hội An", icon: "🥖", position: "left-1/2 top-1/2" },
    { name: "Hải sản Nha Trang", icon: "🦐", position: "right-4 bottom-32" },
    { name: "Cà phê Tây Nguyên", icon: "☕", position: "left-6 bottom-20" }
  ];

  useEffect(() => {
    provinceApi
      .getAll()
      .then(setProvinces)
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="home-landing">
        <section className="hero-landing">
          <div className="hero-shell hero-shell--map">
            <motion.div
              className="hero-intro hero-intro--left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero-eyebrow">Khám phá Việt Nam</span>
              <h1>Khám phá hương vị Việt Nam</h1>
              <p>
                34 tỉnh thành – hàng trăm đặc sản mang đậm bản sắc địa phương.
              </p>
              <p>
                Hành trình khám phá ẩm thực, văn hóa và bản sắc địa phương Việt Nam thông
                qua từng tỉnh thành.
              </p>
              <div className="hero-stats">
                <div>
                  <strong>34</strong>
                  <span>Tỉnh thành</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>Đặc sản</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>Bản đồ tương tác</span>
                </div>
              </div>
            </motion.div>
            <div className="map-hero">
              <div className="map-frame">
                <div className="map-glow" />
                <VietnamMap provinces={loading ? [] : provinces} />
              </div>
            </div>
          </div>
        </section>
        <section className="features-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">Đặc sản nổi bật</span>
              <h2>Những hương vị làm nên bản sắc Việt Nam</h2>
              <p>
                Từ Bắc chí Nam, mỗi vùng đất đều có câu chuyện riêng được kể qua từng món
                ăn, nguyên liệu và cách thưởng thức.
              </p>
            </div>
            <div className="features-grid">
              {featuredSpecialties.map((item) => (
                <motion.article
                  key={item.title}
                  className="feature-card card-hover"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="feature-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="feature-body">
                    <span>{item.location}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button className="text-link">Khám phá</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section className="region-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">Khám phá theo vùng</span>
              <h2>Những vùng đất kể câu chuyện văn hóa Việt</h2>
              <p>
                Mỗi vùng miền mang sắc thái riêng về văn hóa, ẩm thực, cảnh quan và con
                người.
              </p>
            </div>
            <div className="region-grid">
              {regionHighlights.map((region) => (
                <motion.article
                  key={region.title}
                  className="region-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="region-image"
                    style={{ backgroundImage: `url(${region.image})` }}
                  />
                  <div className="region-body">
                    <h3>{region.title}</h3>
                    <p>{region.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section className="gallery-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">Gallery văn hóa</span>
              <h2>Khoảnh khắc Việt Nam đầy cảm hứng</h2>
              <p>
                Những hình ảnh cinematic tái hiện đời sống, lễ hội và cảnh đẹp Việt Nam.
              </p>
            </div>
            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <motion.figure
                  key={item.title}
                  className="gallery-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={item.image} alt={item.title} />
                  <figcaption className="gallery-overlay">{item.title}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
