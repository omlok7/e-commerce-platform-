import React from "react";

function OrderDetailsModal({
  order,

  onClose,
}) {
  if (!order) return null;

  return (
    <div
      className="modal show d-block"
      style={{
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header  text-black">
            <h5>  <i className="bi bi-cart3 me-2"></i> Order Details</h5>

            <button
              className="btn-close btn-close-black"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <h6>Customer</h6>

            <p>
              {order.user?.name || "Unknown"}

              <br />

              {order.user?.email}
            </p>

            <hr />

            {order.items.map((item, index) => (
              <div key={index} className="border p-2 mb-2">
                <strong>{item.product?.name || "Product unavailable"}</strong>
                <br />
                Quantity :{item.quantity}
                <br />
                Price :{item.product?.price || 0}
                TND
              </div>
            ))}

            <h5>Total :{order.totalPrice} TND</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
