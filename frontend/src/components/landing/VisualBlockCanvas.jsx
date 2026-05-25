import { useState } from "react";
import LayoutableBlock from "./LayoutableBlock.jsx";
import BlockPropertiesPanel from "./BlockPropertiesPanel.jsx";

export default function VisualBlockCanvas({ blocks, configForm, onBlockUpdate, province = {}, onImageUpload }) {
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  const handleBlockSelect = (blockId) => {
    setSelectedBlockId(blockId);
  };

  const handlePropertyChange = (blockId, propertyName, value) => {
    onBlockUpdate(blockId, propertyName, value);
  };

  const handleCanvasImageUpload = async (file) => {
    if (onImageUpload && selectedBlock) {
      await onImageUpload(file, selectedBlock.id);
    }
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {/* Canvas Area */}
      <div
        style={{
          flex: 1,
          border: "2px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#f8fafc",
          overflow: "auto",
          maxHeight: "800px"
        }}
      >
        <div style={{ width: "100%" }}>
          {blocks.length > 0 ? (
            blocks.map((block) => (
              <LayoutableBlock
                key={block.id}
                block={block}
                isSelected={selectedBlockId === block.id}
                onSelect={() => handleBlockSelect(block.id)}
                province={province}
                isAutoPositioned={true}
              />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
                color: "#94a3b8",
                fontSize: 14
              }}
            >
              Không có block nào. Vui lòng thêm block để bắt đầu chỉnh sửa.
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      <div style={{ width: 320 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 8, padding: 12, background: "#f0f9ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
            💡 Blocks auto-arrange vertically by display order. Reorder them in List View to change layout.
          </div>
        </div>

        {selectedBlock ? (
          <BlockPropertiesPanel
            block={selectedBlock}
            onPropertyChange={(propName, value) =>
              handlePropertyChange(selectedBlock.id, propName, value)
            }
            onImageUpload={handleCanvasImageUpload}
          />
        ) : (
          <div
            style={{
              padding: 16,
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              background: "#f8fafc",
              textAlign: "center",
              color: "#94a3b8",
              fontSize: 12
            }}
          >
            Chọn một block trên canvas để chỉnh sửa thuộc tính
          </div>
        )}
      </div>
    </div>
  );
}
