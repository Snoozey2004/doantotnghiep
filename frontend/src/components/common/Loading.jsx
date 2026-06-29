export default function Loading({ label = "Đang tải…" }) {
  return (
    <div className="vx-spinner" role="status" aria-live="polite">
      <div className="vx-spinner__ring" aria-hidden="true" />
      <div className="vx-spinner__label">{label}</div>
    </div>
  );
}
