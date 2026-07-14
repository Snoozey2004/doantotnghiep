import { useState, useEffect, useMemo, useCallback } from "react";
import { provinceApi } from "../../api/provinceApi";
import { landingConfigApi } from "../../api/landingConfigApi";
import localProvinces from "../../data/provinceData";

const localBySlug = Object.fromEntries(localProvinces.map((p) => [p.slug, p]));

// Dựng nội dung sửa được (subset) từ provinceData mặc định + override editor đã lưu.
function buildContent(local, cfgContent) {
  const c = {
    slogan: local?.slogan || "",
    description: local?.description || "",
    stats: (local?.stats || []).map((s) => ({ value: s.value || "", label: s.label || "" })),
    specialties: (local?.specialties || []).map((s) => ({ ...s })),
    culture: (local?.culture || []).map((s) => ({ ...s })),
  };
  if (cfgContent) {
    if (cfgContent.slogan != null) c.slogan = cfgContent.slogan;
    if (cfgContent.description != null) c.description = cfgContent.description;
    if (Array.isArray(cfgContent.stats)) c.stats = cfgContent.stats.map((s) => ({ value: s.value || "", label: s.label || "" }));
    if (Array.isArray(cfgContent.specialties)) c.specialties = cfgContent.specialties.map((s) => ({ ...s }));
    if (Array.isArray(cfgContent.culture)) c.culture = cfgContent.culture.map((s) => ({ ...s }));
  }
  return c;
}

