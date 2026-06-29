// Vị trí mặc định (%) của 34 tỉnh thành trên ảnh bản đồ mapvn.jpg.
// Tính theo toạ độ địa lý thật (kinh/vĩ độ tỉnh lỵ) nên bố cục tương đối đúng.
// Editor có thể kéo chỉnh lại và lưu vào server (ghi đè các giá trị này).
export const PROVINCE_MARKERS = [
  { slug: "lai-chau", name: "Lai Châu", x: 12.8, y: 10.8 },
  { slug: "dien-bien", name: "Điện Biên", x: 11.2, y: 15.9 },
  { slug: "lao-cai", name: "Lào Cai", x: 14.8, y: 10.3 },
  { slug: "son-la", name: "Sơn La", x: 14.5, y: 16.3 },
  { slug: "tuyen-quang", name: "Tuyên Quang", x: 19.5, y: 13.7 },
  { slug: "cao-bang", name: "Cao Bằng", x: 23.4, y: 9.3 },
  { slug: "lang-son", name: "Lạng Sơn", x: 25.4, y: 13.6 },
  { slug: "thai-nguyen", name: "Thái Nguyên", x: 21.9, y: 14.9 },
  { slug: "phu-tho", name: "Phú Thọ", x: 20.2, y: 16.3 },
  { slug: "bac-ninh", name: "Bắc Ninh", x: 22.7, y: 17.0 },
  { slug: "ha-noi", name: "Hà Nội", x: 21.9, y: 17.8 },
  { slug: "quang-ninh", name: "Quảng Ninh", x: 26.6, y: 18.2 },
  { slug: "hai-phong", name: "Hải Phòng", x: 25.1, y: 18.7 },
  { slug: "hung-yen", name: "Hưng Yên", x: 22.7, y: 19.8 },
  { slug: "ninh-binh", name: "Ninh Bình", x: 22.4, y: 21.8 },
  { slug: "thanh-hoa", name: "Thanh Hóa", x: 21.6, y: 24.1 },
  { slug: "nghe-an", name: "Nghệ An", x: 21.3, y: 30.0 },
  { slug: "ha-tinh", name: "Hà Tĩnh", x: 22.1, y: 31.7 },
  { slug: "quang-tri", name: "Quảng Trị", x: 26.7, y: 39.7 },
  { slug: "hue", name: "Huế", x: 28.5, y: 41.5 },
  { slug: "da-nang", name: "Đà Nẵng", x: 30.9, y: 43.6 },
  { slug: "quang-ngai", name: "Quảng Ngãi", x: 32.0, y: 48.4 },
  { slug: "gia-lai", name: "Gia Lai", x: 30.1, y: 54.3 },
  { slug: "dak-lak", name: "Đắk Lắk", x: 30.3, y: 61.0 },
  { slug: "khanh-hoa", name: "Khánh Hòa", x: 33.0, y: 63.3 },
  { slug: "lam-dong", name: "Lâm Đồng", x: 31.7, y: 64.9 },
  { slug: "tay-ninh", name: "Tây Ninh", x: 22.9, y: 68.2 },
  { slug: "dong-nai", name: "Đồng Nai", x: 25.6, y: 70.0 },
  { slug: "ho-chi-minh", name: "TP. Hồ Chí Minh", x: 24.9, y: 70.7 },
  { slug: "dong-thap", name: "Đồng Tháp", x: 21.1, y: 72.6 },
  { slug: "an-giang", name: "An Giang", x: 20.3, y: 72.9 },
  { slug: "vinh-long", name: "Vĩnh Long", x: 22.4, y: 73.6 },
  { slug: "can-tho", name: "Cần Thơ", x: 21.6, y: 74.8 },
  { slug: "ca-mau", name: "Cà Mau", x: 19.2, y: 79.2 },
];

// Dịch chuyển cả cụm marker mặc định (theo %). Dương x = sang phải, âm y = lên trên.
export const MARKER_OFFSET = { x: 5, y: -4 };

// Map slug -> {x, y} đã áp offset, dùng làm vị trí khởi tạo.
export function defaultMarkerPositions() {
  return Object.fromEntries(
    PROVINCE_MARKERS.map((m) => [m.slug, { x: m.x + MARKER_OFFSET.x, y: m.y + MARKER_OFFSET.y }])
  );
}

// Trộn vị trí đã lưu (từ server) lên trên mặc định.
export function mergeMarkerPositions(savedList) {
  const base = defaultMarkerPositions();
  if (Array.isArray(savedList)) {
    savedList.forEach((m) => {
      if (m && m.slug && typeof m.x === "number" && typeof m.y === "number") {
        base[m.slug] = { x: m.x, y: m.y };
      }
    });
  }
  return base;
}
