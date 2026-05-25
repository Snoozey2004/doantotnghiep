import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { postApi } from "../api/postApi";

export default function AdminPostsDashboard() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    postApi
      .search({})
      .then(setPosts)
      .catch(() => setMessage("Không tải được danh sách bài viết."));
  }, []);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => a.title.localeCompare(b.title)),
    [posts]
  );

  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    sortedPosts.forEach(post => {
      const cat = post.category || "Uncategorized";
      breakdown[cat] = (breakdown[cat] || 0) + 1;
    });
    return breakdown;
  }, [sortedPosts]);

  const featuredCount = useMemo(() => sortedPosts.filter(p => p.isHighlighted).length, [sortedPosts]);

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý bài viết</h1>
          <p>Danh sách bài viết theo địa phương.</p>
        </div>
        <Link to="/admin/posts/new" className="btn btn-primary">+ Tạo bài viết</Link>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#0066cc" }}>{sortedPosts.length}</div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Tổng bài viết</div>
        </div>
        <div className="card" style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#ff6b6b" }}>{featuredCount}</div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Bài nổi bật</div>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(categoryBreakdown).length > 0 && (
        <div className="card" style={{ marginBottom: 24, padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>Bài viết theo danh mục</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
            {Object.entries(categoryBreakdown).map(([cat, count]) => (
              <div key={cat} style={{ padding: 8, backgroundColor: "#f0f4f8", borderRadius: 4, textAlign: "center" }}>
                <div style={{ fontWeight: 600 }}>{count}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{cat}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách bài viết
        </div>
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              padding: "16px 24px",
              borderBottom: "1px solid #e2e8f0",
              alignItems: "center"
            }}
          >
            <div>
              <strong>{post.title}</strong>
              <div style={{ color: "#64748b", fontSize: 13 }}>
                {post.category} {post.isHighlighted && <span style={{ color: "#ff6b6b" }}>⭐ Nổi bật</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to={`/admin/posts/${post.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
              <Link to={`/admin/posts/${post.id}/delete`} className="btn btn-outline btn-sm">Delete</Link>
            </div>
          </div>
        ))}
        {sortedPosts.length === 0 && (
          <div style={{ padding: 24, color: "#64748b" }}>Chưa có dữ liệu.</div>
        )}
      </div>
    </AdminLayout>
  );
}
