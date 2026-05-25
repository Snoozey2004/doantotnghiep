import React, { useMemo } from "react";
import ProvinceHero from "./ProvinceHero.jsx";
import ProvinceIntro from "./ProvinceIntro.jsx";
import ProvinceSpecialties from "./ProvinceSpecialties.jsx";
import ProvinceTourism from "./ProvinceTourism.jsx";
import ProvinceCulture from "./ProvinceCulture.jsx";
import ProvinceGallery from "./ProvinceGallery.jsx";
import RichTextDisplay from "../RichTextDisplay.jsx";

export default function CanvasBlockPreview({ block, province = {} }) {
  const parseContent = (contentJson) => {
    try {
      return typeof contentJson === "string" ? JSON.parse(contentJson) : contentJson || {};
    } catch {
      return {};
    }
  };

  const parseBlockItems = (content, fallback = []) => {
    if (Array.isArray(content?.items) && content.items.length > 0) {
      return content.items;
    }
    return fallback;
  };

  const parseBlockGallery = (content, fallback = []) => {
    if (Array.isArray(content?.images) && content.images.length > 0) {
      return content.images;
    }
    if (Array.isArray(content?.items) && content.items.length > 0) {
      return content.items.map((item) => (typeof item === "string" ? item : item?.url || item?.image || item?.imageUrl)).filter(Boolean);
    }
    return fallback;
  };

  const content = useMemo(() => parseContent(block.contentJson), [block.contentJson]);

  // Scale down for preview while maintaining proportions
  const previewStyle = {
    transform: "scale(0.8)",
    transformOrigin: "top left",
    width: "125%",
    marginBottom: "-20%"
  };

  const renderPreview = () => {
    switch (block.blockType) {
      case "hero":
        return (
          <div style={previewStyle}>
            <ProvinceHero
              province={{
                ...province,
                name: content.title || province.name,
                slogan: content.subtitle || province.slogan,
                description: content.description || province.description,
                heroImage: content.imageUrl || province.heroImage
              }}
            />
          </div>
        );

      case "intro":
        return (
          <div style={previewStyle}>
            <ProvinceIntro
              province={{
                ...province,
                name: content.title || province.name,
                slogan: content.subtitle || province.slogan,
                description: content.description || province.description,
                introImage: content.imageUrl || province.introImage
              }}
            />
          </div>
        );

      case "richText":
        return (
          <div style={previewStyle}>
            <section className="province-section province-rich-text">
              <div className="container">
                {content.title && (
                  <div className="province-section-heading">
                    <h2 className="province-section-title">{content.title}</h2>
                  </div>
                )}
                <RichTextDisplay html={content.html || province.body} />
              </div>
            </section>
          </div>
        );

      case "highlights":
        return (
          <div style={previewStyle}>
            <section className="province-section province-highlights">
              <div className="container">
                <div className="province-section-heading">
                  <h2 className="province-section-title">{content.title || "Điểm nhấn"}</h2>
                  <p className="province-section-text">{content.description || province.overview || province.description}</p>
                </div>
                <div className="province-highlight">
                  {(content.items?.length ? content.items : (province.keyFeatures ? province.keyFeatures.split(",").map((item) => item.trim()).filter(Boolean) : []))
                    .map((item) => (
                      <span key={item} className="tag" style={{ marginRight: 8, marginBottom: 8, display: "inline-block" }}>{item}</span>
                    ))}
                </div>
              </div>
            </section>
          </div>
        );

      case "specialties":
        return (
          <div style={previewStyle}>
            <ProvinceSpecialties
              province={{ ...province, specialties: parseBlockItems(content, province.specialties) }}
            />
          </div>
        );

      case "tourism":
        return (
          <div style={previewStyle}>
            <ProvinceTourism
              province={{ ...province, tourism: parseBlockItems(content, province.tourism) }}
            />
          </div>
        );

      case "culture":
        return (
          <div style={previewStyle}>
            <ProvinceCulture
              province={{ ...province, culture: parseBlockItems(content, province.culture) }}
            />
          </div>
        );

      case "gallery":
        return (
          <div style={previewStyle}>
            <ProvinceGallery
              province={{ ...province, gallery: parseBlockGallery(content, province.gallery) }}
            />
          </div>
        );

      case "media":
        return (
          <div style={previewStyle}>
            <section className="province-section province-media">
              <div className="container">
                <div className="province-section-heading">
                  <h2 className="province-section-title">{content.title || "Hình ảnh & video"}</h2>
                  <p className="province-section-text">{content.description || province.description}</p>
                </div>
                <div className="grid landing-grid">
                  {(content.imageUrl || province.imageUrl) && (
                    <div className="card card-hover">
                      <img src={content.imageUrl || province.imageUrl} alt={province.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 16 }} />
                      <h3 style={{ marginTop: 16 }}>{province.name}</h3>
                    </div>
                  )}
                  {(content.videoUrl || province.videoUrl) && (
                    <div className="card card-hover">
                      <iframe title={province.name} src={content.videoUrl || province.videoUrl} style={{ width: "100%", minHeight: 220, border: 0, borderRadius: 16 }} allowFullScreen />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        );

      case "cta":
        return (
          <div style={previewStyle}>
            <section className="province-section province-cta">
              <div className="container">
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                    {content.title || "Liên hệ ngay"}
                  </h2>
                  <p style={{ fontSize: 16, color: "#64748b", marginBottom: 24 }}>
                    {content.description || "Hãy liên hệ với chúng tôi để tìm hiểu thêm"}
                  </p>
                  <button style={{
                    padding: "12px 32px",
                    fontSize: 16,
                    fontWeight: 600,
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer"
                  }}>
                    {content.buttonText || "Liên hệ"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div style={{ padding: 16, background: "#f1f5f9", borderRadius: 4, textAlign: "center", color: "#64748b" }}>
            <p>Kiểu block không được hỗ trợ: {block.blockType}</p>
          </div>
        );
    }
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {renderPreview()}
    </div>
  );
}
