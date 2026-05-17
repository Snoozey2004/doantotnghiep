import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";
import { mediaApi } from "../api/mediaApi";
import { postApi } from "../api/postApi";
import { productApi } from "../api/productApi";

const defaultBlock = {
  blockType: "hero",
  title: "Hero",
  contentJson: "{}",
  sortOrder: 1,
  isEnabled: true
};

export default function AdminDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [provinceForm, setProvinceForm] = useState({
    name: "",
    description: "",
    region: "",
    imageUrl: "",
    videoUrl: "",
    slug: ""
  });
  const [configForm, setConfigForm] = useState({
    provinceId: "",
    themeColor: "#2563eb",
    fontFamily: "Inter",
    backgroundUrl: "",
    layout: "default"
  });
  const [blockForm, setBlockForm] = useState(defaultBlock);
  const [configId, setConfigId] = useState("");
  const [message, setMessage] = useState("");
  const [mediaForm, setMediaForm] = useState({
    provinceId: "",
    mediaType: "image",
    title: "",
    url: "",
    description: "",
    sortOrder: 1,
    isFeatured: false
  });
  const [postForm, setPostForm] = useState({
    provinceId: "",
    title: "",
    content: "",
    category: "",
    imageUrl: "",
    videoUrl: "",
    slug: ""
  });
  const [productForm, setProductForm] = useState({
    provinceId: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: ""
  });

  const loadProvinces = async () => {
    const data = await provinceApi.getAll();
    setProvinces(data);
  };

  useEffect(() => {
    loadProvinces();
  }, []);

  const handleProvinceChange = (event) => {
    setProvinceForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleConfigChange = (event) => {
    setConfigForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleBlockChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setBlockForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleMediaChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setMediaForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handlePostChange = (event) => {
    setPostForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleProductChange = (event) => {
    const value = event.target.type === "number" ? Number(event.target.value) : event.target.value;
    setProductForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleCreateProvince = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await provinceApi.create(provinceForm);
      await loadProvinces();
      setProvinceForm({ name: "", description: "", region: "", imageUrl: "", videoUrl: "", slug: "" });
      setMessage("Đã tạo Province thành công.");
    } catch {
      setMessage("Tạo Province thất bại.");
    }
  };

  const handleCreateMedia = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await mediaApi.create(mediaForm);
      setMediaForm({
        provinceId: "",
        mediaType: "image",
        title: "",
        url: "",
        description: "",
        sortOrder: 1,
        isFeatured: false
      });
      setMessage("Đã thêm Media item.");
    } catch {
      setMessage("Thêm Media item thất bại (cần role Admin/Editor).");
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await postApi.create(postForm);
      setPostForm({
        provinceId: "",
        title: "",
        content: "",
        category: "",
        imageUrl: "",
        videoUrl: "",
        slug: ""
      });
      setMessage("Đã thêm bài viết.");
    } catch {
      setMessage("Thêm bài viết thất bại (cần role Admin/Editor).");
    }
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await productApi.create(productForm);
      setProductForm({
        provinceId: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: ""
      });
      setMessage("Đã thêm đặc sản.");
    } catch {
      setMessage("Thêm đặc sản thất bại.");
    }
  };

  const handleCreateConfig = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await landingConfigApi.create({ ...configForm, blocks: [] });
      setConfigId(result.id);
      setMessage("Đã tạo LandingPageConfig.");
    } catch {
      setMessage("Tạo LandingPageConfig thất bại.");
    }
  };

  const handleCreateBlock = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (!configId) {
        setMessage("Cần có ConfigId trước.");
        return;
      }
      await uiBlockApi.create(configId, blockForm);
      setBlockForm(defaultBlock);
      setMessage("Đã thêm UIBlock.");
    } catch {
      setMessage("Thêm UIBlock thất bại (cần role Admin/Editor).");
    }
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container">
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>Admin CMS</h1>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            Tạo tỉnh thành, cấu hình landing page và UI blocks.
          </p>
          {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <form className="card" onSubmit={handleCreateProvince}>
              <h3>Tạo Province</h3>
              <input name="name" placeholder="Tên" value={provinceForm.name} onChange={handleProvinceChange} required />
              <input name="slug" placeholder="Slug" value={provinceForm.slug} onChange={handleProvinceChange} required />
              <input name="region" placeholder="Khu vực" value={provinceForm.region} onChange={handleProvinceChange} />
              <input name="imageUrl" placeholder="Image URL" value={provinceForm.imageUrl} onChange={handleProvinceChange} />
              <input name="videoUrl" placeholder="Video URL" value={provinceForm.videoUrl} onChange={handleProvinceChange} />
              <textarea
                name="description"
                placeholder="Mô tả"
                value={provinceForm.description}
                onChange={handleProvinceChange}
                rows={3}
              />
              <button className="btn btn-primary" type="submit">Tạo Province</button>
            </form>

            <form className="card" onSubmit={handleCreateConfig}>
              <h3>Tạo Landing Config</h3>
              <select name="provinceId" value={configForm.provinceId} onChange={handleConfigChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <input name="themeColor" placeholder="Theme Color" value={configForm.themeColor} onChange={handleConfigChange} />
              <input name="fontFamily" placeholder="Font" value={configForm.fontFamily} onChange={handleConfigChange} />
              <input name="backgroundUrl" placeholder="Background URL" value={configForm.backgroundUrl} onChange={handleConfigChange} />
              <input name="layout" placeholder="Layout" value={configForm.layout} onChange={handleConfigChange} />
              <button className="btn btn-primary" type="submit">Tạo Config</button>
              {configId && <p style={{ marginTop: 8, color: "#64748b" }}>ConfigId: {configId}</p>}
            </form>

            <form className="card" onSubmit={handleCreateBlock}>
              <h3>Thêm UI Block</h3>
              <input value={configId} readOnly placeholder="Config ID" />
              <input name="blockType" placeholder="Block Type" value={blockForm.blockType} onChange={handleBlockChange} />
              <input name="title" placeholder="Tiêu đề" value={blockForm.title} onChange={handleBlockChange} />
              <input name="sortOrder" type="number" value={blockForm.sortOrder} onChange={handleBlockChange} />
              <textarea
                name="contentJson"
                placeholder="Content JSON"
                value={blockForm.contentJson}
                onChange={handleBlockChange}
                rows={3}
              />
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="isEnabled"
                  checked={blockForm.isEnabled}
                  onChange={handleBlockChange}
                />
                Enabled
              </label>
              <button className="btn btn-primary" type="submit">Thêm Block</button>
            </form>

            <form className="card" onSubmit={handleCreateMedia}>
              <h3>Thêm Media (ảnh/video)</h3>
              <select name="provinceId" value={mediaForm.provinceId} onChange={handleMediaChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <input name="mediaType" placeholder="Media Type" value={mediaForm.mediaType} onChange={handleMediaChange} />
              <input name="title" placeholder="Tiêu đề" value={mediaForm.title} onChange={handleMediaChange} />
              <input name="url" placeholder="URL" value={mediaForm.url} onChange={handleMediaChange} />
              <textarea
                name="description"
                placeholder="Mô tả"
                value={mediaForm.description}
                onChange={handleMediaChange}
                rows={3}
              />
              <input
                name="sortOrder"
                type="number"
                value={mediaForm.sortOrder}
                onChange={handleMediaChange}
              />
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={mediaForm.isFeatured}
                  onChange={handleMediaChange}
                />
                Nổi bật
              </label>
              <button className="btn btn-primary" type="submit">Thêm Media</button>
            </form>

            <form className="card" onSubmit={handleCreatePost}>
              <h3>Thêm bài viết nổi bật</h3>
              <select name="provinceId" value={postForm.provinceId} onChange={handlePostChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <input name="title" placeholder="Tiêu đề" value={postForm.title} onChange={handlePostChange} />
              <input name="slug" placeholder="Slug" value={postForm.slug} onChange={handlePostChange} />
              <input name="category" placeholder="Category" value={postForm.category} onChange={handlePostChange} />
              <input name="imageUrl" placeholder="Image URL" value={postForm.imageUrl} onChange={handlePostChange} />
              <input name="videoUrl" placeholder="Video URL" value={postForm.videoUrl} onChange={handlePostChange} />
              <textarea
                name="content"
                placeholder="Nội dung"
                value={postForm.content}
                onChange={handlePostChange}
                rows={3}
              />
              <button className="btn btn-primary" type="submit">Thêm bài viết</button>
            </form>

            <form className="card" onSubmit={handleCreateProduct}>
              <h3>Thêm đặc sản nổi bật</h3>
              <select name="provinceId" value={productForm.provinceId} onChange={handleProductChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <input name="name" placeholder="Tên" value={productForm.name} onChange={handleProductChange} />
              <input name="imageUrl" placeholder="Image URL" value={productForm.imageUrl} onChange={handleProductChange} />
              <textarea
                name="description"
                placeholder="Mô tả"
                value={productForm.description}
                onChange={handleProductChange}
                rows={3}
              />
              <input name="price" type="number" value={productForm.price} onChange={handleProductChange} />
              <input name="stock" type="number" value={productForm.stock} onChange={handleProductChange} />
              <button className="btn btn-primary" type="submit">Thêm đặc sản</button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
