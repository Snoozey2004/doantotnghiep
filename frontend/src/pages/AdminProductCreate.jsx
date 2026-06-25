import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { productApi } from "../api/productApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng -> -
    .replace(/-+/g, "-"); // bỏ -- liên tiếp
};

const emptyProduct = {
  name: "",
  slug: "",
  imageUrl: "",
  videoUrl: "",
  price: 0,
  isFeatured: false,
  isPublished: true,
  provinceId: ""
};

export default function AdminProductCreate() {
  const [form, setForm] = useState(emptyProduct);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [provinceSearchTerm, setProvinceSearchTerm] = useState("");
  const navigate = useNavigate();

  const selectedProvinceName = provinces.find(p => p.id === form.provinceId)?.name || "";
  const filteredProvinces = provinces.filter(p => {
    if (provinceSearchTerm === selectedProvinceName) return true;
    return p.name.toLowerCase().includes(provinceSearchTerm.toLowerCase());
  });

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const data = await provinceApi.getAll();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      setProvinces(sortedData);
      if (sortedData.length > 0) {
        setForm(prev => ({ ...prev, provinceId: sortedData[0].id }));
        setProvinceSearchTerm(sortedData[0].name);
      }
    } catch (err) {
      console.error(err);
      setMessage("Không thể tải danh sách địa phương.");
    }
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    let finalValue = type === "checkbox" ? checked : value;
    if (name === "price") {
        finalValue = parseFloat(value) || 0;
    }
    setForm((prev) => {
      const newForm = { ...prev, [name]: finalValue };
      if (name === "name" && !isSlugEdited) {
        newForm.slug = generateSlug(finalValue);
      }
      return newForm;
    });
  };

  const handleUpload = async (event, fieldName) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage("");
    try {
      const mediaType = fieldName === "imageUrl" ? "IMG" : "VID";
      const result = await uploadApi.upload(file, "products", null, form.name || "product", mediaType);
      setForm((prev) => ({ ...prev, [fieldName]: result.url }));
      setMessage(`Upload thành công: ${result.fileName}`);
    } catch {
      setMessage("Upload thất bại.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await productApi.create(form);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setMessage("Tạo đặc sản thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 800, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Thêm Đặc Sản Mới</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Tên đặc sản (*)</label>
              <input name="name" placeholder="Ví dụ: Phở Hà Nội" value={form.name} onChange={handleChange} required />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Slug (*)</label>
              <input 
                name="slug" 
                placeholder="pho-ha-noi" 
                value={form.slug} 
                onChange={(e) => {
                  setIsSlugEdited(true);
                  setForm(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                }} 
                required 
              />
            </div>

            <div style={{ display: "grid", gap: 8, position: "relative" }}>
              <label style={{ fontWeight: 600 }}>Địa phương (*)</label>
              <input 
                value={provinceSearchTerm}
                onChange={e => {
                  setProvinceSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onClick={() => setIsDropdownOpen(true)}
                placeholder="Nhập hoặc chọn địa phương..."
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                required
              />
              {isDropdownOpen && (
                <>
                  <div 
                    style={{ position: "fixed", inset: 0, zIndex: 999 }} 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8
                  }}>
                    {filteredProvinces.length === 0 ? (
                      <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>Không tìm thấy địa phương nào.</div>
                    ) : (
                      filteredProvinces.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => {
                            setForm(prev => ({ ...prev, provinceId: p.id }));
                            setProvinceSearchTerm(p.name);
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderRadius: 4,
                            backgroundColor: form.provinceId === p.id ? "#f0f8ff" : "transparent",
                            color: form.provinceId === p.id ? "#0066cc" : "#333",
                            fontWeight: form.provinceId === p.id ? 600 : 400,
                            fontSize: "0.9rem"
                          }}
                          onMouseEnter={(e) => {
                            if (form.provinceId !== p.id) e.currentTarget.style.backgroundColor = "#f9f9f9";
                          }}
                          onMouseLeave={(e) => {
                            if (form.provinceId !== p.id) e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          {p.name}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Giá (VNĐ)</label>
              <input name="price" type="number" placeholder="50000" value={form.price} onChange={handleChange} />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Hình ảnh</label>
              <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
              <input type="file" accept="image/*" onChange={(event) => handleUpload(event, "imageUrl")} />
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" style={{ width: 150, height: 150, objectFit: "cover", marginTop: 8 }} />}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Video</label>
              <input name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={handleChange} />
              <input type="file" accept="video/*" onChange={(event) => handleUpload(event, "videoUrl")} />
              {form.videoUrl && <video src={form.videoUrl} controls style={{ width: 300, marginTop: 8 }} />}
            </div>

            <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                Sản phẩm nổi bật
              </label>

              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
                Xuất bản (Hiển thị)
              </label>
            </div>
          </div>
          
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button className="btn btn-primary" type="submit">Lưu Đặc Sản</button>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/products")}>Hủy</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
