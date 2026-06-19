import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceIntro({ province, bgColor }) {
  const ref = useRevealOnScroll();

  return (
    <section
      className="province-section province-intro"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container province-intro-content reveal" ref={ref}>
        <div>
          <span className="province-section-kicker">Giới thiệu địa phương</span>
          <h2 className="province-section-title">{province.slogan}</h2>
          <p className="province-section-text">{province.description}</p>
          <div className="province-highlight">
            <span>Văn hóa & lịch sử</span>
            <p>
              {province.name} là điểm giao thoa của nghệ thuật, con người và thiên nhiên
              đặc sắc của vùng miền Việt Nam.
            </p>
          </div>
        </div>
        <motion.div
          className="province-intro-image"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ backgroundImage: `url(${province.introImage})` }}
        />
      </div>
    </section>
  );
}
