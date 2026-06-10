import { useEffect, useState, useCallback } from "react";
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

export default function EditorDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [configs, setConfigs] = useState({});   // provinceId → config object
  const [colors, setColors] = useState({});      // provinceId → current color value
  const [saving, setSaving] = useState({});      // provinceId → bool
  const [saved, setSaved] = useState({});        // provinceId → bool
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
        const colorMap = {};
        list.forEach((p, i) => {
          const cfg = results[i];
          cfgMap[p.id] = cfg || null;
          colorMap[p.id] = cfg?.themeColor || localColorMap[p.slug] || "#b45309";
        });
        setConfigs(cfgMap);
        setColors(colorMap);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleColorChange = (provinceId, value) => {
    setColors((prev) => ({ ...prev, [provinceId]: value }));
  };

  const handleSave = useCallback(async (province) => {
    const newColor = colors[province.id];
    setSaving((prev) => ({ ...prev, [province.id]: true }));
    try {
      const existing = configs[province.id];
      let updated;
      if (existing) {
        updated = await landingConfigApi.update(existing.id, {
          ...existing,
          themeColor: newColor,
        });
      } else {
        updated = await landingConfigApi.create({
          provinceId: province.id,
          themeColor: newColor,
          fontFamily: "",
          backgroundUrl: "",
          layout: "",
        });
      }
      setConfigs((prev) => ({ ...prev, [province.id]: updated }));
      setSaved((prev) => ({ ...prev, [province.id]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [province.id]: false })), 2000);
    } catch {
      // silent fail — color stays in local state
    } finally {
      setSaving((prev) => ({ ...prev, [province.id]: false }));
    }
  }, [colors, configs]);

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
          Tuỳ chỉnh màu sắc chủ đạo (accent color) cho từng trang landing của 34 tỉnh thành.
        </p>
      </div>

      {/* Filter bar */}
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
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px"
        }}>
          {filtered.map((province) => {
            const color = colors[province.id] || "#b45309";
            const isSaving = saving[province.id];
            const isSaved = saved[province.id];
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
                {/* Color preview banner */}
                <div style={{
                  height: "8px",
                  background: color,
                  transition: "background 0.2s"
                }} />

                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a1a" }}>
                        {province.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#999", marginTop: "2px" }}>
                        {REGION_VI[province.region] || province.region}
                      </div>
                    </div>
                    <Link
                      to={`/province/${province.slug}`}
                      target="_blank"
                      style={{ fontSize: "0.78rem", color: "#b45309", textDecoration: "none" }}
                    >
                      Xem trang ↗
                    </Link>
                  </div>

                  {/* Color picker row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(province.id, e.target.value)}
                      style={{
                        width: "40px", height: "40px", border: "none",
                        borderRadius: "8px", cursor: "pointer", padding: "2px",
                        background: "none"
                      }}
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(province.id, e.target.value)}
                      style={{
                        flex: 1, padding: "7px 10px", borderRadius: "7px",
                        border: "1px solid #e5e0d8", fontSize: "0.85rem",
                        fontFamily: "monospace", background: "#faf8f5"
                      }}
                    />
                  </div>

                  {/* Save button */}
                  <button
                    onClick={() => handleSave(province)}
                    disabled={isSaving}
                    style={{
                      marginTop: "12px", width: "100%",
                      padding: "8px 0", borderRadius: "8px", border: "none",
                      cursor: isSaving ? "not-allowed" : "pointer",
                      fontWeight: 600, fontSize: "0.85rem",
                      background: isSaved ? "#16a34a" : color,
                      color: "#fff",
                      opacity: isSaving ? 0.7 : 1,
                      transition: "background 0.3s"
                    }}
                  >
                    {isSaving ? "Đang lưu..." : isSaved ? "✓ Đã lưu" : "Lưu màu"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </EditorLayout>
  );
}
