import React from "react";

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product.id)}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Name */}
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="text-cyan-600 font-bold text-lg">
            {product.price?.toLocaleString()}đ
          </span>

          {/* Button */}
          <button
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Xem ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;