import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <>

      {/* Bouton mobile */}
      <div className="d-lg-none mt-5 pt-3 px-3">

        <button
          className="btn btn-dark"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminSidebar"
        >
          <i className="bi bi-list"></i> Menu
        </button>

      </div>

      {/* Sidebar PC */}
      <div className="side d-none d-lg-block">
        <AdminSidebar />
      </div>

      {/* Sidebar Mobile */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        id="adminSidebar"
      >

        <div className="offcanvas-header bg-dark text-white">

          <h5 className="offcanvas-title">
            ⚡ Admin Panel
          </h5>

          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>

        </div>

        <div className="offcanvas-body bg-dark p-0">

          <AdminSidebar />

        </div>

      </div>

      {/* Contenu */}
      <main className="main-content">

        <Outlet />

      </main>

    </>
  );
}

export default AdminLayout;