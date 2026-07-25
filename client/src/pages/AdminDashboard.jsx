    import { useEffect, useState } from "react";

    import api from "../services/api";

    import DashboardStats from "../components/admin/DashboardStats";

    import RecentOrders from "../components/admin/RecentOrders";

    import SalesChart from "../components/admin/SalesChart";

    import OrderDetailsModal from "../components/admin/OrderDetailsModal";

    function AdminDashboard() {
    const [users, setUsers] = useState([]);

    const [products, setProducts] = useState([]);

    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const usersResponse = await api.get("/users");

        const productsResponse = await api.get("/products");

        const ordersResponse = await api.get("/orders/admin");

        setUsers(usersResponse.data);

        setProducts(productsResponse.data);

        setOrders(ordersResponse.data);
        } catch (error) {
        console.log("Dashboard error:", error);
        }
    };

    return (
        <div className="container-fluid">
       <h2 className="mb-4">
 <i className="bi bi-speedometer2 me-2"></i>
  Admin Dashboard
</h2>

        {/* STATISTICS */}

        <DashboardStats users={users} products={products} orders={orders} />

        {/* SALES CHART */}

        <SalesChart orders={orders} />

        {/* RECENT ORDERS */}

        <RecentOrders orders={orders} onView={setSelectedOrder} />

        {/* ORDER DETAILS MODAL */}

        <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
        />
        </div>
    );
    }

    export default AdminDashboard;
