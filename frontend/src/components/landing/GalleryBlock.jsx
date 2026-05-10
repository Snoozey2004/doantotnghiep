import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function GalleryBlock({ title, images }) {
  const ref = useRevealOnScroll();

  return (
    <section className="section" style={{ background: "#ffffff" }}>
      <div className="container reveal" ref={ref}>
        <div className="section-title">
          <h2 style={{ fontSize: "2rem" }}>{title}</h2>
        </div>
        <div className="grid gallery">
          {images.map((image) => (
            <img key={image} src={image} alt="gallery" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
