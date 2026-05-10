import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function VideoBlock({ title, videoUrl }) {
  const ref = useRevealOnScroll();

  return (
    <section className="section">
      <div className="container reveal" ref={ref}>
        <div className="section-title">
          <h2 style={{ fontSize: "2rem" }}>{title}</h2>
        </div>
        <iframe className="video-frame" src={videoUrl} title={title} allowFullScreen />
      </div>
    </section>
  );
}
