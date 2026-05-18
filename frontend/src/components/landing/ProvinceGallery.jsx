import { motion } from "framer-motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ProvinceGallery({ province }) {
  const ref = useRevealOnScroll();
  const gallery = province.gallery || [];

  return (
    <section className="province-section province-gallery">
      <div className="container reveal" ref={ref}>
        <div className="province-section-heading">
          <span className="province-section-kicker">Image gallery</span>
          <h2 className="province-section-title">Khoảnh khắc bản sắc Việt Nam</h2>
          <p className="province-section-text">
            Bộ sưu tập hình ảnh giàu cảm xúc về con người, ẩm thực, văn hóa và cảnh đẹp {province.name}.
          </p>
        </div>
        <div className="province-masonry">
          {gallery.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className="province-masonry-item"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
