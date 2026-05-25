export default function RichTextDisplay({ html, className = "" }) {
  if (!html) return null;

  return (
    <div
      className={`rich-text-display ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
