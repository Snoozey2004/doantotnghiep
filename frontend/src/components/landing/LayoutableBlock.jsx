import CanvasBlockPreview from "./CanvasBlockPreview.jsx";

export default function LayoutableBlock({
  block,
  isSelected,
  onSelect,
  province = {},
  isAutoPositioned = false
}) {
  const parseContent = (contentJson) => {
    try {
      return typeof contentJson === "string" ? JSON.parse(contentJson) : contentJson || {};
    } catch {
      return {};
    }
  };

  parseContent(block.contentJson);

  return (
    <div
      onClick={() => onSelect()}
      style={{
        width: "100%",
        marginBottom: 12,
        padding: 12,
        border: isSelected ? "3px solid #2563eb" : "2px solid #cbd5e1",
        borderRadius: 8,
        background: "white",
        boxShadow: isSelected
          ? "0 0 0 3px rgba(37, 99, 235, 0.1)"
          : "0 1px 3px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: !block.isEnabled ? 0.5 : 1,
        userSelect: "none",
        minHeight: 100,
        transition: "all 0.2s ease"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {block.blockType}
        </div>
        {isAutoPositioned && (
          <span style={{ fontSize: 9, background: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: 3, fontWeight: 600 }}>
            AUTO
          </span>
        )}
      </div>
      <div style={{ flex: 1, overflow: "hidden", minHeight: 60 }}>
        <CanvasBlockPreview block={block} province={province} />
      </div>
    </div>
  );
}
