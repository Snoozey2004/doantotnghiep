import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceSpecialties({ province }) {
  const ref = useRevealOnScroll();
  const specialties = province.specialties || [];

  return (
    <section className="province-section province-specialties">
      <div className="container reveal" ref={ref}>
        <div className="province-section-heading">
          <span className="province-section-kicker">Đặc sản nổi bật</span>
          <h2 className="province-section-title">
            Hương vị {province.name} được kể qua từng món ăn
          </h2>
          <p className="province-section-text">
            Những đặc sản mang đậm bản sắc địa phương, kết tinh từ lịch sử và nghệ thuật ẩm thực.
          </p>
        </div>
        <div className="province-grid">
          {specialties.map((item, index) => (
            <motion.article
              key={item.name}
              className="province-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="province-card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="province-card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="province-chip">Nguồn gốc: {item.origin}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
