import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
function Header() {
  const { isAuthenticated, logout, role } = useAuth();
  console.log("isAuthenticated =", isAuthenticated);
  console.log("role =", role);
  console.log("token =", localStorage.getItem("token"));
  console.log("stored role =", localStorage.getItem("role"));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          EazyStore
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            )}

            {role === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          <form className="d-flex me-3">
            <input className="form-control" placeholder="Search Products..." />

            <button type="submit" className="btn btn-primary ms-2">
              <FaSearch />
            </button>
          </form>

          <Link className="btn btn-outline-primary me-2" to="/cart">
            <FaShoppingCart /> Cart
          </Link>

          {!isAuthenticated ? (
            <>
              <Link className="btn btn-outline-secondary me-2" to="/register">
                Register
              </Link>

              <Link className="btn btn-primary" to="/login">
                <FaUser /> Login
              </Link>
            </>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
