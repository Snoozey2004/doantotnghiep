import { useEffect, useState } from "react";
import EditorLayout from "../layouts/EditorLayout.jsx";
import { analyticsApi } from "../api/analyticsApi";
import { provinceApi } from "../api/provinceApi";

const REGION_VI = { North: "Miền Bắc", Central: "Miền Trung", South: "Miền Nam" };

function StatCard({ label, value, icon, color }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #ede8e0", borderLeft: `4px solid ${color}`, borderRadius: "12px", padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>{icon}</div>
      <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

export default function EditorAnalytics() {
  const [provinces, setProvinces] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("pageViews");
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [provList, intData] = await Promise.all([
        provinceApi.getAll(),
        analyticsApi.getProvinceInteractions(),
      ]);
      setProvinces(provList);
      setInteractions(intData);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const provinceMap = Object.fromEntries(provinces.map((p) => [p.id, p]));

  const rows = interactions
    .map((r) => ({
      ...r,
      province: provinceMap[r.provinceId],
      total: r.pageViews + r.specialtyClicks + r.craftClicks,
    }))
    .filter((r) => r.province)
    .filter((r) => !search || r.province.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b[sort] - a[sort]);

  const totalPageViews = interactions.reduce((s, r) => s + r.pageViews, 0);
  const totalSpecialty = interactions.reduce((s, r) => s + r.specialtyClicks, 0);
  const totalCraft = interactions.reduce((s, r) => s + r.craftClicks, 0);
  const totalAll = totalPageViews + totalSpecialty + totalCraft;

  const maxPageViews = Math.max(...rows.map((r) => r.pageViews), 1);

  return (
    <EditorLayout>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1c1917 0%, #3d2c1e 60%, #78350f 100%)", borderRadius: "16px", padding: "28px 32px", marginBottom: "28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(180,83,9,0.25) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ fontSize: "1.4rem" }}>📊</span>
              <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Thống kê tương tác</h1>
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "rgba(255,255,255,0.6)" }}>
              Đo lường lượt xem và tương tác của người dùng với từng trang tỉnh thành
            </p>
          </div>
          <button onClick={load} style={{ padding: "9px 18px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
            ↺ Làm mới
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        <StatCard label="Tổng lượt tương tác" value={totalAll} icon="📈" color="#b45309" />
        <StatCard label="Lượt xem trang" value={totalPageViews} icon="👁" color="#2563eb" />
        <StatCard label="Click ẩm thực" value={totalSpecialty} icon="🍜" color="#16a34a" />
        <StatCard label="Click làng nghề" value={totalCraft} icon="🏺" color="#7c3aed" />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap", background: "#fff", border: "1px solid #ede8e0", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ position: "relative", flex: "1 1 180px" }}>
          <span style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem", color: "#bbb" }}>🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm tỉnh thành..." style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1.5px solid #e5e0d8", fontSize: "0.88rem", background: "#faf8f5", boxSizing: "border-box", outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "0.78rem", color: "#999", marginRight: "4px" }}>Sắp xếp:</span>
          {[
            { key: "pageViews", label: "Lượt xem" },
            { key: "specialtyClicks", label: "Ẩm thực" },
            { key: "craftClicks", label: "Làng nghề" },
            { key: "total", label: "Tổng" },
          ].map((s) => (
            <button key={s.key} onClick={() => setSort(s.key)} style={{ padding: "6px 12px", borderRadius: "7px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", background: sort === s.key ? "#b45309" : "#f5f0ea", color: sort === s.key ? "#fff" : "#7c6a58", transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#aaa", flexShrink: 0 }}>{rows.length} tỉnh có dữ liệu</div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ height: "56px", borderRadius: "10px", background: "linear-gradient(90deg,#f5f0ea 25%,#ede8e0 50%,#f5f0ea 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: "16px", border: "1px solid #ede8e0" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📭</div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#555", marginBottom: "6px" }}>Chưa có dữ liệu tương tác</div>
          <div style={{ fontSize: "0.85rem", color: "#aaa" }}>Dữ liệu sẽ xuất hiện khi người dùng vào xem trang tỉnh và click nội dung</div>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #ede8e0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 100px 100px 100px 80px", gap: "0", padding: "12px 20px", background: "#faf8f5", borderBottom: "1px solid #ede8e0", fontSize: "0.72rem", fontWeight: 700, color: "#7c6a58", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span>Tỉnh thành</span>
            <span>Lượt xem (biểu đồ)</span>
            <span style={{ textAlign: "right" }}>👁 Xem</span>
            <span style={{ textAlign: "right" }}>🍜 Ẩm thực</span>
            <span style={{ textAlign: "right" }}>🏺 Làng nghề</span>
            <span style={{ textAlign: "right" }}>Tổng</span>
          </div>
          {rows.map((row, idx) => {
            const barWidth = Math.round((row.pageViews / maxPageViews) * 100);
            const region = row.province?.region;
            return (
              <div key={row.provinceId} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 100px 100px 100px 80px", gap: "0", padding: "13px 20px", borderBottom: idx < rows.length - 1 ? "1px solid #f5f0ea" : "none", alignItems: "center", background: idx % 2 === 0 ? "#fff" : "#fdfbf8", transition: "background 0.1s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f5f0ea", border: "1px solid #e8e2d9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800, color: "#b45309", flexShrink: 0 }}>{idx + 1}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a1a" }}>{row.province.name}</div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "1px 7px", borderRadius: "20px", background: region === "North" ? "#eff6ff" : region === "South" ? "#f0fdf4" : "#fef3c7", color: region === "North" ? "#2563eb" : region === "South" ? "#16a34a" : "#b45309" }}>
                      {REGION_VI[region] || region}
                    </span>
                  </div>
                </div>
                {/* Bar chart inline */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: 1, height: "8px", borderRadius: "4px", background: "#f0ebe3", overflow: "hidden" }}>
                    <div style={{ width: `${barWidth}%`, height: "100%", borderRadius: "4px", background: "linear-gradient(to right,#b45309,#d97706)", transition: "width 0.5s" }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: "0.95rem", fontWeight: 700, color: "#2563eb" }}>{row.pageViews.toLocaleString()}</div>
                <div style={{ textAlign: "right", fontSize: "0.95rem", fontWeight: 700, color: "#16a34a" }}>{row.specialtyClicks.toLocaleString()}</div>
                <div style={{ textAlign: "right", fontSize: "0.95rem", fontWeight: 700, color: "#7c3aed" }}>{row.craftClicks.toLocaleString()}</div>
                <div style={{ textAlign: "right", fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a" }}>{row.total.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      )}
    </EditorLayout>
  );
}
