import "../styles/product.css";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={() => onClick(product.id)}>
      <div className="product-card-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-card-body">
        <span className="product-card-tag">Đặc sản địa phương</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-card-footer">
          <span className="product-price">
            {product.price?.toLocaleString()}đ
          </span>

          <button>Xem ngay</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
