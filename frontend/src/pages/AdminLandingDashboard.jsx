import AdminLayout from "../layouts/AdminLayout.jsx";
import LandingDesignManager from "../components/landing/LandingDesignManager.jsx";

// /admin/landing — công cụ THIẾT KẾ landing y chang editor (dùng chung LandingDesignManager).
export default function AdminLandingDashboard() {
  return (
    <AdminLayout>
      <LandingDesignManager />
    </AdminLayout>
  );
}
