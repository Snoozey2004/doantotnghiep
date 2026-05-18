import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ProvinceLandingPage from "../pages/ProvinceLandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import ProductListPage from "../pages/admin/ProductListPage";
import ProductCreatePage from "../pages/admin/ProductCreatePage";
import ProductEditPage from "../pages/admin/ProductEditPage";
import RequireAuth from "./RequireAuth.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/province/:slug" element={<ProvinceLandingPage />} />
      <Route path="/products/province/:slug" element={<ProductPage />} />
      <Route
        path="/admin"
        element={
          <RequireAuth roles={["admin"]}>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/cms/editor"
        element={
          <RequireAuth roles={["editor"]}>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* admin for product */}
      <Route path="/admin/products" element={<ProductListPage />} />
      <Route path="/admin/products/create" element={<ProductCreatePage />} />
      <Route path="/admin/products/edit/:id" element={<ProductEditPage />} />
    </Routes>
  );
}
