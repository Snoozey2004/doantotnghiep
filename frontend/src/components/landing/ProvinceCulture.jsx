import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceCulture({ province, bgColor }) {
  const ref = useRevealOnScroll();
  const tourism = province.tourism || [];
  const culture = province.culture || [];

  return (
    <section
      className="province-section province-heritage-section"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container reveal" ref={ref}>
        <div className="province-section-heading">
          <span className="province-section-kicker">Di sản & danh thắng</span>
          <h2 className="province-section-title">Di Sản Văn Hóa {province.name}</h2>
          <p className="province-section-text">
            Những công trình lịch sử và danh lam thắng cảnh kết tinh chiều sâu văn hóa nghìn năm.
          </p>
        </div>

        <div className="province-heritage-grid">
          {tourism.map((item, index) => (
            <motion.article
              key={item.name}
              className="province-heritage-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <div
                className="province-heritage-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {item.yearBuilt && (
                  <div className="province-heritage-year">{item.yearBuilt}</div>
                )}
              </div>
              <div className="province-heritage-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.historicalValue && (
                  <div className="province-heritage-meta">
                    <span className="province-heritage-tag">📜 {item.historicalValue}</span>
                  </div>
                )}
                {item.highlight && (
                  <div className="province-heritage-highlight">
                    <span>✨ {item.highlight}</span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {culture.length > 0 && (
          <div className="province-culture-mini-grid">
            {culture.map((item, index) => (
              <motion.article
                key={item.name}
                className="province-culture-mini-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="province-culture-mini-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="province-culture-mini-body">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
