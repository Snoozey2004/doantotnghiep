import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProductBlock({ title, products }) {
  const ref = useRevealOnScroll();

  return (
    <section className="section" style={{ background: "#ffffff" }}>
      <div className="container reveal" ref={ref}>
        <div className="section-title">
          <h2 style={{ fontSize: "2rem" }}>{title}</h2>
        </div>
        <div className="grid landing-grid">
          {products.map((product) => (
            <div key={product.id} className="card card-hover">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 16 }}
              />
              <h3 style={{ marginTop: 16 }}>{product.name}</h3>
              <p style={{ color: "#475569", margin: "8px 0 12px" }}>{product.description}</p>
              <strong>{product.price.toLocaleString("vi-VN")} đ</strong>
              <div style={{ marginTop: 12 }}>
                <span className="tag">Local product</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
