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
  let userRole = user.role;
  if (typeof userRole === 'string') {
    const num = parseInt(userRole, 10);
    if (!isNaN(num)) {
      userRole = num;
    } else {
      const roleMap = { admin: 0, editor: 1, customer: 2, seller: 3 };
      userRole = roleMap[userRole.toLowerCase()] ?? userRole;
    }
  }

  const isAuthorized = requiredRoles.length === 0 || requiredRoles.includes(userRole);

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}
