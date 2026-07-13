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

  const urls = mediaItem
    ? (Array.isArray(mediaItem.urls) && mediaItem.urls.length > 0
        ? mediaItem.urls
        : mediaItem.url ? [mediaItem.url] : [])
    : [];

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Xoá Media Gallery</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="card">
          {urls.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ marginBottom: 8, color: "#6E665A" }}>Gallery này có {urls.length} file:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                {urls.map((url, i) => {
                  const isVideo = /\.(mp4|webm|mov|avi)$/i.test(url);
                  return (
                    <div key={i} style={{ borderRadius: 8, overflow: "hidden", height: 100, background: "#f0ebe0" }}>
                      {isVideo ? (
                        <video src={url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <p>Bạn chắc chắn muốn xoá gallery này?</p>
          <strong>{mediaItem?.title || "(không tiêu đề)"}</strong>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/media")}>Huỷ</button>
            <button className="btn btn-primary" type="button" onClick={handleDelete}>Xoá</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
