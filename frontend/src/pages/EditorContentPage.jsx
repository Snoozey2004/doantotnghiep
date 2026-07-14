import EditorLayout from "../layouts/EditorLayout.jsx";
import LandingContentManager from "../components/landing/LandingContentManager.jsx";

// Công cụ sửa nội dung landing dùng chung (LandingContentManager) — bọc trong EditorLayout.
export default function EditorContentPage() {
  return (
    <EditorLayout>
      <LandingContentManager />
    </EditorLayout>
  );
}
