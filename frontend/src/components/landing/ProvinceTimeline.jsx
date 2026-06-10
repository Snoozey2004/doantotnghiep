import { motion } from "framer-motion";

export default function ProvinceTimeline({ province, bgColor }) {
  const timeline = province.timeline || [];
  if (!timeline.length) return null;

  return (
    <section
      className="province-section province-timeline-section"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container">
        <div className="province-section-heading">
          <span className="province-section-kicker">Dòng chảy lịch sử</span>
          <h2 className="province-section-title">Timeline Lịch Sử {province.name}</h2>
          <p className="province-section-text">
            Những mốc son chói lọi ghi dấu hành trình phát triển của vùng đất nghìn năm văn hiến.
          </p>
        </div>

        <div className="province-timeline">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.year}
                className="province-timeline-row"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
              >
                {/* Cột trái: card nếu is-left, rỗng nếu is-right */}
                <div className="province-timeline-col province-timeline-col--left">
                  {isLeft && (
                    <div className="province-timeline-card">
                      <div
                        className="province-timeline-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="province-timeline-body">
                        <span className="province-timeline-year-badge">{item.year}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cột giữa: đường thẳng + dot */}
                <div className="province-timeline-center">
                  <div className="province-timeline-line province-timeline-line--top" />
                  <div className="province-timeline-dot">
                    <span>{item.icon}</span>
                  </div>
                  <div className="province-timeline-line province-timeline-line--bottom" />
                </div>

                {/* Cột phải: card nếu is-right, rỗng nếu is-left */}
                <div className="province-timeline-col province-timeline-col--right">
                  {!isLeft && (
                    <div className="province-timeline-card">
                      <div
                        className="province-timeline-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="province-timeline-body">
                        <span className="province-timeline-year-badge">{item.year}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
