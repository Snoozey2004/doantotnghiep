export default function Button({ children, variant = "primary", ...props }) {
  const className = variant === "primary" ? "btn btn-primary" : "btn";
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
