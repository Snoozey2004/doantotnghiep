import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { provinceApi } from "../api/provinceApi";
import { landingConfigApi } from "../api/landingConfigApi";
import { productApi } from "../api/productApi";
import { postApi } from "../api/postApi";
import { mediaApi } from "../api/mediaApi";
import Loading from "../components/common/Loading.jsx";
import HeroBanner from "../components/landing/HeroBanner.jsx";
import IntroBlock from "../components/landing/IntroBlock.jsx";
import GalleryBlock from "../components/landing/GalleryBlock.jsx";
import VideoBlock from "../components/landing/VideoBlock.jsx";
import ProductBlock from "../components/landing/ProductBlock.jsx";
import ArticleBlock from "../components/landing/ArticleBlock.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

const defaultBlocks = [
  { blockType: "hero", title: "Hero", sortOrder: 1 },
  { blockType: "intro", title: "Giới thiệu", sortOrder: 2 },
  { blockType: "gallery", title: "Gallery", sortOrder: 3 },
  { blockType: "video", title: "Video", sortOrder: 4 },
  { blockType: "products", title: "Đặc sản", sortOrder: 5 },
  { blockType: "articles", title: "Bài viết", sortOrder: 6 }
];

export default function ProvinceLandingPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [province, setProvince] = useState(null);
  const [config, setConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const provinceData = await provinceApi.getBySlug(slug);
        const configData = await landingConfigApi.getByProvinceSlug(slug);
        const [productData, postData, mediaData] = await Promise.all([
          productApi.getByProvince(provinceData.id),
          postApi.getByProvince(provinceData.id),
          mediaApi.getByProvince(provinceData.id)
        ]);

        if (isMounted) {
          setProvince(provinceData);
          setConfig(configData);
          setProducts(productData);
          setPosts(postData);
          setMediaItems(mediaData);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const blocks = useMemo(() => {
    const configBlocks = config?.blocks?.length ? config.blocks : defaultBlocks;
    return [...configBlocks].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [config]);

  if (loading || !province) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  const galleryImages = mediaItems.length
    ? mediaItems.filter((item) => item.mediaType === "image").map((item) => item.url)
    : [province.imageUrl];

  const themeStyles = {
    background: config?.backgroundUrl ? `url(${config.backgroundUrl})` : undefined,
    fontFamily: config?.fontFamily || undefined,
    color: config?.themeColor || undefined
  };

  return (
    <div style={themeStyles}>
      {blocks.map((block) => {
        const type = block.blockType?.toLowerCase();
        if (type === "hero") {
          return (
            <HeroBanner
              key={block.id || block.blockType}
              title={province.name}
              subtitle={province.description}
              imageUrl={province.imageUrl}
            />
          );
        }

        if (type === "intro") {
          return <IntroBlock key={block.id || block.blockType} title={block.title} description={province.description} />;
        }

        if (type === "gallery") {
          return <GalleryBlock key={block.id || block.blockType} title={block.title} images={galleryImages} />;
        }

        if (type === "video") {
          return <VideoBlock key={block.id || block.blockType} title={block.title} videoUrl={province.videoUrl} />;
        }

        if (type === "products") {
          return <ProductBlock key={block.id || block.blockType} title={block.title} products={products} />;
        }

        if (type === "articles") {
          return <ArticleBlock key={block.id || block.blockType} title={block.title} posts={posts} />;
        }

        return null;
      })}
    </div>
  );
}
