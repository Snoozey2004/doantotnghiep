import { useEffect, useRef, useState, useCallback } from "react";
import EditorLayout from "../layouts/EditorLayout.jsx";
import { PROVINCE_MARKERS, defaultMarkerPositions, mergeMarkerPositions } from "../data/provinceMarkers.js";
import { mapMarkerApi } from "../api/mapMarkerApi.js";

const MAP_IMAGE = "/Images/mapvn.jpg";

export default function EditorMapPage() {
  const mapRef = useRef(null);
  const innerRef = useRef(null);
  const dragState = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const rafRef = useRef(null);
  const markerDragRef = useRef(null);

  const [markerPos, setMarkerPos] = useState(defaultMarkerPositions);
  const [activeSlug, setActiveSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Tải vị trí đã lưu từ server
  useEffect(() => {
    mapMarkerApi
      .getAll()
      .then((list) => setMarkerPos(mergeMarkerPositions(list)))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const clampOffset = (offset, scale) => {
    const el = mapRef.current;
    if (!el) return offset;
    const maxX = (el.clientWidth * (scale - 1)) / 2;
    const maxY = (el.clientHeight * (scale - 1)) / 2;
    return { x: clamp(offset.x, -maxX, maxX), y: clamp(offset.y, -maxY, maxY) };
  };

  const applyTransform = (smooth = false) => {
    const el = innerRef.current;
    if (!el) return;
    const { x, y } = offsetRef.current;
    const s = scaleRef.current;
    el.style.transition = smooth ? "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)" : "none";
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    el.style.setProperty("--map-scale", s);
  };

  // Zoom + pan
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return undefined;

    const handleWheel = (e) => {
      e.preventDefault();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const delta = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
        const factor = 1 - delta * 0.0008;
        const prev = scaleRef.current;
        const next = clamp(prev * factor, 1, 8);
        if (next === prev) return;
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        const ratio = next / prev;
        const newOffset = {
          x: mx - ratio * (mx - offsetRef.current.x),
          y: my - ratio * (my - offsetRef.current.y),
        };
        scaleRef.current = next;
        offsetRef.current = clampOffset(newOffset, next);
        applyTransform();
      });
    };

    const handleMouseDown = (e) => {
      if (e.target.closest && e.target.closest(".home-map-marker")) return;
      e.preventDefault();
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: offsetRef.current.x,
        originY: offsetRef.current.y,
      };
      el.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      // Kéo marker
      const slug = markerDragRef.current;
      if (slug && innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMarkerPos((prev) => ({
          ...prev,
          [slug]: { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 },
        }));
        return;
      }
      // Pan bản đồ
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      offsetRef.current = clampOffset(
        { x: dragState.current.originX + dx, y: dragState.current.originY + dy },
        scaleRef.current
      );
      applyTransform();
    };

    const handleMouseUp = () => {
      dragState.current = null;
      markerDragRef.current = null;
      el.style.cursor = "grab";
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const resetZoom = () => {
    scaleRef.current = 1;
    offsetRef.current = { x: 0, y: 0 };
    applyTransform(true);
  };

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const payload = PROVINCE_MARKERS.map((m) => ({
        slug: m.slug,
        x: markerPos[m.slug]?.x ?? m.x,
        y: markerPos[m.slug]?.y ?? m.y,
      }));
      await mapMarkerApi.saveAll(payload);
      setSavedAt(Date.now());
    } catch {
      alert("Lưu vị trí thất bại, vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }, [markerPos]);

  return (
    <EditorLayout>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 240px", gap: "20px", alignItems: "start" }}>
        {/* ── Bản đồ ── */}
        <div>
          <div style={{ marginBottom: "14px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1c1917", margin: 0 }}>
              Chỉnh sửa vị trí bản đồ
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#78716c", margin: "4px 0 0" }}>
              Cuộn chuột để zoom · kéo nền để di chuyển · <strong>kéo marker đỏ</strong> để đặt đúng vị trí tỉnh thành. Nhấn <strong>Lưu</strong> để áp dụng cho trang chủ.
            </p>
          </div>

          <div
            className="home-map-image"
            ref={mapRef}
            style={{ cursor: "grab" }}
            title="Cuộn để zoom, kéo marker để chỉnh"
          >
            <div ref={innerRef} className="home-map-inner markers-on" style={{ transformOrigin: "center center" }}>
              <img
                src={MAP_IMAGE}
                alt="Bản đồ Việt Nam"
                draggable="false"
                style={{ userSelect: "none", pointerEvents: "none", display: "block", width: "100%" }}
              />
              <div className="home-map-markers">
                {PROVINCE_MARKERS.map((m) => {
                  const pos = markerPos[m.slug] || { x: m.x, y: m.y };
                  const isActive = activeSlug === m.slug;
                  return (
                    <button
                      key={m.slug}
                      type="button"
                      className={`home-map-marker is-calib${isActive ? " is-active" : ""}`}
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      title={m.name}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        markerDragRef.current = m.slug;
                        setActiveSlug(m.slug);
                      }}
                    >
                      <span className="home-map-marker-dot" />
                      <span className="home-map-marker-label">{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <button className="home-map-reset" onClick={resetZoom} title="Về mức zoom mặc định">
              ↺ Mặc định
            </button>
          </div>
        </div>

        {/* ── Bảng điều khiển ── */}
        <aside
          style={{
            position: "sticky",
            top: "96px",
            background: "#fff",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0 8px 32px rgba(15,23,42,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c6a58", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Thao tác
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !loaded}
            style={{
              padding: "11px", borderRadius: "10px", border: "none",
              background: saving ? "#a8a29e" : "linear-gradient(135deg,#b45309,#d97706)",
              color: "#fff", fontWeight: 700, fontSize: "0.9rem",
              cursor: saving ? "default" : "pointer",
              boxShadow: "0 4px 12px rgba(180,83,9,0.30)",
            }}
          >
            {saving ? "Đang lưu…" : "💾 Lưu vị trí"}
          </button>

          {savedAt && (
            <div style={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 600, textAlign: "center" }}>
              ✓ Đã lưu lúc {new Date(savedAt).toLocaleTimeString("vi-VN")}
            </div>
          )}

          <div style={{ height: "1px", background: "#f0ebe3", margin: "4px 0" }} />

          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c6a58", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {activeSlug ? "Đang chọn" : "Mẹo"}
          </div>
          {activeSlug ? (
            <div style={{ fontSize: "0.85rem", color: "#1c1917" }}>
              <div style={{ fontWeight: 700 }}>
                {PROVINCE_MARKERS.find((m) => m.slug === activeSlug)?.name}
              </div>
              <div style={{ color: "#78716c", marginTop: "2px" }}>
                x: {markerPos[activeSlug]?.x}% · y: {markerPos[activeSlug]?.y}%
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "0.82rem", color: "#78716c", lineHeight: 1.6 }}>
              Zoom sâu vào từng vùng rồi kéo marker cho chính xác. Vị trí lưu trên máy chủ nên hiển thị cho mọi người xem trang chủ.
            </div>
          )}
        </aside>
      </div>
    </EditorLayout>
  );
}
