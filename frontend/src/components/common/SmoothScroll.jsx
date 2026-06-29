import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

/**
 * SmoothScroll — cuộn mượt toàn site bằng Lenis.
 *
 * An toàn với chức năng cũ:
 *  - Tự TẮT khi prefers-reduced-motion.
 *  - Bỏ qua vùng có [data-lenis-prevent] (vd: bản đồ pan/zoom, modal cuộn riêng)
 *    → giữ nguyên wheel-zoom của bản đồ Việt Nam.
 *  - Cuộn lên đầu mỗi khi đổi route.
 *
 * Component không render gì cả.
 */
export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Không can thiệp khi con trỏ đang trong vùng đánh dấu prevent
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent"),
    });

    let raf = null;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Phơi instance ra để các component khác (anchor nav) có thể dùng nếu cần
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Đổi route → về đầu trang ngay (không animate để tránh giật)
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
