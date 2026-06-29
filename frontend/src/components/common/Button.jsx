import useMagnetic from "../../hooks/useMagnetic.js";

/**
 * Button — tương thích ngược hoàn toàn với cách dùng cũ.
 *   <Button>…</Button>                  → btn btn-primary (như trước)
 *   <Button variant="outline">          → btn btn-outline
 *
 * Biến thể cao cấp (opt-in, dùng cho giao diện mới):
 *   <Button premium>                    → vx-btn (nền mực, mực trượt khi hover)
 *   <Button premium variant="ghost">    → viền mảnh
 *   <Button premium variant="ondark">   → đặt trên nền ảnh tối
 *   <Button premium magnetic>           → hiệu ứng nam châm theo con trỏ
 */
export default function Button({
  children,
  variant = "primary",
  premium = false,
  magnetic = false,
  className = "",
  ...props
}) {
  const magRef = useMagnetic(magnetic ? 0.3 : 0);

  if (!premium) {
    const legacy = variant === "primary" ? "btn btn-primary" : `btn btn-${variant}`;
    return (
      <button className={`${legacy} ${className}`.trim()} {...props}>
        {children}
      </button>
    );
  }

  const modifier = variant && variant !== "primary" ? ` vx-btn--${variant}` : "";
  const btn = (
    <button className={`vx-btn${modifier} ${className}`.trim()} {...props}>
      <span className="vx-btn__label">{children}</span>
    </button>
  );

  if (!magnetic) return btn;
  return (
    <span className="vx-magnetic" ref={magRef}>
      {btn}
    </span>
  );
}
