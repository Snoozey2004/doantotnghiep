import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";

export default function AdminLandingDelete() {
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    landingConfigApi
      .getById(id)
      .then(setConfig)
      .catch(() => setMessage("Không tải được config."));
  }, [id]);

  const handleDelete = async () => {
    setMessage("");
    try {
      await landingConfigApi.delete(id);
      navigate("/admin/landing");
    } catch {
      setMessage("Xoá config thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Xoá Landing Config</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="card">
          <p>Bạn chắc chắn muốn xoá config này?</p>
          <strong>{config?.id}</strong>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/landing")}>Huỷ</button>
            <button className="btn btn-primary" type="button" onClick={handleDelete}>Xoá</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
