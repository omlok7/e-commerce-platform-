import React from "react";

function RecentOrders({
  orders,

  onView,
}) {
  const recent = orders.slice(0, 5);

  return (
    <div className="table mt-4">
      <h3 className="text-center text-black mb-3">  <i className="bi bi-cart3 me-2"></i> Recent Orders</h3>

      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Customer</th>

              <th>Total</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No orders
                </td>
              </tr>
            ) : (
              recent.map((order) => (
                <tr key={order._id}>
                  <td>{order.user?.name || "Unknown"}</td>

                  <td>{order.totalPrice} TND</td>

                  <td>
                    <span className="badge bg-warning">{order.status}</span>
                  </td>

                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => onView(order)}
                    >
                      👁 
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
