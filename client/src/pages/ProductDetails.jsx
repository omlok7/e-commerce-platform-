import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity,
      });

      alert("Product added to cart 🛒");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error adding product"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading product...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <h3>Product not found</h3>
      </div>
    );
  }

  return (
    <div className="container product-details-container ">
      <div className="row product-details-row p-5 ">

        {/* IMAGE SECTION */}
        <div className="col-lg-8 product-image-section ">
          <div className="image">
            <img
              src={
                product.image
                  ? `http://localhost:5000/uploads/${product.image}`
                  : "https://placehold.co/500x400"
              }
              alt={product.name}
              className="product-detail-image"
            />
          </div>
        </div>

        {/* INFORMATION SECTION */}
        <div className="col-lg-4 product-info-section">
          <div className="info">

            <div className="category">
              {product.category}
            </div>

            <h1>{product.name}</h1>

            <p className="description">
              {product.description}
            </p>

            <div className="price-box">
              {product.price} TND
            </div>

            <div className="details-box">

              <div>
                <span>Stock</span>
                <strong>
                  {product.stock} items
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong
                  className={
                    product.stock > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {product.stock > 0
                    ? "Available"
                    : "Out of stock"}
                </strong>
              </div>

            </div>

            <hr />

            {/* QUANTITY */}
            <h5 className="quantity-title">
              Quantity
            </h5>

            <div className="quantity-box">

              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </button>

            </div>

            <div className="total-box">
              <span>Total :</span>

              <strong>
                {product.price * quantity} TND
              </strong>
            </div>

            <button
              className="cart-btn"
              onClick={addToCart}
              disabled={product.stock === 0}
            >
                <i className="bi bi-cart3 me-2"></i> Add To Cart
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;