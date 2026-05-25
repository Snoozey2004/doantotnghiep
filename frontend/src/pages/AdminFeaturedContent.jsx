import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import { postApi } from "../api/postApi";
import { mediaApi } from "../api/mediaApi";
import { provinceHighlightApi } from "../api/provinceHighlightApi";
import { postHighlightApi } from "../api/postHighlightApi";
import { mediaHighlightApi } from "../api/mediaHighlightApi";

export default function AdminFeaturedContent() {
  const [activeTab, setActiveTab] = useState("provinces");
  const [provinces, setProvinces] = useState([]);
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [provincesData, postsData, mediaData] = await Promise.all([
        provinceApi.getAll(),
        postApi.getAll(),
        mediaApi.getAll()
      ]);
      setProvinces(provincesData || []);
      setPosts(postsData || []);
      setMedia(mediaData || []);
    } catch (err) {
      setMessage("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceHighlightToggle = async (id, isHighlighted) => {
    try {
      await provinceHighlightApi.updateHighlight(id, {
        isHighlighted: !isHighlighted,
        highlightOrder: isHighlighted ? 0 : 999
      });
      setProvinces(provinces.map(p => 
        p.id === id ? { ...p, isHighlighted: !isHighlighted } : p
      ));
      setMessage("Cập nhật thành công.");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Lỗi khi cập nhật.");
    }
  };

  const handleProvinceOrderChange = async (id, newOrder) => {
    try {
      const province = provinces.find(p => p.id === id);
      await provinceHighlightApi.updateHighlight(id, {
        isHighlighted: province.isHighlighted,
        highlightOrder: parseInt(newOrder)
      });
      setProvinces(provinces.map(p =>
        p.id === id ? { ...p, highlightOrder: parseInt(newOrder) } : p
      ));
      setMessage("Cập nhật thứ tự thành công.");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Lỗi khi cập nhật.");
    }
  };

  const handlePostHighlightToggle = async (id, isHighlighted) => {
    try {
      await postHighlightApi.updateHighlight(id, {
        isHighlighted: !isHighlighted,
        highlightOrder: isHighlighted ? 0 : 999
      });
      setPosts(posts.map(p =>
        p.id === id ? { ...p, isHighlighted: !isHighlighted } : p
      ));
      setMessage("Cập nhật thành công.");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Lỗi khi cập nhật.");
    }
  };

  const handlePostOrderChange = async (id, newOrder) => {
    try {
      const post = posts.find(p => p.id === id);
      await postHighlightApi.updateHighlight(id, {
        isHighlighted: post.isHighlighted,
        highlightOrder: parseInt(newOrder)
      });
      setPosts(posts.map(p =>
        p.id === id ? { ...p, highlightOrder: parseInt(newOrder) } : p
      ));
      setMessage("Cập nhật thứ tự thành công.");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Lỗi khi cập nhật.");
    }
  };

  const handleMediaHighlightToggle = async (id, isHighlighted) => {
    try {
      await mediaHighlightApi.updateHighlight(id, {
        isHighlighted: !isHighlighted
      });
      setMedia(media.map(m =>
        m.id === id ? { ...m, isHighlighted: !isHighlighted } : m
      ));
      setMessage("Cập nhật thành công.");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Lỗi khi cập nhật.");
    }
  };

  const highlightedProvinces = provinces.filter(p => p.isHighlighted).sort((a, b) => (a.highlightOrder || 999) - (b.highlightOrder || 999));
  const highlightedPosts = posts.filter(p => p.isHighlighted).sort((a, b) => (a.highlightOrder || 999) - (b.highlightOrder || 999));
  const highlightedMedia = media.filter(m => m.isHighlighted);

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý nội dung nổi bật</h1>
          <p>Chọn tỉnh/thành, bài viết và media nổi bật trên trang chủ.</p>
        </div>
      </div>

      {message && (
        <div className="card" style={{ marginBottom: 24, padding: 16, backgroundColor: "#d4edda", color: "#155724" }}>
          {message}
        </div>
      )}

      <div className="card">
        <div style={{ display: "flex", gap: 8, padding: 16, borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("provinces")}
            className={`btn ${activeTab === "provinces" ? "btn-primary" : "btn-outline"}`}
            style={{ flex: "0 1 auto" }}
          >
            Tỉnh/Thành ({highlightedProvinces.length})
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`btn ${activeTab === "posts" ? "btn-primary" : "btn-outline"}`}
            style={{ flex: "0 1 auto" }}
          >
            Bài viết ({highlightedPosts.length})
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`btn ${activeTab === "media" ? "btn-primary" : "btn-outline"}`}
            style={{ flex: "0 1 auto" }}
          >
            Media ({highlightedMedia.length})
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {loading && <p>Đang tải...</p>}

          {activeTab === "provinces" && !loading && (
            <div>
              <h3 style={{ marginBottom: 16 }}>Tỉnh/Thành Nổi Bật</h3>
              <div style={{ display: "grid", gap: 0 }}>
                {provinces.map((province) => (
                  <div
                    key={province.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto auto auto",
                      gap: 12,
                      padding: 16,
                      borderBottom: "1px solid #e2e8f0",
                      alignItems: "center"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={province.isHighlighted || false}
                      onChange={() => handleProvinceHighlightToggle(province.id, province.isHighlighted)}
                      style={{ cursor: "pointer" }}
                    />
                    <div>
                      <strong>{province.name}</strong>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{province.region}</div>
                    </div>
                    {province.isHighlighted && (
                      <div>
                        <label style={{ display: "block", marginBottom: 4, fontSize: 12, color: "#64748b" }}>
                          Thứ tự
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="99"
                          value={province.highlightOrder || 0}
                          onChange={(e) => handleProvinceOrderChange(province.id, e.target.value)}
                          style={{
                            padding: 6,
                            border: "1px solid #cbd5e1",
                            borderRadius: 4,
                            width: 60
                          }}
                        />
                      </div>
                    )}
                    <div style={{ color: "#64748b", fontSize: 12 }}>
                      {province.isHighlighted ? "✓ Nổi bật" : ""}
                    </div>
                  </div>
                ))}
                {provinces.length === 0 && (
                  <div style={{ padding: 24, color: "#64748b" }}>Không có dữ liệu.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "posts" && !loading && (
            <div>
              <h3 style={{ marginBottom: 16 }}>Bài Viết Nổi Bật</h3>
              <div style={{ display: "grid", gap: 0 }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto auto auto",
                      gap: 12,
                      padding: 16,
                      borderBottom: "1px solid #e2e8f0",
                      alignItems: "center"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={post.isHighlighted || false}
                      onChange={() => handlePostHighlightToggle(post.id, post.isHighlighted)}
                      style={{ cursor: "pointer" }}
                    />
                    <div>
                      <strong>{post.title}</strong>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{post.category || "Không phân loại"}</div>
                    </div>
                    {post.isHighlighted && (
                      <div>
                        <label style={{ display: "block", marginBottom: 4, fontSize: 12, color: "#64748b" }}>
                          Thứ tự
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="99"
                          value={post.highlightOrder || 0}
                          onChange={(e) => handlePostOrderChange(post.id, e.target.value)}
                          style={{
                            padding: 6,
                            border: "1px solid #cbd5e1",
                            borderRadius: 4,
                            width: 60
                          }}
                        />
                      </div>
                    )}
                    <div style={{ color: "#64748b", fontSize: 12 }}>
                      {post.isHighlighted ? "✓ Nổi bật" : ""}
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div style={{ padding: 24, color: "#64748b" }}>Không có dữ liệu.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "media" && !loading && (
            <div>
              <h3 style={{ marginBottom: 16 }}>Media Nổi Bật</h3>
              <div style={{ display: "grid", gap: 0 }}>
                {media.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: 12,
                      padding: 16,
                      borderBottom: "1px solid #e2e8f0",
                      alignItems: "center"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.isHighlighted || false}
                      onChange={() => handleMediaHighlightToggle(item.id, item.isHighlighted)}
                      style={{ cursor: "pointer" }}
                    />
                    <div>
                      <strong>{item.title}</strong>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{item.mediaType || "Media"}</div>
                    </div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>
                      {item.isHighlighted ? "✓ Nổi bật" : ""}
                    </div>
                  </div>
                ))}
                {media.length === 0 && (
                  <div style={{ padding: 24, color: "#64748b" }}>Không có dữ liệu.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
