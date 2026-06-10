import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import EditorLayout from "../layouts/EditorLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import { landingConfigApi } from "../api/landingConfigApi";
import localProvinces from "../data/provinceData";

const localColorMap = Object.fromEntries(
  localProvinces.map((p) => [p.slug, p.accentColor || "#b45309"])
);

const REGION_VI = {
  North: "Miền Bắc",
  Central: "Miền Trung",
  South: "Miền Nam",
};

const SECTIONS = [
  { key: "hero",          label: "Hero" },
  { key: "intro",         label: "Giới thiệu địa phương" },
  { key: "video",         label: "Video" },
  { key: "charts",        label: "Dữ liệu thống kê" },
  { key: "timeline",      label: "Timeline lịch sử" },
  { key: "culture",       label: "Di sản & Danh thắng" },
  { key: "specialties",   label: "Ẩm thực" },
  { key: "craftVillages", label: "Làng nghề" },
  { key: "festivals",     label: "Lễ hội" },
  { key: "gallery",       label: "Image Gallery" },
  { key: "info",          label: "Thông tin tổng quát" },
];

const DEFAULT_COLORS = {
  hero:          "#1c1917",
  intro:         "#faf8f3",
  video:         "#0f172a",
  charts:        "#f0f9ff",
  timeline:      "#fffbeb",
  culture:       "#f0fdf4",
  specialties:   "#fff7ed",
  craftVillages: "#f5f5f4",
  festivals:     "#fdf4ff",
  gallery:       "#111827",
  info:          "#fefce8",
};

const EMPTY_COLORS = Object.fromEntries(SECTIONS.map((s) => [s.key, "#ffffff"]));

