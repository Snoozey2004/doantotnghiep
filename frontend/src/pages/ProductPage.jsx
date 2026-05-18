import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [provinceName, setProvinceName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getByProvinceSlug(slug);

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleProductClick = (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-cyan-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Đặc sản {provinceName}</h1>

        <p className="text-lg opacity-90">
          Khám phá tinh hoa ẩm thực địa phương
        </p>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p>Chưa có sản phẩm.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
