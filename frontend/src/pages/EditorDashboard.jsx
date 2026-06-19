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
  const [configSettings, setConfigSettings] = useState({});
  const [sectionOrders, setSectionOrders] = useState({});
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
        const settingsMap = {};
        const ordersMap = {};
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
        });
        setConfigs(cfgMap);
        setSectionColors(colorsMap);
        setConfigSettings(settingsMap);
        setSectionOrders(ordersMap);
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
    const settings = configSettings[province.id] || {};
    const order = sectionOrders[province.id] || SECTIONS.map((s) => s.key);
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
  }, [sectionColors, configSettings, sectionOrders, configs]);

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
        <h1>🎨 Chỉnh sửa thiết kế giao diện Landing Page</h1>
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
            const settings = configSettings[province.id] || {};
            const order = sectionOrders[province.id] || SECTIONS.map((s) => s.key);

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
                          <select value={settings.fontFamily || ""} onChange={(e) => handleSettingChange(province.id, "fontFamily", e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: "7px", border: "1px solid #e5e0d8", fontSize: "0.85rem", background: "#faf8f5", cursor: "pointer", color: "#333", marginBottom: "10px" }}>
                            <option value="">Mặc định hệ thống</option>
                            <option value="'Inter', sans-serif">Inter – Hiện đại</option>
                            <option value="'Roboto', sans-serif">Roboto – Phổ thông</option>
                            <option value="'Montserrat', sans-serif">Montserrat – Thanh lịch</option>
                            <option value="'Lora', serif">Lora – Cổ điển</option>
                            <option value="'Playfair Display', serif">Playfair Display – Sang trọng</option>
                            <option value="'Be Vietnam Pro', sans-serif">Be Vietnam Pro – Việt hóa</option>
                          </select>
                          <div style={{ padding: "8px 12px", borderRadius: "7px", background: "#faf8f5", border: "1px solid #f0ebe3", fontFamily: settings.fontFamily || "inherit", fontSize: "0.95rem", color: "#3d3530", lineHeight: 1.5, minHeight: "36px", display: "flex", alignItems: "center" }}>
                            {settings.fontFamily ? `Chào mừng đến ${province.name}` : <span style={{ color: "#ccc", fontSize: "0.78rem", fontStyle: "italic" }}>Chọn font để xem trước…</span>}
                          </div>
                        </div>

                        {/* Hình nền */}
                        <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderLeft: "3px solid #0891b2", borderRadius: "10px", padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0891b2", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Hình nền trang</div>
                          <input type="text" placeholder="/Images/... hoặc https://..." value={settings.backgroundUrl || ""} onChange={(e) => handleSettingChange(province.id, "backgroundUrl", e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: "7px", border: "1px solid #e5e0d8", fontSize: "0.82rem", background: "#faf8f5", boxSizing: "border-box", color: "#333", marginBottom: "8px" }} />
                          <div style={{ height: "56px", borderRadius: "7px", border: "1px solid #e5e0d8", overflow: "hidden", background: "#f5f0ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {settings.backgroundUrl ? <img src={settings.backgroundUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <span style={{ fontSize: "0.73rem", color: "#ccc" }}>Dùng làm ảnh hero khi chưa có media</span>}
                          </div>
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
                        <button onClick={() => setSectionOrders((prev) => ({ ...prev, [province.id]: SECTIONS.map((s) => s.key) }))} style={{ fontSize: "0.72rem", color: "#999", background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>↺ Reset</button>
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
                              <span style={{ flex: 1, fontSize: "0.85rem", fontWeight: 500, color: "#3d3530" }}>{sec.label}</span>
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
                        {isSaving ? "Đang lưu..." : isSaved ? "✓ Đã lưu" : "Lưu"}
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
