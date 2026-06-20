import { Routes, Route } from "react-router-dom";

import ProductInfographicPage from "../pages/ProductInfographicPage.jsx";
import ProvinceProductsPage from "../pages/ProvinceProductsPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProvinceLandingPage from "../pages/ProvinceLandingPage.jsx";
import PostDetailPage from "../pages/PostDetailPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
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
import AdminFeaturedContent from "../pages/AdminFeaturedContent.jsx";
import AdminContentStatistics from "../pages/AdminContentStatistics.jsx";
import EditorDashboard from "../pages/EditorDashboard.jsx";
import EditorAnalytics from "../pages/EditorAnalytics.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import RequireAuth from "./RequireAuth.jsx";

import TestInfographicForm from "../infographic/editor/TestInfographicForm.jsx";
import TestEditorPage from "../infographic/editor/TestEditorPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/province/:slug" element={<ProvinceLandingPage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={<AccountPage />} />

      <Route
        path="/province/:slug/dac-san"
        element={<ProvinceProductsPage />}
      />
      <Route
        path="/province/:provinceSlug/dac-san/:productSlug"
        element={<ProductInfographicPage />}
      />
      <Route path="/test-infographic" element={<TestInfographicForm />} />
      <Route path="/test-editor" element={<TestEditorPage />} />

      {/* Editor routes - Editor (1) only */}
      <Route
        path="/editor"
        element={
          <ProtectedRoute requiredRoles={[1]}>
            <EditorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor/analytics"
        element={
          <ProtectedRoute requiredRoles={[1]}>
            <EditorAnalytics />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes - Admin (0) and Editor (1) only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/provinces/new"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminProvinceCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/provinces/:id/edit"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminProvinceEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/provinces/:id/delete"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminProvinceDelete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/posts"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminPostsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/posts/new"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminPostCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/posts/:id/edit"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminPostEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/posts/:id/delete"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminPostDelete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/media"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminMediaDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/media/new"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminMediaCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/media/:id/edit"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminMediaEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/media/:id/delete"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminMediaDelete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requiredRoles={[0]}>
            <AdminUsersDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/:id/edit"
        element={
          <ProtectedRoute requiredRoles={[0]}>
            <AdminUserEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/landing"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminLandingDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/landing/new"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminLandingCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/landing/:id/edit"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminLandingEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/landing/:id/delete"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminLandingDelete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/featured"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminFeaturedContent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/statistics"
        element={
          <ProtectedRoute requiredRoles={[0, 1]}>
            <AdminContentStatistics />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
