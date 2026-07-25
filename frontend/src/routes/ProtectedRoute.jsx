import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role } = useAuth();

  console.log("ProtectedRoute");
  console.log("isAuthenticated =", isAuthenticated);
  console.log("role =", role);
  console.log("requiredRole =", requiredRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
