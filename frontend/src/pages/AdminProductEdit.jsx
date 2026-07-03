import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { productApi } from "../api/productApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";
import axiosClient from "../api/axiosClient";
import { generateSlug } from "./AdminProductCreate.jsx";

export default function AdminProductEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    imageUrl: "",
    videoUrl: "",
    price: 0,
    isFeatured: false,
    isPublished: true,
    provinceId: "",
    type: 1,
    shops: []
  });
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [provinceSearchTerm, setProvinceSearchTerm] = useState("");
  const [initialProvinceSet, setInitialProvinceSet] = useState(false);
  const navigate = useNavigate();

  const selectedProvinceName = provinces.find(p => p.id === form.provinceId)?.name || "";
  const filteredProvinces = provinces.filter(p => {
    if (provinceSearchTerm === selectedProvinceName) return true;
    return p.name.toLowerCase().includes(provinceSearchTerm.toLowerCase());
  });

  useEffect(() => {
    if (form.provinceId && provinces.length > 0 && !initialProvinceSet) {
      setProvinceSearchTerm(selectedProvinceName);
      setInitialProvinceSet(true);
    }
  }, [form.provinceId, provinces, initialProvinceSet, selectedProvinceName]);

  useEffect(() => {
    fetchProvinces();
    fetchProduct();
  }, [id]);

  const fetchProvinces = async () => {
    try {
      const data = await provinceApi.getAll();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      setProvinces(sortedData);
    } catch (err) {
      console.error(err);
      setMessage("Không thể tải danh sách địa phương.");
    }
  };

  const fetchProduct = async () => {
    try {
      const data = await productApi.getById(id);
      setForm({
        name: data.name || "",
        slug: data.slug || "",
        imageUrl: data.imageUrl || "",
        videoUrl: data.videoUrl || "",
        price: data.price || 0,
        isFeatured: data.isFeatured || false,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
        provinceId: data.provinceId || "",
        type: data.type || 1,
        shops: data.shops || []
      });
    } catch (err) {
      console.error(err);
      setMessage("Không thể tải thông tin đặc sản.");
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

  const handleShopChange = (index, field, value) => {
    setForm(prev => {
      const newShops = [...prev.shops];
      newShops[index] = { ...newShops[index], [field]: value };
      return { ...prev, shops: newShops };
    });
  };

  const addShop = () => {
    setForm(prev => ({
      ...prev,
      shops: [...prev.shops, { shopName: "", shopUrl: "", platform: "ShopeeFood", imageUrl: "" }]
    }));
  };

  const removeShop = (index) => {
    setForm(prev => {
      const newShops = prev.shops.filter((_, i) => i !== index);
      return { ...prev, shops: newShops };
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
      await productApi.update(id, form);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setMessage("Cập nhật đặc sản thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 800, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Sửa Đặc Sản</h1>
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
              <label style={{ fontWeight: 600 }}>Loại đặc sản (*)</label>
              <select
                name="type"
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: parseInt(e.target.value) }))}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                required
              >
                <option value={1}>Có thể bán trực tuyến (Sellable)</option>
                <option value={2}>Dùng tại chỗ / Nhà hàng (Restaurant)</option>
              </select>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Giá (VNĐ)</label>
              <input name="price" type="number" placeholder="50000" value={form.price} onChange={handleChange} />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Hình ảnh</label>
              <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="file" accept="image/*" onChange={(event) => handleUpload(event, "imageUrl")} />
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" style={{ width: 150, height: 150, objectFit: "cover", marginTop: 8, borderRadius: 8 }} />}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Video</label>
              <input name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={handleChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="file" accept="video/*" onChange={(event) => handleUpload(event, "videoUrl")} />
              {form.videoUrl && <video src={form.videoUrl} controls style={{ width: 300, marginTop: 8, borderRadius: 8 }} />}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 600 }}>Cửa hàng liên kết (Nơi bán)</label>
              {form.shops.map((shop, index) => (
                <div key={index} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", backgroundColor: "#fafafa", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <input
                      placeholder="Tên shop"
                      value={shop.shopName}
                      onChange={(e) => handleShopChange(index, "shopName", e.target.value)}
                      style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      required
                    />
                    <select
                      value={shop.platform}
                      onChange={(e) => handleShopChange(index, "platform", e.target.value)}
                      style={{ width: "150px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                      <option value="ShopeeFood">ShopeeFood</option>
                      <option value="Shopee">Shopee</option>
                      <option value="Lazada">Lazada</option>
                      <option value="Tiktok">Tiktok</option>
                      <option value="Web">Web</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Other">Khác</option>
                    </select>
                    <button type="button" onClick={() => removeShop(index)} style={{ padding: "8px 16px", backgroundColor: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                      Xóa
                    </button>
                  </div>
                  
                  <div style={{ display: "flex", gap: "12px" }}>
                    <input
                      placeholder="URL liên kết"
                      type="url"
                      value={shop.shopUrl}
                      onChange={(e) => handleShopChange(index, "shopUrl", e.target.value)}
                      style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <input
                      placeholder="URL Ảnh đại diện (để trống nếu không có)"
                      type="url"
                      value={shop.imageUrl || ""}
                      onChange={(e) => handleShopChange(index, "imageUrl", e.target.value)}
                      style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    {shop.imageUrl && (
                      <img src={shop.imageUrl} alt="preview" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ccc" }} />
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addShop} className="btn btn-outline" style={{ justifySelf: "start", marginTop: 8 }}>
                + Thêm Cửa Hàng
              </button>
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
            <button className="btn btn-primary" type="submit">Cập nhật Đặc Sản</button>
            <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/products")}>Hủy</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
