    import { useEffect, useState } from "react";

    import api from "../services/api";

    import OrderDetailsModal from "../components/admin/OrderDetailsModal";

    function AdminOrders() {
    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const ordersPerPage = 5;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
        const response = await api.get("/orders/admin");

        setOrders(response.data);
        } catch (error) {
        console.log(error);
        }
    };

    const changeStatus = async (id, status) => {
        try {
        await api.put(
            `/orders/${id}/status`,

            {
            status,
            },
        );

        fetchOrders();
        } catch (error) {
        console.log(error);
        }
    };

    // SEARCH + FILTER

    const filteredOrders = orders.filter((order) => {
        const customer = order.user?.name?.toLowerCase() || "";

        const email = order.user?.email?.toLowerCase() || "";

        const text = search.toLowerCase();

        const matchSearch = customer.includes(text) || email.includes(text);

        const matchStatus = statusFilter === "" || order.status === statusFilter;

        return matchSearch && matchStatus;
    });

    // PAGINATION

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const displayedOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,

        currentPage * ordersPerPage,
    );

    return (
        <div className="container-fluid">
        <h2 className="mb-4"> <i className="bi bi-cart3 me-2"></i>Orders Management</h2>

        {/* FILTERS */}

        <div className=" p-3 mb-4">
            <div className="row">
            <div className="col-md-6">
                <input
                className="form-control"
                placeholder="🔍 Search customer..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);

                    setCurrentPage(1);
                }}
                />
            </div>

            <div className="col-md-4">
                <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                    setStatusFilter(e.target.value);

                    setCurrentPage(1);
                }}
                >
                <option value="">All Status</option>

                <option value="Pending">Pending</option>

                <option value="Processing">Processing</option>

                <option value="Delivered">Delivered</option>

                <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            </div>
        </div>

        <div className="table ">
            <h3 className="text-center">Orders List</h3>

            <div className="table-responsive">
            <table className="table table-hover mb-0">
                <thead>
                <tr>
                    <th>Customer</th>

                    <th>Products</th>

                    <th>Total</th>

                    <th>Date</th>

                    <th>Status</th>

                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {displayedOrders.length === 0 ? (
                    <tr>
                    <td colSpan="6" className="text-center">
                        No orders found
                    </td>
                    </tr>
                ) : (
                    displayedOrders.map((order) => (
                    <tr key={order._id}>
                        <td>
                        {order.user?.name || "Unknown"}

                        <br />

                        <small>{order.user?.email}</small>
                        </td>

                        <td>
                        {order.items.map((item, index) => (
                            <div key={index}>
                            {item.product?.name || "Deleted product"}x{" "}
                            {item.quantity}
                            </div>
                        ))}
                        </td>

                        <td>{order.totalPrice} TND</td>

                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                        <td>
                        <select
                            className="form-select"
                            value={order.status}
                            onChange={(e) =>
                            changeStatus(
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
                            onClick={() => setSelectedOrder(order)}
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

        {/* PAGINATION */}

        <div className="d-flex justify-content-center align-items-center mt-4">
            <button
            className="btn btn-secondary me-3"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            >
            &lt;
            </button>

            <span>
            Page {currentPage} / {totalPages || 1}
            </span>

            <button
            className="btn btn-secondary ms-3"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            >
            &gt;
            </button>
        </div>

        <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
        />
        </div>
    );
    }

    export default AdminOrders;
