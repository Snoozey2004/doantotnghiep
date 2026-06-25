import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { productApi } from "../api/productApi";

export default function AdminProductDelete() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productApi.getById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
      setMessage("Không thể tải thông tin đặc sản. Có thể đặc sản đã bị xóa.");
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await productApi.delete(id);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setMessage("Xóa đặc sản thất bại. Vui lòng thử lại.");
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 600, width: "100%", margin: "0 auto", marginTop: 40 }}>
        <div className="card" style={{ borderTop: "4px solid red" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 16, color: "red" }}>Xác nhận xóa Đặc Sản</h1>
          
          {message && <div style={{ padding: "12px", backgroundColor: "#ffebee", color: "#c62828", marginBottom: 16, borderRadius: 4 }}>{message}</div>}
          
          {product ? (
            <>
              <p style={{ marginBottom: 16 }}>
                Bạn có chắc chắn muốn xóa đặc sản <strong>{product.name}</strong> không?
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button 
                  className="btn" 
                  style={{ backgroundColor: "red", color: "white", border: "none" }}
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Đang xóa..." : "Xác nhận Xóa"}
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => navigate("/admin/products")}
                  disabled={isDeleting}
                >
                  Hủy
                </button>
              </div>
            </>
          ) : (
            !message && <p>Đang tải thông tin...</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