const CARD = { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 8px 32px rgba(15,23,42,0.06)", border: "1px solid #f0ebe3" };
const LABEL = { fontSize: "0.72rem", fontWeight: 700, color: "#7c6a58", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 };
const INPUT = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e0d8", fontSize: "0.9rem", background: "#faf8f5", color: "#1c1917", boxSizing: "border-box" };
const FIELDLBL = { fontSize: "0.72rem", color: "#9a8a70", fontWeight: 600, marginBottom: 4, display: "block" };

export default function LandingContentManager() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState("");
  const [config, setConfig] = useState(null);
  const [content, setContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    provinceApi.getAll()
      .then((list) => { setProvinces(list); if (list[0]) setSlug(list[0].slug); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const selected = useMemo(() => provinces.find((p) => p.slug === slug), [provinces, slug]);

  useEffect(() => {
    if (!selected) { setContent(null); return; }
    setLoadingContent(true);
    landingConfigApi.getByProvinceId(selected.id)
      .catch(() => null)
      .then((cfg) => {
        setConfig(cfg || null);
        setContent(buildContent(localBySlug[slug], cfg?.sectionContent));
      })
      .finally(() => setLoadingContent(false));
  }, [selected, slug]);

  const updateTop = (field, value) => setContent((c) => ({ ...c, [field]: value }));
  const updateItem = (arrKey, idx, field, value) =>
    setContent((c) => ({ ...c, [arrKey]: c[arrKey].map((it, i) => (i === idx ? { ...it, [field]: value } : it)) }));

  const resetToDefault = () => setContent(buildContent(localBySlug[slug], null));

  const handleSave = useCallback(async () => {
    if (!selected || !content) return;
    setSaving(true); setError("");
    try {
      const cfg = config;
      const localP = localBySlug[slug];
      // Gửi kèm TOÀN BỘ cấu hình hiện có để không xóa thiết kế (màu/font/thứ tự…)
      const common = {
        themeColor: cfg?.themeColor || localP?.accentColor || "#b45309",
        fontFamily: cfg?.fontFamily || "",
        backgroundUrl: cfg?.backgroundUrl || "",
        layout: cfg?.layout || "default",
        sectionColors: cfg?.sectionColors || {},
        sectionOrder: cfg?.sectionOrder || [],
        sectionVisibility: cfg?.sectionVisibility || {},
        sectionContent: content,
      };
      const updated = cfg?.id
        ? await landingConfigApi.update(cfg.id, common)
        : await landingConfigApi.create({ provinceId: selected.id, ...common, blocks: [] });
      setConfig(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Lưu thất bại");
      setTimeout(() => setError(""), 5000);
    } finally {
      setSaving(false);
    }
  }, [selected, content, config, slug]);

  return (
    <>
      <div style={{ maxWidth: 860 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1c1917", margin: 0 }}>Nội dung Landing Page</h2>
            <p style={{ fontSize: "0.85rem", color: "#78716c", margin: "4px 0 0" }}>
              Sửa chữ từng section (Giới thiệu, số liệu, Đặc sản, Văn hóa) cho từng tỉnh. Lưu xong hiển thị ngay ở trang tỉnh.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select value={slug} onChange={(e) => setSlug(e.target.value)} style={{ ...INPUT, width: "auto", fontWeight: 600 }}>
              {provinces.map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}
            </select>
            <button onClick={resetToDefault} disabled={!content}
              style={{ padding: "9px 14px", borderRadius: 8, border: "1px solid #e5e0d8", background: "#f5f0ea", color: "#888", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
              ↺ Mặc định
            </button>
            <button onClick={handleSave} disabled={saving || !content}
              style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: saving ? "#a8a29e" : "linear-gradient(135deg,#b45309,#d97706)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: saving ? "default" : "pointer" }}>
              {saving ? "Đang lưu…" : "💾 Lưu nội dung"}
            </button>
          </div>
        </div>

        {saved && <div style={{ padding: "8px 12px", borderRadius: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", fontSize: "0.85rem", marginBottom: 12, fontWeight: 600 }}>✓ Đã lưu nội dung</div>}
        {error && <div style={{ padding: "8px 12px", borderRadius: 8, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>{error}</div>}

        {loading || loadingContent || !content ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9a8a70" }}>Đang tải…</div>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {/* Giới thiệu */}
            <div style={CARD}>
              <div style={LABEL}>Giới thiệu</div>
              <label style={FIELDLBL}>Slogan</label>
              <input style={INPUT} value={content.slogan} onChange={(e) => updateTop("slogan", e.target.value)} placeholder="Slogan tỉnh" />
              <label style={{ ...FIELDLBL, marginTop: 12 }}>Mô tả</label>
              <textarea style={{ ...INPUT, minHeight: 72, resize: "vertical" }} value={content.description} onChange={(e) => updateTop("description", e.target.value)} placeholder="Mô tả ngắn" />
            </div>

            {/* Stats */}
            <div style={CARD}>
              <div style={LABEL}>Số liệu nổi bật</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {content.stats.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 8 }}>
                    <input style={{ ...INPUT, width: 90, fontWeight: 700 }} value={s.value} onChange={(e) => updateItem("stats", i, "value", e.target.value)} placeholder="Số" />
                    <input style={INPUT} value={s.label} onChange={(e) => updateItem("stats", i, "label", e.target.value)} placeholder="Nhãn" />
                  </div>
                ))}
              </div>
            </div>

            {/* Đặc sản */}
            <div style={CARD}>
              <div style={LABEL}>Đặc sản ({content.specialties.length})</div>
              <div style={{ display: "grid", gap: 12 }}>
                {content.specialties.map((s, i) => (
                  <div key={i} style={{ display: "grid", gap: 6, padding: 12, borderRadius: 10, background: "#faf8f5", border: "1px solid #f0ebe3" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input style={{ ...INPUT, flex: 2 }} value={s.name || ""} onChange={(e) => updateItem("specialties", i, "name", e.target.value)} placeholder="Tên đặc sản" />
                      <input style={{ ...INPUT, flex: 1 }} value={s.origin || ""} onChange={(e) => updateItem("specialties", i, "origin", e.target.value)} placeholder="Xuất xứ" />
                    </div>
                    <textarea style={{ ...INPUT, minHeight: 48, resize: "vertical" }} value={s.description || ""} onChange={(e) => updateItem("specialties", i, "description", e.target.value)} placeholder="Mô tả" />
                  </div>
                ))}
              </div>
            </div>

            {/* Văn hóa */}
            <div style={CARD}>
              <div style={LABEL}>Văn hóa ({content.culture.length})</div>
              <div style={{ display: "grid", gap: 12 }}>
                {content.culture.map((s, i) => (
                  <div key={i} style={{ display: "grid", gap: 6, padding: 12, borderRadius: 10, background: "#faf8f5", border: "1px solid #f0ebe3" }}>
                    <input style={INPUT} value={s.name || ""} onChange={(e) => updateItem("culture", i, "name", e.target.value)} placeholder="Tên" />
                    <textarea style={{ ...INPUT, minHeight: 48, resize: "vertical" }} value={s.description || ""} onChange={(e) => updateItem("culture", i, "description", e.target.value)} placeholder="Mô tả" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
