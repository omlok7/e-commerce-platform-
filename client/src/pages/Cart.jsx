import { useEffect, useState } from "react";
import api from "../services/api";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // GET CART
  // =========================
  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/${productId}`, {
        quantity,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // REMOVE PRODUCT
  // =========================
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREATE ORDER
  // =========================
  const createOrder = async () => {
    try {
      await api.post("/orders");

      alert("Order created successfully 🎉");

      fetchCart();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Order failed"
      );
    }
  };

  // =========================
  // TOTAL PRICE
  // =========================
  const totalPrice = cart?.items.reduce(
    (total, item) => {
      const price = Number(
        item.product?.price || 0
      );

      const quantity = Number(
        item.quantity || 0
      );

      return total + price * quantity;
    },
    0
  );

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="container cart-page">
        <h3>Loading cart...</h3>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container cart-page">
        <h1 className="cart-title">
          Your Cart
        </h1>

        <div className="empty-cart">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">

      {/* TITLE */}
      <h1 className="cart-title mt-4">
        Your Cart
      </h1>

      <div className="row g-4">

        {/* =========================
            LEFT : CART PRODUCTS
        ========================= */}
        <div className="col-lg-8">

          {/* HEADER */}
          <div className="cart-header">

            <div className="product-column">
              PRODUCT
            </div>

            <div>
              PRICE
            </div>

            <div>
              QUANTITY
            </div>

            <div>
              TOTAL
            </div>

            <div></div>

          </div>

          {/* PRODUCTS */}
          {cart.items.map((item) => {

            const price = Number(
              item.product?.price || 0
            );

            const quantity = Number(
              item.quantity || 0
            );

            const subtotal =
              price * quantity;

            return (
              <div
                className="cart-item"
                key={item._id}
              >

                {/* PRODUCT */}
                <div className="product-column">

                  <img
                    src={
                      item.product.image
                        ? `http://localhost:5000/uploads/${item.product.image}`
                        : "https://placehold.co/100x100?text=No+Image"
                    }
                    alt={item.product.name}
                    className="cart-product-image"
                  />

                  <div className="product-info">

                    <h3>
                      {item.product.name}
                    </h3>

                    <p>
                      {item.product.category}
                    </p>

                  </div>

                </div>

                {/* PRICE */}
                <div className="item-price">
                  {price} TND
                </div>

                {/* QUANTITY */}
                <div className="quantity-control">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        quantity - 1
                      )
                    }
                    disabled={quantity <= 1}
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* SUBTOTAL */}
                <div className="item-total">
                  {subtotal} TND
                </div>

                {/* REMOVE */}
                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(
                      item.product._id
                    )
                  }
                >
                  ×
                </button>

              </div>
            );
          })}

        </div>

        {/* =========================
            RIGHT : ORDER SUMMARY
        ========================= */}
        <div className="col-lg-4">

          <div className="order-summary">

            <div className="summary-header">
              Order Summary
            </div>

            <div className="summary-content">

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  {totalPrice} TND
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Shipping
                </span>

                <strong>
                  Free
                </strong>
              </div>

              <div className="coupon">
                Add coupon code
                <span>→</span>
              </div>

            </div>

            {/* TOTAL */}
            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                {totalPrice} TND
              </strong>

            </div>

            {/* CHECKOUT */}
            <button
              className="checkout-btn"
              onClick={createOrder}
            >
              CHECKOUT
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;