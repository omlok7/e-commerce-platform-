import { useEffect, useState } from "react";
import api from "../services/api";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <h3>Loading orders...</h3>
      </div>
    );
  }

  return (
    <div className="container orders-page">

      <h1 className="orders-title mt-4 ">
        My Orders
      </h1>

      <p className="orders-subtitle">
        Your recent purchases
      </p>

      {orders.length === 0 ? (
        <div className="empty-orders">
          No orders found
        </div>
      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order"
              key={order._id}
            >

              {/* ORDER HEADER */}

              <div className="order-top">

                <div>
                  <span className="order-label">
                    ORDER
                  </span>

                  <h3>
                    #{order._id.slice(-6).toUpperCase()}
                  </h3>

                  <p>
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="order-right">

                  <span
                    className={`status ${order.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {order.status}
                  </span>

                  <strong>
                    Total: {order.totalPrice} TND
                  </strong>

                </div>

              </div>


              {/* PRODUCTS */}

              <div className="products">

                {order.items.map(
                  (item, index) => {

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
                        className="product"
                        key={index}
                      >

                        {/* IMAGE */}

                        <img
                          src={
                            item.product?.image
                              ? `http://localhost:5000/uploads/${item.product.image}`
                              : "https://placehold.co/100x100?text=No+Image"
                          }
                          alt={
                            item.product?.name ||
                            "Product"
                          }
                        />

                        {/* INFO */}

                        <div className="product-info">

                          <h4>
                            {item.product?.name ||
                              "Product unavailable"}
                          </h4>

                          <p>
                            Quantity: {quantity}
                          </p>

                          <p>
                            Price: {price} TND
                          </p>

                        </div>

                        {/* SUBTOTAL */}

                        <strong className="product-total">
                          {subtotal} TND
                        </strong>

                      </div>

                    );
                  }
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;