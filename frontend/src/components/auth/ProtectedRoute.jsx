import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is in required roles
  // Role is stored as a number (0-3)
  const userRole = typeof user.role === 'string' ? parseInt(user.role) : user.role;
  const isAuthorized = requiredRoles.length === 0 || requiredRoles.includes(userRole);

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}
