import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import ProvinceHero from "../components/landing/ProvinceHero.jsx";
import ProvinceIntro from "../components/landing/ProvinceIntro.jsx";
import ProvinceTimeline from "../components/landing/ProvinceTimeline.jsx";
import ProvinceSpecialties from "../components/landing/ProvinceSpecialties.jsx";
import ProvinceCulture from "../components/landing/ProvinceCulture.jsx";
import ProvinceCraftVillages from "../components/landing/ProvinceCraftVillages.jsx";
import ProvinceFestivals from "../components/landing/ProvinceFestivals.jsx";
import ProvinceGallery from "../components/landing/ProvinceGallery.jsx";
import ProvinceCTA from "../components/landing/ProvinceCTA.jsx";
import ProvinceCharts from "../components/landing/ProvinceCharts.jsx";
import provinces from "../data/provinceData";
import { provinceApi } from "../api/provinceApi";
import { landingConfigApi } from "../api/landingConfigApi";
import { postApi } from "../api/postApi";
import { productApi } from "../api/productApi";
import { mediaApi } from "../api/mediaApi";
import { analyticsApi } from "../api/analyticsApi";
import LandingPageRenderer from "../components/landing/LandingPageRenderer.jsx";
import { uiBlockApi } from "../api/uiBlockApi";
import TrongDongDecor from "../components/common/TrongDongDecor.jsx";

