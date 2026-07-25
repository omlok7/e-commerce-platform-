import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg  shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning
        "to="/home">
           <i className="bi bi-shop"></i> MyShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          {/* LEFT */}
          <ul className="navbar-nav me-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>

                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-bold" to="/admin">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* RIGHT */}
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Welcome {user.name}</span>
                </li>

                <li className="nav-item">
                  <button className="btn btn-info ms-2" onClick={logout}>
                  <i className="bi bi-box-arrow-right"></i>  
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
