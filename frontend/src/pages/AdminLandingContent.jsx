import AdminLayout from "../layouts/AdminLayout.jsx";
import LandingContentManager from "../components/landing/LandingContentManager.jsx";

// /admin/landing/content — công cụ SỬA NỘI DUNG landing y chang editor (dùng chung).
export default function AdminLandingContent() {
  return (
    <AdminLayout>
      <LandingContentManager />
    </AdminLayout>
  );
}
