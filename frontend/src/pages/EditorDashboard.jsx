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

// Màu nền THẬT mà landingpage đang render cho từng section (khớp global.css +
// override Phase 5b). Dùng làm preset "Màu mặc định" và fallback hiển thị — để
// ô màu trong editor phản ánh đúng màu thật của trang khi tỉnh chưa tùy chỉnh.
const DEFAULT_COLORS = {
  hero:          "#1c1917", // hero nền ảnh + phủ mực tối
  intro:         "#f4f0e8", // nhịp xen kẽ kem (--paper)
  video:         "#ffffff", // trắng
  charts:        "#f4f0e8", // kem
  timeline:      "#ffffff", // trắng
  culture:       "#f4f0e8", // kem (.province-heritage-section)
  specialties:   "#ffffff", // trắng
  craftVillages: "#f4f0e8", // kem
  festivals:     "#ffffff", // trắng
  gallery:       "#f4f0e8", // kem
  info:          "#ffffff", // trắng
};

const FONTS = [
  { value: "'Inter', sans-serif",          label: "Inter",             desc: "Hiện đại & sắc nét",    category: "sans" },
  { value: "'Poppins', sans-serif",        label: "Poppins",           desc: "Tròn trịa & trẻ trung", category: "sans" },
  { value: "'DM Sans', sans-serif",        label: "DM Sans",           desc: "Tối giản hiện đại",     category: "sans" },
  { value: "'Nunito', sans-serif",         label: "Nunito",            desc: "Thân thiện & dễ đọc",   category: "sans" },
  { value: "'Open Sans', sans-serif",      label: "Open Sans",         desc: "Phổ biến & dễ đọc",     category: "sans" },
  { value: "'Quicksand', sans-serif",      label: "Quicksand",         desc: "Nhẹ nhàng & tươi trẻ",  category: "sans" },
  { value: "'Roboto', sans-serif",         label: "Roboto",            desc: "Phổ thông",             category: "sans" },
  { value: "'Montserrat', sans-serif",     label: "Montserrat",        desc: "Thanh lịch & sang",     category: "display" },
  { value: "'Raleway', sans-serif",        label: "Raleway",           desc: "Tinh tế & cao cấp",     category: "display" },
  { value: "'Josefin Sans', sans-serif",   label: "Josefin Sans",      desc: "Hình học & nghệ thuật", category: "display" },
  { value: "'Outfit', sans-serif",         label: "Outfit",            desc: "Hiện đại & năng động",  category: "display" },
  { value: "'Oswald', sans-serif",         label: "Oswald",            desc: "Đậm nét & mạnh mẽ",     category: "display" },
  { value: "'Lora', serif",               label: "Lora",              desc: "Cổ điển & ấm áp",       category: "serif" },
  { value: "'Playfair Display', serif",    label: "Playfair Display",  desc: "Sang trọng & biên tập", category: "serif" },
  { value: "'Merriweather', serif",        label: "Merriweather",      desc: "Dễ đọc & chuyên nghiệp",category: "serif" },
  { value: "'Crimson Text', serif",        label: "Crimson Text",      desc: "Văn học & tinh tế",     category: "serif" },
  { value: "'Cormorant Garamond', serif",  label: "Cormorant Garamond",desc: "Xuất bản & cao cấp",    category: "serif" },
  { value: "'Be Vietnam Pro', sans-serif", label: "Be Vietnam Pro",    desc: "Tối ưu tiếng Việt",     category: "viet" },
];

const FONT_GROUPS = [
  { key: "sans",    label: "Sans-serif Hiện đại",  color: "#6366f1", bg: "#eef2ff" },
  { key: "display", label: "Display & Thanh lịch", color: "#0891b2", bg: "#e0f2fe" },
  { key: "serif",   label: "Serif Cổ điển",        color: "#b45309", bg: "#fef3c7" },
  { key: "viet",    label: "Tối ưu Tiếng Việt",    color: "#16a34a", bg: "#dcfce7" },
];

function FontPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const current = FONTS.find((f) => f.value === value) || null;

  return (
    <div ref={containerRef} style={{ position: "relative", marginBottom: "10px" }}>
      {/* Trigger */}
      <div
        onClick={() => setIsOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 13px", borderRadius: "10px", cursor: "pointer",
          border: `1.5px solid ${isOpen ? "#6366f1" : "#e5e0d8"}`,
          background: isOpen ? "#fafafe" : "#faf8f5",
          boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
          transition: "all 0.15s",
        }}
      >
        {current ? (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: current.value, fontSize: "1rem", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.2 }}>
              {current.label}
            </div>
            <div style={{ fontSize: "0.64rem", color: "#6366f1", marginTop: "2px" }}>{current.desc}</div>
          </div>
        ) : (
          <div style={{ flex: 1, fontSize: "0.87rem", color: "#9ca3af", fontWeight: 500 }}>Mặc định hệ thống</div>
        )}
        <span style={{
          fontSize: "0.7rem", color: "#94a3b8", flexShrink: 0,
          transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s",
        }}>▾</span>
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 300,
          background: "#fff", border: "1.5px solid #e8e2d9", borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)", overflow: "hidden",
          maxHeight: "320px", overflowY: "auto",
        }}>
          {/* Default */}
          <div
            onClick={() => { onChange(""); setIsOpen(false); }}
            style={{
              padding: "10px 14px", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "space-between",
              background: !value ? "#f5f3ff" : "#fff", borderBottom: "1px solid #f0ebe3",
            }}
            onMouseEnter={(e) => { if (value) e.currentTarget.style.background = "#faf8f5"; }}
            onMouseLeave={(e) => { if (value) e.currentTarget.style.background = "#fff"; }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Mặc định hệ thống</span>
            {!value && <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#fff", fontWeight: 700 }}>✓</span>}
          </div>

          {FONT_GROUPS.map((group) => (
            <div key={group.key}>
              <div style={{
                padding: "6px 14px 5px", fontSize: "0.58rem", fontWeight: 800,
                color: group.color, background: group.bg,
                textTransform: "uppercase", letterSpacing: "0.12em",
                borderBottom: `1px solid ${group.color}22`,
              }}>
                {group.label}
              </div>
              {FONTS.filter((f) => f.category === group.key).map((font) => {
                const sel = value === font.value;
                return (
                  <div
                    key={font.value}
                    onClick={() => { onChange(font.value); setIsOpen(false); }}
                    style={{
                      padding: "9px 14px", cursor: "pointer",
                      background: sel ? "#f5f3ff" : "#fff",
                      borderBottom: "1px solid #f9f9f9",
                      display: "flex", alignItems: "center", gap: "10px",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "#faf8f5"; }}
                    onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = sel ? "#f5f3ff" : "#fff"; }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: font.value, fontSize: "1rem", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.25 }}>
                        {font.label}
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "#b0a99e", marginTop: "1px" }}>{font.desc}</div>
                    </div>
                    <div style={{ fontFamily: font.value, fontSize: "0.75rem", color: sel ? "#6366f1" : "#d0c8c0", fontStyle: "italic", flexShrink: 0 }}>
                      Khám phá
                    </div>
                    {sel && (
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 700 }}>✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditorDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [configs, setConfigs] = useState({});
  const [sectionColors, setSectionColors] = useState({});
  const [configSettings, setConfigSettings] = useState({});
  const [sectionOrders, setSectionOrders] = useState({});
  const [sectionVisibility, setSectionVisibility] = useState({});
  const [expanded, setExpanded] = useState({});
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});
  const [saveError, setSaveError] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    provinceApi.getAll()
      .then(async (list) => {
        setProvinces(list);
        const results = await Promise.all(
          list.map((p) => landingConfigApi.getByProvinceId(p.id).catch(() => null))
        );
        const cfgMap = {};
        const colorsMap = {};
        const settingsMap = {};
        const ordersMap = {};
        const visibilityMap = {};
        list.forEach((p, i) => {
          const cfg = results[i];
          cfgMap[p.id] = cfg || null;
          colorsMap[p.id] = cfg?.sectionColors || {};
          settingsMap[p.id] = {
            themeColor: cfg?.themeColor || localColorMap[p.slug] || "#b45309",
            fontFamily: cfg?.fontFamily || "",
            backgroundUrl: cfg?.backgroundUrl || "",
            layout: cfg?.layout || "default",
          };
          ordersMap[p.id] = cfg?.sectionOrder?.length > 0
            ? cfg.sectionOrder
            : SECTIONS.map((s) => s.key);
          const vis = cfg?.sectionVisibility || {};
          visibilityMap[p.id] = Object.fromEntries(
            SECTIONS.map((s) => [s.key, vis[s.key] !== false])
          );
        });
        setConfigs(cfgMap);
        setSectionColors(colorsMap);
        setConfigSettings(settingsMap);
        setSectionOrders(ordersMap);
        setSectionVisibility(visibilityMap);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSettingChange = (provinceId, field, value) => {
    setConfigSettings((prev) => ({
      ...prev,
      [provinceId]: { ...(prev[provinceId] || {}), [field]: value },
    }));
  };

  const handleMoveSection = (provinceId, fromIdx, dir) => {
    setSectionOrders((prev) => {
      const arr = [...(prev[provinceId] || SECTIONS.map((s) => s.key))];
      const toIdx = fromIdx + dir;
      if (toIdx < 0 || toIdx >= arr.length) return prev;
      [arr[fromIdx], arr[toIdx]] = [arr[toIdx], arr[fromIdx]];
      return { ...prev, [provinceId]: arr };
    });
  };

  const dragRef = useRef({});
  const [draggingKey, setDraggingKey] = useState(null);

  const handleDragStart = (provinceId, idx, key) => {
    dragRef.current = { provinceId, idx };
    setDraggingKey(key);
  };

  const handleDragOver = (e, provinceId, idx) => {
    e.preventDefault();
    const from = dragRef.current;
    if (!from || from.provinceId !== provinceId || from.idx === idx) return;
    setSectionOrders((prev) => {
      const arr = [...(prev[provinceId] || SECTIONS.map((s) => s.key))];
      const item = arr.splice(from.idx, 1)[0];
      arr.splice(idx, 0, item);
      dragRef.current = { provinceId, idx };
      return { ...prev, [provinceId]: arr };
    });
  };

  const handleDragEnd = () => {
    dragRef.current = {};
    setDraggingKey(null);
  };

  const handleToggleVisibility = (provinceId, sectionKey) => {
    setSectionVisibility((prev) => {
      const cur = prev[provinceId] || {};
      return { ...prev, [provinceId]: { ...cur, [sectionKey]: !cur[sectionKey] } };
    });
  };

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
    // Xóa override → trang dùng lại màu mặc định thật (CSS). Ô màu sẽ hiển thị
    // màu thật qua fallback DEFAULT_COLORS bên dưới.
    setSectionColors((prev) => ({
      ...prev,
      [provinceId]: {},
    }));
  };

  const handleSave = useCallback(async (province) => {
    const colors = sectionColors[province.id] || {};
    const settings = configSettings[province.id] || {};
    const order = sectionOrders[province.id] || SECTIONS.map((s) => s.key);
    const visibility = sectionVisibility[province.id] || {};
    setSaving((prev) => ({ ...prev, [province.id]: true }));
    try {
      const existing = configs[province.id];
      let updated;
      if (existing) {
        updated = await landingConfigApi.update(existing.id, {
          themeColor: settings.themeColor || existing.themeColor || "",
          fontFamily: settings.fontFamily || "",
          backgroundUrl: settings.backgroundUrl || "",
          layout: settings.layout || "default",
          sectionColors: colors,
          sectionOrder: order,
          sectionVisibility: visibility,
        });
      } else {
        updated = await landingConfigApi.create({
          provinceId: province.id,
          themeColor: settings.themeColor || localColorMap[province.slug] || "#b45309",
          fontFamily: settings.fontFamily || "",
          backgroundUrl: settings.backgroundUrl || "",
          layout: settings.layout || "default",
          sectionColors: colors,
          sectionOrder: order,
          sectionVisibility: visibility,
        });
      }
      setConfigs((prev) => ({ ...prev, [province.id]: updated }));
      setSaved((prev) => ({ ...prev, [province.id]: true }));
      setSaveError((prev) => ({ ...prev, [province.id]: null }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [province.id]: false })), 2500);
      return true;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.status || err?.message || "Lỗi không xác định";
      setSaveError((prev) => ({ ...prev, [province.id]: String(msg) }));
      setTimeout(() => setSaveError((prev) => ({ ...prev, [province.id]: null })), 5000);
      return false;
    } finally {
      setSaving((prev) => ({ ...prev, [province.id]: false }));
    }
  }, [sectionColors, configSettings, sectionOrders, sectionVisibility, configs]);

  const handleSaveAndPreview = useCallback(async (province) => {
    const win = window.open("", "_blank");
    const ok = await handleSave(province);
    if (ok !== false) {
      win.location.href = `/province/${province.slug}`;
    } else {
      win.close();
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

  const configuredCount = provinces.filter((p) => configs[p.id]).length;

  return (
    <EditorLayout>
      {/* ── Page header ── */}
      <div style={{
        background: "linear-gradient(135deg, #1c1917 0%, #3d2c1e 60%, #78350f 100%)",
        borderRadius: "16px", padding: "28px 32px", marginBottom: "28px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(180,83,9,0.25) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.4rem" }}>🎨</span>
                <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                  Thiết kế giao diện Landing Page
                </h1>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                Tuỳ chỉnh màu sắc, font chữ, bố cục và thứ tự section cho từng tỉnh thành
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fcd34d", lineHeight: 1 }}>{configuredCount}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>Đã cấu hình</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{provinces.length}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>Tổng tỉnh thành</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{
        display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap",
        background: "#fff", border: "1px solid #ede8e0", borderRadius: "12px",
        padding: "12px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: "160px" }}>
          <span style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem", color: "#bbb", pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder="Tìm tỉnh thành..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px",
              border: "1.5px solid #e5e0d8", fontSize: "0.88rem", background: "#faf8f5",
              boxSizing: "border-box", outline: "none", color: "#333",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => e.target.style.borderColor = "#b45309"}
            onBlur={(e) => e.target.style.borderColor = "#e5e0d8"}
          />
        </div>
        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          {[{ value: "", label: "Tất cả" }, ...regions.map((r) => ({ value: r, label: REGION_VI[r] || r }))].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRegionFilter(opt.value)}
              style={{
                padding: "7px 14px", borderRadius: "8px", border: "none",
                fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                background: regionFilter === opt.value ? "#b45309" : "#f5f0ea",
                color: regionFilter === opt.value ? "#fff" : "#7c6a58",
                transition: "all 0.15s",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#aaa", flexShrink: 0 }}>
          {filtered.length} tỉnh thành
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[1,2,3].map((i) => (
            <div key={i} style={{ height: "64px", borderRadius: "12px", background: "linear-gradient(90deg, #f5f0ea 25%, #ede8e0 50%, #f5f0ea 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((province) => {
            const isOpen = expanded[province.id] || false;
            const isSaving = saving[province.id];
            const isSaved = saved[province.id];
            const isError = saveError[province.id];
            const colors = sectionColors[province.id] || {};
            const settings = configSettings[province.id] || {};
            const order = sectionOrders[province.id] || SECTIONS.map((s) => s.key);
            const visibility = sectionVisibility[province.id] || Object.fromEntries(SECTIONS.map((s) => [s.key, true]));
            const isConfigured = !!configs[province.id];
            const accentColor = settings.themeColor || "#b45309";

            return (
              <div
                key={province.id}
                style={{
                  background: "#fff",
                  borderTop: `1px solid ${isOpen ? "#d4c5b0" : "#ede8e0"}`,
                  borderRight: `1px solid ${isOpen ? "#d4c5b0" : "#ede8e0"}`,
                  borderBottom: `1px solid ${isOpen ? "#d4c5b0" : "#ede8e0"}`,
                  borderLeft: `4px solid ${accentColor}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* ── Card header ── */}
                <div
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", cursor: "pointer", userSelect: "none",
                    background: isOpen ? "#fdf9f5" : "#fff",
                    transition: "background 0.15s",
                  }}
                  onClick={() => toggleExpand(province.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
                    {/* Color preview dots */}
                    <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
                      {SECTIONS.map((s) => (
                        <div key={s.key} title={s.label} style={{ width: "10px", height: "10px", borderRadius: "2px", background: colors[s.key] || DEFAULT_COLORS[s.key] || "#e8e2d9", border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                      ))}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.97rem", color: "#1a1a1a" }}>{province.name}</span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: REGION_VI[province.region] === "Miền Bắc" ? "#eff6ff" : REGION_VI[province.region] === "Miền Nam" ? "#f0fdf4" : "#fef3c7", color: REGION_VI[province.region] === "Miền Bắc" ? "#2563eb" : REGION_VI[province.region] === "Miền Nam" ? "#16a34a" : "#b45309" }}>
                          {REGION_VI[province.region] || province.region}
                        </span>
                        {isConfigured && (
                          <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>✓ Đã cấu hình</span>
                        )}
                      </div>
                      {!isOpen && isConfigured && (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "3px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: accentColor, flexShrink: 0 }} />
                          <span style={{ fontSize: "0.73rem", color: "#999" }}>{accentColor}</span>
                          {settings.fontFamily && <span style={{ fontSize: "0.73rem", color: "#bbb" }}>·</span>}
                          {settings.fontFamily && <span style={{ fontSize: "0.73rem", color: "#999", fontStyle: "italic" }}>{settings.fontFamily.replace(/'/g, "").split(",")[0]}</span>}
                          {settings.layout && settings.layout !== "default" && <span style={{ fontSize: "0.68rem", color: "#b45309", background: "#fff7ed", padding: "1px 6px", borderRadius: "4px" }}>{settings.layout}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(`/province/${province.slug}`, "_blank"); }}
                      style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "#f5f3ff", border: "1px solid #ddd6fe", cursor: "pointer" }}
                      title="Mở trang trong tab mới (phản ánh lần lưu gần nhất)"
                    >
                      👁 Preview ↗
                    </button>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#f5f0ea", border: "1px solid #e5e0d8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "#888", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.22s", display: "inline-block" }}>▼</span>
                    </div>
                  </div>
                </div>

                {/* ── Expanded panel ── */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #ede8e0", padding: "20px 22px", background: "#fdf9f5" }}>

                    {/* === Cấu hình giao diện === */}
                    <div style={{ marginBottom: "24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                        <div style={{ width: "3px", height: "16px", borderRadius: "2px", background: "linear-gradient(to bottom, #b45309, #d97706)", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7c6a58", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cấu hình giao diện</span>
                        <div style={{ flex: 1, height: "1px", background: "#ede8e0" }} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

                        {/* Màu chủ đạo */}
                        <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderLeft: "3px solid #b45309", borderRadius: "10px", padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#b45309", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Màu chủ đạo</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ position: "relative", flexShrink: 0 }}>
                              <div style={{ width: "44px", height: "44px", borderRadius: "9px", background: settings.themeColor || "#b45309", boxShadow: "0 0 0 3px #fff, 0 0 0 4px #ddd, 0 2px 8px rgba(0,0,0,0.15)", cursor: "pointer", overflow: "hidden" }}>
                                <input type="color" value={settings.themeColor || "#b45309"} onChange={(e) => handleSettingChange(province.id, "themeColor", e.target.value)} style={{ width: "200%", height: "200%", border: "none", cursor: "pointer", opacity: 0, position: "absolute", inset: "-25% -25%" }} />
                              </div>
                            </div>
                            <input type="text" value={settings.themeColor || "#b45309"} onChange={(e) => handleSettingChange(province.id, "themeColor", e.target.value)} style={{ flex: 1, padding: "8px 10px", borderRadius: "7px", border: "1px solid #e5e0d8", fontSize: "0.85rem", fontFamily: "monospace", background: "#faf8f5", minWidth: 0 }} />
                          </div>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            <span style={{ fontSize: "0.68rem", color: "#bbb" }}>Nhanh:</span>
                            {["#b45309","#2563eb","#16a34a","#dc2626","#7c3aed","#0891b2","#db2777"].map((c) => (
                              <div key={c} onClick={() => handleSettingChange(province.id, "themeColor", c)} title={c} style={{ width: "16px", height: "16px", borderRadius: "50%", background: c, cursor: "pointer", flexShrink: 0, boxShadow: (settings.themeColor || "#b45309") === c ? `0 0 0 2px #fff, 0 0 0 3px ${c}` : "0 1px 3px rgba(0,0,0,0.2)" }} />
                            ))}
                          </div>
                        </div>

                        {/* Font chữ */}
                        <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderLeft: "3px solid #6366f1", borderRadius: "10px", padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6366f1", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Font chữ</div>
                          <FontPicker
                            value={settings.fontFamily || ""}
                            onChange={(v) => handleSettingChange(province.id, "fontFamily", v)}
                          />
                          <div style={{ padding: "8px 12px", borderRadius: "7px", background: "#faf8f5", border: "1px solid #f0ebe3", fontFamily: settings.fontFamily || "inherit", fontSize: "0.95rem", color: "#3d3530", lineHeight: 1.5, minHeight: "36px", display: "flex", alignItems: "center" }}>
                            {`Chào mừng đến ${province.name}`}
                          </div>
                        </div>

                        {/* Hình nền */}
                        <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderLeft: "3px solid #0891b2", borderRadius: "10px", padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0891b2", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Hình nền trang</div>
                          <input type="file" accept="image/*" id={`bg-${province.id}`} style={{ display: "none" }}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              e.target.value = "";
                              const form = new FormData();
                              form.append("file", file);
                              form.append("folder", "backgrounds");
                              try {
                                const token = localStorage.getItem("accessToken");
                                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5134"}/api/uploads`, {
                                  method: "POST",
                                  headers: { Authorization: `Bearer ${token}` },
                                  body: form,
                                });
                                if (!res.ok) throw new Error("Upload failed");
                                const data = await res.json();
                                handleSettingChange(province.id, "backgroundUrl", data.url);
                              } catch {
                                alert("Upload ảnh thất bại, vui lòng thử lại.");
                              }
                            }}
                          />
                          {settings.backgroundUrl ? (
                            <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                              <div style={{ height: "84px", background: "#f5f0ea" }}>
                                <img src={settings.backgroundUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                              </div>
                              <div style={{ position: "absolute", top: "6px", right: "6px", display: "flex", gap: "5px" }}>
                                <label htmlFor={`bg-${province.id}`} style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>🔄 Đổi</label>
                                <button onClick={() => handleSettingChange(province.id, "backgroundUrl", "")} style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(225,29,72,0.82)", color: "#fff", border: "none", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>✕ Xóa</button>
                              </div>
                            </div>
                          ) : (
                            <label htmlFor={`bg-${province.id}`}
                              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", height: "84px", borderRadius: "8px", border: "2px dashed #c4bfbb", background: "#faf8f5", cursor: "pointer", transition: "all 0.15s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0891b2"; e.currentTarget.style.background = "#f0fdfe"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#c4bfbb"; e.currentTarget.style.background = "#faf8f5"; }}
                            >
                              <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0891b2" }}>Click để chọn ảnh</span>
                              <span style={{ fontSize: "0.63rem", color: "#b0a99e" }}>JPG · PNG · WebP</span>
                            </label>
                          )}
                        </div>

                        {/* Bố cục */}
                        <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderLeft: "3px solid #16a34a", borderRadius: "10px", padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#16a34a", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Bố cục trang</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
                            {[
                              { value: "default", label: "Mặc định", desc: "Đầy đủ section", color: "#6b7280" },
                              { value: "minimal", label: "Tối giản", desc: "Ẩn chart & timeline", color: "#0891b2" },
                              { value: "bold", label: "Nổi bật", desc: "Heading to đậm", color: "#dc2626" },
                              { value: "elegant", label: "Tinh tế", desc: "Font serif cổ điển", color: "#7c3aed" },
                            ].map((opt) => {
                              const isSel = (settings.layout || "default") === opt.value;
                              return (
                                <button key={opt.value} onClick={() => handleSettingChange(province.id, "layout", opt.value)} style={{ padding: "9px 8px", borderRadius: "8px", cursor: "pointer", textAlign: "left", border: "none", background: isSel ? `${opt.color}12` : "#faf8f5", outline: isSel ? `2px solid ${opt.color}` : "1px solid #e5e0d8", transition: "all 0.15s" }}>
                                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: isSel ? opt.color : "#444", marginBottom: "2px" }}>{opt.label}</div>
                                  <div style={{ fontSize: "0.68rem", color: "#9ca3af" }}>{opt.desc}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* === Sắp xếp thứ tự section === */}
                    <div style={{ marginBottom: "24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                        <div style={{ width: "3px", height: "16px", borderRadius: "2px", background: "linear-gradient(to bottom, #7c3aed, #a78bfa)", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7c6a58", letterSpacing: "0.1em", textTransform: "uppercase" }}>Thứ tự hiển thị section</span>
                        <div style={{ flex: 1, height: "1px", background: "#ede8e0" }} />
                        <button onClick={() => {
                          setSectionOrders((prev) => ({ ...prev, [province.id]: SECTIONS.map((s) => s.key) }));
                          setSectionVisibility((prev) => ({ ...prev, [province.id]: Object.fromEntries(SECTIONS.map((s) => [s.key, true])) }));
                        }} style={{ fontSize: "0.72rem", color: "#999", background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>↺ Reset</button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {order.map((key, idx) => {
                          const sec = SECTIONS.find((s) => s.key === key);
                          if (!sec) return null;
                          const isDragging = draggingKey === key;
                          return (
                            <div
                              key={key}
                              draggable
                              onDragStart={() => handleDragStart(province.id, idx, key)}
                              onDragOver={(e) => handleDragOver(e, province.id, idx)}
                              onDragEnd={handleDragEnd}
                              style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                background: isDragging ? "#f0ebff" : "#fff",
                                border: isDragging ? "1.5px dashed #7c3aed" : "1px solid #ede8e0",
                                borderRadius: "8px", padding: "8px 12px",
                                boxShadow: isDragging ? "0 4px 16px rgba(124,58,237,0.13)" : "0 1px 3px rgba(0,0,0,0.04)",
                                cursor: "grab", opacity: isDragging ? 0.7 : 1,
                                transition: "background 0.15s, border 0.15s, box-shadow 0.15s",
                                userSelect: "none",
                              }}
                            >
                              <span style={{ fontSize: "1rem", color: isDragging ? "#7c3aed" : "#bbb", flexShrink: 0 }}>⠿⠿</span>
                              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: isDragging ? "#ede0ff" : "#f5f0ea", border: `1px solid ${isDragging ? "#c4b5fd" : "#e8e2d9"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, color: isDragging ? "#7c3aed" : "#b45309", flexShrink: 0 }}>{idx + 1}</span>
                              <span style={{ flex: 1, fontSize: "0.85rem", fontWeight: 500, color: visibility[key] !== false ? "#3d3530" : "#bbb", textDecoration: visibility[key] !== false ? "none" : "line-through" }}>{sec.label}</span>
                              {/* Toggle bật/tắt */}
                              <button
                                onClick={(e) => { e.stopPropagation(); handleToggleVisibility(province.id, key); }}
                                title={visibility[key] !== false ? "Đang hiện — click để ẩn" : "Đang ẩn — click để hiện"}
                                style={{ width: "36px", height: "20px", borderRadius: "10px", border: "none", cursor: "pointer", position: "relative", flexShrink: 0, background: visibility[key] !== false ? "#16a34a" : "#d1d5db", transition: "background 0.2s" }}
                              >
                                <span style={{ position: "absolute", top: "2px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.2s", left: visibility[key] !== false ? "18px" : "2px" }} />
                              </button>
                              <div style={{ display: "flex", gap: "3px" }}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleMoveSection(province.id, idx, -1); }}
                                  disabled={idx === 0}
                                  style={{ width: "26px", height: "26px", borderRadius: "6px", border: "1px solid #e5e0d8", background: idx === 0 ? "#f9f9f9" : "#fff", color: idx === 0 ? "#ddd" : "#555", cursor: idx === 0 ? "default" : "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                                >↑</button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleMoveSection(province.id, idx, 1); }}
                                  disabled={idx === order.length - 1}
                                  style={{ width: "26px", height: "26px", borderRadius: "6px", border: "1px solid #e5e0d8", background: idx === order.length - 1 ? "#f9f9f9" : "#fff", color: idx === order.length - 1 ? "#ddd" : "#555", cursor: idx === order.length - 1 ? "default" : "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                                >↓</button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Section color toolbar ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7c6a58", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "4px" }}>Màu section:</span>
                      <button onClick={() => applyDefaults(province.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #d97706", background: "#fffbeb", color: "#b45309", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                        🎨 Màu mặc định
                      </button>
                      <button onClick={() => clearColors(province.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #e5e0d8", background: "#f5f0ea", color: "#888", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
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
                              background: colors[s.key] || DEFAULT_COLORS[s.key] || "#f0ebe3",
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
                        const color = colors[section.key] || DEFAULT_COLORS[section.key] || "#ffffff";
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

                    {/* ── Save error ── */}
                    {isError && (
                      <div style={{ padding: "8px 12px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.82rem", marginBottom: "8px" }}>
                        ⚠ Lưu thất bại: {isError}
                      </div>
                    )}

                    {/* ── Action buttons ── */}
                    <div style={{ display: "flex", gap: "10px", paddingTop: "4px", borderTop: "1px solid #ede8e0", marginTop: "4px" }}>
                      <button
                        onClick={() => handleSave(province)}
                        disabled={isSaving}
                        style={{
                          flex: 1, padding: "11px 0", borderRadius: "9px", border: "none",
                          cursor: isSaving ? "not-allowed" : "pointer",
                          fontWeight: 700, fontSize: "0.9rem",
                          background: isSaved ? "linear-gradient(135deg,#16a34a,#15803d)" : "linear-gradient(135deg,#b45309,#92400e)",
                          color: "#fff", letterSpacing: "0.01em",
                          boxShadow: isSaved ? "0 2px 8px rgba(22,163,74,0.3)" : "0 2px 8px rgba(180,83,9,0.3)",
                          opacity: isSaving ? 0.65 : 1,
                          transition: "all 0.25s",
                        }}
                      >
                        {isSaving ? "⏳ Đang lưu..." : isSaved ? "✓ Đã lưu thành công" : "💾 Lưu thay đổi"}
                      </button>
                      <button
                        onClick={() => handleSaveAndPreview(province)}
                        disabled={isSaving}
                        style={{
                          flex: 1, padding: "11px 0", borderRadius: "9px",
                          border: "2px solid #7c3aed",
                          cursor: isSaving ? "not-allowed" : "pointer",
                          fontWeight: 700, fontSize: "0.9rem",
                          background: "#fff", color: "#7c3aed", letterSpacing: "0.01em",
                          opacity: isSaving ? 0.65 : 1,
                          transition: "all 0.2s",
                        }}
                      >
                        👁 Lưu & Preview
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
