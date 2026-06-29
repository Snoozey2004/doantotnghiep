import { motion } from "framer-motion";

export default function ProvinceFestivals({ province, bgColor }) {
  const festivals = province.festivals || [];
  if (!festivals.length) return null;

  return (
    <section
      className="province-section province-festivals-section"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container">
        <div className="province-section-heading">
          <span className="province-section-kicker">Lễ hội văn hóa</span>
          <h2 className="province-section-title">Lễ Hội {province.name}</h2>
          <p className="province-section-text">
            Những lễ hội truyền thống giữ gìn tinh hoa văn hóa và kết nối cộng đồng qua nhiều thế kỷ.
          </p>
        </div>

        <div className="province-festivals-grid">
          {festivals.map((item, index) => (
            <motion.article
              key={item.name}
              className="province-festival-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="province-festival-image"
                style={{ backgroundImage: `url("${item.image}")` }}
              >
                <div className="province-festival-date-badge">
                  <span>📅 {item.date}</span>
                </div>
              </div>
              <div className="province-festival-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="province-festival-significance">
                  <span>🏅 {item.significance}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
