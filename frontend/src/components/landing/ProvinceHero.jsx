import { motion } from "framer-motion";

export default function ProvinceHero({ province, bgColor }) {
  const stats = province.stats || [];

  return (
    <section
      className="province-hero"
      style={{ backgroundImage: `url("${province.heroImage}")`, ...(bgColor ? { backgroundColor: bgColor } : {}) }}
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
          Khám Phá Tinh Hoa Văn Hóa {province.name}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <a href="#province-specialties" className="province-hero-cta-btn">
            Khám phá ngay
          </a>
        </motion.div>
      </div>

      {stats.length > 0 && (
        <motion.div
          className="province-hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="container">
            <div className="province-hero-stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="province-hero-stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
