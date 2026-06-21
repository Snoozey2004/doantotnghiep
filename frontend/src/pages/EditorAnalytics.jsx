import { useEffect, useState } from "react";
import EditorLayout from "../layouts/EditorLayout.jsx";
import { analyticsApi } from "../api/analyticsApi";
import { provinceApi } from "../api/provinceApi";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
  PieChart, Pie, Legend,
} from "recharts";

const REGION_VI = { North: "Miền Bắc", Central: "Miền Trung", South: "Miền Nam" };
const REGION_STYLE = {
  North:   { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
  Central: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  South:   { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
};

const MEDALS = ["🥇", "🥈", "🥉"];
const SORT_OPTIONS = [
  { key: "total",           label: "Tổng" },
  { key: "pageViews",       label: "Lượt xem" },
  { key: "specialtyClicks", label: "Ẩm thực" },
];

function KpiCard({ label, value, icon, from, to, note }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      borderRadius: "18px", padding: "26px 28px",
      position: "relative", overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
    }}>
      <div style={{ position: "absolute", right: -6, top: -6, fontSize: "4.5rem", opacity: 0.13, userSelect: "none", lineHeight: 1 }}>{icon}</div>
      <div style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "12px" }}>
        {label}
      </div>
      <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>
        {value.toLocaleString()}
      </div>
      {note && (
        <div style={{ marginTop: "10px", fontSize: "0.74rem", color: "rgba(255,255,255,0.58)", display: "flex", alignItems: "center", gap: "5px" }}>
          <span>▸</span> {note}
        </div>
      )}
    </div>
  );
}

