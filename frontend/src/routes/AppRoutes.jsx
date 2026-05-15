import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ProvinceLandingPage from "../pages/ProvinceLandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import AdminProvinceCreate from "../pages/AdminProvinceCreate.jsx";
import AdminProvinceEdit from "../pages/AdminProvinceEdit.jsx";
import AdminProvinceDelete from "../pages/AdminProvinceDelete.jsx";
import AdminPostsDashboard from "../pages/AdminPostsDashboard.jsx";
import AdminPostCreate from "../pages/AdminPostCreate.jsx";
import AdminPostEdit from "../pages/AdminPostEdit.jsx";
import AdminPostDelete from "../pages/AdminPostDelete.jsx";
import AdminMediaDashboard from "../pages/AdminMediaDashboard.jsx";
import AdminMediaCreate from "../pages/AdminMediaCreate.jsx";
import AdminMediaEdit from "../pages/AdminMediaEdit.jsx";
import AdminMediaDelete from "../pages/AdminMediaDelete.jsx";
import AdminUsersDashboard from "../pages/AdminUsersDashboard.jsx";
import AdminUserEdit from "../pages/AdminUserEdit.jsx";
import AdminLandingDashboard from "../pages/AdminLandingDashboard.jsx";
import AdminLandingCreate from "../pages/AdminLandingCreate.jsx";
import AdminLandingEdit from "../pages/AdminLandingEdit.jsx";
import AdminLandingDelete from "../pages/AdminLandingDelete.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/province/:slug" element={<ProvinceLandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/provinces/new" element={<AdminProvinceCreate />} />
      <Route path="/admin/provinces/:id/edit" element={<AdminProvinceEdit />} />
      <Route path="/admin/provinces/:id/delete" element={<AdminProvinceDelete />} />
      <Route path="/admin/posts" element={<AdminPostsDashboard />} />
      <Route path="/admin/posts/new" element={<AdminPostCreate />} />
      <Route path="/admin/posts/:id/edit" element={<AdminPostEdit />} />
      <Route path="/admin/posts/:id/delete" element={<AdminPostDelete />} />
      <Route path="/admin/media" element={<AdminMediaDashboard />} />
      <Route path="/admin/media/new" element={<AdminMediaCreate />} />
      <Route path="/admin/media/:id/edit" element={<AdminMediaEdit />} />
      <Route path="/admin/media/:id/delete" element={<AdminMediaDelete />} />
      <Route path="/admin/users" element={<AdminUsersDashboard />} />
      <Route path="/admin/users/:id/edit" element={<AdminUserEdit />} />
      <Route path="/admin/landing" element={<AdminLandingDashboard />} />
      <Route path="/admin/landing/new" element={<AdminLandingCreate />} />
      <Route path="/admin/landing/:id/edit" element={<AdminLandingEdit />} />
      <Route path="/admin/landing/:id/delete" element={<AdminLandingDelete />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}
