import { useEffect, useState } from "react";
import { productApi } from "../../api/productApi";
import { provinceApi } from "../../api/provinceApi";

import "../../styles/productCreate.css";

const ProductCreate = ({ onClose, onSuccess }) => {
  const [provinces, setProvinces] = useState([]);

  const [showImport, setShowImport] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importLoading, setImportLoading] = useState(false);

  const [formData, setFormData] = useState({
    provinceId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await provinceApi.getAll();
      setProvinces(data);
    };

    fetchProvinces();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await productApi.create({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      alert("Tạo sản phẩm thành công!");

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Lỗi tạo sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      alert("Vui lòng chọn file");
      return;
    }

    try {
      setImportLoading(true);

      const data = new FormData();

      data.append("file", importFile);

      for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      await productApi.importProducts(data);

      alert("Import thành công");

      setShowImport(false);
      setImportFile(null);

      onSuccess?.();
    } catch (error) {
      console.error("Lỗi import:", error);
      console.log(error.response?.data);
    } finally {
      setImportLoading(false);
    }
  };

  return (
    <div className="product-create">
      {/* HEADER */}
      <div className="product-create__header">
        <div>
          <h1 className="product-create__title">Thêm sản phẩm</h1>

          <p className="product-create__subtitle">
            Thêm đặc sản mới cho tỉnh thành
          </p>
        </div>

        <div className="product-create__actions">
          <button
            type="button"
            className="product-create__import-btn"
            onClick={() => setShowImport(true)}
          >
            Import sản phẩm
          </button>

          <button
            type="button"
            className="product-create__close-btn"
            onClick={onClose}
          >
            ✕ Đóng
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="product-create__form-wrapper">
        <form onSubmit={handleSubmit} className="product-create__form">
          <div className="product-create__group">
            <label>Tỉnh thành</label>

            <select
              name="provinceId"
              value={formData.provinceId}
              onChange={handleChange}
              required
              className="product-create__input"
            >
              <option value="">Chọn tỉnh thành</option>

              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="product-create__group">
            <label>Tên sản phẩm</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="product-create__input"
            />
          </div>

          <div className="product-create__group">
            <label>Mô tả</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="product-create__textarea"
            />
          </div>

          <div className="product-create__row">
            <div className="product-create__group">
              <label>Giá</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="product-create__input"
              />
            </div>

            <div className="product-create__group">
              <label>Số lượng</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="product-create__input"
              />
            </div>
          </div>

          <div className="product-create__group">
            <label>Image URL</label>

            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="product-create__input"
            />
          </div>

          <button className="product-create__submit-btn" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo sản phẩm"}
          </button>
        </form>
      </div>

      {/* IMPORT MODAL */}
      {showImport && (
        <div className="import-modal">
          <div className="import-modal__content">
            <h2>Import sản phẩm</h2>

            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setImportFile(file);
                }
              }}
            />

            <div className="import-modal__actions">
              <button
                type="button"
                className="import-modal__submit"
                onClick={handleImport}
                disabled={importLoading}
              >
                {importLoading ? "Đang import..." : "Import"}
              </button>

              <button
                type="button"
                className="import-modal__close"
                onClick={() => {
                  setShowImport(false);
                  setImportFile(null);
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreate;