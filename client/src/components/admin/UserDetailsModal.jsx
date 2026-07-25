    import React from "react";

    function UserDetailsModal({ data, onClose }) {
    if (!data) return null;

    const { user, ordersCount, totalSpent, orders } = data;

    return (
        <div
        className="modal fade show d-block"
        style={{
            backgroundColor: "rgba(0,0,0,.5)",
        }}
        >
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
            {/* Header */}

            <div className="modal-header  text-black">
                <h5>
                <i className="bi bi-person-circle me-2"></i>
                User Details
                </h5>

                <button
                className="btn-close btn-close-white"
                onClick={onClose}
                ></button>
            </div>

            {/* Body */}

            <div className="modal-body">
                <h4>{user.name}</h4>

                <p>
                <i className="bi bi-envelope me-2"></i>

                {user.email}
                </p>

                <div className="row text-center">
                <div className="col">
                    <div className="card p-3 shadow-sm">
                    <h6>Orders</h6>

                    <h3>{ordersCount}</h3>
                    </div>
                </div>

                <div className="col">
                    <div className="card p-3 shadow-sm">
                    <h6>Spent</h6>

                    <h3>{totalSpent} TND</h3>
                    </div>
                </div>
                </div>

                <hr />

                <h5>
                <i className="bi bi-cart me-2"></i>
                Orders
                </h5>

                {orders.map((order) => (
                <div className="border rounded p-2 mb-2" key={order._id}>
                    <strong>{order.totalPrice} TND</strong>
                    <br />
                    Status : {order.status}
                    <br />
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                </div>
                ))}
            </div>

            {/* Footer */}

            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                <i className="bi bi-x-lg me-2"></i>
                Close
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    }

    export default UserDetailsModal;
