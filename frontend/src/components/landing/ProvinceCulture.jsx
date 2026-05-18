import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceCulture({ province }) {
  const ref = useRevealOnScroll();

  return (
    <section className="province-section province-culture">
      <div className="container reveal" ref={ref}>
        <div className="province-section-heading">
          <span className="province-section-kicker">Văn hóa & lễ hội</span>
          <h2 className="province-section-title">Không gian văn hóa bản địa</h2>
          <p className="province-section-text">
            Các lễ hội, làng nghề và giá trị truyền thống đặc sắc tạo nên linh hồn {province.name}.
          </p>
        </div>
        <div className="province-culture-grid">
          {province.culture.map((item, index) => (
            <motion.article
              key={item.name}
              className="province-culture-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="province-culture-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="province-culture-body">
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
