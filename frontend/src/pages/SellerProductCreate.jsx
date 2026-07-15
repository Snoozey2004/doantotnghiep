import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerLayout from '../layouts/SellerLayout';
import { productApi } from "../api/productApi";
import { productOfferApi } from "../api/productOfferApi";

const emptyOffer = {
  productId: "",
  price: 0,
  stockQuantity: 0,
  shopName: "",
  shopAddress: "",
  isOpen: true
};

export default function SellerProductCreate() {
  const [form, setForm] = useState(emptyOffer);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const navigate = useNavigate();

  const selectedProductName = products.find(p => p.id === form.productId)?.name || "";
  const filteredProducts = products.filter(p => {
    if (productSearchTerm === selectedProductName) return true;
    return p.name.toLowerCase().includes(productSearchTerm.toLowerCase());
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAll();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      setProducts(sortedData);
    } catch (err) {
      console.error(err);
      setMessage("Không thể tải danh sách đặc sản.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let finalValue = value;
    if (name === "price" || name === "stockQuantity") {
      finalValue = parseFloat(value) || 0;
    }
    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!form.productId) {
      setMessage("Vui lòng chọn một đặc sản.");
      return;
    }

    const payload = { ...form, businessHours: `${openTime} - ${closeTime}` };

    setLoading(true);
    try {
      await productOfferApi.createOffer(payload);
      navigate("/seller");
    } catch (err) {
      console.error(err);
      setMessage("Đăng ký bán thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerLayout>
      <div className="admin-header">
        <div>
          <h1>Đăng Bán Đặc Sản</h1>
          <p>Chọn một đặc sản có sẵn và thiết lập thông tin bán hàng của bạn.</p>
        </div>
      </div>

      {message && <div className="card" style={{ padding: "15px", background: "#f8d7da", color: "#721c24", borderRadius: "8px", marginBottom: "20px" }}>{message}</div>}
      
      <form onSubmit={handleSubmit} className="card" style={{ padding: "30px" }}>
        <div style={{ display: "grid", gap: "20px" }}>

          <div style={{ position: "relative" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Chọn Đặc Sản (*)</label>
            <input
              value={productSearchTerm}
              onChange={e => {
                setProductSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={() => setIsDropdownOpen(true)}
              placeholder="Nhập hoặc chọn đặc sản..."
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
              required
            />
            {isDropdownOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setIsDropdownOpen(false)} />
                <div 
                  data-lenis-prevent="true"
                  style={{
                  position: "absolute", top: "100%", left: 0, right: 0, marginTop: "4px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px", padding: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 10, display: "flex", flexDirection: "column", gap: "4px", maxHeight: "300px", overflowY: "auto", overscrollBehavior: "contain"
                }}>
                  {filteredProducts.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#666" }}>Không tìm thấy đặc sản nào.</div>
                  ) : (
                    filteredProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setForm(prev => ({ ...prev, productId: p.id }));
                          setProductSearchTerm(p.name);
                          setIsDropdownOpen(false);
                        }}
                        style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: form.productId === p.id ? "#f0f8ff" : "transparent", color: form.productId === p.id ? "#0066cc" : "#333", fontWeight: form.productId === p.id ? 600 : 400 }}
                        onMouseEnter={(e) => { if (form.productId !== p.id) e.currentTarget.style.backgroundColor = "#f9f9f9"; }}
                        onMouseLeave={(e) => { if (form.productId !== p.id) e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        {p.name}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Tên Gian Hàng / Shop (*)</label>
            <input name="shopName" placeholder="Ví dụ: Đặc Sản Quê Hương" value={form.shopName} onChange={handleChange} required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Địa Chỉ Cửa Hàng (*)</label>
            <input name="shopAddress" placeholder="Ví dụ: 123 Đường Trần Phú, Thanh Hóa" value={form.shopAddress} onChange={handleChange} required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Thời Gian Bán Hàng (*)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="time" value={openTime} onChange={e => setOpenTime(e.target.value)} required style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
                <span>đến</span>
                <input type="time" value={closeTime} onChange={e => setCloseTime(e.target.value)} required style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Trạng thái</label>
              <select name="isOpen" value={form.isOpen} onChange={e => setForm(prev => ({ ...prev, isOpen: e.target.value === "true" }))} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>
                <option value="true">Đang Mở cửa</option>
                <option value="false">Tạm Đóng cửa</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Giá bán (VNĐ) (*)</label>
              <input name="price" type="number" placeholder="50000" value={form.price} onChange={handleChange} required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Số lượng có thể bán (*)</label>
              <input name="stockQuantity" type="number" placeholder="100" value={form.stockQuantity} onChange={handleChange} required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
            </div>
          </div>

        </div>

        <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
          <button disabled={loading} type="submit" style={{ padding: "14px 24px", background: "#e11d48", color: "white", borderRadius: "8px", border: "none", fontSize: "1.1rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Đang lưu..." : "Lưu Thông Tin Bán Hàng"}
          </button>
          <button type="button" onClick={() => navigate("/seller")} style={{ padding: "14px 24px", background: "white", color: "#333", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}>
            Hủy
          </button>
        </div>
      </form>
    </SellerLayout>
  );
}