export default function EditorDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [configs, setConfigs] = useState({});
  const [sectionColors, setSectionColors] = useState({});
  const [expanded, setExpanded] = useState({});
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const previewWindowRef = useRef({});

  useEffect(() => {
    provinceApi.getAll()
      .then(async (list) => {
        setProvinces(list);
        const results = await Promise.all(
          list.map((p) => landingConfigApi.getByProvinceId(p.id).catch(() => null))
        );
        const cfgMap = {};
        const colorsMap = {};
        list.forEach((p, i) => {
          const cfg = results[i];
          cfgMap[p.id] = cfg || null;
          colorsMap[p.id] = cfg?.sectionColors || {};
        });
        setConfigs(cfgMap);
        setSectionColors(colorsMap);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleColorChange = (provinceId, sectionKey, value) => {
    setSectionColors((prev) => ({
      ...prev,
      [provinceId]: { ...(prev[provinceId] || {}), [sectionKey]: value },
    }));
  };

  const applyDefaults = (provinceId) => {
    setSectionColors((prev) => ({
      ...prev,
      [provinceId]: { ...DEFAULT_COLORS },
    }));
  };

  const clearColors = (provinceId) => {
    setSectionColors((prev) => ({
      ...prev,
      [provinceId]: { ...EMPTY_COLORS },
    }));
  };

  const handleSave = useCallback(async (province) => {
    const colors = sectionColors[province.id] || {};
    setSaving((prev) => ({ ...prev, [province.id]: true }));
    try {
      const existing = configs[province.id];
      let updated;
      if (existing) {
        updated = await landingConfigApi.update(existing.id, {
          ...existing,
          sectionColors: colors,
        });
      } else {
        updated = await landingConfigApi.create({
          provinceId: province.id,
          themeColor: localColorMap[province.slug] || "#b45309",
          fontFamily: "",
          backgroundUrl: "",
          layout: "",
          sectionColors: colors,
        });
      }
      setConfigs((prev) => ({ ...prev, [province.id]: updated }));
      setSaved((prev) => ({ ...prev, [province.id]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [province.id]: false })), 2500);
      return true;
    } catch {
      return false;
    } finally {
      setSaving((prev) => ({ ...prev, [province.id]: false }));
    }
  }, [sectionColors, configs]);

  const handleSaveAndView = useCallback(async (province) => {
    const ok = await handleSave(province);
    if (ok !== false) {
      const url = `/province/${province.slug}`;
      const win = previewWindowRef.current[province.id];
      if (win && !win.closed) {
        win.location.href = url;
        win.focus();
      } else {
        previewWindowRef.current[province.id] = window.open(url, `preview_${province.id}`);
      }
    }
  }, [handleSave]);

  const toggleExpand = (provinceId) => {
    setExpanded((prev) => ({ ...prev, [provinceId]: !prev[provinceId] }));
  };

  const filtered = provinces.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = !regionFilter || p.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const regions = [...new Set(provinces.map((p) => p.region))].filter(Boolean);

  return (
    <EditorLayout>
      <div className="admin-header">
        <h1>🎨 Chỉnh màu Landing Page</h1>
        <p className="admin-desc">
          Tuỳ chỉnh màu nền (background color) cho 11 section của từng trang landing 34 tỉnh thành.
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Tìm tỉnh thành..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e0d8",
            fontSize: "0.9rem", minWidth: "200px", background: "#faf8f5"
          }}
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{
            padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e0d8",
            fontSize: "0.9rem", background: "#faf8f5", cursor: "pointer"
          }}
        >
          <option value="">Tất cả vùng</option>
          {regions.map((r) => (
            <option key={r} value={r}>{REGION_VI[r] || r}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ color: "#888" }}>Đang tải danh sách tỉnh thành...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((province) => {
            const isOpen = expanded[province.id] || false;
            const isSaving = saving[province.id];
            const isSaved = saved[province.id];
            const colors = sectionColors[province.id] || {};

            return (
              <div
                key={province.id}
                style={{
                  background: "#fff",
                  border: "1px solid #ede8e0",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => toggleExpand(province.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {SECTIONS.slice(0, 6).map((s) => (
                        <div
                          key={s.key}
                          title={s.label}
                          style={{
                            width: "14px", height: "14px", borderRadius: "3px",
                            background: colors[s.key] || "#e5e0d8",
                            border: "1px solid rgba(0,0,0,0.1)",
                            flexShrink: 0,
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a1a" }}>
                        {province.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#999", marginTop: "1px" }}>
                        {REGION_VI[province.region] || province.region}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Link
                      to={`/province/${province.slug}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: "0.78rem", color: "#b45309", textDecoration: "none" }}
                    >
                      Xem trang ↗
                    </Link>
                    <span style={{
                      fontSize: "0.8rem", color: "#888",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s", display: "inline-block"
                    }}>▼</span>
                  </div>
                </div>

                {/* Expanded section colors */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #f0ebe3", padding: "16px 20px" }}>

                    {/* Toolbar: default / clear */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                      <button
                        onClick={() => applyDefaults(province.id)}
                        style={{
                          padding: "6px 14px", borderRadius: "7px",
                          border: "1px solid #d97706", background: "#fffbeb",
                          color: "#b45309", fontSize: "0.8rem", fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        🎨 Đặt màu mặc định
                      </button>
                      <button
                        onClick={() => clearColors(province.id)}
                        style={{
                          padding: "6px 14px", borderRadius: "7px",
                          border: "1px solid #e5e0d8", background: "#faf8f5",
                          color: "#666", fontSize: "0.8rem", fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        ↺ Xóa màu
                      </button>
                    </div>

                    {/* Page mini-preview strip */}
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontSize: "0.75rem", color: "#999", marginBottom: "6px" }}>
                        Xem trước thứ tự màu trên trang:
                      </div>
                      <div style={{ display: "flex", borderRadius: "6px", overflow: "hidden", height: "28px", border: "1px solid #e5e0d8" }}>
                        {SECTIONS.map((s) => (
                          <div
                            key={s.key}
                            title={s.label}
                            style={{
                              flex: 1,
                              background: colors[s.key] || "#f0ebe3",
                              position: "relative",
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: "flex", marginTop: "3px" }}>
                        {SECTIONS.map((s) => (
                          <div
                            key={s.key}
                            style={{
                              flex: 1,
                              fontSize: "0.6rem",
                              color: "#aaa",
                              textAlign: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {s.label.split(" ")[0]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color pickers grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: "10px",
                      marginBottom: "16px",
                    }}>
                      {SECTIONS.map((section) => {
                        const color = colors[section.key] || "#ffffff";
                        return (
                          <div
                            key={section.key}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              background: "#faf8f5",
                              border: "1px solid #ede8e0",
                              borderRadius: "8px",
                              padding: "10px 12px",
                            }}
                          >
                            <div style={{
                              width: "4px", height: "40px", borderRadius: "2px",
                              background: color, flexShrink: 0,
                              border: "1px solid rgba(0,0,0,0.08)",
                            }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: "0.78rem", fontWeight: 600, color: "#555",
                                marginBottom: "6px", whiteSpace: "nowrap",
                                overflow: "hidden", textOverflow: "ellipsis"
                              }}>
                                {section.label}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                  type="color"
                                  value={color}
                                  onChange={(e) => handleColorChange(province.id, section.key, e.target.value)}
                                  style={{
                                    width: "32px", height: "32px", border: "none",
                                    borderRadius: "6px", cursor: "pointer",
                                    padding: "1px", background: "none", flexShrink: 0,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={color}
                                  onChange={(e) => handleColorChange(province.id, section.key, e.target.value)}
                                  style={{
                                    flex: 1, padding: "5px 8px", borderRadius: "6px",
                                    border: "1px solid #e5e0d8", fontSize: "0.8rem",
                                    fontFamily: "monospace", background: "#fff",
                                    minWidth: 0,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleSave(province)}
                        disabled={isSaving}
                        style={{
                          flex: 1, padding: "10px 0",
                          borderRadius: "8px", border: "none",
                          cursor: isSaving ? "not-allowed" : "pointer",
                          fontWeight: 600, fontSize: "0.9rem",
                          background: isSaved ? "#16a34a" : "#b45309",
                          color: "#fff",
                          opacity: isSaving ? 0.7 : 1,
                          transition: "background 0.3s",
                        }}
                      >
                        {isSaving ? "Đang lưu..." : isSaved ? "✓ Đã lưu" : "Lưu màu"}
                      </button>
                      <button
                        onClick={() => handleSaveAndView(province)}
                        disabled={isSaving}
                        style={{
                          flex: 1, padding: "10px 0",
                          borderRadius: "8px",
                          border: "2px solid #b45309",
                          cursor: isSaving ? "not-allowed" : "pointer",
                          fontWeight: 600, fontSize: "0.9rem",
                          background: "#fff",
                          color: "#b45309",
                          opacity: isSaving ? 0.7 : 1,
                          transition: "all 0.2s",
                        }}
                      >
                        💾 Lưu & Xem trang
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </EditorLayout>
  );
}
