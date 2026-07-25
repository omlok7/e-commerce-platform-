    import { NavLink } from "react-router-dom";

    function AdminSidebar() {
    return (
        <div className="admin-sidebar bg-dark text-white">

        <h3 className="text-center py-3 border-bottom">
             Admin Panel
        </h3>

        <ul className="nav flex-column p-3">

            <li className="nav-item mb-2">
            <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : "text-white"}`
                }
            >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
            </NavLink>
            </li>

            <li className="nav-item mb-2">
            <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : "text-white"}`
                }
            >
                <i className="bi bi-box-seam me-2"></i>
                Products
            </NavLink>
            </li>

            <li className="nav-item mb-2">
            <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : "text-white"}`
                }
            >
                <i className="bi bi-cart3 me-2"></i>
                Orders
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : "text-white"}`
                }
            >
                <i className="bi bi-people me-2"></i>
                Users
            </NavLink>
            </li>

        </ul>

        </div>
    );
    }

    export default AdminSidebar;    