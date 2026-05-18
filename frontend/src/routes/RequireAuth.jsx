import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, roles = [] }) {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const userRole = String(localStorage.getItem("userRole") || "").toLowerCase();
  const normalizedRoles = roles.map((role) => String(role).toLowerCase());

  const allowedRole =
    userRole === "0" ? "admin" :
    userRole === "1" ? "editor" :
    userRole === "2" ? "seller" :
    userRole === "3" ? "customer" :
    userRole;

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (normalizedRoles.length > 0 && !normalizedRoles.includes(allowedRole)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
