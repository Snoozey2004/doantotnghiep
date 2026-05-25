import { useState } from "react";
import BlockElementEditor from "./BlockElementEditor.jsx";

export default function BlockPropertiesPanel({ block, onPropertyChange, onImageUpload }) {
  const [expandedSections, setExpandedSections] = useState({
    layout: true,
    content: true,
    elements: false,
    settings: false
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const parseContent = (contentJson) => {
    try {
      return typeof contentJson === "string" ? JSON.parse(contentJson) : contentJson || {};
    } catch {
      return {};
    }
  };

  const content = parseContent(block.contentJson);
  const layout = content.layout || {};

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (key, value) => {
    onPropertyChange(key, value);
  };

  const handleImageUploadInternal = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) {
      return;
    }
    await onImageUpload(file);
    event.target.value = "";
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        background: "white",
        overflow: "hidden"
      }}
    >
      {/* Layout Section */}
      <div style={{ borderBottom: "1px solid #e2e8f0" }}>
        <button
          onClick={() => toggleSection("layout")}
          style={{
            width: "100%",
            padding: 12,
            background: "#f8fafc",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#0f172a"
          }}
        >
          <span>Layout</span>
          <span>{expandedSections.layout ? "▼" : "▶"}</span>
        </button>
        {expandedSections.layout && (
          <div style={{ padding: 12, borderTop: "1px solid #e2e8f0" }}>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                X Position (px)
              </label>
              <input
                type="number"
                value={layout.x || 0}
                onChange={(e) => handleInputChange("layoutX", Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                Y Position (px)
              </label>
              <input
                type="number"
                value={layout.y || 0}
                onChange={(e) => handleInputChange("layoutY", Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                Width
              </label>
              <input
                type="text"
                value={layout.width || "100%"}
                onChange={(e) => handleInputChange("layoutWidth", e.target.value)}
                placeholder="e.g., 100%, 300px"
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                Height
              </label>
              <input
                type="text"
                value={layout.height || "auto"}
                onChange={(e) => handleInputChange("layoutHeight", e.target.value)}
                placeholder="e.g., auto, 200px"
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                Z-Index
              </label>
              <input
                type="number"
                value={layout.zIndex || 1}
                onChange={(e) => handleInputChange("layoutZIndex", Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{ borderBottom: "1px solid #e2e8f0" }}>
        <button
          onClick={() => toggleSection("content")}
          style={{
            width: "100%",
            padding: 12,
            background: "#f8fafc",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#0f172a"
          }}
        >
          <span>Content</span>
          <span>{expandedSections.content ? "▼" : "▶"}</span>
        </button>
        {expandedSections.content && (
          <div style={{ padding: 12, borderTop: "1px solid #e2e8f0" }}>
            {content.title !== undefined && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  Title
                </label>
                <input
                  type="text"
                  value={content.title || ""}
                  onChange={(e) => handleInputChange("contentTitle", e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12
                  }}
                />
              </div>
            )}
            {content.subtitle !== undefined && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  Subtitle
                </label>
                <input
                  type="text"
                  value={content.subtitle || ""}
                  onChange={(e) => handleInputChange("contentSubtitle", e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12
                  }}
                />
              </div>
            )}
            {content.description !== undefined && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  Description
                </label>
                <textarea
                  value={content.description || ""}
                  onChange={(e) => handleInputChange("contentDescription", e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12,
                    minHeight: 60,
                    fontFamily: "inherit"
                  }}
                />
              </div>
            )}
            {content.html !== undefined && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  HTML Content
                </label>
                <textarea
                  value={content.html || ""}
                  onChange={(e) => handleInputChange("contentHtml", e.target.value)}
                  placeholder="<p>Enter HTML content</p>"
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12,
                    minHeight: 80,
                    fontFamily: "monospace"
                  }}
                />
              </div>
            )}
            {content.imageUrl !== undefined && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={content.imageUrl || ""}
                  onChange={(e) => handleInputChange("contentImageUrl", e.target.value)}
                  placeholder="https://..."
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12
                  }}
                />
                {content.imageUrl && (
                  <img
                    src={content.imageUrl}
                    alt="Preview"
                    style={{ width: "100%", marginTop: 8, maxHeight: 120, objectFit: "cover", borderRadius: 4 }}
                  />
                )}
              </div>
            )}
            {Array.isArray(content.images) && content.images.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  Images ({content.images.length})
                </label>
                <div style={{ marginBottom: 8 }}>
                  <img
                    src={content.images[selectedImageIndex]}
                    alt={`Image ${selectedImageIndex + 1}`}
                    style={{ width: "100%", maxHeight: 120, objectFit: "cover", borderRadius: 4 }}
                  />
                </div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                    disabled={selectedImageIndex === 0}
                    style={{
                      flex: 1,
                      padding: 6,
                      fontSize: 11,
                      border: "1px solid #cbd5e1",
                      borderRadius: 4,
                      background: "#f8fafc",
                      cursor: selectedImageIndex === 0 ? "not-allowed" : "pointer",
                      opacity: selectedImageIndex === 0 ? 0.5 : 1
                    }}
                  >
                    Prev
                  </button>
                  <span style={{ fontSize: 11, padding: "6px 8px", color: "#64748b" }}>
                    {selectedImageIndex + 1}/{content.images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(Math.min(content.images.length - 1, selectedImageIndex + 1))}
                    disabled={selectedImageIndex === content.images.length - 1}
                    style={{
                      flex: 1,
                      padding: 6,
                      fontSize: 11,
                      border: "1px solid #cbd5e1",
                      borderRadius: 4,
                      background: "#f8fafc",
                      cursor: selectedImageIndex === content.images.length - 1 ? "not-allowed" : "pointer",
                      opacity: selectedImageIndex === content.images.length - 1 ? 0.5 : 1
                    }}
                  >
                    Next
                  </button>
                </div>
                <input
                  type="text"
                  value={content.images[selectedImageIndex] || ""}
                  onChange={(e) => {
                    const newImages = [...content.images];
                    newImages[selectedImageIndex] = e.target.value;
                    handleInputChange("contentImages", newImages);
                  }}
                  placeholder="https://..."
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12
                  }}
                />
              </div>
            )}
            {content.items !== undefined && Array.isArray(content.items) && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                  Items (comma-separated)
                </label>
                <textarea
                  value={Array.isArray(content.items) ? content.items.join(", ") : ""}
                  onChange={(e) => {
                    const items = e.target.value.split(",").map(item => item.trim()).filter(Boolean);
                    handleInputChange("contentItems", items);
                  }}
                  style={{
                    width: "100%",
                    padding: 6,
                    border: "1px solid #cbd5e1",
                    borderRadius: 4,
                    fontSize: 12,
                    minHeight: 60,
                    fontFamily: "inherit"
                  }}
                />
              </div>
            )}
            {onImageUpload && (content.imageUrl !== undefined || Array.isArray(content.images)) && (
              <label
                style={{
                  display: "block",
                  padding: 8,
                  border: "1px dashed #cbd5e1",
                  borderRadius: 4,
                  textAlign: "center",
                  fontSize: 11,
                  color: "#64748b",
                  cursor: "pointer",
                  background: "#f8fafc",
                  marginTop: 8
                }}
              >
                + Upload Image
                <input type="file" accept="image/*" onChange={handleImageUploadInternal} style={{ display: "none" }} />
              </label>
            )}
            {!content.title && !content.subtitle && !content.description && !content.html && !content.imageUrl && !Array.isArray(content.images) && !Array.isArray(content.items) && (
              <div style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "8px 0" }}>
                No editable content fields
              </div>
            )}
          </div>
        )}
      </div>

      {/* Elements Section */}
      <div style={{ borderBottom: "1px solid #e2e8f0" }}>
        <button
          onClick={() => toggleSection("elements")}
          style={{
            width: "100%",
            padding: 12,
            background: "#f8fafc",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#0f172a"
          }}
        >
          <span>🎯 Element Positioning</span>
          <span>{expandedSections.elements ? "▼" : "▶"}</span>
        </button>
        {expandedSections.elements && (
          <BlockElementEditor
            block={block}
            onPropertyChange={handleInputChange}
          />
        )}
      </div>

      {/* Settings Section */}
      <div>
        <button
          onClick={() => toggleSection("settings")}
          style={{
            width: "100%",
            padding: 12,
            background: "#f8fafc",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#0f172a"
          }}
        >
          <span>Settings</span>
          <span>{expandedSections.settings ? "▼" : "▶"}</span>
        </button>
        {expandedSections.settings && (
          <div style={{ padding: 12, borderTop: "1px solid #e2e8f0" }}>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                Block Type
              </label>
              <input
                type="text"
                value={block.blockType || ""}
                disabled
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12,
                  background: "#f1f5f9",
                  cursor: "not-allowed"
                }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                Sort Order
              </label>
              <input
                type="number"
                value={block.sortOrder || 1}
                onChange={(e) => handleInputChange("sortOrder", Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12
                }}
              />
            </div>
            <div>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={block.isEnabled !== false}
                  onChange={(e) => handleInputChange("isEnabled", e.target.checked)}
                />
                <span style={{ fontSize: 11, color: "#64748b" }}>Enabled</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
