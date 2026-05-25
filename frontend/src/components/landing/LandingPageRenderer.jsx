import { useMemo } from "react";
import ProvinceHero from "./ProvinceHero.jsx";
import ProvinceIntro from "./ProvinceIntro.jsx";
import ProvinceSpecialties from "./ProvinceSpecialties.jsx";
import ProvinceTourism from "./ProvinceTourism.jsx";
import ProvinceCulture from "./ProvinceCulture.jsx";
import ProvinceGallery from "./ProvinceGallery.jsx";
import ProvinceCTA from "./ProvinceCTA.jsx";
import VideoBlock from "./VideoBlock.jsx";
import ArticleBlock from "./ArticleBlock.jsx";
import ProductBlock from "./ProductBlock.jsx";
import RichTextDisplay from "../RichTextDisplay.jsx";

const DEFAULT_BLOCK_TYPES = [
  "hero",
  "intro",
  "richText",
  "highlights",
  "specialties",
  "tourism",
  "culture",
  "gallery",
  "media",
  "video",
  "articles",
  "products",
  "cta"
];

function parseContentJson(block) {
  if (!block?.contentJson) {
    return {};
  }

  try {
    return JSON.parse(block.contentJson);
  } catch {
    return {};
  }
}

function buildBlockList(blocks) {
  const source = blocks?.length ? blocks : DEFAULT_BLOCK_TYPES.map((blockType, index) => ({
    id: blockType,
    blockType,
    title: blockType,
    sortOrder: index + 1,
    isEnabled: true,
    contentJson: "{}"
  }));

  return [...source]
    .filter((block) => block.isEnabled !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

function parseBlockItems(content, fallback = []) {
  if (Array.isArray(content?.items) && content.items.length > 0) {
    return content.items;
  }

  return fallback;
}

function parseBlockGallery(content, fallback = []) {
  if (Array.isArray(content?.images) && content.images.length > 0) {
    return content.images;
  }

  if (Array.isArray(content?.items) && content.items.length > 0) {
    return content.items.map((item) => (typeof item === "string" ? item : item?.url || item?.image || item?.imageUrl)).filter(Boolean);
  }

  return fallback;
}

export default function LandingPageRenderer({ province, blocks, posts = [], products = [], mediaItems = [] }) {
  const sortedBlocks = useMemo(() => buildBlockList(blocks), [blocks]);

  const mediaImages = useMemo(
    () => mediaItems.filter((item) => item.mediaType === "image"),
    [mediaItems]
  );
  const mediaVideos = useMemo(
    () => mediaItems.filter((item) => item.mediaType === "video"),
    [mediaItems]
  );

  if (!province) {
    return null;
  }

  const renderBlock = (block) => {
    const content = parseContentJson(block);

    switch (block.blockType) {
      case "hero":
        return (
          <ProvinceHero
            key={block.id}
            province={{
              ...province,
              name: content.title || province.name,
              slogan: content.subtitle || province.slogan,
              description: content.description || province.description,
              heroImage: content.imageUrl || province.heroImage
            }}
          />
        );
      case "intro":
        return (
          <ProvinceIntro
            key={block.id}
            province={{
              ...province,
              name: content.title || province.name,
              slogan: content.subtitle || province.slogan,
              description: content.description || province.description,
              introImage: content.imageUrl || province.introImage
            }}
          />
        );
      case "richText":
        return (
          <section key={block.id} className="province-section province-rich-text">
            <div className="container">
              {content.title && <div className="province-section-heading"><h2 className="province-section-title">{content.title}</h2></div>}
              <RichTextDisplay html={content.html || province.body} />
            </div>
          </section>
        );
      case "highlights":
        return (
          <section key={block.id} className="province-section province-highlights">
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
        );
      case "specialties":
        return <ProvinceSpecialties key={block.id} province={{ ...province, specialties: parseBlockItems(content, province.specialties) }} />;
      case "tourism":
        return <ProvinceTourism key={block.id} province={{ ...province, tourism: parseBlockItems(content, province.tourism) }} />;
      case "culture":
        return <ProvinceCulture key={block.id} province={{ ...province, culture: parseBlockItems(content, province.culture) }} />;
      case "gallery":
        return <ProvinceGallery key={block.id} province={{ ...province, gallery: parseBlockGallery(content, province.gallery) }} />;
      case "media":
        return (
          <section key={block.id} className="province-section province-media">
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
        );
      case "video":
        return <VideoBlock key={block.id} title={content.title || "Video"} videoUrl={content.videoUrl || province.videoUrl} />;
      case "articles":
        return <ArticleBlock key={block.id} title={content.title || "Bài viết nổi bật"} posts={posts} />;
      case "products":
        return <ProductBlock key={block.id} title={content.title || "Đặc sản địa phương"} products={products} />;
      case "cta":
        return <ProvinceCTA key={block.id} />;
      default:
        return null;
    }
  };

  return (
    <>
      {sortedBlocks.map(renderBlock)}
      {sortedBlocks.length === 0 && (
        <>
          <ProvinceHero province={province} />
          <ProvinceIntro province={province} />
          <ProvinceSpecialties province={province} />
          <ProvinceTourism province={province} />
          <ProvinceCulture province={province} />
          <ProvinceGallery province={province} />
          <ProvinceCTA />
        </>
      )}
      {mediaImages.length > 0 && sortedBlocks.every((block) => block.blockType !== "gallery") && (
        <section className="province-section province-media-images">
          <div className="container">
            <div className="province-section-heading">
              <h2 className="province-section-title">Hình ảnh</h2>
            </div>
            <div className="grid gallery">
              {mediaImages.map((item) => (
                <img key={item.id} src={item.url} alt={item.title} loading="lazy" />
              ))}
            </div>
          </div>
        </section>
      )}
      {mediaVideos.length > 0 && sortedBlocks.every((block) => block.blockType !== "video") && (
        <section className="province-section province-media-videos">
          <div className="container">
            {mediaVideos.map((item) => (
              <VideoBlock key={item.id} title={item.title || "Video"} videoUrl={item.url} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
