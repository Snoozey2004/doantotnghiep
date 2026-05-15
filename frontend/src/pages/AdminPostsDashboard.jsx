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

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý bài viết</h1>
          <p>Danh sách bài viết theo địa phương.</p>
        </div>
        <Link to="/admin/posts/new" className="btn btn-primary">+ Tạo bài viết</Link>
      </div>
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
              <div style={{ color: "#64748b", fontSize: 13 }}>{post.category}</div>
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
