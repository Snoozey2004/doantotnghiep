import EditorLayout from "../layouts/EditorLayout.jsx";
import LandingDesignManager from "../components/landing/LandingDesignManager.jsx";

// Công cụ thiết kế landing dùng chung (LandingDesignManager) — bọc trong EditorLayout.
// Cùng component với /admin/landing để tránh trùng lặp code, luôn đồng bộ.
export default function EditorDashboard() {
  return (
    <EditorLayout>
      <LandingDesignManager />
    </EditorLayout>
  );
}