export default function EditorAnalytics() {
  const [provinces, setProvinces]     = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [sort, setSort]               = useState("total");
  const [search, setSearch]           = useState("");
  const [hoveredId, setHoveredId]     = useState(null);
  const [hoveredPie, setHoveredPie]   = useState(null);

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

  const allRows = interactions
    .map((r) => ({
      ...r,
      province: provinceMap[r.provinceId],
      total: r.pageViews + r.specialtyClicks,
    }))
    .filter((r) => r.province);

  const rows = allRows
    .filter((r) => !search || r.province.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b[sort] - a[sort]);

  const totalPageViews = interactions.reduce((s, r) => s + r.pageViews, 0);
  const totalSpecialty = interactions.reduce((s, r) => s + r.specialtyClicks, 0);
  const totalAll       = totalPageViews + totalSpecialty;

  const maxPageViews = Math.max(...allRows.map((r) => r.pageViews), 1);
  const maxSpecialty = Math.max(...allRows.map((r) => r.specialtyClicks), 1);
  const maxTotal     = Math.max(...allRows.map((r) => r.total), 1);

  const top3 = [...allRows].sort((a, b) => b.total - a.total).slice(0, 3);

  return (
    <EditorLayout>

      {/* ── Hero header ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
        borderRadius: "20px", padding: "32px 36px", marginBottom: "24px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 85% 50%, rgba(245,158,11,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 8%  80%, rgba(99,102,241,0.13) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "20px", padding: "4px 13px", marginBottom: "16px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#fbbf24", letterSpacing: "0.1em", textTransform: "uppercase" }}>Live Analytics</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "8px" }}>
              Thống kê tương tác
            </h1>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.6, maxWidth: "460px" }}>
              Đo lường lượt xem và tương tác của người dùng với từng trang tỉnh thành trên hệ thống
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ textAlign: "right", borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "16px" }}>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Tỉnh có dữ liệu</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{allRows.length}</div>
            </div>
            <button
              onClick={load}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "11px 20px", borderRadius: "11px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <span style={{ fontSize: "1rem", display: "inline-block" }}>↺</span> Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        <KpiCard
          label="Tổng tương tác" value={totalAll} icon="📈"
          from="#b45309" to="#d97706"
          note="Tổng hợp lượt xem & click ẩm thực"
        />
        <KpiCard
          label="Lượt xem trang" value={totalPageViews} icon="👁"
          from="#1d4ed8" to="#3b82f6"
          note={`Chiếm ${totalAll > 0 ? Math.round(totalPageViews / totalAll * 100) : 0}% tổng tương tác`}
        />
        <KpiCard
          label="Xem ẩm thực" value={totalSpecialty} icon="🍜"
          from="#15803d" to="#22c55e"
          note={`Chiếm ${totalAll > 0 ? Math.round(totalSpecialty / totalAll * 100) : 0}% tổng tương tác`}
        />
      </div>

      {/* ── Charts ── */}
      {!loading && allRows.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: "16px", marginBottom: "20px" }}>

          {/* ── Bar chart ── */}
          <div style={{
            background: "#fff",
            border: "1px solid #e8e2d9",
            borderRadius: "20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}>
            {/* Gradient top stripe */}
            <div style={{ height: "4px", background: "linear-gradient(90deg,#6366f1 0%,#3b82f6 45%,#06b6d4 100%)" }} />

            <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 800, color: "#a8a29e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>
                  Bảng xếp hạng
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1c1917" }}>Top 10 Tỉnh Thành</div>
              </div>
              <div style={{ display: "flex", gap: "12px", paddingTop: "2px" }}>
                {[{ c: "#6366f1", l: "Lượt xem" }, { c: "#f59e0b", l: "Ẩm thực" }].map(({ c, l }) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: c }} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#78716c" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "12px 12px 16px 12px" }}>
              <ResponsiveContainer width="100%" height={296}>
                <BarChart
                  layout="vertical"
                  data={[...allRows].sort((a, b) => b.total - a.total).slice(0, 10).map((r) => ({
                    name: r.province.name.replace(/^(Tỉnh|Thành phố|TP\.?)\s*/i, ""),
                    views: r.pageViews,
                    food: r.specialtyClicks,
                  }))}
                  margin={{ top: 4, right: 40, left: 4, bottom: 4 }}
                  barCategoryGap="40%"
                  barGap={2}
                >
                  <CartesianGrid horizontal={false} stroke="#f1f5f9" strokeDasharray="0" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#cbd5e1" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={86} tick={{ fontSize: 11.5, fill: "#292524", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 36px rgba(0,0,0,0.15)", fontSize: "0.8rem", background: "#1c1917", color: "#fff", padding: "10px 14px" }}
                    labelStyle={{ color: "#e7e5e4", fontWeight: 700, marginBottom: "6px" }}
                    itemStyle={{ color: "#d6d3d1" }}
                    cursor={{ fill: "#faf8f5" }}
                    formatter={(v, key) => [v.toLocaleString(), key === "views" ? "Lượt xem" : "Ẩm thực"]}
                  />
                  <Bar dataKey="views" stackId="s" fill="#6366f1" maxBarSize={20} />
                  <Bar dataKey="food"  stackId="s" fill="#f59e0b" maxBarSize={20} radius={[0, 6, 6, 0]}
                    label={{ position: "right", fontSize: 10, fill: "#94a3b8",
                      formatter: (_, __, idx) => {
                        const row = [...allRows].sort((a, b) => b.total - a.total)[idx];
                        return row ? row.total.toLocaleString() : "";
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Donut chart ── */}
          <div style={{
            background: "#fff",
            border: "1px solid #e8e2d9",
            borderRadius: "20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ height: "4px", background: "linear-gradient(90deg,#f59e0b 0%,#ef4444 100%)" }} />

            <div style={{ padding: "20px 20px 0" }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 800, color: "#a8a29e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>
                Phân bổ
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1c1917" }}>Tỷ Trọng Tương Tác</div>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 0 0" }}>
              <ResponsiveContainer width="100%" height={188}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Lượt xem trang", value: totalPageViews },
                      { name: "Xem ẩm thực",    value: totalSpecialty  },
                    ]}
                    cx="50%" cy="50%"
                    innerRadius={56} outerRadius={80}
                    paddingAngle={totalSpecialty > 0 ? 4 : 0}
                    dataKey="value"
                    strokeWidth={0}
                    startAngle={90}
                    endAngle={-270}
                    onMouseEnter={(data, idx) => setHoveredPie({ name: data.name, value: data.value, color: idx === 0 ? "#6366f1" : "#f59e0b" })}
                    onMouseLeave={() => setHoveredPie(null)}
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", textAlign: "center", pointerEvents: "none", transition: "all 0.2s" }}>
                {hoveredPie ? (
                  <>
                    <div style={{ fontSize: "1.6rem", fontWeight: 900, color: hoveredPie.color, lineHeight: 1 }}>{hoveredPie.value.toLocaleString()}</div>
                    <div style={{ fontSize: "0.6rem", color: "#a8a29e", marginTop: "5px", fontWeight: 700, maxWidth: "72px", lineHeight: 1.3, textAlign: "center" }}>{hoveredPie.name}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#1c1917", lineHeight: 1 }}>{totalAll.toLocaleString()}</div>
                    <div style={{ fontSize: "0.58rem", color: "#a8a29e", marginTop: "4px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Tổng</div>
                  </>
                )}
              </div>
            </div>

            <div style={{ padding: "12px 20px 22px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Lượt xem trang", value: totalPageViews, color: "#6366f1", bg: "#eef2ff", pct: totalAll > 0 ? Math.round(totalPageViews / totalAll * 100) : 0 },
                { label: "Xem ẩm thực",    value: totalSpecialty,  color: "#f59e0b", bg: "#fffbeb", pct: totalAll > 0 ? Math.round(totalSpecialty  / totalAll * 100) : 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "3px", background: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#57534e" }}>{item.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1c1917" }}>{item.value.toLocaleString()}</span>
                      <span style={{ fontSize: "0.67rem", fontWeight: 700, padding: "2px 7px", borderRadius: "20px", background: item.bg, color: item.color }}>{item.pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: "5px", borderRadius: "99px", background: "#f5f5f4", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.pct}%`, borderRadius: "99px", background: item.color, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── Top 3 spotlight ── */}
      {!loading && top3.length > 0 && (
        <div style={{
          background: "#fff", border: "1px solid #e8e2d9",
          borderRadius: "18px", padding: "24px 28px",
          marginBottom: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "3px", height: "18px", borderRadius: "2px", background: "linear-gradient(to bottom,#f59e0b,#d97706)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#7c6a58", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Top tỉnh thành nổi bật
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {top3.map((row, i) => {
              const region = row.province?.region;
              const rs     = REGION_STYLE[region] || { bg: "#f0f0f0", text: "#666", dot: "#aaa" };
              const pct    = Math.round(row.total / maxTotal * 100);
              const topGradients = [
                "linear-gradient(135deg,#fffbeb 0%,#fef9f0 100%)",
                "linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%)",
                "linear-gradient(135deg,#fffdf5 0%,#fef9f0 100%)",
              ];
              const topBorders = ["#f59e0b50", "#94a3b830", "#d97706"+"40"];
              const barColors  = ["#f59e0b", "#64748b", "#d97706"];

              return (
                <div key={row.provinceId} style={{
                  background: topGradients[i],
                  border: `1.5px solid ${topBorders[i]}`,
                  borderRadius: "14px", padding: "18px 20px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: "12px", right: "14px", fontSize: "1.7rem", lineHeight: 1 }}>{MEDALS[i]}</div>
                  <div style={{ fontSize: "0.66rem", fontWeight: 700, color: "#bbb", letterSpacing: "0.08em", marginBottom: "6px" }}>
                    #{i + 1}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a1a", marginBottom: "6px", paddingRight: "32px", lineHeight: 1.2 }}>
                    {row.province.name}
                  </div>
                  <span style={{ fontSize: "0.64rem", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: rs.bg, color: rs.text }}>
                    {REGION_VI[region] || region}
                  </span>

                  <div style={{ marginTop: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                      <span style={{ fontSize: "0.68rem", color: "#aaa" }}>Tổng tương tác</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#1a1a1a" }}>{row.total.toLocaleString()}</span>
                    </div>
                    <div style={{ height: "6px", borderRadius: "3px", background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: "3px", background: barColors[i], transition: "width 0.6s ease" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "18px", marginTop: "12px" }}>
                    <div>
                      <div style={{ fontSize: "0.62rem", color: "#aaa", marginBottom: "1px" }}>Lượt xem</div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1d4ed8" }}>{row.pageViews.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.62rem", color: "#aaa", marginBottom: "1px" }}>Ẩm thực</div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#15803d" }}>{row.specialtyClicks.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "14px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "#bbb" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm tỉnh thành..."
            style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: "10px", border: "1.5px solid #e5e0d8", fontSize: "0.875rem", background: "#fff", boxSizing: "border-box", outline: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", color: "#333" }}
          />
        </div>

        <div style={{ display: "flex", gap: 0, background: "#f5f0ea", borderRadius: "10px", padding: "4px", flexShrink: 0 }}>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              style={{
                padding: "7px 18px", borderRadius: "7px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                background: sort === s.key ? "#fff" : "transparent",
                color: sort === s.key ? "#b45309" : "#9a8a7a",
                boxShadow: sort === s.key ? "0 1px 5px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: "0.78rem", color: "#bbb", flexShrink: 0 }}>
          {rows.length} tỉnh
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ height: "68px", borderRadius: "12px", background: "linear-gradient(90deg,#f5f0ea 25%,#ede8e0 50%,#f5f0ea 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: "18px", border: "1px solid #ede8e0" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>📭</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>Chưa có dữ liệu tương tác</div>
          <div style={{ fontSize: "0.85rem", color: "#aaa", maxWidth: "340px", margin: "0 auto", lineHeight: 1.7 }}>
            Dữ liệu sẽ xuất hiện khi người dùng vào xem trang tỉnh và click vào nội dung
          </div>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: "18px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "44px 1fr 190px 90px 90px 84px",
            padding: "12px 24px",
            background: "linear-gradient(to right, #faf8f5, #f5f0ea)",
            borderBottom: "2px solid #ede8e0",
          }}>
            {[
              { label: "#", align: "center", color: "#ccc" },
              { label: "Tỉnh thành", align: "left", color: "#7c6a58" },
              { label: "Hoạt động", align: "left", color: "#7c6a58" },
              { label: "Lượt xem", align: "right", color: "#1d4ed8" },
              { label: "Ẩm thực", align: "right", color: "#15803d" },
              { label: "Tổng", align: "right", color: "#b45309" },
            ].map((col) => (
              <span key={col.label} style={{ fontSize: "0.67rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: col.color, textAlign: col.align }}>
                {col.label}
              </span>
            ))}
          </div>

          {rows.map((row, idx) => {
            const region     = row.province?.region;
            const rs         = REGION_STYLE[region] || { bg: "#f0f0f0", text: "#666", dot: "#aaa" };
            const viewsPct   = Math.round(row.pageViews / maxPageViews * 100);
            const specPct    = Math.round(row.specialtyClicks / maxSpecialty * 100);
            const isHovered  = hoveredId === row.provinceId;
            const abbr       = row.province.name.replace(/^(Tỉnh|Thành phố|TP\.?)\s*/i, "").slice(0, 2).toUpperCase();

            return (
              <div
                key={row.provinceId}
                onMouseEnter={() => setHoveredId(row.provinceId)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: "grid", gridTemplateColumns: "44px 1fr 190px 90px 90px 84px",
                  padding: "13px 24px",
                  borderBottom: idx < rows.length - 1 ? "1px solid #f5f0ea" : "none",
                  alignItems: "center",
                  background: isHovered ? "#faf8f5" : "#fff",
                  transition: "background 0.12s",
                  cursor: "default",
                }}
              >
                {/* Rank */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {idx < 3
                    ? <span style={{ fontSize: "1.15rem", lineHeight: 1 }}>{MEDALS[idx]}</span>
                    : <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ccc", fontVariantNumeric: "tabular-nums" }}>{idx + 1}</span>
                  }
                </div>

                {/* Province info */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: `linear-gradient(135deg, ${rs.bg} 0%, ${rs.bg}bb 100%)`,
                    border: `1.5px solid ${rs.dot}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "0.64rem", fontWeight: 900, color: rs.text, letterSpacing: "0.02em" }}>{abbr}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a1a", marginBottom: "3px" }}>
                      {row.province.name}
                    </div>
                    <span style={{
                      fontSize: "0.63rem", fontWeight: 700, padding: "1px 8px", borderRadius: "20px",
                      background: rs.bg, color: rs.text,
                    }}>
                      {REGION_VI[region] || region}
                    </span>
                  </div>
                </div>

                {/* Activity bars */}
                <div style={{ paddingRight: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "#94a3b8", width: "26px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>Xem</span>
                    <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "#e8f0fe", overflow: "hidden" }}>
                      <div style={{ width: `${viewsPct}%`, height: "100%", borderRadius: "3px", background: "linear-gradient(to right,#3b82f6,#60a5fa)", transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "#94a3b8", width: "20px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{viewsPct}%</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "#94a3b8", width: "26px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>Ẩm</span>
                    <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "#dcfce7", overflow: "hidden" }}>
                      <div style={{ width: `${specPct}%`, height: "100%", borderRadius: "3px", background: "linear-gradient(to right,#22c55e,#4ade80)", transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "#94a3b8", width: "20px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{specPct}%</span>
                  </div>
                </div>

                {/* Numbers */}
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1d4ed8", fontVariantNumeric: "tabular-nums" }}>
                    {row.pageViews.toLocaleString()}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#15803d", fontVariantNumeric: "tabular-nums" }}>
                    {row.specialtyClicks.toLocaleString()}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    fontSize: "1rem", fontWeight: 900, color: "#b45309", fontVariantNumeric: "tabular-nums",
                    background: isHovered ? "#fff7ed" : "transparent",
                    padding: "2px 8px", borderRadius: "6px", transition: "background 0.15s",
                  }}>
                    {row.total.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Footer totals */}
          <div style={{
            padding: "13px 24px",
            background: "linear-gradient(to right,#faf8f5,#f5f0ea)",
            borderTop: "2px solid #ede8e0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: "0.76rem", color: "#bbb" }}>{rows.length} tỉnh thành có dữ liệu</span>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#1d4ed8" }}>{totalPageViews.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#15803d" }}>{totalSpecialty.toLocaleString()}</span>
              </div>
              <div style={{ height: "16px", width: "1px", background: "#ddd" }} />
              <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#b45309" }}>
                Tổng: {totalAll.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </EditorLayout>
  );
}
