import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ProvinceLandingPage from "../pages/ProvinceLandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/province/:slug" element={<ProvinceLandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
