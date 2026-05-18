import { motion } from "framer-motion";

export default function ProvinceHero({ province }) {
  return (
    <section
      className="province-hero"
      style={{ backgroundImage: `url(${province.heroImage})` }}
    >
      <div className="province-hero-overlay" />
      <div className="container province-hero-content">
        <motion.span
          className="province-hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hành trình bản sắc Việt
        </motion.span>
        <motion.h1
          className="province-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {province.name}
        </motion.h1>
        <motion.p
          className="province-hero-slogan"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {province.slogan}
        </motion.p>
        <motion.p
          className="province-hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {province.description}
        </motion.p>
        <motion.div
          className="province-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="hero-btn hero-btn-primary">Khám phá đặc sản</button>
          <button className="hero-btn hero-btn-outline">Điểm đến nổi bật</button>
        </motion.div>
      </div>
    </section>
  );
}
