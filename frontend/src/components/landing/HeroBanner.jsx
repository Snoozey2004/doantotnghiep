import Button from "../common/Button.jsx";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function HeroBanner({ title, subtitle, imageUrl }) {
  const ref = useRevealOnScroll();

  return (
    <section className="hero" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="hero-overlay" />
      <div className="container hero-content reveal" ref={ref}>
        <span className="highlight">Discover Vietnam</span>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
          <Button>Explore now</Button>
          <div className="floating-card">Dynamic UI</div>
        </div>
      </div>
    </section>
  );
}
