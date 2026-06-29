import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — vòng tròn điểm nhấn đi theo con trỏ (KHÔNG ẩn chuột thật).
 * - Vòng đuổi theo bằng lerp (RAF) → cảm giác mượt, cao cấp.
 * - Phình to khi hover phần tử tương tác (a, button, [data-cursor]).
 * - Tự tắt trên thiết bị cảm ứng / prefers-reduced-motion.
 * - mix-blend-mode: difference nên hiển thị tốt trên mọi nền.
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    setEnabled(true);

    const ring = ringRef.current;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let raf = null;
    let active = false;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!active) {
        active = true;
        ring?.classList.add("is-active");
      }
    };

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [data-cursor], input, textarea, select, label, .home-map-marker");
      ring?.classList.toggle("is-hover", Boolean(interactive));
    };

    const onLeave = () => {
      active = false;
      ring?.classList.remove("is-active");
    };

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      if (ring) ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return <div ref={ringRef} className="vx-cursor" aria-hidden="true" />;
}
