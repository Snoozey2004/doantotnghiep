export default function TrongDongDecor() {
  const cx = 100, cy = 100;
  const toRad = (deg) => deg * Math.PI / 180;

  const pt = (r, deg) => {
    const rad = toRad(deg - 90);
    return `${(cx + r * Math.cos(rad)).toFixed(2)},${(cy + r * Math.sin(rad)).toFixed(2)}`;
  };
  const xy = (r, deg) => {
    const rad = toRad(deg - 90);
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  // 14-pointed sun/star (more authentic for trống đồng)
  const starPoints = Array.from({ length: 14 }, (_, i) => {
    const outerDeg = i * (360 / 14);
    const innerDeg = outerDeg + (360 / 28);
    return [pt(22, outerDeg), pt(10, innerDeg)];
  }).flat().join(' ');

  // Chevron band r=29–37 (16 V-shapes pointing outward)
  const chevrons = Array.from({ length: 16 }, (_, i) => {
    const d = 360 / 16;
    return { left: i * d - d / 2, mid: i * d, right: i * d + d / 2 };
  });

  // Dense triangle band r=44–57 (24 alternating triangles)
  const triangles = Array.from({ length: 24 }, (_, i) => {
    const d = 360 / 24;
    const a1 = i * d, a2 = (i + 1) * d, amid = (i + 0.5) * d;
    return i % 2 === 0
      ? `${pt(44, a1)} ${pt(44, a2)} ${pt(57, amid)}`
      : `${pt(57, a1)} ${pt(57, a2)} ${pt(44, amid)}`;
  });

  // Tick marks on inner border of bird band (32 ticks)
  const ticks = Array.from({ length: 32 }, (_, i) => {
    const deg = i * (360 / 32);
    const [x1, y1] = xy(60, deg);
    const [x2, y2] = xy(63.5, deg);
    return { x1: x1.toFixed(2), y1: y1.toFixed(2), x2: x2.toFixed(2), y2: y2.toFixed(2) };
  });

  // Outer dots at r=85 (24 dots)
  const outerDots = Array.from({ length: 24 }, (_, i) => {
    const [x, y] = xy(85, i * 15);
    return { x: x.toFixed(2), y: y.toFixed(2) };
  });

  // Outer filled triangles r=89–93 (16 triangles)
  const outerTri = Array.from({ length: 16 }, (_, i) => {
    const d = 360 / 16;
    const a1 = i * d, a2 = (i + 1) * d, amid = (i + 0.5) * d;
    return `${pt(89, a1)} ${pt(89, a2)} ${pt(93, amid)}`;
  });

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* === CONCENTRIC RINGS === */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="2.8"/>
      <circle cx="100" cy="100" r="91.5" fill="none" stroke="currentColor" strokeWidth="0.6"/>
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="0.6"/>
      <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="100" cy="100" r="79" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="63.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="57" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="44" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="100" cy="100" r="42" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="37" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="100" cy="100" r="29" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="23" fill="none" stroke="currentColor" strokeWidth="0.5"/>

      {/* === CENTER SUN/STAR 14-pointed === */}
      <polygon points={starPoints} fill="currentColor"/>
      <circle cx="100" cy="100" r="7" fill="currentColor"/>

      {/* === CHEVRON BAND (r=29–37) === */}
      {chevrons.map((ch, i) => (
        <polyline
          key={i}
          points={`${pt(29, ch.left)} ${pt(37, ch.mid)} ${pt(29, ch.right)}`}
          fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
        />
      ))}

      {/* === DENSE TRIANGLE BAND (r=44–57) === */}
      {triangles.map((pts, i) => (
        <polygon key={i} points={pts} fill="currentColor"/>
      ))}

      {/* === TICK MARKS on band border === */}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="currentColor" strokeWidth="0.7"/>
      ))}

      {/* === BIRDS – flying heron silhouettes (r≈72) === */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = i * 45;
        const rad = toRad(angle - 90);
        const r = 72;
        const bx = (cx + r * Math.cos(rad)).toFixed(1);
        const by = (cy + r * Math.sin(rad)).toFixed(1);
        return (
          <g key={i} transform={`translate(${bx},${by}) rotate(${angle})`}>
            {/* Body */}
            <ellipse cx="0" cy="0" rx="6.5" ry="2.8" fill="currentColor"/>
            {/* Head */}
            <circle cx="7" cy="-1.5" r="2.3" fill="currentColor"/>
            {/* Beak */}
            <polygon points="8.5,-2.2 13,-1.5 8.5,-0.8" fill="currentColor"/>
            {/* Tail fan */}
            <polygon points="-6.5,-0.5 -11.5,-3 -11.5,3 -6.5,0.5" fill="currentColor"/>
            {/* Upper wing */}
            <ellipse cx="-0.5" cy="-5" rx="5.5" ry="1.7"
              fill="currentColor" transform="rotate(-18,-0.5,-5)"/>
            {/* Lower wing */}
            <ellipse cx="0.5" cy="3.8" rx="3.5" ry="1.2"
              fill="currentColor" transform="rotate(15,0.5,3.8)"/>
          </g>
        );
      })}

      {/* === OUTER DOTS at r=85 === */}
      {outerDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.7" fill="currentColor"/>
      ))}

      {/* === OUTER TRIANGLES r=89–93 === */}
      {outerTri.map((pts, i) => (
        <polygon key={i} points={pts} fill="currentColor"/>
      ))}
    </svg>
  );
}
