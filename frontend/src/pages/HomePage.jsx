import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import Loading from "../components/common/Loading.jsx";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function HomePage() {
  const redDotIcon = L.divIcon({
    className: "map-red-dot",
    iconSize: [12, 12]
  });
  const mapMarkers = [
    { name: "Hà Nội", position: [21.0278, 105.8342] },
    { name: "Hồ Chí Minh", position: [10.8231, 106.6297] },
    { name: "Đà Nẵng", position: [16.0544, 108.2022] },
    { name: "Huế", position: [16.4637, 107.5909] },
    { name: "Đà Lạt", position: [11.9404, 108.4583] },
    { name: "Quy Nhơn", position: [13.782, 109.219] },
    { name: "Sa Pa", position: [22.3364, 103.8438] }
  ];
    const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRevealOnScroll();
  const featuredTags = ["#VănHóa", "#LễHội", "#ẨmThực", "#DuLịch"];
  const heroGalleryFallback = [
    {
      id: "hero-1",
      name: "Điểm đến nổi bật",
      description: "Khám phá văn hóa, lễ hội và trải nghiệm bản địa.",
      imageUrl: "/dsvn-vinh-ha-long.png"
    },
    {
      id: "hero-2",
      name: "Hành trình di sản",
      description: "Gợi ý điểm đến di sản và trải nghiệm địa phương.",
      imageUrl: "/dsvn-co-do-hue.png"
    },
    {
      id: "hero-3",
      name: "Khám phá ẩm thực",
      description: "Tổng hợp đặc sản và tinh hoa ẩm thực vùng miền.",
      imageUrl: "/am-thuc-viet-nam-2-1751938296.jpg"
    }
  ];
  const heroGalleryItems = loading || provinces.length === 0 ? heroGalleryFallback : provinces.slice(0, 3);
  const highlights = provinces
    .filter(p => p.isHighlighted)
    .sort((a, b) => (a.highlightOrder || 999) - (b.highlightOrder || 999))
    .slice(0, 6);
  const displayHighlights = highlights.length > 0 ? highlights : provinces.slice(0, 6);
    const featuredContent = provinces.slice(0, 4).map((province, index) => ({
        id: province.id,
        title: province.name,
        imageUrl: province.imageUrl,
    tag: featuredTags[index % featuredTags.length],
    description: province.description
  }));
  const suggestions = [
    {
      title: "Tỉnh có nhiều lễ hội nhất",
      description: "Khám phá lịch trình lễ hội đặc sắc và câu chuyện bản sắc vùng miền."
    },
    {
      title: "Điểm du lịch nổi bật miền Trung",
      description: "Tổng hợp địa điểm du lịch nổi bật, phù hợp cho hành trình 3-5 ngày."
    },
    {
      title: "Ẩm thực đặc trưng miền Nam",
      description: "Gợi ý món ăn đặc sản và trải nghiệm ẩm thực địa phương."
    }
  ];

  useEffect(() => {
    provinceApi
      .getAll()
      .then(setProvinces)
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="home-wrapper">
        <section className="section home-hero">
        <div className="container reveal" ref={ref}>
          <div className="hero-home">
            <div>
              <span className="badge">Vietnam Identity Platform</span>
              <h1>Hệ thống quản lý và giới thiệu bản sắc địa phương Việt Nam</h1>
              <p>
                Tổng hợp dữ liệu văn hóa, lịch sử, du lịch và đặc sản với trải nghiệm dashboard hiện đại, hỗ trợ khám phá
                từng địa phương theo góc nhìn trực quan.
              </p>
              <div className="hero-actions">
                <a href="#provinces" className="btn btn-primary">
                  Khám phá tỉnh thành
                </a>
                <a href="#map" className="btn btn-outline">
                  Xem bản đồ Việt Nam
                </a>
              </div>
            </div>
            <div className="hero-gallery">
              {heroGalleryItems.map((province) => (
                <div key={province.id} className="hero-gallery-card">
                  {province.imageUrl ? (
                    <img src={province.imageUrl} alt={province.name} />
                  ) : (
                    <div className="hero-gallery-placeholder" />
                  )}
                  <div>
                    <strong>{province.name}</strong>
                    <p>{province.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section dashboard-section">
        <div className="container">
          <div className="section-title">
            <h2>Thống kê tổng quan</h2>
          </div>
          <div className="grid dashboard-grid">
            <div className="card dashboard-card">
              <h3>{provinces.length || 63}</h3>
              <p>Tổng số tỉnh/thành</p>
            </div>
            <div className="card dashboard-card">
              <h3>248</h3>
              <p>Tổng bài viết nội dung</p>
            </div>
            <div className="card dashboard-card">
              <h3>1.2K</h3>
              <p>Tổng hình ảnh / video</p>
            </div>
            <div className="card dashboard-card">
              <h3>146</h3>
              <p>Đặc sản / du lịch / lễ hội</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="provinces">
        <div className="container">
          <div className="section-title">
            <h2>Danh sách tỉnh/thành nổi bật</h2>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid landing-grid">
              {displayHighlights.map((province) => (
                <div key={province.id} className="card card-hover province-card">
                  <img src={province.imageUrl} alt={province.name} />
                  <div className="province-card-body">
                    <div className="tag">{province.region || "Miền Bắc"}</div>
                    <h3>{province.name}</h3>
                    <p>{province.description}</p>
                    <Link to={`/province/${province.slug}`} className="btn btn-primary btn-sm">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Nội dung nổi bật</h2>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid feature-grid">
              {featuredContent.map((item) => (
                <div key={item.id} className="card feature-card">
                  <img src={item.imageUrl} alt={item.title} />
                  <div>
                    <span className="tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" id="map">
        <div className="container">
          <div className="section-title">
            <h2>Bản đồ Việt Nam</h2>
          </div>
          <div className="map-card">
            <div>
              <h3>Khám phá bản đồ theo khu vực</h3>
              <p>Nhấn vào từng tỉnh để mở dữ liệu văn hóa, du lịch, ẩm thực và lịch sử nổi bật.</p>
              <div className="map-legend">
                <span>Miền Bắc</span>
                <span>Miền Trung</span>
                <span>Miền Nam</span>
              </div>
            </div>
            <MapContainer className="map-container" center={[16.0471, 108.206]} zoom={5} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapMarkers.map((marker) => (
                <Marker key={marker.name} position={marker.position} icon={redDotIcon}>
                  <Popup>{marker.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Gợi ý khám phá</h2>
          </div>
          <div className="grid suggestion-grid">
            {suggestions.map((suggestion) => (
              <div key={suggestion.title} className="card suggestion-card">
                <h3>{suggestion.title}</h3>
                <p>{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  );
}
