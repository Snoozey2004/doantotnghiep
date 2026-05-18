import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../../api/productApi";
import { provinceApi } from "../../api/provinceApi";

const ProductEditPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);

  const [formData, setFormData] = useState({
    provinceId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, provinceData] = await Promise.all([
          productApi.getById(id),
          provinceApi.getAll(),
        ]);

        setProvinces(provinceData);

        setFormData({
          provinceId: product.provinceId,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl: product.imageUrl,
        });
      } catch (error) {
        console.error("Lỗi load dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await productApi.update(id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      alert("Cập nhật thành công!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  if (loading) {
    return <div className="p-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Chỉnh sửa sản phẩm</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow space-y-6"
      >
        {/* Province */}
        <div>
          <label className="block mb-2 font-medium">Tỉnh thành</label>

          <select
            name="provinceId"
            value={formData.provinceId}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          >
            <option value="">Chọn tỉnh thành</option>

            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">Tên sản phẩm</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Mô tả</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Giá</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-medium">Image URL</label>

          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-4 rounded-xl hover:bg-cyan-600 transition"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;
