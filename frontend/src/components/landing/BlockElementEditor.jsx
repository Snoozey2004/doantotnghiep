import { useState } from "react";

export default function BlockElementEditor({ block, onPropertyChange, province = {} }) {
  const [selectedField, setSelectedField] = useState(null);

  const parseContent = (contentJson) => {
    try {
      return typeof contentJson === "string" ? JSON.parse(contentJson) : contentJson || {};
    } catch {
      return {};
    }
  };

  const content = parseContent(block.contentJson);

  // Get editable fields from content
  const getEditableFields = () => {
    const fields = [];

    if (content.title) {
      fields.push({
        id: "title",
        label: "Title",
        type: "text",
        value: content.title
      });
    }

    if (content.subtitle) {
      fields.push({
        id: "subtitle",
        label: "Subtitle",
        type: "text",
        value: content.subtitle
      });
    }

    if (content.description) {
      fields.push({
        id: "description",
        label: "Description",
        type: "text",
        value: content.description
      });
    }

    if (content.imageUrl) {
      fields.push({
        id: "imageUrl",
        label: "Image URL",
        type: "url",
        value: content.imageUrl
      });
    }

    if (content.html) {
      fields.push({
        id: "html",
        label: "HTML Content",
        type: "html",
        value: content.html
      });
    }

    if (Array.isArray(content.items)) {
      fields.push({
        id: "items",
        label: "Items List",
        type: "list",
        value: content.items
      });
    }

    if (Array.isArray(content.images)) {
      fields.push({
        id: "images",
        label: "Images Gallery",
        type: "gallery",
        value: content.images
      });
    }

    return fields;
  };

  const fields = getEditableFields();

  const handleFieldChange = (fieldId, newValue) => {
    const updatedContent = { ...content };
    updatedContent[fieldId] = newValue;
    onPropertyChange("contentElements", updatedContent);
  };

  const handleListItemChange = (index, newValue) => {
    const updatedItems = [...(content.items || [])];
    updatedItems[index] = newValue;
    handleFieldChange("items", updatedItems);
  };

  const handleGalleryImageChange = (index, newValue) => {
    const updatedImages = [...(content.images || [])];
    updatedImages[index] = newValue;
    handleFieldChange("images", updatedImages);
  };

  if (fields.length === 0) {
    return (
      <div style={{ padding: 12, color: "#94a3b8", fontSize: 12, textAlign: "center" }}>
        No editable fields in this block
      </div>
    );
  }

  return (
    <div style={{ borderTop: "1px solid #e2e8f0" }}>
      <div style={{ padding: 12, background: "#f0f9ff", borderBottom: "1px solid #bfdbfe" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#0c4a6e", marginBottom: 4 }}>
          ✏️ Edit Block Content
        </div>
        <div style={{ fontSize: 10, color: "#0369a1" }}>
          Modify block content directly • Changes auto-save
        </div>
      </div>

      <div style={{ padding: 12 }}>
        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 4, color: "#475569" }}>
              {field.label}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "inherit"
                }}
              />
            )}

            {field.type === "url" && (
              <input
                type="url"
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder="https://..."
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "inherit"
                }}
              />
            )}

            {field.type === "html" && (
              <textarea
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "monospace"
                }}
              />
            )}

            {field.type === "list" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {field.value.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleListItemChange(idx, e.target.value)}
                      style={{
                        flex: 1,
                        padding: "6px 8px",
                        border: "1px solid #cbd5e1",
                        borderRadius: 4,
                        fontSize: 12,
                        fontFamily: "inherit"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedItems = field.value.filter((_, i) => i !== idx);
                        handleFieldChange("items", updatedItems);
                      }}
                      style={{
                        padding: "4px 8px",
                        background: "#fee2e2",
                        border: "1px solid #fecaca",
                        borderRadius: 4,
                        color: "#991b1b",
                        cursor: "pointer",
                        fontSize: 11
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleFieldChange("items", [...field.value, ""])}
                  style={{
                    padding: "6px 8px",
                    background: "#dbeafe",
                    border: "1px solid #bfdbfe",
                    borderRadius: 4,
                    color: "#0369a1",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600
                  }}
                >
                  + Add Item
                </button>
              </div>
            )}

            {field.type === "gallery" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {field.value.map((img, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleGalleryImageChange(idx, e.target.value)}
                      placeholder="Image URL"
                      style={{
                        flex: 1,
                        padding: "6px 8px",
                        border: "1px solid #cbd5e1",
                        borderRadius: 4,
                        fontSize: 12,
                        fontFamily: "inherit"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedImages = field.value.filter((_, i) => i !== idx);
                        handleFieldChange("images", updatedImages);
                      }}
                      style={{
                        padding: "4px 8px",
                        background: "#fee2e2",
                        border: "1px solid #fecaca",
                        borderRadius: 4,
                        color: "#991b1b",
                        cursor: "pointer",
                        fontSize: 11
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleFieldChange("images", [...field.value, ""])}
                  style={{
                    padding: "6px 8px",
                    background: "#dbeafe",
                    border: "1px solid #bfdbfe",
                    borderRadius: 4,
                    color: "#0369a1",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600
                  }}
                >
                  + Add Image
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          padding: 10,
          background: "#f0fdf4",
          borderTop: "1px solid #dcfce7",
          fontSize: 10,
          color: "#166534"
        }}
      >
        ✓ Block content updates automatically as you edit
      </div>
    </div>
  );
}
