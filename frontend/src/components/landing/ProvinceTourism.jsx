import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceTourism({ province }) {
  const ref = useRevealOnScroll();
  const tourism = province.tourism || [];

  return (
    <section className="province-section province-tourism">
      <div className="container reveal" ref={ref}>
        <div className="province-section-heading">
          <span className="province-section-kicker">Địa điểm du lịch</span>
          <h2 className="province-section-title">Những điểm đến tạo nên dấu ấn</h2>
          <p className="province-section-text">
            Khám phá các địa danh biểu tượng, thiên nhiên và kiến trúc làm nên bản sắc {province.name}.
          </p>
        </div>
        <div className="province-gallery-grid">
          {tourism.map((item, index) => (
            <motion.article
              key={item.name}
              className="province-gallery-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="province-gallery-image"
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className="province-gallery-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
