import React, { useState } from "react";

function OrderTable({
  orders,

  onView,

  onStatusChange,
}) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const customer = order.user?.name || "";

    const searchMatch = customer.toLowerCase().includes(search.toLowerCase());

    const statusMatch = filter === "all" ? true : order.status === filter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="table">
      <h3 className="text-center text-black">Orders List</h3>

      <div className="p-3 row ">
        <div className="col-md-8">
          <input
            className="form-control"
            placeholder="🔍 Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>

            <option>Pending</option>

            <option>Processing</option>

            <option>Delivered</option>

            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Customer</th>

            <th>Total</th>

            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name || "Unknown"}</td>

              <td>{order.totalPrice} TND</td>

              <td>
                <select
                  className="form-select"
                  value={order.status}
                  onChange={(e) =>
                    onStatusChange(
                      order._id,

                      e.target.value,
                    )
                  }
                >
                  <option>Pending</option>

                  <option>Processing</option>

                  <option>Delivered</option>

                  <option>Cancelled</option>
                </select>
              </td>

              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => onView(order)}
                >
                  👁 Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
