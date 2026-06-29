import { useEffect, useRef } from "react";

/**
 * useMagnetic — kéo nhẹ phần tử về phía con trỏ khi hover (magnetic button).
 * Trả về ref gắn vào phần tử bọc ngoài. Tự tắt khi prefers-reduced-motion
 * hoặc thiết bị cảm ứng. Chỉ dùng transform (GPU, 60fps).
 *
 * @param {number} strength  Hệ số kéo (0–1). Mặc định 0.35.
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let raf = null;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
