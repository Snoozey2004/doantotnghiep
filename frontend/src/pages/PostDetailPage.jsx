import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import RichTextDisplay from "../components/RichTextDisplay.jsx";
import { postApi } from "../api/postApi.js";
import { provinceApi } from "../api/provinceApi.js";
import Loading from "../components/common/Loading.jsx";
import "../styles/postDetail.css";

export default function PostDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [province, setProvince] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const postData = await postApi.getBySlug(slug);
      if (!postData) {
        setError("Bài viết không tồn tại.");
        return;
      }
      setPost(postData);

      // Load province info
      const provinceData = await provinceApi.getById(postData.provinceId);
      setProvince(provinceData);

      // Load related posts (same province, excluding current)
      if (postData.provinceId) {
        const provincePosts = await postApi.getByProvince(postData.provinceId);
        const related = provincePosts
          .filter((p) => p.slug !== slug)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (err) {
      setError("Lỗi khi tải bài viết. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="post-detail-container">
          <Loading />
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="post-detail-container">
          <div className="error-message">
            <p>{error || "Bài viết không tìm thấy."}</p>
            <Link to="/" className="btn btn-primary">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const categoryLabel = {
    history: "Lịch sử",
    culture: "Văn hóa",
    tourism: "Du lịch",
    cuisine: "Ẩm thực",
    festival: "Lễ hội"
  }[post.category?.toLowerCase()] || post.category;

  const tagList = post.tags ? post.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [];

  return (
    <MainLayout>
      <div className="post-detail-page">
        {/* Breadcrumb */}
        <div className="post-detail-container">
          <nav className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span> / </span>
            {province && <Link to={`/province/${province.slug}`}>{province.name}</Link>}
            {province && <span> / </span>}
            <span>{post.title}</span>
          </nav>
        </div>

        {/* Header Image */}
        {post.imageUrl && (
          <div className="post-header-image">
            <img src={post.imageUrl} alt={post.title} />
          </div>
        )}

        {/* Main Content */}
        <div className="post-detail-container">
          <div className="post-detail-grid">
            {/* Left Column - Article Content */}
            <article className="post-detail-content">
              {/* Title & Meta */}
              <header className="post-header">
                <h1>{post.title}</h1>
                <div className="post-meta">
                  {province && (
                    <span className="meta-item">
                      <strong>Địa phương:</strong>
                      <Link to={`/province/${province.slug}`}>{province.name}</Link>
                    </span>
                  )}
                  {post.category && (
                    <span className="meta-item">
                      <strong>Chủ đề:</strong>
                      <span>{categoryLabel}</span>
                    </span>
                  )}
                  {post.createdAt && (
                    <span className="meta-item">
                      <strong>Ngày tạo:</strong>
                      <time>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</time>
                    </span>
                  )}
                  {post.lastUpdatedAt && (
                    <span className="meta-item">
                      <strong>Cập nhật:</strong>
                      <time>{new Date(post.lastUpdatedAt).toLocaleDateString("vi-VN")}</time>
                    </span>
                  )}
                </div>

                {/* Tags */}
                {tagList.length > 0 && (
                  <div className="post-tags">
                    {tagList.map((tag, idx) => (
                      <span key={idx} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Video Embed */}
              {post.videoUrl && (
                <div className="post-video-section">
                  <h2>Video</h2>
                  <div className="video-container">
                    <iframe
                      title={post.title}
                      src={post.videoUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Rich Body Content */}
              {post.body && (
                <div className="post-body-section">
                  <RichTextDisplay html={post.body} />
                </div>
              )}

              {/* Fallback Content */}
              {!post.body && post.description && (
                <div className="post-content-section">
                  <p>{post.description}</p>
                </div>
              )}

              {/* English Content (if different) */}
              {post.contentEn && post.contentEn !== post.description && (
                <details className="post-english-content">
                  <summary>English Version</summary>
                  <div className="english-text">
                    <p>{post.contentEn}</p>
                  </div>
                </details>
              )}
            </article>

            {/* Right Sidebar */}
            <aside className="post-detail-sidebar">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="sidebar-card">
                  <h3>Bài viết liên quan</h3>
                  <div className="related-posts">
                    {relatedPosts.map((relPost) => (
                      <Link
                        key={relPost.id}
                        to={`/post/${relPost.slug}`}
                        className="related-post-item"
                      >
                        {relPost.imageUrl && (
                          <img src={relPost.imageUrl} alt={relPost.title} />
                        )}
                        <div className="related-post-info">
                          <h4>{relPost.title}</h4>
                          <small>{relPost.category}</small>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlight Badge */}
              {post.isHighlighted && (
                <div className="sidebar-card highlight-badge">
                  <span className="badge-icon">⭐</span>
                  <span>Nội dung nổi bật</span>
                </div>
              )}

              {/* Province Info Card */}
              {province && (
                <div className="sidebar-card province-card">
                  <h3>Về {province.name}</h3>
                  {province.imageUrl && (
                    <img src={province.imageUrl} alt={province.name} />
                  )}
                  <p className="province-description">{province.description}</p>
                  <Link
                    to={`/province/${province.slug}`}
                    className="btn btn-outline btn-sm"
                  >
                    Khám phá {province.name}
                  </Link>
                </div>
              )}

              {/* Share Section */}
              <div className="sidebar-card share-section">
                <h3>Chia sẻ</h3>
                <div className="share-buttons">
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/post/${post.slug}`;
                      navigator.clipboard.writeText(url);
                      alert("Đã sao chép liên kết!");
                    }}
                    className="share-btn"
                    title="Sao chép liên kết"
                  >
                    🔗 Sao chép
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn"
                    title="Chia sẻ trên Facebook"
                  >
                    f Facebook
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Navigation */}
        <div className="post-detail-container">
          <div className="post-navigation">
            <Link to="/search" className="btn btn-outline">
              ← Tìm kiếm khác
            </Link>
            <Link to="/" className="btn btn-outline">
              Về trang chủ →
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
