import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../../api/productApi";

const ProductListPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await productApi.getAll();

      setProducts(data);
    } catch (error) {
      console.error("Lỗi load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm?");

    if (!confirmDelete) return;

    try {
      await productApi.delete(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Lỗi xoá:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Quản lý sản phẩm
          </h1>

          <p className="text-gray-500 mt-1">
            Quản lý đặc sản các tỉnh thành
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-cyan-500 text-white px-6 py-3 rounded-2xl hover:bg-cyan-600 transition shadow-lg"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Tổng sản phẩm
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {products.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Tổng tồn kho
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {products.reduce(
              (sum, p) => sum + p.stock,
              0
            )}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Tổng giá trị
          </p>

          <h2 className="text-3xl font-bold mt-2 text-cyan-600">
            {products
              .reduce(
                (sum, p) =>
                  sum + p.price * p.stock,
                0
              )
              .toLocaleString()}
            đ
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Danh sách sản phẩm
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Ảnh
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Tên sản phẩm
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Giá
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Stock
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "56px",
                      height: "56px",
                      objectFit: "cover",
                    }}
                    className="rounded-xl border"
                  />
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-cyan-600">
                  {product.price?.toLocaleString()}đ
                </td>

                <td className="px-6 py-4">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/products/edit/${product.id}`
                        )
                      }
                      className="bg-yellow-400 text-white px-4 py-2 rounded-xl hover:bg-yellow-500 transition"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            Chưa có sản phẩm.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
