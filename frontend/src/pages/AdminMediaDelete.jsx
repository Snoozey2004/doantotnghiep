import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { mediaApi } from "../api/mediaApi";

export default function AdminMediaDelete() {
  const { id } = useParams();
  const [mediaItem, setMediaItem] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    mediaApi
      .getById(id)
      .then(setMediaItem)
      .catch(() => setMessage("Không tải được media."));
  }, [id]);

  const handleDelete = async () => {
    setMessage("");
    try {
      await mediaApi.delete(id);
      navigate("/admin/media");
    } catch {
      setMessage("Xoá media thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Xoá Media</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="card">
          <p>Bạn chắc chắn muốn xoá media này?</p>
          <strong>{mediaItem?.title || mediaItem?.url}</strong>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/media")}>Huỷ</button>
            <button className="btn btn-primary" type="button" onClick={handleDelete}>Xoá</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
