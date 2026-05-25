import phoImage from "/Images/pho-bo-ha-noi.jpeg";
import hueImage from "/Images/bunbohue.jpg";
import seafoodImage from "/Images/nha-hang-hai-san-nha-trang.jpg";
import coffeeImage from "/Images/caphethainguyen.jpg";
import thangLongImage from "/Images/dsvh-hoang-thanh-thang-long.png";
import hueCitadelImage from "/Images/dsvn-co-do-hue.png";
import halongImage from "/Images/dsvn-vinh-ha-long.png";
import cuisineImage from "/Images/am-thuc-viet-nam-2-1751938296.jpg";
import heroLandscape from "/Images/homepage.png";

const provinces = [
  {
    slug: "ha-noi",
    name: "Hà Nội",
    slogan: "Hương vị nghìn năm văn hiến",
    description:
      "Thủ đô nghìn năm tuổi lưu giữ di sản, ẩm thực tinh tế và nhịp sống thanh lịch của người Tràng An.",
    accentColor: "#b45309",
    heroImage: thangLongImage,
    introImage: phoImage,
    specialties: [
      {
        name: "Phở Hà Nội",
        description: "Nước dùng trong, vị ngọt thanh và bánh phở mềm mượt đặc trưng.",
        origin: "Phố cổ Hà Nội",
        image: phoImage
      },
      {
        name: "Chả cá Lã Vọng",
        description: "Cá nướng nghệ, ăn kèm bún và thì là.",
        origin: "Phố Chả Cá",
        image: cuisineImage
      },
      {
        name: "Bánh tôm Hồ Tây",
        description: "Giòn rụm, béo ngậy và ngập tràn hương vị hồ.",
        origin: "Hồ Tây",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Hồ Gươm",
        description: "Biểu tượng của Hà Nội với vẻ đẹp thơ mộng giữa lòng phố cổ.",
        image: heroLandscape
      },
      {
        name: "Hoàng thành Thăng Long",
        description: "Di sản thế giới lưu giữ dấu ấn kinh kỳ ngàn năm.",
        image: thangLongImage
      },
      {
        name: "Phố cổ Hà Nội",
        description: "Nhịp sống chậm rãi, nghệ thuật và ẩm thực đường phố.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Gióng",
        description: "Lễ hội truyền thống tôn vinh tinh thần thượng võ và văn hóa Thăng Long.",
        image: heroLandscape
      },
      {
        name: "Làng nghề Bát Tràng",
        description: "Không gian gốm sứ cổ truyền kết hợp sáng tạo đương đại.",
        image: cuisineImage
      }
    ],
    gallery: [phoImage, thangLongImage, heroLandscape, cuisineImage, seafoodImage, halongImage]
  },
  {
    slug: "ho-chi-minh",
    name: "Hồ Chí Minh",
    slogan: "Năng lượng hiện đại giữa lòng phương Nam",
    description:
      "Thành phố năng động bậc nhất Việt Nam với nhịp sống hiện đại, giao thoa văn hóa và ẩm thực đường phố đa sắc.",
    accentColor: "#b91c1c",
    heroImage: heroLandscape,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Cơm tấm",
        description: "Hạt gạo tấm thơm, sườn nướng đậm vị và nước mắm chua ngọt.",
        origin: "Sài Gòn xưa",
        image: seafoodImage
      },
      {
        name: "Bánh mì Sài Gòn",
        description: "Vỏ giòn, nhân đầy đặn với pate và rau thơm.",
        origin: "Quận 1",
        image: cuisineImage
      },
      {
        name: "Hủ tiếu Nam Vang",
        description: "Nước dùng ngọt thanh, tôm thịt đầy đặn.",
        origin: "Chợ Lớn",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Nhà thờ Đức Bà",
        description: "Biểu tượng kiến trúc Pháp giữa trung tâm thành phố.",
        image: heroLandscape
      },
      {
        name: "Bưu điện Trung tâm",
        description: "Không gian cổ kính với hơi thở thời thuộc địa.",
        image: thangLongImage
      },
      {
        name: "Phố đi bộ Nguyễn Huệ",
        description: "Trung tâm lễ hội và văn hóa đương đại của Sài Gòn.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Áo dài",
        description: "Tôn vinh nét đẹp truyền thống trong nhịp sống hiện đại.",
        image: heroLandscape
      },
      {
        name: "Chợ Bến Thành",
        description: "Điểm hẹn văn hóa, ẩm thực và mua sắm đặc trưng Nam Bộ.",
        image: seafoodImage
      }
    ],
    gallery: [heroLandscape, seafoodImage, cuisineImage, phoImage, halongImage, coffeeImage]
  },
  {
    slug: "hai-phong",
    name: "Hải Phòng",
    slogan: "Thành phố cảng rực rỡ sắc biển",
    description:
      "Thành phố hoa phượng đỏ mang hơi thở biển cả, ẩm thực hải sản phong phú và kiến trúc Pháp cổ.",
    accentColor: "#dc2626",
    heroImage: halongImage,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Bánh đa cua",
        description: "Sợi bánh đa đỏ, nước dùng cua đậm đà.",
        origin: "Quận Lê Chân",
        image: seafoodImage
      },
      {
        name: "Nem cua bể",
        description: "Nhân hải sản đầy đặn, vỏ giòn rụm.",
        origin: "Đồ Sơn",
        image: cuisineImage
      },
      {
        name: "Hải sản Cát Bà",
        description: "Tươi ngon, chế biến đa dạng từ biển.",
        origin: "Cát Bà",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Đảo Cát Bà",
        description: "Thiên đường nghỉ dưỡng với rừng quốc gia và biển xanh.",
        image: halongImage
      },
      {
        name: "Bãi biển Đồ Sơn",
        description: "Điểm đến biển nổi tiếng miền Bắc.",
        image: heroLandscape
      },
      {
        name: "Nhà hát lớn Hải Phòng",
        description: "Dấu ấn kiến trúc Pháp cổ giữa lòng thành phố.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội chọi trâu Đồ Sơn",
        description: "Lễ hội truyền thống đậm chất dân gian vùng biển.",
        image: heroLandscape
      },
      {
        name: "Làng nghề điêu khắc đá",
        description: "Nghề thủ công lâu đời tạo nên nét văn hóa riêng.",
        image: cuisineImage
      }
    ],
    gallery: [halongImage, seafoodImage, heroLandscape, cuisineImage, phoImage, coffeeImage]
  },
  {
    slug: "da-nang",
    name: "Đà Nẵng",
    slogan: "Thành phố đáng sống bên bờ biển",
    description:
      "Đà Nẵng hội tụ bãi biển đẹp, kiến trúc hiện đại và ẩm thực miền Trung tinh tế.",
    accentColor: "#0ea5e9",
    heroImage: heroLandscape,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Mì Quảng",
        description: "Sợi mì vàng, nước dùng sánh và đậm vị.",
        origin: "Ngũ Hành Sơn",
        image: cuisineImage
      },
      {
        name: "Bánh tráng cuốn thịt heo",
        description: "Thịt mềm, rau sống và mắm nêm thơm nồng.",
        origin: "Hải Châu",
        image: phoImage
      },
      {
        name: "Hải sản Mỹ Khê",
        description: "Hải sản tươi sống chế biến tinh gọn.",
        origin: "Biển Mỹ Khê",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Cầu Rồng",
        description: "Biểu tượng kiến trúc hiện đại của thành phố.",
        image: heroLandscape
      },
      {
        name: "Bà Nà Hills",
        description: "Không gian châu Âu trên đỉnh núi.",
        image: halongImage
      },
      {
        name: "Biển Mỹ Khê",
        description: "Một trong những bãi biển đẹp nhất châu Á.",
        image: seafoodImage
      }
    ],
    culture: [
      {
        name: "Lễ hội pháo hoa",
        description: "Sự kiện quốc tế rực rỡ trên sông Hàn.",
        image: heroLandscape
      },
      {
        name: "Làng đá Non Nước",
        description: "Tinh hoa điêu khắc đá truyền thống.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, seafoodImage, cuisineImage, halongImage, phoImage, coffeeImage]
  },
  {
    slug: "can-tho",
    name: "Cần Thơ",
    slogan: "Hơi thở miền Tây sông nước",
    description:
      "Thủ phủ miền Tây với chợ nổi, vườn trái cây và ẩm thực mộc mạc đậm tình.",
    accentColor: "#16a34a",
    heroImage: heroLandscape,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Bánh xèo",
        description: "Vỏ giòn rụm, nhân tôm thịt đầy đặn.",
        origin: "Ninh Kiều",
        image: cuisineImage
      },
      {
        name: "Lẩu mắm",
        description: "Đậm đà hương vị miền Tây.",
        origin: "Cái Răng",
        image: seafoodImage
      },
      {
        name: "Vú sữa",
        description: "Trái cây đặc sản ngọt thanh.",
        origin: "Phong Điền",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Chợ nổi Cái Răng",
        description: "Nét văn hóa đặc trưng trên sông nước.",
        image: heroLandscape
      },
      {
        name: "Bến Ninh Kiều",
        description: "Biểu tượng của Cần Thơ về đêm.",
        image: halongImage
      },
      {
        name: "Vườn trái cây",
        description: "Trải nghiệm miệt vườn xanh mát.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Đờn ca tài tử",
        description: "Di sản âm nhạc Nam Bộ.",
        image: heroLandscape
      },
      {
        name: "Lễ hội bánh dân gian",
        description: "Tôn vinh ẩm thực miền Tây.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, seafoodImage, cuisineImage, phoImage, halongImage, coffeeImage]
  },
  {
    slug: "hue",
    name: "Huế",
    slogan: "Kinh kỳ trầm mặc giữa dòng Hương",
    description:
      "Vùng đất cố đô với di sản cung đình, ẩm thực tinh tế và nhịp sống trầm lắng.",
    accentColor: "#7c3aed",
    heroImage: hueCitadelImage,
    introImage: hueImage,
    specialties: [
      {
        name: "Bún bò Huế",
        description: "Nước dùng cay nồng, đậm đà hương sả.",
        origin: "Kinh thành Huế",
        image: hueImage
      },
      {
        name: "Bánh bèo",
        description: "Nhỏ xinh, mềm mịn và đậm vị.",
        origin: "Phố cổ Huế",
        image: cuisineImage
      },
      {
        name: "Chè Huế",
        description: "Phong phú với vị ngọt thanh.",
        origin: "Sông Hương",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Đại Nội",
        description: "Di sản cung đình nổi bật của triều Nguyễn.",
        image: hueCitadelImage
      },
      {
        name: "Chùa Thiên Mụ",
        description: "Ngôi chùa cổ kính bên dòng sông Hương.",
        image: heroLandscape
      },
      {
        name: "Lăng Khải Định",
        description: "Kiến trúc giao thoa Đông - Tây.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Nhã nhạc cung đình",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image: heroLandscape
      },
      {
        name: "Festival Huế",
        description: "Sự kiện văn hóa nghệ thuật quốc tế.",
        image: cuisineImage
      }
    ],
    gallery: [hueCitadelImage, hueImage, heroLandscape, cuisineImage, phoImage, halongImage]
  },
  {
    slug: "tuyen-quang",
    name: "Tuyên Quang",
    slogan: "Sắc xanh núi rừng và lễ hội Trung thu",
    description:
      "Vùng đất lịch sử với núi rừng hùng vĩ, lễ hội đèn Trung thu độc đáo.",
    accentColor: "#15803d",
    heroImage: heroLandscape,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Bánh gai",
        description: "Dẻo thơm, nhân đậu xanh ngọt bùi.",
        origin: "Hàm Yên",
        image: cuisineImage
      },
      {
        name: "Cam sành",
        description: "Vị ngọt thanh, thơm dịu.",
        origin: "Hàm Yên",
        image: heroLandscape
      },
      {
        name: "Thịt trâu gác bếp",
        description: "Hương khói núi rừng đậm đà.",
        origin: "Na Hang",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Na Hang",
        description: "Hồ nước xanh giữa núi rừng hoang sơ.",
        image: halongImage
      },
      {
        name: "Suối khoáng Mỹ Lâm",
        description: "Nghỉ dưỡng giữa thiên nhiên.",
        image: heroLandscape
      },
      {
        name: "Tân Trào",
        description: "Khu di tích lịch sử cách mạng.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Thành Tuyên",
        description: "Lễ hội đèn Trung thu rực rỡ.",
        image: heroLandscape
      },
      {
        name: "Hát then",
        description: "Nghệ thuật dân gian của người Tày.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, coffeeImage, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "lao-cai",
    name: "Lào Cai",
    slogan: "Sắc màu Tây Bắc và mây trời Sa Pa",
    description:
      "Vùng cao Tây Bắc với ruộng bậc thang, khí hậu mát lạnh và văn hóa đa sắc tộc.",
    accentColor: "#0f766e",
    heroImage: heroLandscape,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Thắng cố",
        description: "Món ăn truyền thống của người Mông.",
        origin: "Bắc Hà",
        image: cuisineImage
      },
      {
        name: "Rượu táo mèo",
        description: "Hương thơm đặc trưng vùng cao.",
        origin: "Sa Pa",
        image: heroLandscape
      },
      {
        name: "Cá hồi Sa Pa",
        description: "Tươi ngon nuôi trong khí hậu lạnh.",
        origin: "Sa Pa",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Sa Pa",
        description: "Thiên đường nghỉ dưỡng trên mây.",
        image: heroLandscape
      },
      {
        name: "Fansipan",
        description: "Nóc nhà Đông Dương hùng vĩ.",
        image: halongImage
      },
      {
        name: "Chợ Bắc Hà",
        description: "Phiên chợ sắc màu vùng cao.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Gầu Tào",
        description: "Nét văn hóa đặc sắc của người Mông.",
        image: heroLandscape
      },
      {
        name: "Chợ tình Sa Pa",
        description: "Không gian giao lưu văn hóa.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, coffeeImage, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "thai-nguyen",
    name: "Thái Nguyên",
    slogan: "Hương trà xanh ngát giữa vùng trung du",
    description:
      "Vùng đất trung du nổi tiếng với chè thơm, đồi núi trùng điệp và lịch sử cách mạng.",
    accentColor: "#166534",
    heroImage: coffeeImage,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Trà Tân Cương",
        description: "Hương thơm dịu, vị chát ngọt hậu.",
        origin: "Tân Cương",
        image: coffeeImage
      },
      {
        name: "Bánh chưng Bờ Đậu",
        description: "Dẻo thơm, nhân đậm đà.",
        origin: "Phú Lương",
        image: cuisineImage
      },
      {
        name: "Nem chua Đại Từ",
        description: "Vị chua nhẹ, thơm cay.",
        origin: "Đại Từ",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Hồ Núi Cốc",
        description: "Hồ nước thơ mộng giữa đồi chè.",
        image: heroLandscape
      },
      {
        name: "Bảo tàng Văn hóa các dân tộc",
        description: "Không gian lưu giữ di sản văn hóa.",
        image: thangLongImage
      },
      {
        name: "Đồi chè Tân Cương",
        description: "Khung cảnh xanh ngát trải dài.",
        image: coffeeImage
      }
    ],
    culture: [
      {
        name: "Lễ hội chè",
        description: "Tôn vinh văn hóa trà Việt.",
        image: heroLandscape
      },
      {
        name: "Hát then",
        description: "Nghệ thuật dân gian của người Tày.",
        image: cuisineImage
      }
    ],
    gallery: [coffeeImage, heroLandscape, cuisineImage, phoImage, halongImage, seafoodImage]
  },
  {
    slug: "phu-tho",
    name: "Phú Thọ",
    slogan: "Đất tổ cội nguồn dân tộc",
    description:
      "Quê hương vua Hùng với di sản văn hóa sâu sắc, lễ hội truyền thống và làn điệu dân ca.",
    accentColor: "#92400e",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Bánh tai",
        description: "Bánh gạo mềm, nhân thịt đậm đà.",
        origin: "Việt Trì",
        image: cuisineImage
      },
      {
        name: "Cọ ỏm",
        description: "Món ăn dân dã vùng trung du.",
        origin: "Đoan Hùng",
        image: heroLandscape
      },
      {
        name: "Rêu đá",
        description: "Đặc sản hiếm của vùng núi.",
        origin: "Thanh Sơn",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Khu di tích Đền Hùng",
        description: "Nơi hội tụ tinh thần dân tộc Việt.",
        image: thangLongImage
      },
      {
        name: "Suối khoáng Thanh Thủy",
        description: "Điểm nghỉ dưỡng thư giãn.",
        image: heroLandscape
      },
      {
        name: "Đồi chè Long Cốc",
        description: "Cảnh sắc đồi chè bồng bềnh.",
        image: coffeeImage
      }
    ],
    culture: [
      {
        name: "Hát xoan",
        description: "Di sản văn hóa phi vật thể của nhân loại.",
        image: heroLandscape
      },
      {
        name: "Lễ hội Đền Hùng",
        description: "Lễ hội lớn nhất cả nước mỗi tháng 3 âm lịch.",
        image: cuisineImage
      }
    ],
    gallery: [thangLongImage, heroLandscape, cuisineImage, coffeeImage, phoImage, halongImage]
  },
  {
    slug: "bac-ninh",
    name: "Bắc Ninh",
    slogan: "Quan họ ngọt ngào đất Kinh Bắc",
    description:
      "Vùng đất Kinh Bắc nổi tiếng với dân ca quan họ, làng nghề truyền thống và ẩm thực đặc trưng.",
    accentColor: "#a16207",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Bánh phu thê",
        description: "Ngọt thơm, tượng trưng cho hạnh phúc.",
        origin: "Đình Bảng",
        image: cuisineImage
      },
      {
        name: "Nem Bùi",
        description: "Nem chua thơm mùi thính.",
        origin: "Thuận Thành",
        image: phoImage
      },
      {
        name: "Cháo thái Đình Tổ",
        description: "Mềm mịn, đậm hương vị truyền thống.",
        origin: "Yên Phong",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Đền Đô",
        description: "Di tích lịch sử nhà Lý.",
        image: thangLongImage
      },
      {
        name: "Chùa Dâu",
        description: "Ngôi chùa cổ nhất Việt Nam.",
        image: heroLandscape
      },
      {
        name: "Làng tranh Đông Hồ",
        description: "Không gian nghệ thuật dân gian.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Dân ca quan họ",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image: heroLandscape
      },
      {
        name: "Lễ hội Lim",
        description: "Nơi hội tụ tinh hoa quan họ.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, coffeeImage, halongImage]
  },
  {
    slug: "hung-yen",
    name: "Hưng Yên",
    slogan: "Phố Hiến sầm uất một thời",
    description:
      "Hưng Yên gắn liền với Phố Hiến cổ, vườn nhãn ngọt lành và di sản văn hóa lâu đời.",
    accentColor: "#b45309",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Nhãn lồng",
        description: "Quả nhãn thơm ngọt nổi tiếng.",
        origin: "Phố Hiến",
        image: heroLandscape
      },
      {
        name: "Bánh cuốn Phú Thị",
        description: "Mỏng mềm, chấm nước mắm thơm.",
        origin: "Văn Lâm",
        image: phoImage
      },
      {
        name: "Chè sen",
        description: "Thanh mát, tinh tế.",
        origin: "Tiên Lữ",
        image: cuisineImage
      }
    ],
    tourism: [
      {
        name: "Phố Hiến",
        description: "Di tích lịch sử thương cảng xưa.",
        image: thangLongImage
      },
      {
        name: "Chùa Chuông",
        description: "Ngôi chùa cổ kính linh thiêng.",
        image: heroLandscape
      },
      {
        name: "Vườn nhãn",
        description: "Không gian xanh mát mùa thu hoạch.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Lễ hội Phố Hiến",
        description: "Tái hiện nhịp sống thương cảng xưa.",
        image: heroLandscape
      },
      {
        name: "Hát chèo",
        description: "Nghệ thuật dân gian đặc trưng vùng đồng bằng.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, coffeeImage, halongImage]
  },
  {
    slug: "ninh-binh",
    name: "Ninh Bình",
    slogan: "Non nước hữu tình đất cố đô",
    description:
      "Ninh Bình nổi bật với quần thể Tràng An, cố đô Hoa Lư và cảnh sắc thiên nhiên tuyệt mỹ.",
    accentColor: "#15803d",
    heroImage: halongImage,
    introImage: heroLandscape,
    specialties: [
      {
        name: "Dê núi",
        description: "Thịt dê săn chắc, chế biến đa dạng.",
        origin: "Hoa Lư",
        image: seafoodImage
      },
      {
        name: "Cơm cháy",
        description: "Giòn rụm, thơm mùi gạo nếp.",
        origin: "Ninh Bình",
        image: cuisineImage
      },
      {
        name: "Gỏi cá nhệch",
        description: "Vị chua cay hòa quyện.",
        origin: "Kim Sơn",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Tràng An",
        description: "Di sản thế giới với hang động và sông nước.",
        image: halongImage
      },
      {
        name: "Tam Cốc",
        description: "Cảnh sắc sông núi nên thơ.",
        image: heroLandscape
      },
      {
        name: "Cố đô Hoa Lư",
        description: "Di tích lịch sử triều Đinh - Lê.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Tràng An",
        description: "Tôn vinh di sản văn hóa thiên nhiên.",
        image: heroLandscape
      },
      {
        name: "Làng đá mỹ nghệ",
        description: "Nghề truyền thống lâu đời.",
        image: cuisineImage
      }
    ],
    gallery: [halongImage, heroLandscape, cuisineImage, phoImage, seafoodImage, coffeeImage]
  },
  {
    slug: "quang-tri",
    name: "Quảng Trị",
    slogan: "Miền đất lịch sử bên dòng Bến Hải",
    description:
      "Quảng Trị ghi dấu lịch sử hào hùng, cảnh quan biển và những di tích chiến tranh.",
    accentColor: "#9a3412",
    heroImage: heroLandscape,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Bánh ít lá gai",
        description: "Dẻo thơm, nhân đậu xanh.",
        origin: "Đông Hà",
        image: cuisineImage
      },
      {
        name: "Cháo vạt giường",
        description: "Đậm vị cá lóc và rau thơm.",
        origin: "Triệu Phong",
        image: phoImage
      },
      {
        name: "Hải sản Cửa Tùng",
        description: "Tươi ngon vùng biển miền Trung.",
        origin: "Cửa Tùng",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Cầu Hiền Lương",
        description: "Di tích lịch sử chia cắt hai miền.",
        image: thangLongImage
      },
      {
        name: "Thành cổ Quảng Trị",
        description: "Dấu ấn chiến tranh và lịch sử.",
        image: heroLandscape
      },
      {
        name: "Biển Cửa Việt",
        description: "Bãi biển hoang sơ, thanh bình.",
        image: seafoodImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Thống nhất",
        description: "Tưởng niệm và tri ân lịch sử.",
        image: heroLandscape
      },
      {
        name: "Làng nghề đan lát",
        description: "Nghề thủ công truyền thống.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, seafoodImage, cuisineImage, phoImage, halongImage, coffeeImage]
  },
  {
    slug: "quang-ngai",
    name: "Quảng Ngãi",
    slogan: "Hơi thở biển đảo và núi non",
    description:
      "Quảng Ngãi nổi bật với đảo Lý Sơn, biển xanh và văn hóa Sa Huỳnh.",
    accentColor: "#0f766e",
    heroImage: halongImage,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Tỏi Lý Sơn",
        description: "Tỏi thơm, vị cay dịu đặc trưng.",
        origin: "Đảo Lý Sơn",
        image: seafoodImage
      },
      {
        name: "Cá bống sông Trà",
        description: "Cá kho đậm vị, thịt chắc.",
        origin: "Sông Trà",
        image: cuisineImage
      },
      {
        name: "Bánh ít lá gai",
        description: "Món bánh truyền thống thơm ngon.",
        origin: "Quảng Ngãi",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Đảo Lý Sơn",
        description: "Thiên đường biển đảo với núi lửa cổ.",
        image: halongImage
      },
      {
        name: "Bãi biển Mỹ Khê",
        description: "Bãi biển trong xanh, mịn màng.",
        image: seafoodImage
      },
      {
        name: "Thành cổ Châu Sa",
        description: "Di tích văn hóa Sa Huỳnh.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Lễ khao lề thế lính Hoàng Sa",
        description: "Nghi lễ tưởng nhớ đội hùng binh Hoàng Sa.",
        image: heroLandscape
      },
      {
        name: "Hát bài chòi",
        description: "Di sản văn hóa miền Trung.",
        image: cuisineImage
      }
    ],
    gallery: [halongImage, seafoodImage, cuisineImage, phoImage, heroLandscape, coffeeImage]
  },
  {
    slug: "gia-lai",
    name: "Gia Lai",
    slogan: "Cao nguyên đại ngàn và hồ nước xanh",
    description:
      "Gia Lai mang vẻ đẹp hoang sơ của núi rừng Tây Nguyên, văn hóa cồng chiêng và cà phê thơm.",
    accentColor: "#166534",
    heroImage: coffeeImage,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Cơm lam",
        description: "Gạo nướng trong ống tre thơm lừng.",
        origin: "Pleiku",
        image: cuisineImage
      },
      {
        name: "Gà nướng",
        description: "Thịt gà đậm vị núi rừng.",
        origin: "Kon Hà Nừng",
        image: seafoodImage
      },
      {
        name: "Cà phê Pleiku",
        description: "Hương cà phê mạnh mẽ, quyến rũ.",
        origin: "Pleiku",
        image: coffeeImage
      }
    ],
    tourism: [
      {
        name: "Biển Hồ",
        description: "Hồ nước xanh biếc giữa cao nguyên.",
        image: heroLandscape
      },
      {
        name: "Đồi chè Biển Hồ",
        description: "Đồi chè xanh trải dài.",
        image: coffeeImage
      },
      {
        name: "Thác Phú Cường",
        description: "Thác nước hùng vĩ giữa đại ngàn.",
        image: halongImage
      }
    ],
    culture: [
      {
        name: "Không gian cồng chiêng",
        description: "Di sản văn hóa Tây Nguyên.",
        image: heroLandscape
      },
      {
        name: "Lễ hội mừng lúa mới",
        description: "Nghi lễ đặc trưng của người Jrai.",
        image: cuisineImage
      }
    ],
    gallery: [coffeeImage, heroLandscape, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "khanh-hoa",
    name: "Khánh Hòa",
    slogan: "Nha Trang rực rỡ bên biển xanh",
    description:
      "Khánh Hòa nổi tiếng với biển Nha Trang trong xanh, đảo đẹp và hải sản phong phú.",
    accentColor: "#0284c7",
    heroImage: seafoodImage,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Bún cá Nha Trang",
        description: "Nước dùng thanh, cá tươi ngọt.",
        origin: "Nha Trang",
        image: seafoodImage
      },
      {
        name: "Nem nướng",
        description: "Nem thơm, ăn kèm bánh tráng.",
        origin: "Ninh Hòa",
        image: cuisineImage
      },
      {
        name: "Yến sào",
        description: "Đặc sản quý của vùng biển.",
        origin: "Đảo yến",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Vịnh Nha Trang",
        description: "Một trong những vịnh đẹp nhất thế giới.",
        image: seafoodImage
      },
      {
        name: "Đảo Hòn Mun",
        description: "Thiên đường lặn biển.",
        image: halongImage
      },
      {
        name: "Tháp Bà Ponagar",
        description: "Di tích văn hóa Chăm.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội biển Nha Trang",
        description: "Sôi động, tôn vinh văn hóa biển.",
        image: heroLandscape
      },
      {
        name: "Lễ hội yến sào",
        description: "Tôn vinh nghề khai thác yến.",
        image: cuisineImage
      }
    ],
    gallery: [seafoodImage, halongImage, heroLandscape, cuisineImage, phoImage, coffeeImage]
  },
  {
    slug: "lam-dong",
    name: "Lâm Đồng",
    slogan: "Đà Lạt mộng mơ giữa cao nguyên",
    description:
      "Lâm Đồng sở hữu thành phố Đà Lạt mát lành, rừng thông và văn hóa cà phê.",
    accentColor: "#0f766e",
    heroImage: coffeeImage,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Cà phê Đà Lạt",
        description: "Hương thơm dịu, hậu vị ngọt.",
        origin: "Đà Lạt",
        image: coffeeImage
      },
      {
        name: "Dâu tây",
        description: "Quả dâu đỏ mọng nổi tiếng.",
        origin: "Đà Lạt",
        image: heroLandscape
      },
      {
        name: "Atiso",
        description: "Thảo dược thanh lọc cơ thể.",
        origin: "Lâm Đồng",
        image: cuisineImage
      }
    ],
    tourism: [
      {
        name: "Hồ Xuân Hương",
        description: "Biểu tượng thơ mộng của Đà Lạt.",
        image: heroLandscape
      },
      {
        name: "Đồi chè Cầu Đất",
        description: "Đồi chè xanh bạt ngàn.",
        image: coffeeImage
      },
      {
        name: "Thung lũng Tình Yêu",
        description: "Điểm đến lãng mạn giữa rừng thông.",
        image: halongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Hoa Đà Lạt",
        description: "Sự kiện văn hóa đặc trưng cao nguyên.",
        image: heroLandscape
      },
      {
        name: "Không gian cồng chiêng",
        description: "Di sản văn hóa Tây Nguyên.",
        image: cuisineImage
      }
    ],
    gallery: [coffeeImage, heroLandscape, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "dak-lak",
    name: "Đắk Lắk",
    slogan: "Cao nguyên nắng gió và cà phê",
    description:
      "Đắk Lắk nổi bật với cà phê Buôn Ma Thuột, văn hóa cồng chiêng và thác nước hùng vĩ.",
    accentColor: "#92400e",
    heroImage: coffeeImage,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Cà phê Buôn Ma Thuột",
        description: "Đậm đà, thơm nồng đặc trưng.",
        origin: "Buôn Ma Thuột",
        image: coffeeImage
      },
      {
        name: "Gà nướng bản Đôn",
        description: "Thịt gà thơm vị núi rừng.",
        origin: "Buôn Đôn",
        image: seafoodImage
      },
      {
        name: "Cơm lam",
        description: "Gạo nếp nướng ống tre.",
        origin: "Krông Ana",
        image: cuisineImage
      }
    ],
    tourism: [
      {
        name: "Thác Dray Nur",
        description: "Thác nước hùng vĩ giữa rừng xanh.",
        image: halongImage
      },
      {
        name: "Hồ Lắk",
        description: "Hồ nước tự nhiên lớn nhất Tây Nguyên.",
        image: heroLandscape
      },
      {
        name: "Buôn Đôn",
        description: "Làng văn hóa với truyền thống săn voi.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội cà phê",
        description: "Tôn vinh đặc sản Tây Nguyên.",
        image: heroLandscape
      },
      {
        name: "Cồng chiêng",
        description: "Di sản văn hóa Tây Nguyên.",
        image: cuisineImage
      }
    ],
    gallery: [coffeeImage, heroLandscape, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "dong-nai",
    name: "Đồng Nai",
    slogan: "Vùng đất cửa ngõ Đông Nam Bộ",
    description:
      "Đồng Nai sở hữu khu dự trữ sinh quyển, trái cây phong phú và không gian xanh rộng lớn.",
    accentColor: "#15803d",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Gỏi cá Biên Hòa",
        description: "Vị chua cay hài hòa.",
        origin: "Biên Hòa",
        image: seafoodImage
      },
      {
        name: "Bưởi Tân Triều",
        description: "Trái cây đặc sản ngọt thanh.",
        origin: "Vĩnh Cửu",
        image: heroLandscape
      },
      {
        name: "Lẩu lá khổ qua",
        description: "Món ăn thanh mát đặc trưng.",
        origin: "Đồng Nai",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Vườn quốc gia Cát Tiên",
        description: "Hệ sinh thái rừng nhiệt đới đa dạng.",
        image: halongImage
      },
      {
        name: "Khu du lịch Bửu Long",
        description: "Hồ nước và núi đá nên thơ.",
        image: heroLandscape
      },
      {
        name: "Thác Giang Điền",
        description: "Thác nước mát lành.",
        image: halongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội trái cây",
        description: "Sắc màu nông sản Đông Nam Bộ.",
        image: heroLandscape
      },
      {
        name: "Đờn ca tài tử",
        description: "Không gian âm nhạc Nam Bộ.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "tay-ninh",
    name: "Tây Ninh",
    slogan: "Núi Bà hùng vĩ và hương vị đặc sắc",
    description:
      "Tây Ninh là cửa ngõ Đông Nam Bộ, nổi bật với núi Bà Đen và ẩm thực độc đáo.",
    accentColor: "#b45309",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Bánh tráng phơi sương",
        description: "Dẻo thơm, ăn kèm thịt luộc.",
        origin: "Trảng Bàng",
        image: cuisineImage
      },
      {
        name: "Muối tôm",
        description: "Gia vị đậm đà nổi tiếng.",
        origin: "Tây Ninh",
        image: heroLandscape
      },
      {
        name: "Bò tơ",
        description: "Thịt mềm, ngọt thơm.",
        origin: "Gò Dầu",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Núi Bà Đen",
        description: "Ngọn núi linh thiêng cao nhất Nam Bộ.",
        image: halongImage
      },
      {
        name: "Tòa thánh Cao Đài",
        description: "Kiến trúc độc đáo của đạo Cao Đài.",
        image: thangLongImage
      },
      {
        name: "Hồ Dầu Tiếng",
        description: "Hồ nước rộng lớn và yên bình.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Lễ hội núi Bà",
        description: "Lễ hội tâm linh lớn của vùng.",
        image: heroLandscape
      },
      {
        name: "Ẩm thực chay",
        description: "Văn hóa ẩm thực gắn với đạo Cao Đài.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "vinh-long",
    name: "Vĩnh Long",
    slogan: "Miệt vườn trù phú bên sông Tiền",
    description:
      "Vĩnh Long nằm giữa sông Tiền và sông Hậu, nổi bật với vườn trái cây và chợ nổi.",
    accentColor: "#16a34a",
    heroImage: heroLandscape,
    introImage: heroLandscape,
    specialties: [
      {
        name: "Bánh xèo",
        description: "Vỏ giòn, nhân tôm thịt đầy đặn.",
        origin: "Vĩnh Long",
        image: cuisineImage
      },
      {
        name: "Cam sành",
        description: "Vị ngọt thanh mát.",
        origin: "Trà Ôn",
        image: heroLandscape
      },
      {
        name: "Cá tai tượng",
        description: "Cá chiên giòn đặc trưng miền Tây.",
        origin: "Cù lao An Bình",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Cù lao An Bình",
        description: "Du lịch miệt vườn yên bình.",
        image: heroLandscape
      },
      {
        name: "Chợ nổi Trà Ôn",
        description: "Nét văn hóa giao thương sông nước.",
        image: halongImage
      },
      {
        name: "Lò gạch Mang Thít",
        description: "Di sản kiến trúc độc đáo.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Đờn ca tài tử",
        description: "Âm nhạc truyền thống miền Tây.",
        image: heroLandscape
      },
      {
        name: "Làng nghề gốm",
        description: "Nghề truyền thống lâu đời.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "dong-thap",
    name: "Đồng Tháp",
    slogan: "Sen hồng và miền đất hiền hòa",
    description:
      "Đồng Tháp nổi tiếng với đồng sen, vườn quốc gia Tràm Chim và ẩm thực dân dã.",
    accentColor: "#b91c1c",
    heroImage: heroLandscape,
    introImage: heroLandscape,
    specialties: [
      {
        name: "Cá lóc nướng trui",
        description: "Món ăn dân dã, thơm lừng.",
        origin: "Sa Đéc",
        image: seafoodImage
      },
      {
        name: "Hủ tiếu Sa Đéc",
        description: "Sợi hủ tiếu dai, nước dùng ngọt.",
        origin: "Sa Đéc",
        image: phoImage
      },
      {
        name: "Nem Lai Vung",
        description: "Nem chua ngọt thơm.",
        origin: "Lai Vung",
        image: cuisineImage
      }
    ],
    tourism: [
      {
        name: "Vườn quốc gia Tràm Chim",
        description: "Khu sinh thái ngập nước nổi tiếng.",
        image: halongImage
      },
      {
        name: "Làng hoa Sa Đéc",
        description: "Thiên đường hoa rực rỡ.",
        image: heroLandscape
      },
      {
        name: "Đồng sen",
        description: "Khung cảnh sen nở thơ mộng.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Lễ hội sen",
        description: "Tôn vinh biểu tượng Đồng Tháp.",
        image: heroLandscape
      },
      {
        name: "Làng nghề bánh phồng",
        description: "Nghề truyền thống lâu đời.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "ca-mau",
    name: "Cà Mau",
    slogan: "Cực Nam Tổ quốc giữa rừng và biển",
    description:
      "Cà Mau là vùng đất cuối trời Nam với rừng ngập mặn, biển cả và hải sản phong phú.",
    accentColor: "#065f46",
    heroImage: heroLandscape,
    introImage: seafoodImage,
    specialties: [
      {
        name: "Cua Cà Mau",
        description: "Cua chắc thịt, thơm ngọt.",
        origin: "Năm Căn",
        image: seafoodImage
      },
      {
        name: "Lẩu mắm",
        description: "Đậm đà hương vị miền Tây.",
        origin: "Cà Mau",
        image: cuisineImage
      },
      {
        name: "Ba khía",
        description: "Món ăn dân dã đặc trưng.",
        origin: "Rạch Gốc",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Mũi Cà Mau",
        description: "Điểm cực Nam Tổ quốc.",
        image: heroLandscape
      },
      {
        name: "Rừng U Minh",
        description: "Rừng ngập mặn đặc trưng.",
        image: halongImage
      },
      {
        name: "Đầm Thị Tường",
        description: "Đầm nước rộng lớn miền Tây.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Lễ hội Nghinh Ông",
        description: "Nghi lễ cầu mùa của ngư dân.",
        image: heroLandscape
      },
      {
        name: "Đờn ca tài tử",
        description: "Âm nhạc truyền thống miền Tây.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, seafoodImage, cuisineImage, phoImage, halongImage, coffeeImage]
  },
  {
    slug: "an-giang",
    name: "An Giang",
    slogan: "Sắc màu biên giới và mùa nước nổi",
    description:
      "An Giang gắn liền với núi Cấm, mùa nước nổi và văn hóa đa dạng.",
    accentColor: "#15803d",
    heroImage: heroLandscape,
    introImage: heroLandscape,
    specialties: [
      {
        name: "Bún cá Châu Đốc",
        description: "Nước dùng thơm nghệ, cá lóc tươi.",
        origin: "Châu Đốc",
        image: seafoodImage
      },
      {
        name: "Mắm Châu Đốc",
        description: "Đặc sản đậm đà miền biên giới.",
        origin: "Châu Đốc",
        image: cuisineImage
      },
      {
        name: "Gà đốt Ô Thum",
        description: "Gà nướng thơm vị sả.",
        origin: "Tri Tôn",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Núi Cấm",
        description: "Điểm hành hương nổi tiếng.",
        image: halongImage
      },
      {
        name: "Rừng tràm Trà Sư",
        description: "Cảnh sắc xanh mát mùa nước nổi.",
        image: heroLandscape
      },
      {
        name: "Chợ Châu Đốc",
        description: "Giao thương sôi động vùng biên.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Bà Chúa Xứ",
        description: "Lễ hội tâm linh lớn nhất miền Tây.",
        image: heroLandscape
      },
      {
        name: "Văn hóa Khmer",
        description: "Sắc màu văn hóa đa dạng vùng biên.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "quang-ninh",
    name: "Quảng Ninh",
    slogan: "Vịnh Hạ Long kỳ quan thế giới",
    description:
      "Quảng Ninh là điểm đến nổi tiếng với vịnh Hạ Long, đảo Cô Tô và ẩm thực biển phong phú.",
    accentColor: "#0ea5e9",
    heroImage: halongImage,
    introImage: halongImage,
    specialties: [
      {
        name: "Chả mực",
        description: "Mực giã tay, thơm ngon đặc trưng.",
        origin: "Hạ Long",
        image: seafoodImage
      },
      {
        name: "Sá sùng",
        description: "Đặc sản quý của biển.",
        origin: "Vân Đồn",
        image: cuisineImage
      },
      {
        name: "Sam biển",
        description: "Món ăn độc đáo vùng biển.",
        origin: "Móng Cái",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Vịnh Hạ Long",
        description: "Kỳ quan thiên nhiên thế giới.",
        image: halongImage
      },
      {
        name: "Yên Tử",
        description: "Thiền viện và cảnh sắc linh thiêng.",
        image: heroLandscape
      },
      {
        name: "Đảo Cô Tô",
        description: "Thiên đường biển đảo.",
        image: seafoodImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Yên Tử",
        description: "Hành hương về đất Phật.",
        image: heroLandscape
      },
      {
        name: "Văn hóa than",
        description: "Dấu ấn công nhân mỏ.",
        image: cuisineImage
      }
    ],
    gallery: [halongImage, seafoodImage, heroLandscape, cuisineImage, phoImage, coffeeImage]
  },
  {
    slug: "cao-bang",
    name: "Cao Bằng",
    slogan: "Thác nước kỳ vĩ và núi rừng biên giới",
    description:
      "Cao Bằng nổi bật với thác Bản Giốc, động Ngườm Ngao và văn hóa dân tộc Tày.",
    accentColor: "#0f766e",
    heroImage: heroLandscape,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Bánh cuốn Cao Bằng",
        description: "Bánh mềm, nước dùng xương thơm.",
        origin: "Thành phố Cao Bằng",
        image: phoImage
      },
      {
        name: "Lạp xưởng",
        description: "Hương vị đậm đà vùng biên.",
        origin: "Trùng Khánh",
        image: cuisineImage
      },
      {
        name: "Hạt dẻ",
        description: "Đặc sản mùa thu Cao Bằng.",
        origin: "Trùng Khánh",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Thác Bản Giốc",
        description: "Thác nước lớn nhất Việt Nam.",
        image: halongImage
      },
      {
        name: "Động Ngườm Ngao",
        description: "Hang động kỳ ảo.",
        image: heroLandscape
      },
      {
        name: "Hồ Thang Hen",
        description: "Hồ nước xanh giữa núi đá.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Hát then",
        description: "Di sản văn hóa của người Tày.",
        image: heroLandscape
      },
      {
        name: "Lễ hội Lồng Tồng",
        description: "Lễ hội cầu mùa.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, coffeeImage, cuisineImage, phoImage, halongImage, seafoodImage]
  },
  {
    slug: "lang-son",
    name: "Lạng Sơn",
    slogan: "Xứ Lạng thơ mộng nơi cửa khẩu",
    description:
      "Lạng Sơn nổi tiếng với núi đá, chợ biên giới và ẩm thực vịt quay.",
    accentColor: "#9a3412",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Vịt quay",
        description: "Da giòn, thịt thơm vị mắc mật.",
        origin: "Thành phố Lạng Sơn",
        image: seafoodImage
      },
      {
        name: "Khâu nhục",
        description: "Thịt mềm, đậm vị.",
        origin: "Cao Lộc",
        image: cuisineImage
      },
      {
        name: "Bánh áp chao",
        description: "Bánh rán giòn nóng.",
        origin: "Lạng Sơn",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Mẫu Sơn",
        description: "Khí hậu mát lạnh quanh năm.",
        image: halongImage
      },
      {
        name: "Động Tam Thanh",
        description: "Danh thắng nổi tiếng xứ Lạng.",
        image: heroLandscape
      },
      {
        name: "Chợ Đông Kinh",
        description: "Trung tâm thương mại biên giới.",
        image: cuisineImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Kỳ Lừa",
        description: "Lễ hội truyền thống xứ Lạng.",
        image: heroLandscape
      },
      {
        name: "Hát sli",
        description: "Dân ca của người Nùng.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "lai-chau",
    name: "Lai Châu",
    slogan: "Mây núi đại ngàn và bản sắc vùng cao",
    description:
      "Lai Châu sở hữu núi non hùng vĩ, ruộng bậc thang và văn hóa dân tộc đa dạng.",
    accentColor: "#0f766e",
    heroImage: heroLandscape,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Thịt trâu gác bếp",
        description: "Đậm vị khói của núi rừng.",
        origin: "Tam Đường",
        image: seafoodImage
      },
      {
        name: "Xôi tím",
        description: "Xôi nếp nương thơm dẻo.",
        origin: "Sìn Hồ",
        image: cuisineImage
      },
      {
        name: "Rượu ngô",
        description: "Hương vị đặc trưng vùng cao.",
        origin: "Phong Thổ",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Đèo Ô Quy Hồ",
        description: "Một trong tứ đại đỉnh đèo.",
        image: halongImage
      },
      {
        name: "Ruộng bậc thang",
        description: "Cảnh sắc mùa lúa chín.",
        image: heroLandscape
      },
      {
        name: "Đỉnh Putaleng",
        description: "Nóc nhà thứ hai của Đông Dương.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Lễ hội Then Kin Pang",
        description: "Lễ hội của người Thái.",
        image: heroLandscape
      },
      {
        name: "Chợ phiên vùng cao",
        description: "Không gian giao lưu văn hóa.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, coffeeImage, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "dien-bien",
    name: "Điện Biên",
    slogan: "Điểm hẹn lịch sử và hùng vĩ Tây Bắc",
    description:
      "Điện Biên lưu giữ chiến thắng lịch sử, núi rừng rộng lớn và văn hóa dân tộc độc đáo.",
    accentColor: "#b45309",
    heroImage: heroLandscape,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Xôi nếp nương",
        description: "Dẻo thơm, hạt nếp bóng mẩy.",
        origin: "Điện Biên",
        image: cuisineImage
      },
      {
        name: "Gà đen Tủa Chùa",
        description: "Thịt thơm, chắc.",
        origin: "Tủa Chùa",
        image: seafoodImage
      },
      {
        name: "Rượu sâu chít",
        description: "Đặc sản núi rừng.",
        origin: "Mường Ảng",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Đồi A1",
        description: "Di tích chiến thắng Điện Biên Phủ.",
        image: thangLongImage
      },
      {
        name: "Hồ Pá Khoang",
        description: "Hồ nước trong xanh giữa núi.",
        image: heroLandscape
      },
      {
        name: "Cánh đồng Mường Thanh",
        description: "Cánh đồng lớn nhất Tây Bắc.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Lễ hội Hoa Ban",
        description: "Lễ hội mùa xuân của người Thái.",
        image: heroLandscape
      },
      {
        name: "Nghệ thuật múa xòe",
        description: "Điệu múa truyền thống Tây Bắc.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, coffeeImage, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "son-la",
    name: "Sơn La",
    slogan: "Mùa hoa ban nở giữa núi rừng",
    description:
      "Sơn La nổi bật với cao nguyên Mộc Châu, khí hậu mát mẻ và văn hóa dân tộc phong phú.",
    accentColor: "#15803d",
    heroImage: heroLandscape,
    introImage: coffeeImage,
    specialties: [
      {
        name: "Bê chao Mộc Châu",
        description: "Thịt bê mềm, thơm.",
        origin: "Mộc Châu",
        image: seafoodImage
      },
      {
        name: "Sữa tươi Mộc Châu",
        description: "Sữa tươi ngọt thanh.",
        origin: "Mộc Châu",
        image: heroLandscape
      },
      {
        name: "Táo mèo",
        description: "Quả rừng chua ngọt.",
        origin: "Bắc Yên",
        image: cuisineImage
      }
    ],
    tourism: [
      {
        name: "Cao nguyên Mộc Châu",
        description: "Thảo nguyên xanh mát quanh năm.",
        image: heroLandscape
      },
      {
        name: "Đồi chè Mộc Châu",
        description: "Đồi chè trải dài bạt ngàn.",
        image: coffeeImage
      },
      {
        name: "Ngũ động Bản Ôn",
        description: "Hang động đẹp giữa núi.",
        image: halongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Hết Chá",
        description: "Nghi lễ đặc sắc của người Thái.",
        image: heroLandscape
      },
      {
        name: "Múa xòe",
        description: "Điệu múa truyền thống Tây Bắc.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, coffeeImage, cuisineImage, seafoodImage, halongImage, phoImage]
  },
  {
    slug: "thanh-hoa",
    name: "Thanh Hóa",
    slogan: "Đất địa linh và biển xanh",
    description:
      "Thanh Hóa hội tụ di sản văn hóa, bãi biển Sầm Sơn và ẩm thực phong phú.",
    accentColor: "#9a3412",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Nem chua",
        description: "Chua cay, thơm mùi lá.",
        origin: "Thanh Hóa",
        image: cuisineImage
      },
      {
        name: "Bánh gai Tứ Trụ",
        description: "Bánh dẻo thơm, nhân đậu xanh.",
        origin: "Thọ Xuân",
        image: phoImage
      },
      {
        name: "Hải sản Sầm Sơn",
        description: "Tươi ngon từ biển.",
        origin: "Sầm Sơn",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Thành nhà Hồ",
        description: "Di sản thế giới với kiến trúc đá.",
        image: thangLongImage
      },
      {
        name: "Biển Sầm Sơn",
        description: "Bãi biển nổi tiếng miền Bắc.",
        image: heroLandscape
      },
      {
        name: "Suối cá Cẩm Lương",
        description: "Kỳ quan thiên nhiên độc đáo.",
        image: halongImage
      }
    ],
    culture: [
      {
        name: "Lễ hội Lam Kinh",
        description: "Tưởng nhớ vua Lê Lợi.",
        image: heroLandscape
      },
      {
        name: "Hò sông Mã",
        description: "Làn điệu dân gian xứ Thanh.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "nghe-an",
    name: "Nghệ An",
    slogan: "Miền quê xứ Nghệ giàu truyền thống",
    description:
      "Nghệ An là quê hương Chủ tịch Hồ Chí Minh, với bãi biển đẹp và ẩm thực đậm đà.",
    accentColor: "#b91c1c",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Cháo lươn",
        description: "Nước dùng đậm đà, lươn thơm.",
        origin: "Vinh",
        image: cuisineImage
      },
      {
        name: "Nhút Thanh Chương",
        description: "Món ăn dân dã từ mít non.",
        origin: "Thanh Chương",
        image: heroLandscape
      },
      {
        name: "Cam Vinh",
        description: "Cam mọng nước, thơm ngọt.",
        origin: "Vinh",
        image: phoImage
      }
    ],
    tourism: [
      {
        name: "Làng Sen",
        description: "Quê hương Chủ tịch Hồ Chí Minh.",
        image: thangLongImage
      },
      {
        name: "Biển Cửa Lò",
        description: "Bãi biển sôi động miền Trung.",
        image: seafoodImage
      },
      {
        name: "Đảo Lan Châu",
        description: "Điểm ngắm hoàng hôn tuyệt đẹp.",
        image: heroLandscape
      }
    ],
    culture: [
      {
        name: "Dân ca ví giặm",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image: heroLandscape
      },
      {
        name: "Lễ hội đền Cuông",
        description: "Lễ hội truyền thống xứ Nghệ.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "ha-tinh",
    name: "Hà Tĩnh",
    slogan: "Dải đất miền Trung trầm mặc",
    description:
      "Hà Tĩnh nổi bật với bãi biển hoang sơ, núi Hồng Lĩnh và văn hóa dân ca đặc sắc.",
    accentColor: "#92400e",
    heroImage: heroLandscape,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Kẹo cu đơ",
        description: "Ngọt thơm vị lạc và mật mía.",
        origin: "Hồng Lĩnh",
        image: cuisineImage
      },
      {
        name: "Bún bò Đức Thọ",
        description: "Nước dùng đậm vị.",
        origin: "Đức Thọ",
        image: phoImage
      },
      {
        name: "Mực nhảy",
        description: "Hải sản tươi ngon.",
        origin: "Thiên Cầm",
        image: seafoodImage
      }
    ],
    tourism: [
      {
        name: "Biển Thiên Cầm",
        description: "Bãi biển hoang sơ, thơ mộng.",
        image: seafoodImage
      },
      {
        name: "Núi Hồng Lĩnh",
        description: "Ngọn núi gắn với truyền thuyết.",
        image: heroLandscape
      },
      {
        name: "Khu lưu niệm Nguyễn Du",
        description: "Không gian văn hóa của đại thi hào.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Dân ca ví giặm",
        description: "Nét văn hóa dân gian đặc sắc.",
        image: heroLandscape
      },
      {
        name: "Lễ hội Nguyễn Du",
        description: "Tôn vinh giá trị văn học.",
        image: cuisineImage
      }
    ],
    gallery: [heroLandscape, cuisineImage, phoImage, seafoodImage, halongImage, coffeeImage]
  },
  {
    slug: "dong-bang-song-hong",
    name: "Đồng Bằng Sông Hồng",
    slogan: "Châu thổ trù phú và di sản ngàn đời",
    description:
      "Vùng đồng bằng trung tâm của miền Bắc với hệ thống sông ngòi dày đặc, làng nghề lâu đời và nhịp sống văn hóa sôi động.",
    accentColor: "#0f766e",
    heroImage: thangLongImage,
    introImage: cuisineImage,
    specialties: [
      {
        name: "Bún thang",
        description: "Tinh tế, thanh nhẹ với hương vị Hà Nội.",
        origin: "Hà Nội",
        image: phoImage
      },
      {
        name: "Bánh gai",
        description: "Bánh dẻo thơm, nhân đậu xanh.",
        origin: "Ninh Giang",
        image: cuisineImage
      },
      {
        name: "Chè sen",
        description: "Vị thanh mát từ sen vùng châu thổ.",
        origin: "Hưng Yên",
        image: heroLandscape
      }
    ],
    tourism: [
      {
        name: "Phố cổ Hà Nội",
        description: "Không gian văn hóa và ẩm thực đậm chất Bắc Bộ.",
        image: heroLandscape
      },
      {
        name: "Làng nghề gốm Bát Tràng",
        description: "Di sản thủ công truyền thống.",
        image: thangLongImage
      },
      {
        name: "Vườn nhãn Hưng Yên",
        description: "Mùa quả ngọt tràn ngập sắc màu.",
        image: coffeeImage
      }
    ],
    culture: [
      {
        name: "Quan họ Bắc Ninh",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image: cuisineImage
      },
      {
        name: "Lễ hội làng",
        description: "Gắn kết cộng đồng, giữ gìn bản sắc.",
        image: heroLandscape
      }
    ],
    gallery: [thangLongImage, cuisineImage, heroLandscape, phoImage, halongImage, seafoodImage]
  },
  {
    slug: "dong-bac",
    name: "Đông Bắc",
    slogan: "Núi non hùng vĩ, sắc màu bản địa",
    description:
      "Vùng núi Đông Bắc nổi bật với cao nguyên đá, hồ nước xanh biếc và văn hóa đa dạng của các dân tộc thiểu số.",
    accentColor: "#1d4ed8",
    heroImage: halongImage,
    introImage: heroLandscape,
    specialties: [
      {
        name: "Thắng cố",
        description: "Món ăn đặc trưng vùng cao.",
        origin: "Hà Giang",
        image: cuisineImage
      },
      {
        name: "Lạp xưởng gác bếp",
        description: "Hương vị đậm đà của núi rừng.",
        origin: "Lạng Sơn",
        image: seafoodImage
      },
      {
        name: "Chè shan tuyết",
        description: "Trà cổ thụ thơm dịu.",
        origin: "Tuyên Quang",
        image: coffeeImage
      }
    ],
    tourism: [
      {
        name: "Cao nguyên đá Đồng Văn",
        description: "Cảnh quan đá vôi kỳ vĩ.",
        image: heroLandscape
      },
      {
        name: "Thác Bản Giốc",
        description: "Một trong những thác nước đẹp nhất Việt Nam.",
        image: halongImage
      },
      {
        name: "Hồ Ba Bể",
        description: "Hồ nước ngọt lớn giữa núi rừng.",
        image: thangLongImage
      }
    ],
    culture: [
      {
        name: "Chợ phiên vùng cao",
        description: "Nơi giao lưu văn hóa của đồng bào dân tộc.",
        image: cuisineImage
      },
      {
        name: "Lễ hội mùa hoa tam giác mạch",
        description: "Sắc hồng phủ khắp núi rừng.",
        image: heroLandscape
      }
    ],
    gallery: [halongImage, heroLandscape, cuisineImage, coffeeImage, seafoodImage, phoImage]
  }
];

export default provinces;
