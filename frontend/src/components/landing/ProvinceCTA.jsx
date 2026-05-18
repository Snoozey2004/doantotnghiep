import { useNavigate } from "react-router-dom";

export default function ProvinceCTA() {
  const navigate = useNavigate();

  return (
    <section className="province-section province-cta">
      <div className="container province-cta-content">
        <div>
          <span className="province-section-kicker">Khám phá thêm</span>
          <h2 className="province-section-title">Khám phá thêm những vùng đất Việt Nam</h2>
          <p className="province-section-text">
            Tiếp tục hành trình trải nghiệm ẩm thực, văn hóa và cảnh sắc đa dạng của Việt Nam.
          </p>
        </div>
        <div className="province-cta-actions">
          <button className="hero-btn hero-btn-primary" onClick={() => navigate("/")}
          >
            Quay về bản đồ
          </button>
          <button className="hero-btn hero-btn-outline" onClick={() => navigate("/")}
          >
            Xem tỉnh khác
          </button>
        </div>
      </div>
    </section>
  );
}
