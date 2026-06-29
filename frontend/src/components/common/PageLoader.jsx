import { useEffect, useRef, useState } from "react";

/**
 * PageLoader — màn hình tải mở đầu tối giản.
 *
 * Hiển thị MỖI LẦN tải lại trang (refresh / mở mới), vì cờ `hasPlayed` nằm ở
 * cấp module: refresh thật sẽ nạp lại JS → cờ reset → loader chạy lại.
 * Khi điều hướng nội bộ trong SPA, module vẫn sống → cờ giữ true → KHÔNG nháy lại.
 */
let hasPlayed = false;

export default function PageLoader({ label = "Vietnam Identity" }) {
  const [skip] = useState(hasPlayed);
  const [done, setDone] = useState(hasPlayed);
  const [hidden, setHidden] = useState(hasPlayed);
  const [count, setCount] = useState(hasPlayed ? 100 : 0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (skip) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : 1100;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        hasPlayed = true;
        setDone(true);
        setTimeout(() => setHidden(true), 650);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [skip]);

  if (hidden) return null;

  return (
    <div className={`vx-loader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="vx-loader__inner">
        <div className="vx-loader__word">{label}</div>
        <div className="vx-loader__bar"><span /></div>
        <div className="vx-loader__count">{count}%</div>
      </div>
    </div>
  );
}
