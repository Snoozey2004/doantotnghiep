import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RequireAuth({ children, roles = [] }) {
  const location = useLocation();
  const { user, loading } = useAuth();
  const token = localStorage.getItem("accessToken");

  const rawRole = user?.role ?? localStorage.getItem("userRole");
  const numericRole = Number(rawRole);
  const userRole = Number.isFinite(numericRole) ? numericRole : null;

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  if (!token || userRole === null) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
