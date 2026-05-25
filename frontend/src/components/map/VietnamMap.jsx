import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import vietnamMap from "../../../svgmap/vn.svg?raw";
import provinces from "../../data/provinceData";

const fallbackProvinces = provinces.map((province) => ({
  name: province.name,
  slug: province.slug
}));

const mergedProvinceMap = new Map([
  ["Hà Giang", "Tuyên Quang"],
  ["Tuyên Quang", "Tuyên Quang"],
  ["Lào Cai", "Lào Cai"],
  ["Yên Bái", "Lào Cai"],
  ["Bắc Kạn", "Thái Nguyên"],
  ["Thái Nguyên", "Thái Nguyên"],
  ["Vĩnh Phúc", "Phú Thọ"],
  ["Phú Thọ", "Phú Thọ"],
  ["Hòa Bình", "Phú Thọ"],
  ["Bắc Giang", "Bắc Ninh"],
  ["Bắc Ninh", "Bắc Ninh"],
  ["Hưng Yên", "Hưng Yên"],
  ["Thái Bình", "Hưng Yên"],
  ["Hà Nam", "Ninh Bình"],
  ["Nam Định", "Ninh Bình"],
  ["Ninh Bình", "Ninh Bình"],
  ["Quảng Bình", "Quảng Trị"],
  ["Quảng Trị", "Quảng Trị"],
  ["Quảng Nam", "Đà Nẵng"],
  ["Kon Tum", "Quảng Ngãi"],
  ["Quảng Ngãi", "Quảng Ngãi"],
  ["Bình Định", "Gia Lai"],
  ["Gia Lai", "Gia Lai"],
  ["Ninh Thuận", "Khánh Hòa"],
  ["Khánh Hòa", "Khánh Hòa"],
  ["Lâm Đồng", "Lâm Đồng"],
  ["Đắk Nông", "Lâm Đồng"],
  ["Bình Thuận", "Lâm Đồng"],
  ["Đắk Lắk", "Đắk Lắk"],
  ["Phú Yên", "Đắk Lắk"],
  ["Bình Dương", "Đồng Nai"],
  ["Bình Phước", "Đồng Nai"],
  ["Đồng Nai", "Đồng Nai"],
  ["Bà Rịa - Vũng Tàu", "Đồng Nai"],
  ["Long An", "Tây Ninh"],
  ["Tây Ninh", "Tây Ninh"],
  ["Bến Tre", "Vĩnh Long"],
  ["Trà Vinh", "Vĩnh Long"],
  ["Vĩnh Long", "Vĩnh Long"],
  ["Tiền Giang", "Đồng Tháp"],
  ["Đồng Tháp", "Đồng Tháp"],
  ["Hậu Giang", "Cần Thơ"],
  ["Sóc Trăng", "Vĩnh Long"],
  ["Bạc Liêu", "Cà Mau"],
  ["Cà Mau", "Cà Mau"],
  ["Kiên Giang", "An Giang"],
  ["An Giang", "An Giang"],
  ["Hải Dương", "Hưng Yên"],
  ["Huế", "Huế"],
  ["Hồ Chí Minh", "Hồ Chí Minh"],
  ["Hà Nội", "Hà Nội"],
  ["Hải Phòng", "Hải Phòng"],
  ["Đà Nẵng", "Đà Nẵng"],
  ["Cần Thơ", "Cần Thơ"],
  ["Quảng Ninh", "Quảng Ninh"],
  ["Cao Bằng", "Cao Bằng"],
  ["Lạng Sơn", "Lạng Sơn"],
  ["Lai Châu", "Lai Châu"],
  ["Điện Biên", "Điện Biên"],
  ["Sơn La", "Sơn La"],
  ["Thanh Hóa", "Thanh Hóa"],
  ["Nghệ An", "Nghệ An"],
  ["Hà Tĩnh", "Hà Tĩnh"]
]);

const excludedRegionNames = new Set();

const nameFixes = new Map([
  ["Hồ Chí Minh city", "Hồ Chí Minh"],
  ["Ha Noi", "Hà Nội"],
  ["Ha Tinh", "Hà Tĩnh"],
  ["Quàng Nam", "Quảng Nam"],
  ["Ðong Tháp", "Đồng Tháp"],
  ["Son La", "Sơn La"],
  ["Hau Giang", "Hậu Giang"],
  ["Lai Chau", "Lai Châu"],
  ["Can Tho", "Cần Thơ"],
  ["Thừa Thiên - Huế", "Huế"],
  ["Đông Nam Bộ", "Đồng Nai"]
]);

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function normalizeProvinceName(value) {
  if (!value) {
    return "";
  }
  return nameFixes.get(value) || value;
}

export default function VietnamMap({ provinces }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState({ visible: false, name: "", x: 0, y: 0 });
  const provinceData = useMemo(() => {
    if (Array.isArray(provinces) && provinces.length > 0) {
      return provinces.map((province) => ({
        name: province.name,
        slug: province.slug || slugify(province.name)
      }));
    }
    return fallbackProvinces;
  }, [provinces]);

  const provinceLookup = useMemo(() => {
    return new Map(provinceData.map((province) => [slugify(province.name), province]));
  }, [provinceData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    container.innerHTML = vietnamMap;
    const svg = container.querySelector("svg");
    if (!svg) {
      return undefined;
    }

    svg.setAttribute("class", "vietnam-svg");
    svg.setAttribute("aria-label", "Bản đồ Việt Nam");

    const regions = Array.from(svg.querySelectorAll("#features path, #features polygon"));
    const handlers = [];

    regions.forEach((region) => {
      const rawName = normalizeProvinceName(region.getAttribute("name"));
      if (excludedRegionNames.has(rawName)) {
        return;
      }

      const mergedName = mergedProvinceMap.get(rawName) || rawName;
      const matchedProvince = provinceLookup.get(slugify(mergedName));
      const province = matchedProvince || {
        name: mergedName,
        slug: slugify(mergedName)
      };

      region.classList.add("province-region");
      region.setAttribute("data-name", province.name);
      region.setAttribute("data-slug", province.slug);

      const handleEnter = (event) => {
        const bounds = container.getBoundingClientRect();
        region.classList.add("is-hovered");
        setTooltip({
          visible: true,
          name: province.name,
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top
        });
      };

      const handleMove = (event) => {
        const bounds = container.getBoundingClientRect();
        setTooltip((prev) => ({
          ...prev,
          visible: true,
          name: province.name,
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top
        }));
      };

      const handleLeave = () => {
        region.classList.remove("is-hovered");
        setTooltip((prev) => ({ ...prev, visible: false }));
      };

      const handleClick = () => {
        navigate(`/province/${province.slug}`);
      };

      region.addEventListener("mouseenter", handleEnter);
      region.addEventListener("mousemove", handleMove);
      region.addEventListener("mouseleave", handleLeave);
      region.addEventListener("click", handleClick);

      handlers.push({ region, handleEnter, handleMove, handleLeave, handleClick });
    });

    return () => {
      handlers.forEach(({ region, handleEnter, handleMove, handleLeave, handleClick }) => {
        region.removeEventListener("mouseenter", handleEnter);
        region.removeEventListener("mousemove", handleMove);
        region.removeEventListener("mouseleave", handleLeave);
        region.removeEventListener("click", handleClick);
      });
    };
  }, [navigate, provinceData]);

  return (
    <motion.div
      className="map-shell"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div ref={containerRef} className="map-svg-container map-svg-container--large" />
      <div
        className={`map-tooltip ${tooltip.visible ? "is-visible" : ""}`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        {tooltip.name}
      </div>
    </motion.div>
  );
}
