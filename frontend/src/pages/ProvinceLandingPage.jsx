import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import ProvinceHero from "../components/landing/ProvinceHero.jsx";
import ProvinceIntro from "../components/landing/ProvinceIntro.jsx";
import ProvinceSpecialties from "../components/landing/ProvinceSpecialties.jsx";
import ProvinceTourism from "../components/landing/ProvinceTourism.jsx";
import ProvinceCulture from "../components/landing/ProvinceCulture.jsx";
import ProvinceGallery from "../components/landing/ProvinceGallery.jsx";
import ProvinceCTA from "../components/landing/ProvinceCTA.jsx";
import HeroBanner from "../components/landing/HeroBanner.jsx";
import IntroBlock from "../components/landing/IntroBlock.jsx";
import GalleryBlock from "../components/landing/GalleryBlock.jsx";
import VideoBlock from "../components/landing/VideoBlock.jsx";
import ArticleBlock from "../components/landing/ArticleBlock.jsx";
import ProductBlock from "../components/landing/ProductBlock.jsx";
import provinces from "../data/provinceData";
import { provinceApi } from "../api/provinceApi";
import { landingConfigApi } from "../api/landingConfigApi";
import { postApi } from "../api/postApi";
import { productApi } from "../api/productApi";
import { mediaApi } from "../api/mediaApi";
import { analyticsApi } from "../api/analyticsApi";

export default function ProvinceLandingPage() {
  const { slug } = useParams();
  const province = useMemo(
    () => provinces.find((item) => item.slug === slug),
    [slug]
  );
  const [provinceData, setProvinceData] = useState(null);
  const [config, setConfig] = useState(null);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [provinceResult, configResult] = await Promise.all([
          provinceApi.getBySlug(slug),
          landingConfigApi.getByProvinceSlug(slug)
        ]);
        if (!isMounted) {
          return;
        }
        setProvinceData(provinceResult);
        setConfig(configResult);

        if (provinceResult?.id) {
          const [postResult, productResult, mediaResult] = await Promise.all([
            postApi.getByProvince(provinceResult.id),
            productApi.getByProvince(provinceResult.id),
            mediaApi.getByProvince(provinceResult.id)
          ]);
          if (!isMounted) {
            return;
          }
          setPosts(postResult || []);
          setProducts(productResult || []);
          setMediaItems(mediaResult || []);
        }
      } catch {
        if (isMounted) {
          setProvinceData(null);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!provinceData?.id) {
      return;
    }

    analyticsApi.track({
      provinceId: provinceData.id,
      eventType: "page_view",
      metadataJson: JSON.stringify({ slug })
    });
  }, [provinceData?.id, slug]);

  const featuredMedia = useMemo(
    () => mediaItems.filter((item) => item.isFeatured),
    [mediaItems]
  );
  const galleryImages = useMemo(
    () => mediaItems.filter((item) => item.mediaType === "image").map((item) => item.url),
    [mediaItems]
  );
  const videoItem = useMemo(
    () => mediaItems.find((item) => item.mediaType === "video"),
    [mediaItems]
  );

  if (!province) {
    return (
      <MainLayout>
        <div className="province-page province-missing">
          <div className="container">
            <h1>Không tìm thấy tỉnh thành</h1>
            <p>Hãy quay về bản đồ để chọn điểm đến khác.</p>
            <ProvinceCTA />
          </div>
        </div>
      </MainLayout>
    );
  }

  const accentColor = config?.themeColor || province.accentColor;
  const heroImage = featuredMedia.find((item) => item.mediaType === "hero")?.url
    || province.heroImage;
  const introImage = featuredMedia.find((item) => item.mediaType === "intro")?.url
    || province.introImage;

  return (
    <MainLayout>
      <div className="province-page" style={{ "--accent": accentColor }}>
        {config ? (
          <>
            <HeroBanner
              title={provinceData?.name || province.name}
              subtitle={provinceData?.description || province.description}
              imageUrl={config.backgroundUrl || heroImage}
            />
            <IntroBlock
              title={provinceData?.name || province.name}
              description={provinceData?.description || province.description}
            />
            {galleryImages.length > 0 && (
              <GalleryBlock title="Khoảnh khắc địa phương" images={galleryImages} />
            )}
            {videoItem?.url && (
              <VideoBlock title={videoItem.title || "Video"} videoUrl={videoItem.url} />
            )}
            {products.length > 0 && (
              <ProductBlock title="Đặc sản nổi bật" products={products} />
            )}
            {posts.length > 0 && (
              <ArticleBlock title="Bài viết nổi bật" posts={posts} />
            )}
            <ProvinceCTA />
          </>
        ) : (
          <>
            <ProvinceHero province={{ ...province, heroImage }} />
            <ProvinceIntro province={{ ...province, introImage }} />
            <ProvinceSpecialties province={province} />
            <ProvinceTourism province={province} />
            <ProvinceCulture province={province} />
            <ProvinceGallery province={province} />
            <ProvinceCTA />
          </>
        )}
      </div>
    </MainLayout>
  );
}
