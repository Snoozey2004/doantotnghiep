import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { postApi } from "../api/postApi";

export default function AdminPostDelete() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    postApi
      .getById(id)
      .then(setPost)
      .catch(() => setMessage("Không tải được bài viết."));
  }, [id]);

  const handleDelete = async () => {
    setMessage("");
    try {
      await postApi.delete(id);
      navigate("/admin/posts");
    } catch {
      setMessage("Xoá bài viết thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Xoá bài viết</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="card">
          <p>Bạn chắc chắn muốn xoá bài viết này?</p>
          <strong>{post?.title}</strong>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/posts")}>Huỷ</button>
            <button className="btn btn-primary" type="button" onClick={handleDelete}>Xoá</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
