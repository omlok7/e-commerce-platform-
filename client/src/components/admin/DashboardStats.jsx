    import React from "react";

    function DashboardStats({ users, products, orders }) {
    const revenue = orders.reduce((total, order) => total + order.totalPrice, 0);

    return (
        <div className="row mb-4">
        {/* Users */}

        <div className="col-md-3">
            <div className="card shadow p-3">
            <h6>
                <i className="bi bi-people-fill me-2"></i>
                Users
            </h6>

            <h2>{users.length}</h2>
            </div>
        </div>

        {/* Products */}

        <div className="col-md-3">
            <div className="card shadow p-3">
            <h6>
                <i className="bi bi-box-seam-fill me-2"></i>
                Products
            </h6>

            <h2>{products.length}</h2>
            </div>
        </div>

        {/* Orders */}

        <div className="col-md-3">
            <div className="card shadow p-3">
            <h6>
                <i className="bi bi-cart-fill me-2"></i>
                Orders
            </h6>

            <h2>{orders.length}</h2>
            </div>
        </div>

        {/* Revenue */}

        <div className="col-md-3">
            <div className="card shadow p-3">
            <h6>
                <i className="bi bi-currency-dollar me-2"></i>
                Revenue
            </h6>

            <h2>{revenue} TND</h2>
            </div>
        </div>
        </div>
    );
    }

    export default DashboardStats;
