import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function RecommendationsBlock({ title, provinces }) {
  const ref = useRevealOnScroll();

  if (!provinces?.length) {
    return null;
  }

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container reveal" ref={ref}>
        <div className="section-title">
          <span className="highlight">Gợi ý khám phá</span>
          <h2 style={{ fontSize: "2rem" }}>{title}</h2>
        </div>
        <div className="grid landing-grid">
          {provinces.map((province) => (
            <div key={province.id} className="card card-hover">
              <img
                src={province.imageUrl}
                alt={province.name}
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 16 }}
              />
              <div style={{ marginTop: 16 }}>
                <div className="tag">{province.region || "Việt Nam"}</div>
                <h3 style={{ marginTop: 10 }}>{province.name}</h3>
                <p style={{ color: "#475569", margin: "8px 0 12px" }}>
                  {province.tags || "Khám phá thêm nội dung địa phương nổi bật."}
                </p>
                <Link to={`/province/${province.slug}`} className="btn btn-primary btn-sm">
                  Xem trang địa phương
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
