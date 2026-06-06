import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceSpecialties({ province }) {
  const ref = useRevealOnScroll();
  const specialties = province.specialties || [];

  return (
    <section className="province-section province-specialties" id="province-specialties">
      <div className="container reveal" ref={ref}>
        <div className="province-section-heading">
          <span className="province-section-kicker">Ẩm thực đặc sắc</span>
          <h2 className="province-section-title">Ẩm Thực {province.name}</h2>
          <p className="province-section-text">
            Những món ăn kết tinh từ lịch sử và nghệ thuật ẩm thực, mang đậm bản sắc địa phương.
          </p>
        </div>
        <div className="province-food-grid">
          {specialties.map((item, index) => (
            <motion.article
              key={item.name}
              className="province-food-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="province-food-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {item.icon && (
                  <div className="province-food-icon">{item.icon}</div>
                )}
              </div>
              <div className="province-food-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="province-chip">📍 {item.origin}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
