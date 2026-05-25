import { useRef, useState } from "react";
import { richContentApi } from "../api/richContentApi";
import "../styles/richTextEditor.css";

export default function RichTextEditor({ value, onChange, maxLength = 50000, placeholder = "Nhập nội dung..." }) {
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(value ? value.replace(/<[^>]*>/g, "").length : 0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;
    onChange(html);

    // Count actual text characters (excluding HTML tags)
    const textOnly = html.replace(/<[^>]*>/g, "");
    setCharCount(textOnly.length);
  };

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt("Nhập URL:");
    if (url) {
      applyFormat("createLink", url);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await richContentApi.uploadImage(file, "rich-content");
      const imageHtml = `<img src="${result.url}" alt="Rich content image" style="max-width: 100%; height: auto; margin: 10px 0;">`;

      document.execCommand("insertHTML", false, imageHtml);
      editorRef.current?.focus();
    } catch (err) {
      alert("Lỗi khi tải hình ảnh: " + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const isAtLimit = charCount >= maxLength;

  return (
    <div className="rich-text-editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat("bold")}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat("italic")}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat("underline")}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat("insertUnorderedList")}
            title="Bullet list"
          >
            • List
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat("insertOrderedList")}
            title="Numbered list"
          >
            1. List
          </button>
        </div>

        <div className="toolbar-group">
          <select
            onChange={(e) => {
              if (e.target.value) {
                applyFormat("formatBlock", `<${e.target.value}>`);
              }
              e.target.value = "";
            }}
            className="toolbar-select"
            title="Heading"
          >
            <option value="">Heading</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="p">Paragraph</option>
          </select>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={insertLink}
            title="Insert link"
          >
            🔗 Link
          </button>
          <label className="toolbar-btn" style={{ cursor: "pointer", margin: 0 }}>
            🖼️ Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat("removeFormat")}
            title="Clear formatting"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className={`editor-content ${isAtLimit ? "at-limit" : ""}`}
        onInput={handleInput}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
      />

      <div className="editor-footer">
        <span className={`char-count ${isAtLimit ? "at-limit" : ""}`}>
          {charCount} / {maxLength} ký tự
        </span>
        {isUploading && <span className="uploading-indicator">Đang tải...</span>}
      </div>
    </div>
  );
}
