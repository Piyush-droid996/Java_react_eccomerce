import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboardService from "../../../services/dashboardService";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await dashboardService.getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load dashboard");
    }
  };

  if (!dashboard) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <p>Welcome Admin 👋</p>

      {/* Dashboard Statistics */}

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Users</h5>
            <h2>{dashboard.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Products</h5>
            <h2>{dashboard.totalProducts}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Categories</h5>
            <h2>{dashboard.totalCategories}</h2>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Orders</h5>
            <h2>{dashboard.totalOrders}</h2>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Revenue</h5>
            <h2>₹ {dashboard.totalRevenue}</h2>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <Link to="/admin/products" className="text-decoration-none text-dark">
            <div className="card p-4 shadow-sm h-100">
              <h4>Products</h4>
              <p>Manage Products</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link
            to="/admin/categories"
            className="text-decoration-none text-dark"
          >
            <div className="card p-4 shadow-sm h-100">
              <h4>Categories</h4>
              <p>Manage Categories</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/admin/orders" className="text-decoration-none text-dark">
            <div className="card p-4 shadow-sm h-100">
              <h4>Orders</h4>
              <p>Manage Orders</p>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mt-4">
          <Link to="/admin/users" className="text-decoration-none text-dark">
            <div className="card p-4 shadow-sm h-100">
              <h4>Users</h4>
              <p>Manage Users</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
