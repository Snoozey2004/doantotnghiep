import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — thanh tiến trình cuộn mảnh ở đỉnh trang.
 * Dùng transform: scaleX (GPU). Tự mượt qua spring.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      className="vx-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
