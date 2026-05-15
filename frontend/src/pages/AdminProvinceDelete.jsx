import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { provinceApi } from "../api/provinceApi";

export default function AdminProvinceDelete() {
  const { id } = useParams();
  const [province, setProvince] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi
      .getById(id)
      .then(setProvince)
      .catch(() => setMessage("Không tải được province."));
  }, [id]);

  const handleDelete = async () => {
    setMessage("");
    try {
      await provinceApi.delete(id);
      navigate("/admin");
    } catch {
      setMessage("Xoá province thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Xoá Province</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="card">
          <p>Bạn chắc chắn muốn xoá province này?</p>
          <strong>{province?.name}</strong>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin")}>Huỷ</button>
            <button className="btn btn-primary" type="button" onClick={handleDelete}>Xoá</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
