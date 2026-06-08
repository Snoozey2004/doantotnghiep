import { motion } from "framer-motion";

export default function ProvinceCraftVillages({ province }) {
  const craftVillages = province.craftVillages || [];
  if (!craftVillages.length) return null;

  return (
    <section className="province-section province-craft-section">
      <div className="container">
        <div className="province-section-heading">
          <span className="province-section-kicker">Làng nghề truyền thống</span>
          <h2 className="province-section-title">Làng Nghề {province.name}</h2>
          <p className="province-section-text">
            Những làng nghề lưu giữ tinh hoa thủ công truyền thống, kết tinh qua nhiều thế kỷ.
          </p>
        </div>

        <div className="province-craft-list">
          {craftVillages.map((item, index) => (
            <motion.article
              key={item.name}
              className={`province-craft-row ${index % 2 !== 0 ? "is-reversed" : ""}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
            >
              <div
                className="province-craft-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="province-craft-content">
                <span className="province-craft-product">🏺 {item.product}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="province-craft-age">
                  <span>⏳ {item.age}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
