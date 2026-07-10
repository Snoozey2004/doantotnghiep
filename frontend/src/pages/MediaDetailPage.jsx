import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { mediaApi } from "../api/mediaApi";
import { provinceApi } from "../api/provinceApi";
import Loading from "../components/common/Loading.jsx";

export default function MediaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [province, setProvince] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMedia();
  }, [id]);

  const loadMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mediaApi.getById(id);
      if (!data) {
        setError("Không tìm thấy media.");
        return;
      }
      setMedia(data);
      setCurrentIndex(0);

      // Load province info
      if (data.provinceId) {
        provinceApi.getById(data.provinceId).then(setProvince).catch(() => {});
      }
    } catch {
      setError("Lỗi khi tải media.");
    } finally {
      setLoading(false);
    }
  };

  // Resolve all URLs: prefer urls[] array, fall back to single url
  const urls = media
    ? (Array.isArray(media.urls) && media.urls.length > 0
        ? media.urls
        : media.url ? [media.url] : [])
    : [];

  const currentUrl = urls[currentIndex];
  const isVideo = (url) => /\.(mp4|webm|mov|avi)$/i.test(url);
  const isCurrentVideo = isVideo(currentUrl || "");
  const totalFiles = urls.length;

  const goTo = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalFiles - 1)));
  };

  const tagList = media?.tags
    ? media.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (loading) {
    return (
      <MainLayout>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
          <Loading />
        </div>
      </MainLayout>
    );
  }

  if (error || !media) {
    return (
      <MainLayout>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", textAlign: "center", boxShadow: "0 18px 44px rgba(22,19,14,0.12)" }}>
            <p style={{ fontSize: "1.05rem", color: "#6E665A", marginBottom: 24 }}>{error || "Không tìm thấy."}</p>
            <Link to="/search" className="btn btn-primary">Quay lại tìm kiếm</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{
        background: "var(--paper, #f6f1e8)",
        minHeight: "100vh",
        padding: "32px 0"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", marginBottom: 24, flexWrap: "wrap", color: "#6E665A" }}>
            <Link to="/" style={{ color: "var(--accent, #1F3A2E)", fontWeight: 500, textDecoration: "none" }}>Trang chủ</Link>
            <span>/</span>
            <Link to="/search" style={{ color: "var(--accent, #1F3A2E)", fontWeight: 500, textDecoration: "none" }}>Thư viện</Link>
            <span>/</span>
            <span style={{ color: "#9A9182" }}>{media.title || "Media"}</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
            {/* ── Main viewer ── */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 18px 44px rgba(22,19,14,0.12)" }}>
              {/* Preview */}
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: 12,
                overflow: "hidden",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {isCurrentVideo ? (
                  <video key={currentUrl} src={currentUrl} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <img key={currentUrl} src={currentUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                )}

                {/* File counter badge */}
                {totalFiles > 1 && (
                  <span style={{
                    position: "absolute", top: 12, right: 12,
                    background: "rgba(0,0,0,0.6)", color: "#fff",
                    padding: "4px 14px", borderRadius: 999,
                    fontSize: "0.85rem", fontWeight: 600
                  }}>
                    {currentIndex + 1} / {totalFiles}
                  </span>
                )}

                {/* Type badge */}
                <span style={{
                  position: "absolute", top: 12, left: 12,
                  background: "rgba(0,0,0,0.5)", color: "#fff",
                  padding: "4px 14px", borderRadius: 999,
                  fontSize: "0.85rem"
                }}>
                  {isCurrentVideo ? "🎬 Video" : "🖼 Ảnh"}
                </span>

                {/* Left / Right arrows */}
                {totalFiles > 1 && (
                  <>
                    <button onClick={() => goTo(currentIndex - 1)}
                      disabled={currentIndex === 0}
                      style={{
                        position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.5)", color: "#fff", border: "none",
                        borderRadius: "50%", width: 40, height: 40, fontSize: "1.2rem",
                        cursor: currentIndex > 0 ? "pointer" : "default", opacity: currentIndex > 0 ? 1 : 0.3
                      }}>
                      ‹
                    </button>
                    <button onClick={() => goTo(currentIndex + 1)}
                      disabled={currentIndex === totalFiles - 1}
                      style={{
                        position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.5)", color: "#fff", border: "none",
                        borderRadius: "50%", width: 40, height: 40, fontSize: "1.2rem",
                        cursor: currentIndex < totalFiles - 1 ? "pointer" : "default",
                        opacity: currentIndex < totalFiles - 1 ? 1 : 0.3
                      }}>
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {totalFiles > 1 && (
                <div style={{
                  display: "flex", gap: 8, marginTop: 16,
                  overflowX: "auto", paddingBottom: 4
                }}>
                  {urls.map((url, i) => {
                    const vid = isVideo(url);
                    return (
                      <button key={i} onClick={() => goTo(i)}
                        style={{
                          flexShrink: 0, width: 72, height: 56, borderRadius: 8,
                          overflow: "hidden", border: i === currentIndex ? "2px solid var(--accent, #1F3A2E)" : "2px solid transparent",
                          padding: 0, cursor: "pointer", background: "#f0ebe0"
                        }}>
                        {vid ? (
                          <video src={url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Info card */}
              <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 18px 44px rgba(22,19,14,0.12)" }}>
                <h1 style={{ fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)", fontSize: "1.6rem", fontWeight: 700, color: "#16130E", margin: "0 0 16px", lineHeight: 1.2 }}>
                  {media.title || "(không tiêu đề)"}
                </h1>

                {province && (
                  <p style={{ fontSize: "0.9rem", color: "#6E665A", marginBottom: 8 }}>
                    📍 {province.name}
                  </p>
                )}

                {media.description && (
                  <p style={{ fontSize: "0.95rem", color: "#312B22", lineHeight: 1.6, marginBottom: 16 }}>
                    {media.description}
                  </p>
                )}

                {tagList.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {tagList.map((tag, i) => (
                      <span key={i} style={{
                        background: "rgba(31,58,46,0.08)", color: "#1F3A2E",
                        padding: "4px 12px", borderRadius: 999, fontSize: "0.8rem"
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: "0.85rem", color: "#9A9182", display: "flex", flexDirection: "column", gap: 4 }}>
                  <span>Tổng số file: {totalFiles}</span>
                  {media.sortOrder !== 0 && <span>Thứ tự: {media.sortOrder}</span>}
                  {media.isFeatured && <span style={{ color: "#C2552D", fontWeight: 600 }}>★ Nổi bật</span>}
                  {media.isHighlighted && <span>⭐ Highlight</span>}
                  {media.createdAt && (
                    <span>Ngày tạo: {new Date(media.createdAt).toLocaleDateString("vi-VN")}</span>
                  )}
                  {media.lastUpdatedAt && (
                    <span>Cập nhật: {new Date(media.lastUpdatedAt).toLocaleDateString("vi-VN")}</span>
                  )}
                </div>
              </div>

              {/* Admin actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/admin/media/${media.id}/edit`} className="btn btn-outline" style={{ flex: 1, textAlign: "center" }}>
                  ✏️ Sửa
                </Link>
                <Link to="/admin/media" className="btn btn-outline" style={{ flex: 1, textAlign: "center" }}>
                  📂 Thư viện
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
