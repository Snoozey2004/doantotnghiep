import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const imagesDir = fileURLToPath(new URL("./Images", import.meta.url));

/**
 * Dữ liệu (provinceData, infoImageMap, HomePage…) tham chiếu ảnh runtime theo
 * dạng "/Images/...". Nhưng publicDir: "Images" lại copy *nội dung* thư mục ra
 * gốc dist/ → mất tiền tố "/Images" → ở bản build các ảnh đó 404 (rơi vào SPA
 * fallback index.html). Dev không lỗi vì Vite phục vụ file từ thư mục gốc.
 *
 * Plugin này (chỉ chạy khi build) copy lại Images → dist/Images để mọi đường dẫn
 * "/Images/..." hoạt động đúng ở bản build, không cần đổi bất kỳ data/import nào.
 * Bỏ qua thư mục video (đã được tham chiếu không kèm tiền tố) để dist gọn hơn.
 */
function copyImagesWithPrefix() {
  return {
    name: "vx-copy-images-prefixed",
    apply: "build",
    closeBundle() {
      if (!existsSync(imagesDir)) return;
      const dest = fileURLToPath(new URL("./dist/Images", import.meta.url));
      cpSync(imagesDir, dest, {
        recursive: true,
        filter: (src) => !src.includes("Landingpagevideo"),
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyImagesWithPrefix()],
  publicDir: "Images",
  server: {
    port: 5173
  }
});
