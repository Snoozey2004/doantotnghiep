import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function IntroBlock({ title, description }) {
  const ref = useRevealOnScroll();

  return (
    <section className="section">
      <div className="container reveal" ref={ref}>
        <span className="highlight">About</span>
        <div className="section-title">
          <h2 style={{ fontSize: "2rem" }}>{title}</h2>
        </div>
        <p style={{ lineHeight: 1.8, color: "#475569" }}>{description}</p>
      </div>
    </section>
  );
}
