import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Orders/Orders";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import ProductList from "../pages/Admin/Products/ProductList";
import AddProduct from "../pages/Admin/Products/AddProduct";
import EditProduct from "../pages/Admin/Products/EditProduct";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import CategoryList from "../pages/Admin/Categories/CategoryList";
import AddCategory from "../pages/Admin/Categories/AddCategory";
import EditCategory from "../pages/Admin/Categories/EditCategory";
import AdminOrders from "../pages/Admin/Orders/AdminOrders";
import OrderDetails from "../pages/Orders/OrderDetails";
import AdminOrderDetails from "../pages/Admin/Orders/AdminOrderDetails";
import UserList from "../pages/Admin/Users/UserList";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <CategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/add"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AddCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/edit/:id"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <EditCategory />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