export default function ProvinceLandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const province = useMemo(
    () => provinces.find((item) => item.slug === slug),
    [slug]
  );
  const [provinceData, setProvinceData] = useState(null);
  const [config, setConfig] = useState(null);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [relatedProvinces, setRelatedProvinces] = useState([]);
  const [isImportingLanding, setIsImportingLanding] = useState(false);

  const buildProvincePayload = (sourceProvince) => ({
    name: sourceProvince?.name || province?.name || slug,
    description: sourceProvince?.description || province?.description || "",
    overview: sourceProvince?.slogan || province?.slogan || "",
    keyFeatures: sourceProvince?.keyFeatures || province?.keyFeatures || "",
    region: sourceProvince?.region || "",
    imageUrl: sourceProvince?.imageUrl || province?.imageUrl || sourceProvince?.heroImage || province?.heroImage || "",
    videoUrl: sourceProvince?.videoUrl || province?.videoUrl || "",
    introduction: sourceProvince?.introduction || "",
    introductionEn: sourceProvince?.introductionEn || "",
    body: sourceProvince?.body || "",
    tags: sourceProvince?.tags || "",
    isHighlighted: Boolean(sourceProvince?.isHighlighted),
    highlightOrder: sourceProvince?.highlightOrder || 0,
    slug: sourceProvince?.slug || slug
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [provinceResult, configResult] = await Promise.allSettled([
          provinceApi.getBySlug(slug),
          landingConfigApi.getByProvinceSlug(slug)
        ]);

        if (!isMounted) {
          return;
        }

        const resolvedProvince = provinceResult.status === "fulfilled" ? provinceResult.value : null;
        const resolvedConfig = configResult.status === "fulfilled" ? configResult.value : null;

        setProvinceData(resolvedProvince);
        setConfig(resolvedConfig);

        if (resolvedProvince?.id) {
          const [postResult, productResult, mediaResult] = await Promise.all([
            postApi.getByProvince(resolvedProvince.id),
            productApi.getByProvince(resolvedProvince.id),
            mediaApi.getByProvince(resolvedProvince.id)
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
          setConfig(null);
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

  const handleEditLanding = async () => {
    if (config?.id) {
      navigate(`/admin/landing/${config.id}/edit`);
      return;
    }

    let provinceId = provinceData?.id;
    let resolvedProvince = provinceData;

    if (!provinceId) {
      try {
        resolvedProvince = await provinceApi.getBySlug(slug);
        provinceId = resolvedProvince?.id;
        if (resolvedProvince) {
          setProvinceData(resolvedProvince);
        }
      } catch {
        resolvedProvince = null;
      }
    }

    if (!provinceId) {
      try {
        const createdProvince = await provinceApi.create(buildProvincePayload(province));
        provinceId = createdProvince?.id;
        resolvedProvince = createdProvince;
        if (createdProvince) {
          setProvinceData(createdProvince);
        }
      } catch {
        return;
      }
    }

    if (!provinceId) {
      return;
    }

    setIsImportingLanding(true);
    try {
      const fallbackProvince = resolvedProvince || province;
      const createdConfig = await landingConfigApi.create({
        provinceId,
        themeColor: fallbackProvince?.accentColor || "#2563eb",
        fontFamily: "Inter",
        backgroundUrl: fallbackProvince?.heroImage || "",
        layout: "default",
        blocks: []
      });

      if (createdConfig?.provinceId) {
        setConfig(createdConfig);
      }

      const blocksToCreate = [
        {
          blockType: "hero",
          title: fallbackProvince?.name || provinceData?.name || province.name,
          contentJson: JSON.stringify({
            title: fallbackProvince?.name || provinceData?.name || province.name,
            subtitle: fallbackProvince?.slogan || provinceData?.overview || province.slogan || "",
            description: fallbackProvince?.description || provinceData?.description || province.description || "",
            imageUrl: fallbackProvince?.heroImage || provinceData?.imageUrl || province.heroImage || ""
          }),
          sortOrder: 1,
          isEnabled: true
        },
        {
          blockType: "intro",
          title: "Giới thiệu",
          contentJson: JSON.stringify({
            title: fallbackProvince?.name || provinceData?.name || province.name,
            subtitle: fallbackProvince?.slogan || provinceData?.overview || province.slogan || "",
            description: fallbackProvince?.description || provinceData?.description || province.description || "",
            imageUrl: fallbackProvince?.introImage || provinceData?.imageUrl || province.introImage || ""
          }),
          sortOrder: 2,
          isEnabled: true
        },
        {
          blockType: "richText",
          title: "Nội dung",
          contentJson: JSON.stringify({ html: provinceData?.body || province.body || "" }),
          sortOrder: 3,
          isEnabled: true
        },
        {
          blockType: "highlights",
          title: "Điểm nhấn",
          contentJson: JSON.stringify({
            title: "Điểm nhấn",
            description: fallbackProvince?.description || provinceData?.description || province.description || "",
            items: fallbackProvince?.keyFeatures ? fallbackProvince.keyFeatures.split(",").map((item) => item.trim()).filter(Boolean) : []
          }),
          sortOrder: 4,
          isEnabled: true
        },
        {
          blockType: "specialties",
          title: "Đặc sản",
          contentJson: JSON.stringify({ title: "Đặc sản", items: fallbackProvince?.specialties || [] }),
          sortOrder: 5,
          isEnabled: true
        },
        {
          blockType: "tourism",
          title: "Du lịch",
          contentJson: JSON.stringify({ title: "Du lịch", items: fallbackProvince?.tourism || [] }),
          sortOrder: 6,
          isEnabled: true
        },
        {
          blockType: "culture",
          title: "Văn hóa",
          contentJson: JSON.stringify({ title: "Văn hóa", items: fallbackProvince?.culture || [] }),
          sortOrder: 7,
          isEnabled: true
        },
        {
          blockType: "gallery",
          title: "Thư viện ảnh",
          contentJson: JSON.stringify({ title: "Thư viện ảnh", images: fallbackProvince?.gallery || [] }),
          sortOrder: 8,
          isEnabled: true
        },
        {
          blockType: "cta",
          title: "CTA",
          contentJson: "{}",
          sortOrder: 9,
          isEnabled: true
        }
      ];

      for (const block of blocksToCreate) {
        await uiBlockApi.create(createdConfig.id, block);
      }

      navigate(`/admin/landing/${createdConfig.id}/edit`);
    } finally {
      setIsImportingLanding(false);
    }
  };

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

  const infoImageMap = {
    "ha-noi": "/Images/infohanoi.png",
    "hai-phong": "/Images/infohaiphong.png",
    "ho-chi-minh": "/Images/infothanhphohochiminh.png",
    "hue": "/Images/infohue.jpg",
    "da-nang": "/Images/infodanang.jpg",
  };
  const infoImage = infoImageMap[slug];

  const provinceVideoMap = {
    "ho-chi-minh": "/Landingpagevideo/hochiminh.mp4",
    "ha-noi": "/Landingpagevideo/hanoi.mp4",
    "hai-phong": "/Landingpagevideo/haiphong.mp4",
    "da-nang": "/Landingpagevideo/danang.mp4",
    "hue": "/Landingpagevideo/hue.mp4",
    "can-tho": "/Landingpagevideo/cantho.mp4",
    "cao-bang": "/Landingpagevideo/caobang.mp4",
    "dien-bien": "/Landingpagevideo/dienbien.mp4",
    "lai-chau": "/Landingpagevideo/laichau.mp4",
    "lang-son": "/Landingpagevideo/langson.mp4",
    "lao-cai": "/Landingpagevideo/laocai.mp4",
    "thai-nguyen": "/Landingpagevideo/thainguyen.mp4",
    "phu-tho": "/Landingpagevideo/phutho.mp4",
    "bac-ninh": "/Landingpagevideo/bacninh.mp4",
    "hung-yen": "/Landingpagevideo/hungyen.mp4",
    "ninh-binh": "/Landingpagevideo/ninhbinh.mp4",
    "quang-ninh": "/Landingpagevideo/quangninh.mp4",
    "son-la": "/Landingpagevideo/sonla.mp4",
    "tuyen-quang": "/Landingpagevideo/tuyenquan.mp4",
    "thanh-hoa": "/Landingpagevideo/thanhhoa.mp4",
    "nghe-an": "/Landingpagevideo/nghean.mp4",
    "ha-tinh": "/Landingpagevideo/hatinh.mp4",
    "quang-tri": "/Landingpagevideo/quangtri.mp4",
    "quang-ngai": "/Landingpagevideo/quangngai.mp4",
    "gia-lai": "/Landingpagevideo/gialai.mp4",
    "khanh-hoa": "/Landingpagevideo/khanhhoa.mp4",
    "lam-dong": "/Landingpagevideo/lamdong.mp4",
    "dak-lak": "/Landingpagevideo/daklak.mp4",
    "dong-nai": "/Landingpagevideo/dongnai.mp4",
    "tay-ninh": "/Landingpagevideo/tayninh.mp4",
    "vinh-long": "/Landingpagevideo/vinhlong.mp4",
    "dong-thap": "/Landingpagevideo/dongthap.mp4",
    "an-giang": "/Landingpagevideo/angiang.mp4",
    "ca-mau": "/Landingpagevideo/camau.mp4",
  };
  const provinceVideo = provinceVideoMap[slug];

  return (
    <MainLayout>
      <div className="province-page" style={{ "--accent": accentColor }}>
        <ProvinceHero province={{ ...province, heroImage }} />
        <ProvinceIntro province={{ ...province, introImage }} />
        {provinceVideo && (
          <div className="province-video-section">
            <div className="container">
              <p className="province-video-section__kicker">Khám phá</p>
              <h2 className="province-video-section__title">Video về {province.name}</h2>
              <video
                className="province-video"
                src={provinceVideo}
                controls
                muted
                loop
                playsInline
              />
            </div>
          </div>
        )}
        <ProvinceCharts province={province} />
        <ProvinceTimeline province={province} />
        <ProvinceCulture province={province} />
        <ProvinceSpecialties province={province} />
        <ProvinceCraftVillages province={province} />
        <ProvinceFestivals province={province} />
        <ProvinceGallery province={province} />
        {infoImage && (
          <div className="province-info-banner">
            <div className="province-info-banner__inner">
              <div className="province-info-banner__decoration" aria-hidden="true">
                <TrongDongDecor />
              </div>
              <div className="province-info-banner__content">
                <h2 className="province-info-banner__title">Thông tin tổng quát về {province.name}</h2>
                <img src={infoImage} alt={`Thông tin ${province.name}`} className="province-info-banner__img" />
              </div>
              <div className="province-info-banner__decoration" aria-hidden="true">
                <TrongDongDecor />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
