import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

export default function ArticleBlock({ title, posts }) {
  const ref = useRevealOnScroll();

  return (
    <section className="section">
      <div className="container reveal" ref={ref}>
        <div className="section-title">
          <h2 style={{ fontSize: "2rem" }}>{title}</h2>
        </div>
        <div className="grid landing-grid">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/post/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card card-hover">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 16 }}
                />
                <h3 style={{ marginTop: 16 }}>{post.title}</h3>
                <p style={{ color: "#475569", marginTop: 8 }}>{post.description.slice(0, 120)}...</p>
                <div style={{ marginTop: 12 }}>
                  <span className="tag">{post.category || "Article"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
