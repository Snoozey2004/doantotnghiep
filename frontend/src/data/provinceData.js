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
    heroImage: "/Images/Landingpagehanoi/istockphoto-525833203-612x612.jpg",
    introImage: "/Images/Landingpagehanoi/istockphoto-538868764-612x612.jpg",
    stats: [
      { value: "1000+", label: "Năm lịch sử" },
      { value: "30+", label: "Di tích nổi tiếng" },
      { value: "100+", label: "Lễ hội truyền thống" },
      { value: "50+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1010",
        title: "Kinh đô Thăng Long ra đời",
        description:
          "Vua Lý Thái Tổ ban Chiếu dời đô từ Hoa Lư về Đại La, đặt tên là Thăng Long, mở đầu thời kỳ phát triển nghìn năm của đất kinh kỳ.",
        icon: "🏯",
        image: "/Images/Landingpagehanoi/istockphoto-478073811-612x612.jpg",
      },
      {
        year: "1070",
        title: "Văn Miếu – Quốc Tử Giám",
        description:
          "Vua Lý Thánh Tông cho xây Văn Miếu, sau đó Quốc Tử Giám được thành lập – trường đại học đầu tiên của Việt Nam, biểu tượng tinh thần hiếu học.",
        icon: "📚",
        image: "/Images/Landingpagehanoi/istockphoto-2153199185-612x612.jpg",
      },
      {
        year: "1945",
        title: "Thủ đô độc lập",
        description:
          "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
        icon: "🇻🇳",
        image: "/Images/Landingpagehanoi/pexels-vtnt2-31647021.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thủ đô hội nhập",
        description:
          "Hà Nội phát triển vượt bậc, hội nhập quốc tế trong khi vẫn bảo tồn di sản văn hóa nghìn năm của đất kinh kỳ.",
        icon: "🌟",
        image: "/Images/Landingpagehanoi/istockphoto-523822972-612x612.jpg",
      },
    ],
    specialties: [
      {
        slug: "pho-ha-noi",
        name: "Phở Hà Nội",
        description:
          "Nước dùng trong, vị ngọt thanh từ xương hầm lâu, bánh phở mềm mượt – biểu tượng ẩm thực đất kinh kỳ.",
        origin: "Phố cổ Hà Nội",
        image: "/Images/Landingpagehanoi/pexels-fox-58267-1265626.jpg",
        icon: "🍜",
      },
      {
        slug: "bun-cha-ha-noi",
        name: "Bún Chả Hà Nội",
        description:
          "Hương khói than hoa quyện trong từng sợi bún trắng – nét tinh tế ẩm thực phố cổ mà cựu Tổng thống Obama từng thưởng thức.",
        origin: "Phố cổ Hà Nội",
        image: "/Images/Landingpagehanoi/pexels-nhavan-33082608.jpg",
        icon: "🥢",
      },
      {
        slug: "banh-cuon-ha-noi",
        name: "Bánh Cuốn Hà Nội",
        description:
          "Tinh tế từ lớp vỏ mỏng tang làm bằng bột gạo hấp, thơm hương nhân thịt nấm – món ăn sáng trứ danh của đất Thăng Long.",
        origin: "Phố cổ Hà Nội",
        image: "/Images/Landingpagehanoi/pexels-nhavan-36930594.jpg",
        icon: "🫔",
      },
      {
        slug: "che-ha-noi",
        name: "Chè Hà Nội",
        description:
          "Ngọt ngào thanh mát với hạt sen, long nhãn và thạch – tinh hoa quà vặt nghìn năm của đất kinh kỳ.",
        origin: "Phố Hàng Đường, Hà Nội",
        image: "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-36204083.jpg",
        icon: "🍮",
      },
      // {
      //   slug: "cha-ca-la-vong",
      //   name: "Chả Cá Lã Vọng",
      //   description:
      //     "Cá lăng nướng nghệ thì là trên bếp than, ăn kèm bún và mắm tôm – món ăn trứ danh từ thế kỷ XIX.",
      //   origin: "Phố Chả Cá",
      //   image: "/Images/Landingpagehanoi/pexels-nguyendesigner-14192638.jpg",
      //   icon: "🐟",
      // },
      // {
      //   slug: "ca-phe-trung",
      //   name: "Cà Phê Trứng",
      //   description:
      //     "Sáng tạo độc đáo của Hà Nội: cà phê robusta đậm đặc pha cùng lòng đỏ trứng đánh bông, béo ngậy và thơm nồng.",
      //   origin: "Phố Đinh Tiên Hoàng",
      //   image:
      //     "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-35775552.jpg",
      //   icon: "☕",
      // },
    ],
    tourism: [
      {
        name: "Hồ Gươm",
        description:
          "Biểu tượng của Hà Nội với vẻ đẹp thơ mộng giữa lòng phố cổ.",
        yearBuilt: "Thế kỷ XV",
        historicalValue:
          "Linh địa nghìn năm, gắn với truyền thuyết Hồ Hoàn Kiếm",
        highlight: "Tháp Rùa, cầu Thê Húc",
        image: "/Images/Landingpagehanoi/pexels-phamthe-13519138.jpg",
      },
      {
        name: "Hoàng thành Thăng Long",
        description: "Di sản thế giới lưu giữ dấu ấn kinh kỳ ngàn năm.",
        yearBuilt: "Năm 1010",
        historicalValue:
          "Di sản thế giới UNESCO, trung tâm quyền lực 13 thế kỷ",
        highlight: "Khu khảo cổ, Đoan Môn, Hậu Lâu",
        image:
          "/Images/Landingpagehanoi/pexels-nguyen-ngoc-tien-1321490019-33763568.jpg",
      },
      {
        name: "Văn Miếu – Quốc Tử Giám",
        description:
          "Trường đại học đầu tiên của Việt Nam, biểu tượng truyền thống hiếu học.",
        yearBuilt: "Năm 1070",
        historicalValue:
          "Trung tâm học thuật nghìn năm, lưu giữ 82 bia Tiến sĩ",
        highlight: "Khuê Văn Các, bia đá Tiến sĩ",
        image: "/Images/Landingpagehanoi/istockphoto-2153199185-612x612.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Gióng",
        description:
          "Lễ hội truyền thống tôn vinh tinh thần thượng võ chống giặc ngoại xâm của dân tộc Việt.",
        image: "/Images/Landingpagehanoi/pexels-hson-30843558.jpg",
      },
      {
        name: "Múa rối nước",
        description:
          "Nghệ thuật dân gian độc đáo xuất phát từ đồng bằng Bắc Bộ, kể chuyện làng quê và truyền thuyết trên mặt nước.",
        image: "/Images/Landingpagehanoi/pexels-klub-boks-1437055-9114436.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng gốm Bát Tràng",
        product: "Gốm sứ",
        description:
          "Làng nghề gốm sứ hơn 500 năm lịch sử, sản xuất các sản phẩm tinh xảo và nghệ thuật được xuất khẩu toàn cầu.",
        image:
          "/Images/Landingpagehanoi/pexels-s-bat-trang-108848915-18376874.jpg",
        age: "500+ năm",
      },
      {
        name: "Làng lụa Vạn Phúc",
        product: "Lụa tơ tằm",
        description:
          "Làng dệt lụa nổi tiếng với chất lụa mềm mại, hoa văn tinh tế, được ưa chuộng từ triều đình đến nay.",
        image:
          "/Images/Landingpagehanoi/pexels-quang-nguyen-vinh-222549-6350926.jpg",
        age: "1000+ năm",
      },
      {
        name: "Làng tranh Đông Hồ",
        product: "Tranh dân gian",
        description:
          "Dòng tranh khắc gỗ in màu tự nhiên, lưu giữ giá trị văn hóa dân gian đặc sắc từ thế kỷ XVII.",
        image:
          "/Images/Landingpagehanoi/pexels-soc-nang-d-ng-2150345854-36850531.jpg",
        age: "Từ thế kỷ XVII",
      },
      {
        name: "Làng thêu Quất Động",
        product: "Thêu tay",
        description:
          "Nổi tiếng với nghề thêu tay điêu luyện, tạo ra những bức tranh thêu và sản phẩm mang giá trị nghệ thuật cao.",
        image: "/Images/Landingpagehanoi/pexels-nhavan-36930586.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Gióng",
        date: "Tháng 4 âm lịch",
        description:
          "Lễ hội tôn vinh Thánh Gióng – biểu tượng tinh thần thượng võ chống giặc ngoại xâm của dân tộc Việt Nam.",
        significance: "Di sản văn hóa phi vật thể UNESCO",
        image:
          "/Images/Landingpagehanoi/pexels-ninh-tien-dat-393934339-35090977.jpg",
      },
      {
        name: "Festival Thu Hà Nội",
        date: "Tháng 9 – 10 hàng năm",
        description:
          "Sự kiện văn hóa đặc trưng mùa thu Hà Nội với các hoạt động nghệ thuật, trình diễn và triển lãm đặc sắc.",
        significance: "Sự kiện văn hóa thường niên",
        image: "/Images/Landingpagehanoi/pexels-hoffman11-19328539.jpg",
      },
      {
        name: "Lễ hội Hoa Anh Đào",
        date: "Tháng 3 – 4",
        description:
          "Lễ hội kỷ niệm quan hệ hữu nghị Việt – Nhật với trưng bày hoa anh đào rực rỡ tại không gian Hồ Hoàn Kiếm.",
        significance: "Giao lưu văn hóa quốc tế",
        image: "/Images/Landingpagehanoi/pexels-ivi-nnnnnn-129330-37396390.jpg",
      },
      {
        name: "Lễ hội Chùa Hương",
        date: "Mùng 6 tháng Giêng – tháng 3 âm lịch",
        description:
          "Một trong những lễ hội lớn nhất Việt Nam, hành hương về chùa Hương giữa phong cảnh núi non hùng vĩ.",
        significance: "Lễ hội tâm linh lớn nhất miền Bắc",
        image:
          "/Images/Landingpagehanoi/pexels-thanhhoa-tran-640546-1621248.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagehanoi/istockphoto-2171248303-612x612.jpg",
      "/Images/Landingpagehanoi/istockphoto-1444726693-612x612.jpg",
      "/Images/Landingpagehanoi/pexels-hson-25949473.jpg",
      "/Images/Landingpagehanoi/istockphoto-1461240621-612x612.jpg",
      "/Images/Landingpagehanoi/istockphoto-1180719633-612x612.jpg",
      "/Images/Landingpagehanoi/pexels-dwanghong-30411837.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo quận",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng quận nội thành",
        data: [
          { name: "Ba Đình", value: 48 },
          { name: "Hoàn Kiếm", value: 36 },
          { name: "Đống Đa", value: 29 },
          { name: "Tây Hồ", value: 21 },
          { name: "Hai Bà Trưng", value: 17 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến văn hóa tiêu biểu của Hà Nội",
        data: [
          { name: "Di tích lịch sử", value: 40 },
          { name: "Ẩm thực đường phố", value: 25 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề đặc sắc", value: 15 },
        ],
      },
    },
  },
  {
    slug: "ho-chi-minh",
    name: "Hồ Chí Minh",
    slogan: "Năng lượng hiện đại giữa lòng phương Nam",
    description:
      "Thành phố năng động bậc nhất Việt Nam với nhịp sống hiện đại, giao thoa văn hóa và ẩm thực đường phố đa sắc.",
    accentColor: "#b91c1c",
    heroImage: "/Images/Landingpagetphcm/tphcm-1-1751245519173693919081.jpg",
    introImage: "/Images/Landingpagetphcm/saigon-aerial-classic.jpg",
    stats: [
      { value: "320+", label: "Năm lịch sử" },
      { value: "1700+", label: "Di tích văn hóa" },
      { value: "60+", label: "Lễ hội truyền thống" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1698",
        title: "Lập đất Gia Định",
        description:
          "Nguyễn Hữu Cảnh vào Nam kinh lược, lập phủ Gia Định – mốc khai sinh vùng đất Sài Gòn và mở ra thời kỳ khẩn hoang phương Nam.",
        icon: "🏛️",
        image:
          "/Images/Landingpagetphcm/sugar4h-read-only-1706671340400529838808.webp",
      },
      {
        year: "1859",
        title: "Pháp chiếm Gia Định",
        description:
          "Thực dân Pháp nổ súng tấn công thành Gia Định, mở đầu quá trình xâm lược và biến Sài Gòn thành trung tâm hành chính thuộc địa.",
        icon: "⚔️",
        image: "/Images/Landingpagetphcm/dai-bac-thanh-gia-dinh.jpg",
      },
      {
        year: "1975",
        title: "Giải phóng miền Nam",
        description:
          "Ngày 30/4/1975, xe tăng quân giải phóng tiến vào Dinh Độc Lập, thống nhất đất nước, Sài Gòn đổi tên thành Hồ Chí Minh.",
        icon: "🇻🇳",
        image: "/Images/Landingpagetphcm/image-20250515144423-1.jpeg",
      },
      {
        year: "Hiện đại",
        title: "Đô thị năng động nhất VN",
        description:
          "TP.HCM trở thành đầu tàu kinh tế cả nước, trung tâm tài chính – thương mại – văn hóa hội nhập quốc tế sôi động nhất Việt Nam.",
        icon: "🌆",
        image: "/Images/Landingpagetphcm/tphcm-1-1751245519173693919081.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề Phú Bình",
        product: "Đồ mỹ nghệ",
        description:
          "Làng nghề thủ công truyền thống nổi tiếng với sản phẩm điêu khắc gỗ và đồ mỹ nghệ tinh xảo mang phong cách Nam Bộ.",
        image: "/Images/Landingpagetphcm/anh_05_17063429052023.webp",
        age: "200+ năm",
      },
      {
        name: "Làng bánh tráng Phú Hòa Đông",
        product: "Bánh tráng",
        description:
          "Làng nghề làm bánh tráng thủ công truyền thống, cung cấp sản phẩm cho toàn vùng Nam Bộ với chất lượng đặc trưng.",
        image:
          "/Images/Landingpagetphcm/1728983124-lang-nghe-banh-trang-phu-hoa-dong-cu-chi-2-nguyen-vy-166044489581451200801-16604449710001276686568-1694314734222543258445.jpg",
        age: "150+ năm",
      },
      {
        name: "Làng nghề thêu Bình Chánh",
        product: "Thêu tay",
        description:
          "Nghề thêu tay tinh xảo gắn liền với văn hóa Nam Bộ, tạo ra các sản phẩm trang trí có giá trị nghệ thuật cao.",
        image: "/Images/Landingpagetphcm/3709f196da040d5a541585-1698635247.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng đan lát Thủ Đức",
        product: "Mây tre đan",
        description:
          "Làng nghề đan lát mây tre truyền thống tạo ra các sản phẩm gia dụng và trang trí mang nét đặc trưng vùng Nam Bộ.",
        image:
          "/Images/Landingpagetphcm/z4821269246842-34dbed2841718758fde120968e359565-1698338696.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Nguyên Tiêu",
        date: "Rằm tháng Giêng",
        description:
          "Lễ hội lớn nhất của người Hoa tại Chợ Lớn với rước đèn, múa lân và các nghi lễ truyền thống rực rỡ sắc màu.",
        significance: "Di sản văn hóa người Hoa",
        image: "/Images/Landingpagetphcm/longden11b.jpg",
      },
      {
        name: "Lễ hội Áo dài TP.HCM",
        date: "Tháng 3 hàng năm",
        description:
          "Sự kiện tôn vinh trang phục truyền thống áo dài Việt Nam với nhiều hoạt động trình diễn, triển lãm đặc sắc.",
        significance: "Sự kiện văn hóa thường niên",
        image:
          "/Images/Landingpagetphcm/z5228693508774439a557ef770e1150b39225862f024fa-17119654858421192546544.jpg",
      },
      {
        name: "Hội Diều Sài Gòn",
        date: "Tháng 8-9",
        description:
          "Lễ hội thả diều truyền thống được tổ chức tại các bãi đất rộng, thu hút đông đảo người tham gia với nhiều mẫu diều độc đáo.",
        significance: "Trò chơi dân gian",
        image: "/Images/Landingpagetphcm/dieu-6-4132-7273.jpg.webp",
      },
      {
        name: "Tết Trung Thu Sài Gòn",
        date: "Rằm tháng 8 âm lịch",
        description:
          "Lễ hội trung thu sôi động nhất cả nước với phố lồng đèn Lương Nhữ Học, múa lân và các hoạt động văn hóa đặc sắc.",
        significance: "Lễ hội thiếu nhi truyền thống",
        image: "/Images/Landingpagetphcm/trung-thu-di-dau-choi-tphcm-1.jpg",
      },
    ],
    specialties: [
      {
        name: "Cơm tấm",
        description:
          "Hạt gạo tấm thơm, sườn nướng đậm vị và nước mắm chua ngọt.",
        origin: "Sài Gòn xưa",
        image: "/Images/Landingpagetphcm/com-tam-sai-gon.jpg",
      },
      {
        name: "Bánh mì Sài Gòn",
        description: "Vỏ giòn, nhân đầy đặn với pate và rau thơm.",
        origin: "Quận 1",
        image: "/Images/Landingpagetphcm/125f9835-banh-mi-sai-gon-thumb.jpg",
      },
      {
        name: "Hủ tiếu Nam Vang",
        description: "Nước dùng ngọt thanh, tôm thịt đầy đặn.",
        origin: "Chợ Lớn",
        image:
          "/Images/Landingpagetphcm/Buoc-8-Thanh-pham-1-8-8366-1684125654.jpg",
      },
    ],
    tourism: [
      {
        name: "Nhà thờ Đức Bà",
        description: "Biểu tượng kiến trúc Pháp giữa trung tâm thành phố.",
        image: "/Images/Landingpagetphcm/nha-tho-duc-ba-sai-gon-5.jpg",
      },
      {
        name: "Bưu điện Trung tâm",
        description: "Không gian cổ kính với hơi thở thời thuộc địa.",
        image:
          "/Images/Landingpagetphcm/1280px-Saigon_Central_Post_Office_2022.jpg",
      },
      {
        name: "Phố đi bộ Nguyễn Huệ",
        description: "Trung tâm lễ hội và văn hóa đương đại của Sài Gòn.",
        image:
          "/Images/Landingpagetphcm/1280px-Ho_Chi_Minh_City,_Ho_Chi_Minh_Statue,_2020-01_CN-04.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Áo dài",
        description: "Tôn vinh nét đẹp truyền thống trong nhịp sống hiện đại.",
        image: "/Images/Landingpagetphcm/trung-thu-di-dau-choi-tphcm-1.jpg",
      },
      {
        name: "Chợ Bến Thành",
        description: "Điểm hẹn văn hóa, ẩm thực và mua sắm đặc trưng Nam Bộ.",
        image: "/Images/Landingpagetphcm/Ben_Thanh_market_2.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagetphcm/tphcm-1-1751245519173693919081.jpg",
      "/Images/Landingpagetphcm/nha-tho-duc-ba-sai-gon-5.jpg",
      "/Images/Landingpagetphcm/Ben_Thanh_market_2.jpg",
      "/Images/Landingpagetphcm/saigon-aerial-classic.jpg",
      "/Images/Landingpagetphcm/1280px-Saigon_Central_Post_Office_2022.jpg",
      "/Images/Landingpagetphcm/longden11b.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo quận",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng quận nội thành TP.HCM",
        data: [
          { name: "Quận 1", value: 42 },
          { name: "Bình Thạnh", value: 27 },
          { name: "Gò Vấp", value: 19 },
          { name: "Phú Nhuận", value: 15 },
          { name: "Quận 3", value: 31 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Hồ Chí Minh",
        data: [
          { name: "Di tích lịch sử", value: 30 },
          { name: "Ẩm thực đặc sản", value: 35 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 15 },
        ],
      },
    },
  },
  {
    slug: "hai-phong",
    name: "Hải Phòng",
    slogan: "Thành phố cảng rực rỡ sắc biển",
    description:
      "Thành phố hoa phượng đỏ mang hơi thở biển cả, ẩm thực hải sản phong phú và kiến trúc Pháp cổ.",
    accentColor: "#dc2626",
    heroImage:
      "/Images/Landingpagehaiphong/CatBa2-1648981692-9662-1648981737.jpg",
    introImage: "/Images/Landingpagehaiphong/CDX-HP-1.jpg",
    stats: [
      { value: "150+", label: "Năm lịch sử" },
      { value: "300+", label: "Di tích văn hóa" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "20+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1888",
        title: "Hải Phòng thành đô thị",
        description:
          "Thực dân Pháp chính thức thành lập thành phố Hải Phòng, biến nơi đây thành cảng biển thương mại quan trọng nhất miền Bắc.",
        icon: "⚓",
        image: "/Images/Landingpagehaiphong/Haiphong_Opera_House.jpg",
      },
      {
        year: "1955",
        title: "Giải phóng Hải Phòng",
        description:
          "Hải Phòng được giải phóng hoàn toàn, người dân đón chào hòa bình sau những năm dài kháng chiến gian khổ.",
        icon: "🕊️",
        image:
          "/Images/Landingpagehaiphong/89faa8e7-8d7c-4a95-91b7-a46d7bc3426c63882783914821477420250514085647.jpg",
      },
      {
        year: "1972",
        title: "Chiến dịch Linebacker II",
        description:
          "Hải Phòng anh dũng chống trả cuộc ném bom của Mỹ, thể hiện tinh thần bất khuất của quân và dân thành phố Cảng.",
        icon: "✊",
        image:
          "/Images/Landingpagehaiphong/1639031280px-boeing_b-52_dropping_bombs-1630.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thành phố Cảng văn minh",
        description:
          "Hải Phòng phát triển thành trung tâm kinh tế biển lớn thứ ba cả nước, đồng thời bảo tồn văn hóa đặc trưng thành phố Hoa Phượng Đỏ.",
        icon: "🌺",
        image: "/Images/Landingpagehaiphong/09IMG_4106.jpeg",
      },
    ],
    craftVillages: [
      {
        name: "Điêu khắc đá Nhồi",
        product: "Điêu khắc đá",
        description:
          "Làng nghề điêu khắc đá truyền thống nổi tiếng với các sản phẩm trang trí, tượng nghệ thuật tinh xảo từ đá tự nhiên.",
        image: "/Images/Landingpagehaiphong/dieu-khac-da-hai-phong.webp",
        age: "500+ năm",
      },
      {
        name: "Làng dệt chiếu An Thái",
        product: "Chiếu cói",
        description:
          "Làng nghề dệt chiếu cói thủ công truyền thống, tạo ra sản phẩm chiếu bền đẹp phục vụ nhu cầu sinh hoạt người dân.",
        image: "/Images/Landingpagehaiphong/Lang-Nghe-6.jpg",
        age: "300+ năm",
      },
      {
        name: "Làng đóng thuyền Đồ Sơn",
        product: "Thuyền gỗ",
        description:
          "Nghề đóng thuyền gỗ truyền thống gắn liền với văn hóa biển, tạo ra những chiếc thuyền vừa chắc chắn vừa mang tính nghệ thuật.",
        image: "/Images/Landingpagehaiphong/ghe-hau-xuong-dong-thuyen.webp",
        age: "200+ năm",
      },
      {
        name: "Làng nghề nón Tiên Lãng",
        product: "Nón lá",
        description:
          "Làng nghề làm nón lá thủ công với kỹ thuật đan lá khéo léo, tạo ra những chiếc nón bền đẹp mang nét văn hóa miền Bắc.",
        image:
          "/Images/Landingpagehaiphong/164658-1-vinh-long-giu-gin-nghe-cham-non-la-truyen-thong.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Chọi trâu Đồ Sơn",
        date: "Mùng 9 tháng 8 âm lịch",
        description:
          "Lễ hội truyền thống đặc sắc nhất Hải Phòng với những trận chọi trâu kịch tính, thu hút hàng nghìn du khách mỗi năm.",
        significance: "Di sản văn hóa phi vật thể quốc gia",
        image: "/Images/Landingpagehaiphong/0992.jpg",
      },
      {
        name: "Lễ hội Hoa Phượng Đỏ",
        date: "Tháng 5 hàng năm",
        description:
          "Lễ hội đặc trưng của Hải Phòng tôn vinh biểu tượng hoa phượng đỏ với nhiều hoạt động văn hóa nghệ thuật sôi động.",
        significance: "Sự kiện văn hóa thường niên",
        image: "/Images/Landingpagehaiphong/20230921_650bdc633df42.jpg",
      },
      {
        name: "Lễ hội Đền Nghè",
        date: "Tháng 2 âm lịch",
        description:
          "Lễ hội tưởng niệm nữ tướng Lê Chân – người có công khai phá vùng đất Hải Phòng, thể hiện đạo lý uống nước nhớ nguồn.",
        significance: "Di tích lịch sử quốc gia",
        image:
          "/Images/Landingpagehaiphong/d1053c84-810f-4204-9002-46b165024148.jpg",
      },
      {
        name: "Hội đua thuyền truyền thống",
        date: "Mùng 4 tháng Giêng",
        description:
          "Lễ hội đua thuyền trên sông truyền thống của cư dân vùng biển, thể hiện tinh thần thượng võ và văn hóa sông nước.",
        significance: "Lễ hội dân gian truyền thống",
        image:
          "/Images/Landingpagehaiphong/140106-vna_potal_quang_tri_tung_bung_le_hoi_dua_thuyen_truyen_thong_tren_song_kien_giang_stand.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh đa cua",
        description: "Sợi bánh đa đỏ, nước dùng cua đậm đà.",
        origin: "Quận Lê Chân",
        image:
          "/Images/Landingpagehaiphong/Banh-da-cua-Hai-Phong-7-1080x600.jpeg",
      },
      {
        name: "Nem cua bể",
        description: "Nhân hải sản đầy đặn, vỏ giòn rụm.",
        origin: "Đồ Sơn",
        image: "/Images/Landingpagehaiphong/images.jpg",
      },
      {
        name: "Hải sản Cát Bà",
        description: "Tươi ngon, chế biến đa dạng từ biển.",
        origin: "Cát Bà",
        image: "/Images/Landingpagehaiphong/an-hai-san-o-cat-ba-tuoi-ngon.jpg",
      },
    ],
    tourism: [
      {
        name: "Đảo Cát Bà",
        description: "Thiên đường nghỉ dưỡng với rừng quốc gia và biển xanh.",
        image:
          "/Images/Landingpagehaiphong/CatBa2-1648981692-9662-1648981737.jpg",
      },
      {
        name: "Bãi biển Đồ Sơn",
        description: "Điểm đến biển nổi tiếng miền Bắc.",
        image: "/Images/Landingpagehaiphong/du-lich-do-son-1.jpg",
      },
      {
        name: "Nhà hát lớn Hải Phòng",
        description: "Dấu ấn kiến trúc Pháp cổ giữa lòng thành phố.",
        image: "/Images/Landingpagehaiphong/NHL-1.png",
      },
    ],
    culture: [
      {
        name: "Lễ hội chọi trâu Đồ Sơn",
        description: "Lễ hội truyền thống đậm chất dân gian vùng biển.",
        image: "/Images/Landingpagehaiphong/choi-trau-do-son-3.png",
      },
      {
        name: "Làng nghề điêu khắc đá",
        description: "Nghề thủ công lâu đời tạo nên nét văn hóa riêng.",
        image:
          "/Images/Landingpagehaiphong/pexels-tonywuphotography-16761732.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagehaiphong/CatBa2-1648981692-9662-1648981737.jpg",
      "/Images/Landingpagehaiphong/NHL-1.png",
      "/Images/Landingpagehaiphong/Banh-da-cua-Hai-Phong-7-1080x600.jpeg",
      "/Images/Landingpagehaiphong/choi-trau-do-son-3.png",
      "/Images/Landingpagehaiphong/lang-chai.jpg",
      "/Images/Landingpagehaiphong/du-lich-do-son-1.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo quận",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng quận của Hải Phòng",
        data: [
          { name: "Hồng Bàng", value: 31 },
          { name: "Lê Chân", value: 24 },
          { name: "Ngô Quyền", value: 28 },
          { name: "Kiến An", value: 17 },
          { name: "Đồ Sơn", value: 22 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Hải Phòng",
        data: [
          { name: "Di tích lịch sử", value: 38 },
          { name: "Ẩm thực đặc sản", value: 28 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 16 },
        ],
      },
    },
  },
  {
    slug: "da-nang",
    name: "Đà Nẵng",
    slogan: "Thành phố đáng sống bên bờ biển",
    description:
      "Đà Nẵng hội tụ bãi biển đẹp, kiến trúc hiện đại và ẩm thực miền Trung tinh tế.",
    accentColor: "#0ea5e9",
    heroImage:
      "/Images/Landingpagedanang/d9-9377-1615042311-6980-1652872663.webp",
    introImage:
      "/Images/Landingpagedanang/Cau-Rong-bieu-tuong-du-lich-Da-Nang-Anh-Suu-tam.png",
    stats: [
      { value: "130+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích văn hóa" },
      { value: "30+", label: "Lễ hội truyền thống" },
      { value: "15+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1888",
        title: "Đà Nẵng nhượng địa Pháp",
        description:
          "Thực dân Pháp biến Đà Nẵng thành nhượng địa, xây dựng hạ tầng cảng biển và đô thị theo quy hoạch Tây phương.",
        icon: "🏙️",
        image: "/Images/Landingpagedanang/thanh-co-dien-hai.jpeg",
      },
      {
        year: "1975",
        title: "Giải phóng Đà Nẵng",
        description:
          "Ngày 29/3/1975, Đà Nẵng được giải phóng trong chiến dịch thần tốc, mở đường cho đại thắng mùa Xuân 1975.",
        icon: "🕊️",
        image: "/Images/Landingpagedanang/image-20250324162519-1.png",
      },
      {
        year: "1997",
        title: "Thành phố trực thuộc Trung ương",
        description:
          "Đà Nẵng tách khỏi Quảng Nam-Đà Nẵng, trở thành đô thị loại I trực thuộc Trung ương, bước vào kỷ nguyên phát triển mới.",
        icon: "🏛️",
        image:
          "/Images/Landingpagedanang/Cau-Rong-bieu-tuong-du-lich-Da-Nang-Anh-Suu-tam.png",
      },
      {
        year: "2000s",
        title: "Thành phố đáng sống nhất VN",
        description:
          "Đà Nẵng liên tục được vinh danh thành phố đáng sống nhất Việt Nam với hạ tầng hiện đại và bờ biển tuyệt đẹp.",
        icon: "🌊",
        image:
          "/Images/Landingpagedanang/bai-bien-my-khe-nhon-nhip-du-khach-trong-nhung-ngay-dau-thang-11-01-1024x642.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng đá Non Nước",
        product: "Điêu khắc đá",
        description:
          "Làng nghề điêu khắc đá cẩm thạch nổi tiếng hơn 400 năm, tạo ra những tác phẩm nghệ thuật tinh xảo mang đậm bản sắc văn hóa Chăm.",
        image:
          "/Images/Landingpagedanang/EYOyuRdc-lang-da-my-nghe-non-nuoc-2.jpg",
        age: "400+ năm",
      },
      {
        name: "Làng gốm Thanh Hà",
        product: "Gốm đất nung",
        description:
          "Làng gốm truyền thống gần 500 năm tuổi bên bờ sông Thu Bồn, nổi tiếng với sản phẩm gốm nung thủ công đặc trưng.",
        image:
          "/Images/Landingpagedanang/nghe-gom-thanh-ha-hoi-an-da-nang-01-1024x576.jpg",
        age: "500+ năm",
      },
      {
        name: "Nghề dệt chiếu Cẩm Nê",
        product: "Chiếu dệt",
        description:
          "Làng nghề dệt chiếu truyền thống với kỹ thuật dệt tinh tế, tạo ra sản phẩm chiếu bền đẹp được nhiều người ưa chuộng.",
        image: "/Images/Landingpagedanang/cam-ne-1.png",
        age: "200+ năm",
      },
      {
        name: "Làng nghề bánh tráng Túy Loan",
        product: "Bánh tráng",
        description:
          "Làng nghề làm bánh tráng thủ công truyền thống với hương vị đặc trưng, gắn liền với ẩm thực miền Trung.",
        image:
          "/Images/Landingpagedanang/tu-hao-lang-nghe-banh-trang-tuy-loan-1.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Pháo hoa Quốc tế Đà Nẵng",
        date: "Tháng 6-7 hàng năm",
        description:
          "Sự kiện quốc tế hàng đầu Việt Nam thu hút các đội pháo hoa từ khắp thế giới tranh tài trên bầu trời sông Hàn rực rỡ.",
        significance: "Sự kiện quốc tế thường niên",
        image:
          "/Images/Landingpagedanang/036cf565-d66b-4812-9494-f1f1e15fa88c.jpeg",
      },
      {
        name: "Lễ hội Quan Thế Âm",
        date: "19 tháng 2 âm lịch",
        description:
          "Lễ hội tâm linh lớn tại chùa Non Nước, thu hút hàng vạn Phật tử và du khách về dự lễ trong không khí trang nghiêm.",
        significance: "Lễ hội Phật giáo truyền thống",
        image:
          "/Images/Landingpagedanang/le-hoi-quan-the-am-nam-2025-se-dien-ra-tu-ngay-16-den-19-3-2025.jpg",
      },
      {
        name: "Lễ hội Cầu Ngư",
        date: "Tháng 2-3 âm lịch",
        description:
          "Lễ hội truyền thống của ngư dân miền biển cầu cho mưa thuận gió hòa, biển lặng tôm cá đầy thuyền.",
        significance: "Lễ hội dân gian vùng biển",
        image:
          "/Images/Landingpagedanang/le-hoi-cau-ngu-da-nang-02-1024x576.jpg",
      },
      {
        name: "Hội đua thuyền sông Hàn",
        date: "Mùng 2 tháng Giêng",
        description:
          "Giải đua thuyền truyền thống trên sông Hàn mở đầu năm mới, thể hiện tinh thần thượng võ và khí thế của người Đà Nẵng.",
        significance: "Lễ hội thể thao truyền thống",
        image: "/Images/Landingpagedanang/le-hoi-dua-thuyen-da-nang-03.jpg",
      },
    ],
    specialties: [
      {
        name: "Mì Quảng",
        description: "Sợi mì vàng, nước dùng sánh và đậm vị.",
        origin: "Ngũ Hành Sơn",
        image: "/Images/Landingpagedanang/quan-mi-quang-da-nang-01.jpg",
      },
      {
        name: "Bánh tráng cuốn thịt heo",
        description: "Thịt mềm, rau sống và mắm nêm thơm nồng.",
        origin: "Hải Châu",
        image:
          "/Images/Landingpagedanang/Bc8Thnhphm8-1683878266-7070-1683878300.jpg",
      },
      {
        name: "Hải sản Mỹ Khê",
        description: "Hải sản tươi sống chế biến tinh gọn.",
        origin: "Biển Mỹ Khê",
        image:
          "/Images/Landingpagedanang/at_quan-hai-san-ngon-o-my-khe_916e673bd1430278f7ddf411632af2e4.jpg",
      },
    ],
    tourism: [
      {
        name: "Cầu Rồng",
        description: "Biểu tượng kiến trúc hiện đại của thành phố.",
        image:
          "/Images/Landingpagedanang/Cau-Rong-bieu-tuong-du-lich-Da-Nang-Anh-Suu-tam.png",
      },
      {
        name: "Bà Nà Hills",
        description: "Không gian châu Âu trên đỉnh núi.",
        image:
          "/Images/Landingpagedanang/cauvang-1654247842-9403-1654247849.webp",
      },
      {
        name: "Biển Mỹ Khê",
        description: "Một trong những bãi biển đẹp nhất châu Á.",
        image:
          "/Images/Landingpagedanang/bai-bien-my-khe-nhon-nhip-du-khach-trong-nhung-ngay-dau-thang-11-01-1024x642.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội pháo hoa",
        description: "Sự kiện quốc tế rực rỡ trên sông Hàn.",
        image:
          "/Images/Landingpagedanang/le-hoi-phao-hoa-quoc-te-da-nang-diff-2025-tat-tan-tat-nhung-dieu-ban-can-biet-01.jpg",
      },
      {
        name: "Làng đá Non Nước",
        description: "Tinh hoa điêu khắc đá truyền thống.",
        image: "/Images/Landingpagedanang/lang-da-my-nghe-non-nuoc-ivivu.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagedanang/Da-Nang-thanh-pho-dang-song-nhat-Viet-Nam.jpg",
      "/Images/Landingpagedanang/cauvang-1654247842-9403-1654247849.webp",
      "/Images/Landingpagedanang/bai-bien-my-khe-nhon-nhip-du-khach-trong-nhung-ngay-dau-thang-11-01-1024x642.jpg",
      "/Images/Landingpagedanang/le-hoi-phao-hoa-quoc-te-da-nang-diff-2025-tat-tan-tat-nhung-dieu-ban-can-biet-01.jpg",
      "/Images/Landingpagedanang/EYOyuRdc-lang-da-my-nghe-non-nuoc-2.jpg",
      "/Images/Landingpagedanang/d9-9377-1615042311-6980-1652872663.webp",
    ],
    charts: {
      barChart: {
        title: "Điểm du lịch theo khu vực",
        subtitle:
          "Số lượng điểm du lịch nổi tiếng theo từng khu vực của Đà Nẵng",
        data: [
          { name: "Sơn Trà", value: 34 },
          { name: "Ngũ Hành Sơn", value: 28 },
          { name: "Hải Châu", value: 22 },
          { name: "Liên Chiểu", value: 16 },
          { name: "Cẩm Lệ", value: 13 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Đà Nẵng",
        data: [
          { name: "Di tích lịch sử", value: 25 },
          { name: "Ẩm thực đặc sản", value: 28 },
          { name: "Lễ hội truyền thống", value: 12 },
          { name: "Làng nghề / Sinh thái", value: 35 },
        ],
      },
    },
  },
  {
    slug: "can-tho",
    name: "Cần Thơ",
    slogan: "Hơi thở miền Tây sông nước",
    description:
      "Thủ phủ miền Tây với chợ nổi, vườn trái cây và ẩm thực mộc mạc đậm tình.",
    accentColor: "#16a34a",
    heroImage: "/Images/Landingpagecantho/dia-diem-du-lich-can-tho-cover.jpg",
    introImage: "/Images/Landingpagecantho/33-1669631103-image.jpg",
    stats: [
      { value: "200+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích văn hóa" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "20+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1739",
        title: "Khai lập đất Cần Thơ",
        description:
          "Vùng đất Cần Thơ được khai phá trong tiến trình mở cõi phương Nam, dần trở thành trung tâm giao thương sông nước quan trọng.",
        icon: "🌾",
        image: "/Images/Landingpagecantho/23A10057-5.jpg",
      },
      {
        year: "1900",
        title: "Đô thị hóa thời Pháp",
        description:
          "Dưới thời thuộc địa Pháp, Cần Thơ phát triển thành đô thị sầm uất với hệ thống chợ búa, bến cảng và kênh đào hiện đại.",
        icon: "🏙️",
        image: "/Images/Landingpagecantho/don-ca-tai-tu-1911.jpeg",
      },
      {
        year: "1975",
        title: "Giải phóng và thống nhất",
        description:
          "Cần Thơ cùng cả nước trải qua ngày giải phóng lịch sử, mở ra kỷ nguyên xây dựng và phát triển mới cho vùng đất miền Tây.",
        icon: "🕊️",
        image:
          "/Images/Landingpagecantho/h1-nhan-dan-sai-gon-dieu-hanh-mung-tp-duoc-giai-phong.jpg",
      },
      {
        year: "2004",
        title: "Thành phố trực thuộc Trung ương",
        description:
          "Cần Thơ trở thành thành phố trực thuộc Trung ương, khẳng định vị thế là thủ phủ của vùng đồng bằng sông Cửu Long.",
        icon: "⭐",
        image:
          "/Images/Landingpagecantho/images-2cae99c722739fd7811264aa240390092e75828fcb6802d279be42ae7b63973d9df6ee753b3f7c7b7575e8e2084c00d46675d73a624d5461ebaba4e8c15a84c6-_2-1703807931951.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng dệt chiếu Định Yên",
        product: "Chiếu cói",
        description:
          "Làng nghề dệt chiếu truyền thống nổi tiếng với phiên chợ ma độc đáo họp về đêm, sản phẩm chiếu cói chất lượng cao.",
        image:
          "/Images/Landingpagecantho/z4936956034338_4d88cc148064b918c3e99dfc3c370554.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng đan đát Thới Long",
        product: "Mây tre đan",
        description:
          "Làng nghề đan lát mây tre thủ công tạo ra các sản phẩm gia dụng và trang trí đặc trưng văn hóa miền Tây sông nước.",
        image: "/Images/Landingpagecantho/dan-lop-thoi-long.jpg",
        age: "150+ năm",
      },
      {
        name: "Làng bánh dân gian",
        product: "Bánh truyền thống",
        description:
          "Nghề làm bánh dân gian truyền thống với hàng chục loại bánh đặc trưng miền Tây được lưu giữ qua nhiều thế hệ.",
        image:
          "/Images/Landingpagecantho/banh-dan-gian-8-77952588959001867878121.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng gốm Thị Đội",
        product: "Gốm sứ",
        description:
          "Làng nghề gốm truyền thống sản xuất các vật dụng gốm phục vụ đời sống dân cư vùng sông nước Nam Bộ.",
        image: "/Images/Landingpagecantho/1.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Chợ nổi Cái Răng",
        date: "Mùng 4 – 6 tháng Giêng",
        description:
          "Lễ hội tôn vinh nét văn hóa chợ nổi độc đáo trên sông, nơi trao đổi hàng hóa và giao lưu văn hóa của người miền Tây.",
        significance: "Di sản văn hóa phi vật thể quốc gia",
        image: "/Images/Landingpagecantho/IMG_7640.jpg",
      },
      {
        name: "Ok Om Bok",
        date: "Rằm tháng 10 âm lịch",
        description:
          "Lễ hội truyền thống của người Khmer cúng trăng và đua thuyền ngo rực rỡ, thể hiện sắc màu văn hóa đa dân tộc Nam Bộ.",
        significance: "Lễ hội văn hóa Khmer",
        image:
          "/Images/Landingpagecantho/a8f5c9f8-5dc6-43b4-85f9-e07114057da8.jpg",
      },
      {
        name: "Lễ hội Bánh dân gian Nam Bộ",
        date: "Tháng 4 hàng năm",
        description:
          "Lễ hội tôn vinh nghề làm bánh truyền thống miền Tây với hàng trăm loại bánh đặc sản độc đáo được trưng bày và thưởng thức.",
        significance: "Sự kiện văn hóa ẩm thực",
        image: "/Images/Landingpagecantho/m-17439452986902010779413.jpg",
      },
      {
        name: "Đờn ca tài tử Nam Bộ",
        date: "Quanh năm",
        description:
          "Loại hình nghệ thuật âm nhạc dân gian đặc trưng của người Nam Bộ, được UNESCO công nhận là Di sản văn hóa phi vật thể.",
        significance: "Di sản UNESCO",
        image:
          "/Images/Landingpagecantho/vna-potal-don-ca-tai-tu-nam-bo-chinh-thuc-duoc-unesco-cong-nhan-la-di-san-van-hoa-phi-vat-the-dai-dien-cua-nhan-loai-110935331-18642112-15-55-32.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh xèo",
        description: "Vỏ giòn rụm, nhân tôm thịt đầy đặn.",
        origin: "Ninh Kiều",
        image: "/Images/Landingpagecantho/banh-xeo-Can-Tho-3.jpg",
      },
      {
        name: "Lẩu mắm",
        description: "Đậm đà hương vị miền Tây.",
        origin: "Cái Răng",
        image: "/Images/Landingpagecantho/MNI_024.jpg",
      },
      {
        name: "Vú sữa",
        description: "Trái cây đặc sản ngọt thanh.",
        origin: "Phong Điền",
        image:
          "/Images/Landingpagecantho/vov_-_can_tho_dang_buoc_vao_vu_thu_hoach_trai_vu_sua_.jpg",
      },
    ],
    tourism: [
      {
        name: "Chợ nổi Cái Răng",
        description: "Nét văn hóa đặc trưng trên sông nước.",
        image:
          "/Images/Landingpagecantho/z5371097962453-6816919c72f206fce13edfd20701ec89-1713847130.jpg",
      },
      {
        name: "Bến Ninh Kiều",
        description: "Biểu tượng của Cần Thơ về đêm.",
        image: "/Images/Landingpagecantho/ben-ninh-kieu-can-tho-2.jpg.jpg",
      },
      {
        name: "Vườn trái cây",
        description: "Trải nghiệm miệt vườn xanh mát.",
        image: "/Images/Landingpagecantho/vuon-trai-cay-can-tho.jpg",
      },
    ],
    culture: [
      {
        name: "Đờn ca tài tử",
        description: "Di sản âm nhạc Nam Bộ.",
        image:
          "/Images/Landingpagecantho/vna-potal-don-ca-tai-tu-nam-bo-chinh-thuc-duoc-unesco-cong-nhan-la-di-san-van-hoa-phi-vat-the-dai-dien-cua-nhan-loai-110935331-18642112-15-55-32.jpg",
      },
      {
        name: "Lễ hội bánh dân gian",
        description: "Tôn vinh ẩm thực miền Tây.",
        image:
          "/Images/Landingpagecantho/banh-dan-gian-37163108031345822930869.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagecantho/dia-diem-du-lich-can-tho-cover.jpg",
      "/Images/Landingpagecantho/ben-ninh-kieu-can-tho-2.jpg.jpg",
      "/Images/Landingpagecantho/z5371097962453-6816919c72f206fce13edfd20701ec89-1713847130.jpg",
      "/Images/Landingpagecantho/vuon-trai-cay-can-tho.jpg",
      "/Images/Landingpagecantho/a8f5c9f8-5dc6-43b4-85f9-e07114057da8.jpg",
      "/Images/Landingpagecantho/33-1669631103-image.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo quận",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng quận của Cần Thơ",
        data: [
          { name: "Ninh Kiều", value: 38 },
          { name: "Bình Thủy", value: 24 },
          { name: "Cái Răng", value: 21 },
          { name: "Ô Môn", value: 15 },
          { name: "Thốt Nốt", value: 18 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Cần Thơ",
        data: [
          { name: "Di tích lịch sử", value: 28 },
          { name: "Ẩm thực đặc sản", value: 32 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 22 },
        ],
      },
    },
  },
  {
    slug: "hue",
    name: "Huế",
    slogan: "Kinh kỳ trầm mặc giữa dòng Hương",
    description:
      "Vùng đất cố đô với di sản cung đình, ẩm thực tinh tế và nhịp sống trầm lắng.",
    accentColor: "#7c3aed",
    heroImage: "/Images/Landingpagehue/dji0452-16868228543002119277839.jpg",
    introImage: "/Images/Landingpagehue/dai-noi-hue-viet-nam-1.jpg",
    stats: [
      { value: "700+", label: "Năm lịch sử" },
      { value: "900+", label: "Di tích văn hóa" },
      { value: "100+", label: "Lễ hội truyền thống" },
      { value: "40+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1306",
        title: "Đất Châu Ô về Đại Việt",
        description:
          "Huyền Trân Công Chúa kết hôn với vua Chăm, vùng đất Châu Ô – Châu Rí được sáp nhập vào Đại Việt, mở đầu lịch sử Huế.",
        icon: "👑",
        image: "/Images/Landingpagehue/dobang1.jpg",
      },
      {
        year: "1802",
        title: "Kinh đô triều Nguyễn",
        description:
          "Vua Gia Long thống nhất đất nước, chọn Phú Xuân làm kinh đô, xây dựng Hoàng thành Huế nguy nga – trung tâm chính trị cả nước.",
        icon: "🏯",
        image: "/Images/Landingpagehue/hue-thuoc-mien-nao-thumbnail.jpg",
      },
      {
        year: "1885",
        title: "Kinh thành thất thủ",
        description:
          "Kinh thành Huế thất thủ trước quân Pháp, đánh dấu sự cáo chung của triều đình nhà Nguyễn độc lập và bước sang giai đoạn thuộc địa.",
        icon: "⚔️",
        image: "/Images/Landingpagehue/Tran-Kinh-thanh-Hue-1885.jpg",
      },
      {
        year: "1993",
        title: "Di sản thế giới UNESCO",
        description:
          "Quần thể di tích cố đô Huế được UNESCO công nhận là Di sản văn hóa thế giới, khẳng định giá trị ngoại hạng của văn hóa cung đình Việt Nam.",
        icon: "🌍",
        image: "/Images/Landingpagehue/vietgoing_awy2103053798.webp",
      },
    ],
    craftVillages: [
      {
        name: "Làng đúc đồng Phường Đúc",
        product: "Đúc đồng",
        description:
          "Làng nghề đúc đồng hơn 400 năm, nơi chế tác Cửu đỉnh và đại hồng chung nổi tiếng, lưu giữ tinh hoa nghề thủ công cung đình.",
        image: "/Images/Landingpagehue/290c9135-22525299.jpg",
        age: "400+ năm",
      },
      {
        name: "Làng gốm Phước Tích",
        product: "Gốm đất nung",
        description:
          "Làng gốm cổ hơn 500 năm tuổi với các sản phẩm gốm đất nung thủ công đặc trưng, được công nhận là làng nghề di sản quốc gia.",
        image: "/Images/Landingpagehue/3424-12-42-22.jpg",
        age: "500+ năm",
      },
      {
        name: "Làng nón lá Phú Cam",
        product: "Nón lá Huế",
        description:
          "Làng nghề làm nón lá bài thơ truyền thống với nét tinh tế đặc trưng, chiếc nón Huế trở thành biểu tượng văn hóa của đất cố đô.",
        image: "/Images/Landingpagehue/lang-non-phu-cam-5-1040.webp",
        age: "300+ năm",
      },
      {
        name: "Làng thêu Thuận Lộc",
        product: "Thêu tay",
        description:
          "Làng nghề thêu tay tinh xảo với các họa tiết hoa văn cung đình, tạo ra những tác phẩm thêu có giá trị nghệ thuật và văn hóa cao.",
        image: "/Images/Landingpagehue/phao-dai-Tay-Thanh-6559-1594506313.webp",
        age: "200+ năm",
      },
    ],
    festivals: [
      {
        name: "Festival Huế",
        date: "2 năm/lần (năm chẵn)",
        description:
          "Lễ hội văn hóa nghệ thuật quốc tế lớn nhất miền Trung, thu hút các đoàn nghệ thuật từ khắp thế giới về trình diễn tại cố đô.",
        significance: "Sự kiện quốc tế thường niên",
        image:
          "/Images/Landingpagehue/v8wrfi-1727748235459-1727748235864142750452.jpg",
      },
      {
        name: "Lễ tế Nam Giao",
        date: "Tháng 3 âm lịch",
        description:
          "Lễ tế trời đất truyền thống của vương triều Nguyễn được phục dựng với nghi thức cung đình trang trọng và hoành tráng.",
        significance: "Di sản nghi lễ cung đình",
        image:
          "/Images/Landingpagehue/1_tim_hieu_ve_nha_nhac_cung_dinh_hue_1_97a0c1a11a.jpg",
      },
      {
        name: "Lễ hội điện Hòn Chén",
        date: "Tháng 3 và 7 âm lịch",
        description:
          "Lễ hội tâm linh đặc sắc trên sông Hương tôn thờ Thánh Mẫu Thiên Y A Na, kết hợp văn hóa Việt – Chăm độc đáo.",
        significance: "Lễ hội tín ngưỡng dân gian",
        image:
          "/Images/Landingpagehue/Khamphahue_Le-hoi-dien-Hue-Nam_Hon-Chen-Hue.jpg",
      },
      {
        name: "Nhã nhạc cung đình Huế",
        date: "Quanh năm",
        description:
          "Loại hình âm nhạc cung đình đặc sắc, được UNESCO công nhận là Kiệt tác Di sản văn hóa phi vật thể đại diện của nhân loại.",
        significance: "Di sản UNESCO",
        image:
          "/Images/Landingpagehue/Khamphahue_NhaNhacCungDinhHue_DiSanPhiVatTheTruyenKhauCuaNhanLoai-1.jpg",
      },
    ],
    specialties: [
      {
        name: "Bún bò Huế",
        description: "Nước dùng cay nồng, đậm đà hương sả.",
        origin: "Kinh thành Huế",
        image: "/Images/Landingpagehue/Bun-Bo-Hue-from-Huong-Giang-2011.jpg",
      },
      {
        name: "Bánh bèo",
        description: "Nhỏ xinh, mềm mịn và đậm vị.",
        origin: "Phố cổ Huế",
        image: "/Images/Landingpagehue/banh-beo-nha-trang-2.jpg",
      },
      {
        name: "Chè Huế",
        description: "Phong phú với vị ngọt thanh.",
        origin: "Sông Hương",
        image: "/Images/Landingpagehue/Khamphahue_CheMoTonDich1.jpg",
      },
    ],
    tourism: [
      {
        name: "Đại Nội",
        description: "Di sản cung đình nổi bật của triều Nguyễn.",
        image: "/Images/Landingpagehue/vietgoing_awy2103053798.webp",
      },
      {
        name: "Chùa Thiên Mụ",
        description: "Ngôi chùa cổ kính bên dòng sông Hương.",
        image: "/Images/Landingpagehue/chua-thien-mu-1.webp",
      },
      {
        name: "Lăng Khải Định",
        description: "Kiến trúc giao thoa Đông - Tây.",
        image: "/Images/Landingpagehue/Khai-Dinh-tomb-Hue.jpg",
      },
    ],
    culture: [
      {
        name: "Nhã nhạc cung đình",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image:
          "/Images/Landingpagehue/Khamphahue_NhaNhacCungDinhHue_DiSanPhiVatTheTruyenKhauCuaNhanLoai-1.jpg",
      },
      {
        name: "Festival Huế",
        description: "Sự kiện văn hóa nghệ thuật quốc tế.",
        image:
          "/Images/Landingpagehue/1_tim_hieu_ve_nha_nhac_cung_dinh_hue_1_97a0c1a11a.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagehue/dji0452-16868228543002119277839.jpg",
      "/Images/Landingpagehue/song-huong-scaled.jpg",
      "/Images/Landingpagehue/hue-thuoc-mien-nao-thumbnail.jpg",
      "/Images/Landingpagehue/Khai-Dinh-tomb-Hue.jpg",
      "/Images/Landingpagehue/08ad59ae-c4a6-4e73-9bd0-0c08288087fb.jpg",
      "/Images/Landingpagehue/v8wrfi-1727748235459-1727748235864142750452.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo khu vực",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng khu vực của Huế",
        data: [
          { name: "Thành nội", value: 52 },
          { name: "Tả Ngạn", value: 31 },
          { name: "Hữu Ngạn", value: 27 },
          { name: "Gia Lâm", value: 19 },
          { name: "Kim Long", value: 23 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Huế",
        data: [
          { name: "Di tích lịch sử", value: 50 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 10 },
        ],
      },
    },
  },
  {
    slug: "tuyen-quang",
    name: "Tuyên Quang",
    slogan: "Sắc xanh núi rừng và lễ hội Trung thu",
    description:
      "Vùng đất lịch sử với núi rừng hùng vĩ, lễ hội đèn Trung thu độc đáo.",
    accentColor: "#15803d",
    heroImage: "/Images/Landingpagetuyenquang/thumb.png",
    introImage: "/Images/Landingpagetuyenquang/image-58.png",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích văn hóa" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "20+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thời Hùng Vương",
        title: "Vùng đất cổ Việt Bắc",
        description:
          "Tuyên Quang là vùng đất sinh sống của người Việt cổ từ thời Hùng Vương dựng nước, lưu giữ nhiều di tích và phong tục cổ xưa.",
        icon: "🌿",
        image: "/Images/Landingpagetuyenquang/72470.jpg",
      },
      {
        year: "1945",
        title: "Thủ đô kháng chiến ATK",
        description:
          "Tuyên Quang trở thành An toàn khu (ATK) – thủ đô kháng chiến, nơi Chủ tịch Hồ Chí Minh và Trung ương Đảng lãnh đạo cách mạng.",
        icon: "⭐",
        image: "/Images/Landingpagetuyenquang/1280px-Cây_Đa_lịch_sử_Tân_Trào.jpg",
      },
      {
        year: "1954",
        title: "Chiến thắng Điện Biên Phủ",
        description:
          "Từ căn cứ địa Tuyên Quang, quân dân ta phát động chiến dịch lịch sử, góp phần quan trọng vào chiến thắng vang dội Điện Biên Phủ.",
        icon: "🏆",
        image: "/Images/Landingpagetuyenquang/Victory_in_Battle_of_Dien_Bien_Phu.jpg",
      },
      {
        year: "Hiện đại",
        title: "Tỉnh lễ hội Trung thu",
        description:
          "Tuyên Quang nổi tiếng với lễ hội Thành Tuyên – lễ hội Trung thu lớn nhất Việt Nam, thu hút hàng triệu du khách mỗi năm.",
        icon: "🏮",
        image: "/Images/Landingpagetuyenquang/083a0d557763c6fc3d599c853a646ece.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Nghề dệt thổ cẩm Na Hang",
        product: "Thổ cẩm",
        description:
          "Nghề dệt thổ cẩm truyền thống của đồng bào dân tộc Tày, Dao với hoa văn tinh tế thể hiện bản sắc văn hóa vùng cao.",
        image: "/Images/Landingpagetuyenquang/10fc091cf74cd2f4b3a1cb83433860ad.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Rượu ngô Na Hang",
        product: "Rượu truyền thống",
        description:
          "Nghề nấu rượu ngô truyền thống bằng men lá rừng tạo ra thứ rượu thơm ngon đặc trưng vùng núi phía Bắc.",
        image: "/Images/Landingpagetuyenquang/2022828101311.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng nghề đan lát Tân Trào",
        product: "Mây tre đan",
        description:
          "Nghề đan lát mây tre thủ công tạo ra các vật dụng sinh hoạt và đồ thủ công mỹ nghệ gắn liền với văn hóa cách mạng.",
        image: "/Images/Landingpagetuyenquang/trai-nghiem-1.jpg",
        age: "200+ năm",
      },
      {
        name: "Chè shan tuyết Hàm Yên",
        product: "Chè shan tuyết",
        description:
          "Chè shan tuyết cổ thụ hàng trăm năm tuổi với hương vị thanh tao đặc biệt, là thức uống truyền thống quý giá của vùng cao.",
        image: "/Images/Landingpagetuyenquang/img_20240729221708.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Thành Tuyên",
        date: "Rằm tháng 8 âm lịch",
        description:
          "Lễ hội Trung thu lớn nhất Việt Nam với những mô hình đèn khổng lồ đặc sắc, thu hút hàng triệu du khách về dự hội.",
        significance: "Lễ hội lớn nhất cả nước",
        image: "/Images/Landingpagetuyenquang/41050f8da32534dbd13c0f6ff42f4422.jpg",
      },
      {
        name: "Lễ hội Lồng Tồng",
        date: "Mùng 8 tháng Giêng",
        description:
          "Lễ hội xuống đồng truyền thống của người Tày cầu mưa thuận gió hòa, mùa màng tươi tốt với nhiều nghi lễ và trò chơi dân gian.",
        significance: "Lễ hội dân gian đặc trưng",
        image: "/Images/Landingpagetuyenquang/10fc091cf74cd2f4b3a1cb83433860ad.jpg",
      },
      {
        name: "Lễ hội Nhảy lửa người Pà Thẻn",
        date: "Tháng 10-11 âm lịch",
        description:
          "Nghi lễ nhảy lửa độc đáo của người Pà Thẻn thể hiện sức mạnh tâm linh và bản sắc văn hóa dân tộc đặc sắc hiếm có.",
        significance: "Di sản văn hóa phi vật thể",
        image: "/Images/Landingpagetuyenquang/152924-vna_potal_le_hoi_nhay_lua_cua_nguoi_pa_then_1775638.jpg",
      },
      {
        name: "Hội Gầu Tào",
        date: "Mùng 1-3 tháng Giêng",
        description:
          "Lễ hội đầu năm của người Mông cầu phúc lộc cho gia đình, với các tiết mục hát dân ca, múa và trò chơi truyền thống.",
        significance: "Lễ hội dân tộc thiểu số",
        image: "/Images/Landingpagetuyenquang/10fc091cf74cd2f4b3a1cb83433860ad.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh gai",
        description: "Dẻo thơm, nhân đậu xanh ngọt bùi.",
        origin: "Hàm Yên",
        image: "/Images/Landingpagetuyenquang/banh-gai-chiem-hoa-thom-ngon_1734606023.jpg",
      },
      {
        name: "Cam sành",
        description: "Vị ngọt thanh, thơm dịu.",
        origin: "Hàm Yên",
        image: "/Images/Landingpagetuyenquang/vuon-cam-sanh-ham-yen-sai-triu-qua_1735054811.jpg",
      },
      {
        name: "Thịt trâu gác bếp",
        description: "Hương khói núi rừng đậm đà.",
        origin: "Na Hang",
        image: "/Images/Landingpagetuyenquang/img-2022083009052420250419130126.jpg",
      },
    ],
    tourism: [
      {
        name: "Na Hang",
        description: "Hồ nước xanh giữa núi rừng hoang sơ.",
        image: "/Images/Landingpagetuyenquang/0806.na_hang_tuyen_quang.jpg",
      },
      {
        name: "Suối khoáng Mỹ Lâm",
        description: "Nghỉ dưỡng giữa thiên nhiên.",
        image: "/Images/Landingpagetuyenquang/tam-suoi-khoang-my-lam_1732006081.jpg",
      },
      {
        name: "Tân Trào",
        description: "Khu di tích lịch sử cách mạng.",
        image: "/Images/Landingpagetuyenquang/1280px-Cây_Đa_lịch_sử_Tân_Trào.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Thành Tuyên",
        description: "Lễ hội đèn Trung thu rực rỡ.",
        image: "/Images/Landingpagetuyenquang/083a0d557763c6fc3d599c853a646ece.jpg",
      },
      {
        name: "Hát then",
        description: "Nghệ thuật dân gian của người Tày.",
        image: "/Images/Landingpagetuyenquang/doc-dao-dieu-then-tuyen-quang-120004-1706530856103.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagetuyenquang/0806.na_hang_tuyen_quang.jpg",
      "/Images/Landingpagetuyenquang/1280px-Cây_Đa_lịch_sử_Tân_Trào.jpg",
      "/Images/Landingpagetuyenquang/083a0d557763c6fc3d599c853a646ece.jpg",
      "/Images/Landingpagetuyenquang/72470.jpg",
      "/Images/Landingpagetuyenquang/tam-suoi-khoang-my-lam_1732006081.jpg",
      "/Images/Landingpagetuyenquang/lambinh-1738657962.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Tuyên Quang",
        data: [
          { name: "TP Tuyên Quang", value: 29 },
          { name: "Sơn Dương", value: 23 },
          { name: "Yên Sơn", value: 18 },
          { name: "Hàm Yên", value: 14 },
          { name: "Chiêm Hóa", value: 17 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Tuyên Quang",
        data: [
          { name: "Di tích lịch sử", value: 35 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 25 },
          { name: "Làng nghề / Sinh thái", value: 18 },
        ],
      },
    },
  },
  {
    slug: "lao-cai",
    name: "Lào Cai",
    slogan: "Sắc màu Tây Bắc và mây trời Sa Pa",
    description:
      "Vùng cao Tây Bắc với ruộng bậc thang, khí hậu mát lạnh và văn hóa đa sắc tộc.",
    accentColor: "#0f766e",
    heroImage: "/Images/Landingpagelaocai/khu-nghỉ-dưỡng-Sapa-ivivu-2-min.jpg",
    introImage: "/Images/Landingpagelaocai/uploads-2021-th-c3-a1ng-209-ng-c3-a0y-205-c3-81nh-anh-201_1.jpg",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "300+", label: "Di tích văn hóa" },
      { value: "100+", label: "Lễ hội truyền thống" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thời Hùng Vương",
        title: "Vùng đất cổ biên giới",
        description:
          "Lào Cai là vùng đất sinh sống lâu đời của nhiều dân tộc thiểu số, nơi giao thoa văn hóa phong phú của các tộc người vùng núi Tây Bắc.",
        icon: "🌄",
        image: "/Images/Landingpagelaocai/biengioi_QLCJ.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Cửa khẩu thương mại",
        description:
          "Lào Cai phát triển thành cửa khẩu thương mại quan trọng giữa Việt Nam và Trung Quốc, thúc đẩy giao lưu kinh tế văn hóa hai nước.",
        icon: "🤝",
        image: "/Images/Landingpagelaocai/1280px-NNU_QuốcMôn_LàoCai.jpg",
      },
      {
        year: "1979",
        title: "Chiến tranh biên giới",
        description:
          "Quân dân Lào Cai anh dũng chiến đấu bảo vệ biên cương Tổ quốc trong cuộc chiến tranh biên giới phía Bắc năm 1979.",
        icon: "🛡️",
        image: "/Images/Landingpagelaocai/1280px-NNU_Cotmoc_Hakhau.jpg",
      },
      {
        year: "1993",
        title: "Sa Pa – Điểm đến nghỉ dưỡng",
        description:
          "Sa Pa được khai thác du lịch, trở thành điểm nghỉ dưỡng nổi tiếng với khí hậu mát lạnh, ruộng bậc thang và văn hóa dân tộc đặc sắc.",
        icon: "🏔️",
        image: "/Images/Landingpagelaocai/khu-nghỉ-dưỡng-Sapa-ivivu-2-min.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng thêu dệt thổ cẩm Cát Cát",
        product: "Thổ cẩm người Mông",
        description:
          "Làng nghề dệt thổ cẩm của người H'Mông với hoa văn đặc sắc, màu sắc rực rỡ thể hiện bản sắc văn hóa độc đáo của dân tộc.",
        image: "/Images/Landingpagelaocai/2-17642360889071205510843.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Nghề chạm bạc người Dao",
        product: "Đồ bạc",
        description:
          "Nghề chạm bạc thủ công tinh xảo của người Dao với các sản phẩm trang sức và đồ trang trí mang họa tiết văn hóa dân tộc.",
        image: "/Images/Landingpagelaocai/img20221006091256.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Rượu táo mèo Sa Pa",
        product: "Rượu táo mèo",
        description:
          "Rượu ngâm táo mèo – đặc sản vùng cao Sa Pa với hương vị chua ngọt, ấm nồng rất được ưa chuộng của người miền xuôi.",
        image: "/Images/Landingpagelaocai/top-5-loai-ruou-sapa-đang-thuong-thuc-nhat-khi-du-lich-tay-bac-4-1621962624.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng nghề đan lát Bắc Hà",
        product: "Mây tre đan",
        description:
          "Làng nghề đan lát thủ công tạo ra các sản phẩm giỏ, gùi, thúng phục vụ đời sống và thương mại tại phiên chợ vùng cao.",
        image: "/Images/Landingpagelaocai/uploads-2021-th-c3-a1ng-209-ng-c3-a0y-205-c3-81nh-anh-201_1.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Hội Gầu Tào",
        date: "Mùng 1-3 tháng Giêng",
        description:
          "Lễ hội truyền thống của người Mông cầu phúc lộc với các tiết mục hát dân ca, thổi khèn, múa và các trò chơi truyền thống sôi động.",
        significance: "Lễ hội người Mông đặc sắc",
        image: "/Images/Landingpagelaocai/3f13da1e0febb0b5e9fa.jpg",
      },
      {
        name: "Chợ tình Sa Pa",
        date: "Thứ 7 hàng tuần",
        description:
          "Phiên chợ tình đặc biệt của người Mông và các dân tộc vùng cao, nơi trai gái gặp gỡ, thổ lộ tình cảm qua tiếng khèn và điệu múa.",
        significance: "Nét văn hóa dân tộc độc đáo",
        image: "/Images/Landingpagelaocai/trai-nghiem-cho-tinh-sapa-1.jpg",
      },
      {
        name: "Lễ hội Roóng Poọc",
        date: "Rằm tháng Giêng",
        description:
          "Lễ hội xuống đồng truyền thống của người Giáy tại Tả Van cầu mưa thuận gió hòa, kết hợp các nghi lễ nông nghiệp và trò chơi dân gian.",
        significance: "Lễ hội dân tộc Giáy",
        image: "/Images/Landingpagelaocai/dac-sac-le-hoi-roong-pooc-sapa-cua-dong-bao-nguoi-giay-1623736143.jpg",
      },
      {
        name: "Tết Nhảy người Dao",
        date: "29-30 tháng Chạp",
        description:
          "Lễ Tết Nhảy độc đáo của người Dao với các điệu múa nghi lễ đặc sắc, bày tỏ lòng biết ơn tổ tiên và cầu mong năm mới bình an.",
        significance: "Di sản văn hóa người Dao",
        image: "/Images/Landingpagelaocai/xahoi-cdn.congly.vn-news-2022-01-31-_anh-2-tet-nhay-cua-nguoi-dao-w1050-h700.jpg",
      },
    ],
    specialties: [
      {
        name: "Thắng cố",
        description: "Món ăn truyền thống của người Mông.",
        origin: "Bắc Hà",
        image: "/Images/Landingpagelaocai/1280px-Thắng_cố.jpg",
      },
      {
        name: "Rượu táo mèo",
        description: "Hương thơm đặc trưng vùng cao.",
        origin: "Sa Pa",
        image: "/Images/Landingpagelaocai/480806920_4119961064915362_1233637921003533831_n.jpg",
      },
      {
        name: "Cá hồi Sa Pa",
        description: "Tươi ngon nuôi trong khí hậu lạnh.",
        origin: "Sa Pa",
        image: "/Images/Landingpagelaocai/top-10-quan-ca-hoi-sapa-dac-san-doc-dao-ma-ban-nhat-dinh-dung-bo-qua-01-1620835115.jpg",
      },
    ],
    tourism: [
      {
        name: "Sa Pa",
        description: "Thiên đường nghỉ dưỡng trên mây.",
        image: "/Images/Landingpagelaocai/1280px-Thacbac3.jpg",
      },
      {
        name: "Fansipan",
        description: "Nóc nhà Đông Dương hùng vĩ.",
        image: "/Images/Landingpagelaocai/1280px-Fansipan_summit_2_in_sunrise.jpg",
      },
      {
        name: "Chợ Bắc Hà",
        description: "Phiên chợ sắc màu vùng cao.",
        image: "/Images/Landingpagelaocai/vietgoing_nby2202257242.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Gầu Tào",
        description: "Nét văn hóa đặc sắc của người Mông.",
        image: "/Images/Landingpagelaocai/3f13da1e0febb0b5e9fa.jpg",
      },
      {
        name: "Chợ tình Sa Pa",
        description: "Không gian giao lưu văn hóa.",
        image: "/Images/Landingpagelaocai/trai-nghiem-cho-tinh-sapa-1.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagelaocai/1280px-Fansipan_summit_2_in_sunrise.jpg",
      "/Images/Landingpagelaocai/1280px-Thacbac3.jpg",
      "/Images/Landingpagelaocai/khu-nghỉ-dưỡng-Sapa-ivivu-2-min.jpg",
      "/Images/Landingpagelaocai/image7.jpg",
      "/Images/Landingpagelaocai/dac-sac-le-hoi-roong-pooc-sapa-cua-dong-bao-nguoi-giay-1623736143.jpg",
      "/Images/Landingpagelaocai/vietgoing_nby2202257242.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm du lịch theo huyện",
        subtitle: "Số lượng điểm du lịch nổi tiếng theo từng huyện của Lào Cai",
        data: [
          { name: "Sa Pa", value: 45 },
          { name: "Bắc Hà", value: 26 },
          { name: "Mường Khương", value: 17 },
          { name: "Bảo Thắng", value: 14 },
          { name: "Bảo Yên", value: 12 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Lào Cai",
        data: [
          { name: "Di tích lịch sử", value: 20 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 40 },
        ],
      },
    },
  },
  {
    slug: "thai-nguyen",
    name: "Thái Nguyên",
    slogan: "Hương trà xanh ngát giữa vùng trung du",
    description:
      "Vùng đất trung du nổi tiếng với chè thơm, đồi núi trùng điệp và lịch sử cách mạng.",
    accentColor: "#166534",
    heroImage: "/Images/Landingpagethainguyen/dji_20250207090039_0025_d_166579143.jpg",
    introImage: "/Images/Landingpagethainguyen/mot-lan-ghe-tham-doi-che-tan-cuong-thai-nguyen.jpg",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích văn hóa" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "20+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thời Hùng Vương",
        title: "Đất cổ Việt Bắc",
        description:
          "Thái Nguyên là vùng đất cư trú từ thời Hùng Vương với nhiều di chỉ khảo cổ chứng minh sự hiện diện lâu đời của người Việt cổ.",
        icon: "🌿",
        image: "/Images/Landingpagethainguyen/1280px-CongTamQuanDuongBacSon.jpg",
      },
      {
        year: "1917",
        title: "Khởi nghĩa Thái Nguyên",
        description:
          "Khởi nghĩa Thái Nguyên do Lương Ngọc Quyến và Trịnh Văn Cấn lãnh đạo – cuộc khởi nghĩa vũ trang lớn nhất thời thuộc Pháp.",
        icon: "⚔️",
        image: "/Images/Landingpagethainguyen/maxresdefault.jpg",
      },
      {
        year: "1945",
        title: "Căn cứ địa Việt Bắc",
        description:
          "Thái Nguyên là một phần của căn cứ địa Việt Bắc – trung tâm đầu não kháng chiến, nơi bộ máy nhà nước cách mạng đặt trụ sở.",
        icon: "⭐",
        image: "/Images/Landingpagethainguyen/dji_20250207090039_0025_d_166579143.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thủ phủ chè xanh",
        description:
          "Thái Nguyên khẳng định vị thế thủ phủ chè Việt Nam với thương hiệu chè Tân Cương nổi tiếng toàn quốc và xuất khẩu quốc tế.",
        icon: "🍵",
        image: "/Images/Landingpagethainguyen/6715cd983328f4c323cf1cd3.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng chè Tân Cương",
        product: "Chè xanh",
        description:
          "Vùng chè Tân Cương nổi tiếng nhất Việt Nam với thổ nhưỡng đặc biệt tạo ra hương vị chè thơm ngon, được công nhận thương hiệu quốc gia.",
        image: "/Images/Landingpagethainguyen/3-2.jpeg",
        age: "100+ năm",
      },
      {
        name: "Gốm truyền thống Hùng Sơn",
        product: "Gốm đất nung",
        description:
          "Làng nghề gốm truyền thống sản xuất các vật dụng gốm phục vụ đời sống với kỹ thuật nung thủ công đặc trưng.",
        image: "/Images/Landingpagethainguyen/2224-13-37-8.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng nghề bánh chưng Bờ Đậu",
        product: "Bánh chưng",
        description:
          "Làng nghề làm bánh chưng truyền thống với gạo nếp thơm và lá dong xanh, nổi tiếng là ngon nhất miền Bắc.",
        image: "/Images/Landingpagethainguyen/maxresdefault%20(1).jpg",
        age: "100+ năm",
      },
      {
        name: "Nghề dệt thổ cẩm Định Hóa",
        product: "Thổ cẩm",
        description:
          "Nghề dệt thổ cẩm của người Tày Định Hóa với hoa văn truyền thống tinh tế, gắn liền với văn hóa ATK Việt Bắc.",
        image: "/Images/Landingpagethainguyen/z66896103984727f32a0aecee279a31e89fb369a363959_YDNG.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Chè Thái Nguyên",
        date: "Tháng 11 hàng năm",
        description:
          "Lễ hội tôn vinh cây chè và nghề trồng chè truyền thống với nhiều hoạt động văn hóa, thưởng trà và các cuộc thi chè đặc sắc.",
        significance: "Sự kiện văn hóa chè",
        image: "/Images/Landingpagethainguyen/1-img_7058_20240220125607_20240220151149.jpg",
      },
      {
        name: "Lễ hội Lồng Tồng",
        date: "Mùng 8-10 tháng Giêng",
        description:
          "Lễ hội xuống đồng đầu năm của người Tày cầu mưa thuận gió hòa với các nghi lễ nông nghiệp và trò chơi dân gian truyền thống.",
        significance: "Lễ hội dân gian người Tày",
        image: "/Images/Landingpagethainguyen/1-le_hoi_long_tong_dong_20231225114609_20231227144556.jpg",
      },
      {
        name: "Lễ hội ATK Định Hóa",
        date: "Tháng 5 (ngày 19/5)",
        description:
          "Lễ kỷ niệm sinh nhật Bác Hồ tại An toàn khu Định Hóa với các hoạt động văn hóa, lịch sử ý nghĩa sâu sắc.",
        significance: "Lễ kỷ niệm lịch sử",
        image: "/Images/Landingpagethainguyen/nan%20la%20nua.jpg",
      },
      {
        name: "Hội hát Then – đàn Tính",
        date: "Quanh năm",
        description:
          "Loại hình âm nhạc dân gian đặc trưng của người Tày Thái Nguyên với tiếng đàn Tính du dương và lời hát Then trữ tình.",
        significance: "Di sản văn hóa phi vật thể",
        image: "/Images/Landingpagethainguyen/1-cm_4_20231224073413_20231224171404.jpg",
      },
    ],
    specialties: [
      {
        name: "Trà Tân Cương",
        description: "Hương thơm dịu, vị chát ngọt hậu.",
        origin: "Tân Cương",
        image: "/Images/Landingpagethainguyen/tra-moc-cau-dac-biet-72024-13.jpg",
      },
      {
        name: "Bánh chưng Bờ Đậu",
        description: "Dẻo thơm, nhân đậm đà.",
        origin: "Phú Lương",
        image: "/Images/Landingpagethainguyen/banhchung.jpg",
      },
      {
        name: "Nem chua Đại Từ",
        description: "Vị chua nhẹ, thơm cay.",
        origin: "Đại Từ",
        image: "/Images/Landingpagethainguyen/nemchua-crop-1679703390521.jpg",
      },
    ],
    tourism: [
      {
        name: "Hồ Núi Cốc",
        description: "Hồ nước thơ mộng giữa đồi chè.",
        image: "/Images/Landingpagethainguyen/1280px-Nui_Coc_Lake1.jpg",
      },
      {
        name: "Bảo tàng Văn hóa các dân tộc",
        description: "Không gian lưu giữ di sản văn hóa.",
        image: "/Images/Landingpagethainguyen/Bảo_tàng_Văn_hóa_các_Dân_tộc_Việt_Nam.jpg",
      },
      {
        name: "Đồi chè Tân Cương",
        description: "Khung cảnh xanh ngát trải dài.",
        image: "/Images/Landingpagethainguyen/z73325958021090c46f38e84126fb40a96bbc31ecd545a-17658725120741906089081.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội chè",
        description: "Tôn vinh văn hóa trà Việt.",
        image: "/Images/Landingpagethainguyen/1-img_7058_20240220125607_20240220151149.jpg",
      },
      {
        name: "Hát then",
        description: "Nghệ thuật dân gian của người Tày.",
        image: "/Images/Landingpagethainguyen/2-17367610618161707860273.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagethainguyen/6715cd983328f4c323cf1cd3.jpg",
      "/Images/Landingpagethainguyen/1280px-Thành_phố_Bắc_Kạn.jpg",
      "/Images/Landingpagethainguyen/3-2.jpeg",
      "/Images/Landingpagethainguyen/z73325958021090c46f38e84126fb40a96bbc31ecd545a-17658725120741906089081.jpg",
      "/Images/Landingpagethainguyen/1-le_hoi_long_tong_dong_20231225114609_20231227144556.jpg",
      "/Images/Landingpagethainguyen/2224-13-37-8.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Thái Nguyên",
        data: [
          { name: "TP Thái Nguyên", value: 33 },
          { name: "Đại Từ", value: 24 },
          { name: "Định Hóa", value: 29 },
          { name: "Võ Nhai", value: 16 },
          { name: "Phú Bình", value: 13 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Thái Nguyên",
        data: [
          { name: "Di tích lịch sử", value: 38 },
          { name: "Ẩm thực đặc sản", value: 27 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 15 },
        ],
      },
    },
  },
  {
    slug: "phu-tho",
    name: "Phú Thọ",
    slogan: "Đất tổ cội nguồn dân tộc",
    description:
      "Quê hương vua Hùng với di sản văn hóa sâu sắc, lễ hội truyền thống và làn điệu dân ca.",
    accentColor: "#92400e",
    heroImage: "/Images/Landingpagephutho/330b9956-den-hung-phu-tho-4969825.jpg",
    introImage: "/Images/Landingpagephutho/du-lich-phu-tho-15-1639.jpg",
    stats: [
      { value: "4000+", label: "Năm lịch sử" },
      { value: "1000+", label: "Di tích lịch sử" },
      { value: "200+", label: "Lễ hội truyền thống" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "2879 TCN",
        title: "Thời đại Hùng Vương",
        description:
          "Phú Thọ là kinh đô Văn Lang của các vua Hùng – cội nguồn dân tộc Việt Nam với 18 đời vua Hùng dựng nước.",
        icon: "👑",
        image: "/Images/Landingpagephutho/quang-canh-le-dang-huong-17081842373381205108961.jpg",
      },
      {
        year: "Thế kỷ III TCN",
        title: "Kinh đô Phong Châu",
        description:
          "Phong Châu (nay thuộc Phú Thọ) là trung tâm chính trị của nhà nước Văn Lang buổi sơ khai, gắn với truyền thuyết Lạc Long Quân và Âu Cơ.",
        icon: "🏯",
        image: "/Images/Landingpagephutho/16.03._Bach_Hac_-_Vung_dat_cua_di_tich__danh_thang_1.jpg",
      },
      {
        year: "1010",
        title: "Vùng đất linh thiêng",
        description:
          "Đất Phú Thọ luôn được các triều đại phong kiến xem là vùng đất tổ linh thiêng, thường xuyên tổ chức tế lễ Hùng Vương.",
        icon: "⛩️",
        image: "/Images/Landingpagephutho/cong-thanh-co-loa-kinh-do-au-lac-thoi-an-duong-vuong.jpg",
      },
      {
        year: "2012",
        title: "Di sản UNESCO",
        description:
          "Tín ngưỡng thờ cúng Hùng Vương được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại năm 2012.",
        icon: "🌏",
        image: "/Images/Landingpagephutho/2022-11-17-09-53-52-tin-nguong-tho-cung-hung-vuong-636319299650371334.png",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề nón lá Sai Nga",
        product: "Nón lá truyền thống",
        description:
          "Làng nghề làm nón lá truyền thống với kỹ thuật thủ công tinh xảo, tạo ra những chiếc nón trắng mịn, đẹp nổi tiếng vùng đất Tổ.",
        image: "/Images/Landingpagephutho/125212393266247853066827679435-9646-1684-1652263484.jpg",
        age: "500+ năm",
      },
      {
        name: "Làng gốm Làng Cả",
        product: "Gốm đất nung",
        description:
          "Nghề gốm truyền thống gắn với văn hóa cư dân vùng đất Tổ, sản xuất đồ gia dụng và đồ thờ cúng đặc trưng.",
        image: "/Images/Landingpagephutho/lang-gom-phu-lang-ivivu-1.jpg",
        age: "Lâu đời",
      },
      {
        name: "Dệt thổ cẩm Mường",
        product: "Vải thổ cẩm",
        description:
          "Nghề dệt thổ cẩm truyền thống của người Mường Phú Thọ với hoa văn sặc sỡ, độc đáo phản ánh bản sắc văn hóa dân tộc.",
        image: "/Images/Landingpagephutho/212545-cac-san-pham-det-tho-cam-cua-nguoi-muong-huyen-tan-son-phu-tho-deu-co-phong-cach-rieng-biet-mau-ma-dep-va-phong-phu-anh-ta-toan-ttxvn.jpg",
        age: "Truyền thống",
      },
      {
        name: "Nghề mây tre đan",
        product: "Đồ mây tre",
        description:
          "Nghề đan mây tre truyền thống tại nhiều xã vùng đồi núi, tạo ra các sản phẩm dân dụng và đồ lưu niệm tinh tế.",
        image: "/Images/Landingpagephutho/Lang-Nghe-Dan-Lat-1.jpg",
        age: "Truyền thống",
      },
    ],
    festivals: [
      {
        name: "Giỗ Tổ Hùng Vương",
        date: "Mùng 10 tháng 3 âm lịch",
        description:
          "Lễ hội lớn nhất cả nước tưởng nhớ công lao các vua Hùng dựng nước, thu hút hàng triệu người hành hương về đất Tổ mỗi năm.",
        significance: "Ngày Quốc giỗ quốc gia",
        image: "/Images/Landingpagephutho/hoi-den-hung-thumbnail.jpg",
      },
      {
        name: "Lễ hội Đền Mẫu Âu Cơ",
        date: "Mùng 7 tháng Giêng",
        description:
          "Lễ hội tưởng nhớ Quốc Mẫu Âu Cơ tại Hạ Hòa với các nghi lễ trang trọng, rước kiệu và các trò chơi dân gian truyền thống.",
        significance: "Lễ hội tín ngưỡng dân tộc",
        image: "/Images/Landingpagephutho/3.jpg",
      },
      {
        name: "Hội hát Xoan",
        date: "Mùa xuân",
        description:
          "Hát Xoan là loại hình âm nhạc cổ xưa của người Phú Thọ, được UNESCO công nhận Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp.",
        significance: "Di sản phi vật thể UNESCO",
        image: "/Images/Landingpagephutho/1104.phu_tho_1.jpg",
      },
      {
        name: "Lễ hội Trò Trám",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội dân gian độc đáo ở làng Trám với các trò diễn tái hiện tín ngưỡng phồn thực của cư dân nông nghiệp cổ đại.",
        significance: "Lễ hội tín ngưỡng cổ xưa",
        image: "/Images/Landingpagephutho/2022-07-25-09-44-55-z3592961525573_48eef850c3657b3f7df3d6abc5820872.png",
      },
    ],
    specialties: [
      {
        name: "Bánh tai",
        description: "Bánh gạo mềm, nhân thịt đậm đà.",
        origin: "Việt Trì",
        image: "/Images/Landingpagephutho/maxresdefault.jpg",
      },
      {
        name: "Cọ ỏm",
        description: "Món ăn dân dã vùng trung du.",
        origin: "Đoan Hùng",
        image: "/Images/Landingpagephutho/kjehf.jpg",
      },
      {
        name: "Rêu đá",
        description: "Đặc sản hiếm của vùng núi.",
        origin: "Thanh Sơn",
        image: "/Images/Landingpagephutho/136516226-1982597921880720-209-8261-5246-1641270958.jpg",
      },
    ],
    tourism: [
      {
        name: "Khu di tích Đền Hùng",
        description: "Nơi hội tụ tinh thần dân tộc Việt.",
        image: "/Images/Landingpagephutho/330b9956-den-hung-phu-tho-4969825.jpg",
      },
      {
        name: "Suối khoáng Thanh Thủy",
        description: "Điểm nghỉ dưỡng thư giãn.",
        image: "/Images/Landingpagephutho/suoi-nuoc-nong-thanh-thuy-2.jpg",
      },
      {
        name: "Đồi chè Long Cốc",
        description: "Cảnh sắc đồi chè bồng bềnh.",
        image: "/Images/Landingpagephutho/doi-che-long-coc-7.jpg",
      },
    ],
    culture: [
      {
        name: "Hát xoan",
        description: "Di sản văn hóa phi vật thể của nhân loại.",
        image: "/Images/Landingpagephutho/4.jpg",
      },
      {
        name: "Lễ hội Đền Hùng",
        description: "Lễ hội lớn nhất cả nước mỗi tháng 3 âm lịch.",
        image: "/Images/Landingpagephutho/hoi-den-hung-thumbnail.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagephutho/330b9956-den-hung-phu-tho-4969825.jpg",
      "/Images/Landingpagephutho/125212393266247853066827679435-9646-1684-1652263484.jpg",
      "/Images/Landingpagephutho/doi-che-long-coc-7.jpg",
      "/Images/Landingpagephutho/suoi-nuoc-nong-thanh-thuy-2.jpg",
      "/Images/Landingpagephutho/1104.phu_tho_1.jpg",
      "/Images/Landingpagephutho/hoi-den-hung-thumbnail.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Phú Thọ",
        data: [
          { name: "Việt Trì", value: 36 },
          { name: "Lâm Thao", value: 27 },
          { name: "Phù Ninh", value: 19 },
          { name: "Cẩm Khê", value: 14 },
          { name: "Thanh Sơn", value: 11 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Phú Thọ",
        data: [
          { name: "Di tích lịch sử", value: 35 },
          { name: "Ẩm thực đặc sản", value: 20 },
          { name: "Lễ hội truyền thống", value: 30 },
          { name: "Làng nghề / Sinh thái", value: 15 },
        ],
      },
    },
  },
  {
    slug: "bac-ninh",
    name: "Bắc Ninh",
    slogan: "Quan họ ngọt ngào đất Kinh Bắc",
    description:
      "Vùng đất Kinh Bắc nổi tiếng với dân ca quan họ, làng nghề truyền thống và ẩm thực đặc trưng.",
    accentColor: "#a16207",
    heroImage: "/Images/Landingpagebacninh/1920px-4G4A3956_HDR.jpg",
    introImage: "/Images/Landingpagebacninh/dancaqh.png",
    stats: [
      { value: "3000+", label: "Năm lịch sử" },
      { value: "500+", label: "Di tích văn hóa" },
      { value: "100+", label: "Lễ hội truyền thống" },
      { value: "60+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ XI",
        title: "Kinh đô nhà Lý",
        description:
          "Bắc Ninh là vùng đất Kinh Bắc cổ kính – từng là nơi phát tích của vương triều Lý với Đền Đô và hệ thống di tích lịch sử phong phú.",
        icon: "🏯",
        image: "/Images/Landingpagebacninh/den_do_4.jpg",
      },
      {
        year: "Thế kỷ XVI-XVIII",
        title: "Phát triển rực rỡ",
        description:
          "Thời kỳ hưng thịnh của các làng nghề Kinh Bắc: tranh Đông Hồ, gốm Phù Lãng, đúc đồng Đại Bái phát triển mạnh và vang danh cả nước.",
        icon: "🎨",
        image: "/Images/Landingpagebacninh/lang-tranh-dong-ho-2_1678375779.jpg",
      },
      {
        year: "2009",
        title: "Quan họ được công nhận",
        description:
          "Dân ca Quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại – niềm tự hào vô giá.",
        icon: "🎶",
        image: "/Images/Landingpagebacninh/643718557123350302895582468419-3143-7464-1772213847.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thủ phủ công nghiệp",
        description:
          "Bắc Ninh vươn lên thành trung tâm công nghiệp điện tử hàng đầu Việt Nam với tổ hợp Samsung và nhiều tập đoàn quốc tế.",
        icon: "🏭",
        image: "/Images/Landingpagebacninh/thu-phu-cong-nghiep-bac-ninh-1.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng tranh Đông Hồ",
        product: "Tranh dân gian",
        description:
          "Tranh khắc gỗ Đông Hồ in trên giấy điệp với màu sắc tự nhiên, phản ánh đời sống nông nghiệp và ước vọng dân gian Việt Nam.",
        image: "/Images/Landingpagebacninh/lang-tranh-dong-ho-1.jpg",
        age: "500+ năm",
      },
      {
        name: "Làng gốm Phù Lãng",
        product: "Gốm men mảnh",
        description:
          "Gốm Phù Lãng với men da lươn nâu đỏ đặc trưng, sản xuất đồ thờ và vật dụng hàng ngày bằng kỹ thuật truyền thống độc đáo.",
        image: "/Images/Landingpagebacninh/03.png",
        age: "700+ năm",
      },
      {
        name: "Làng đúc đồng Đại Bái",
        product: "Đồ đồng thủ công",
        description:
          "Làng nghề đúc đồng nổi tiếng nhất miền Bắc với các sản phẩm: chuông, lư hương, tượng và đồ trang trí tinh xảo.",
        image: "/Images/Landingpagebacninh/lu-dong-dai-bai_1753454255.jpg",
        age: "900+ năm",
      },
      {
        name: "Làng giấy dó Phong Khê",
        product: "Giấy dó truyền thống",
        description:
          "Làng sản xuất giấy dó thủ công cung cấp nguyên liệu cho tranh Đông Hồ và các loại giấy dùng trong thư pháp, nghệ thuật truyền thống.",
        image: "/Images/Landingpagebacninh/giay-do4-0926.jpg",
        age: "300+ năm",
      },
    ],
    festivals: [
      {
        name: "Hội Lim",
        date: "Mùng 13 tháng Giêng",
        description:
          "Hội tụ tinh hoa dân ca Quan họ với các hội chơi, hát thi trên thuyền và trên cạn, thu hút hàng nghìn nghệ nhân và khán giả.",
        significance: "Lễ hội dân ca quan họ lớn nhất",
        image: "/Images/Landingpagebacninh/hoi-lim-thumbnail.jpg",
      },
      {
        name: "Lễ hội Đền Đô",
        date: "Mùng 14-15 tháng 3 âm lịch",
        description:
          "Lễ hội tưởng nhớ 8 vị vua triều Lý tại Đền Đô Từ Sơn với các nghi lễ trang trọng, rước kiệu và diễn xướng dân gian.",
        significance: "Lễ hội lịch sử triều Lý",
        image: "/Images/Landingpagebacninh/1_636963595265519970.jpg",
      },
      {
        name: "Lễ hội Chùa Phật Tích",
        date: "Mùng 4 tháng Giêng",
        description:
          "Lễ hội xuân tại ngôi chùa cổ kính có tượng Phật A Di Đà từ thế kỷ XI, thu hút đông đảo phật tử và du khách.",
        significance: "Lễ hội Phật giáo truyền thống",
        image: "/Images/Landingpagebacninh/2_XBDU.jpg",
      },
      {
        name: "Hội Đền Bà Chúa Kho",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội nổi tiếng tại Cổ Mễ với tục cầu tài lộc đầu năm, thu hút đông đảo người dân từ khắp nơi đến cúng lễ và vay vốn.",
        significance: "Tín ngưỡng dân gian đặc trưng",
        image: "/Images/Landingpagebacninh/1280px-Newone_-_tam_quan_đền_bà_chúa_kho_Bắc_Ninh.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh phu thê",
        description: "Ngọt thơm, tượng trưng cho hạnh phúc.",
        origin: "Đình Bảng",
        image: "/Images/Landingpagebacninh/phuxe-1200x676.jpg",
      },
      {
        name: "Nem Bùi",
        description: "Nem chua thơm mùi thính.",
        origin: "Thuận Thành",
        image: "/Images/Landingpagebacninh/cach-lam-nem-bui-thom-ngon-hap-dan-cuc-don-gian-avt-1200x676.jpg",
      },
      {
        name: "Cháo thái Đình Tổ",
        description: "Mềm mịn, đậm hương vị truyền thống.",
        origin: "Yên Phong",
        image: "/Images/Landingpagebacninh/doc-dao-mon-chao-dung-dua-an-mot-lan-nho-mai-cua-nguoi-dan-bac-ninh-3-edited-1725803571067.jpg",
      },
    ],
    tourism: [
      {
        name: "Đền Đô",
        description: "Di tích lịch sử nhà Lý.",
        image: "/Images/Landingpagebacninh/den_do_4.jpg",
      },
      {
        name: "Chùa Dâu",
        description: "Ngôi chùa cổ nhất Việt Nam.",
        image: "/Images/Landingpagebacninh/vietgoing_sak2403125824.jpg",
      },
      {
        name: "Làng tranh Đông Hồ",
        description: "Không gian nghệ thuật dân gian.",
        image: "/Images/Landingpagebacninh/lang-tranh-dong-ho-1.jpg",
      },
    ],
    culture: [
      {
        name: "Dân ca quan họ",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image: "/Images/Landingpagebacninh/dancaqh.png",
      },
      {
        name: "Lễ hội Lim",
        description: "Nơi hội tụ tinh hoa quan họ.",
        image: "/Images/Landingpagebacninh/hoi-lim-thumbnail.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagebacninh/1920px-4G4A3956_HDR.jpg",
      "/Images/Landingpagebacninh/226f5927-du-lich-bac-ninh-1.jpg",
      "/Images/Landingpagebacninh/2_XBDU.jpg",
      "/Images/Landingpagebacninh/643718557123350302895582468419-3143-7464-1772213847.jpg",
      "/Images/Landingpagebacninh/lang-tranh-dong-ho-1.jpg",
      "/Images/Landingpagebacninh/den_do_4.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Bắc Ninh",
        data: [
          { name: "Từ Sơn", value: 34 },
          { name: "Tiên Du", value: 28 },
          { name: "Yên Phong", value: 22 },
          { name: "Lương Tài", value: 15 },
          { name: "Thuận Thành", value: 31 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Bắc Ninh",
        data: [
          { name: "Di tích lịch sử", value: 45 },
          { name: "Ẩm thực đặc sản", value: 20 },
          { name: "Lễ hội truyền thống", value: 25 },
          { name: "Làng nghề / Sinh thái", value: 10 },
        ],
      },
    },
  },
  {
    slug: "hung-yen",
    name: "Hưng Yên",
    slogan: "Phố Hiến sầm uất một thời",
    description:
      "Hưng Yên gắn liền với Phố Hiến cổ, vườn nhãn ngọt lành và di sản văn hóa lâu đời.",
    accentColor: "#b45309",
    heroImage: "/Images/Landingpagehungyen/chua-chuong-01-1698070246.jpg",
    introImage: "/Images/Landingpagehungyen/85872_di_tich_dong_do_quang_hoi.jpg",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "300+", label: "Di tích văn hóa" },
      { value: "80+", label: "Lễ hội truyền thống" },
      { value: "40+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVI",
        title: "Phố Hiến thương cảng",
        description:
          "Phố Hiến nổi lên là thương cảng sầm uất bậc nhất xứ Đàng Ngoài, thu hút thương nhân từ Trung Quốc, Nhật Bản, Hà Lan, Anh Quốc...",
        icon: "⚓",
        image: "/Images/Landingpagehungyen/b3157ef77650a9cc7d9730abbfaa2503.jpg",
      },
      {
        year: "Thế kỷ XVII",
        title: "Đỉnh cao thịnh vượng",
        description:
          "Phố Hiến đạt đỉnh cao phồn thịnh với câu nói lưu truyền 'Thứ nhất Kinh kỳ, thứ nhì Phố Hiến', là trung tâm ngoại thương quan trọng.",
        icon: "🏛️",
        image: "/Images/Landingpagehungyen/f4d017df-2144-4aef-9e1c-ba87e90c2003.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Suy tàn và chuyển mình",
        description:
          "Sau khi cảng sông bị bồi lấp, Phố Hiến dần suy giảm nhưng để lại kho di tích văn hóa phong phú mang giá trị lịch sử vô giá.",
        icon: "⏳",
        image: "/Images/Landingpagehungyen/1280px-Văn_miếu_Xích_Đằng_02.jpg",
      },
      {
        year: "Hiện đại",
        title: "Xứ nhãn lồng",
        description:
          "Hưng Yên phát triển nông nghiệp đặc sản với nhãn lồng Hưng Yên nổi tiếng cả nước và đang xây dựng công nghiệp hiện đại.",
        icon: "🍈",
        image: "/Images/Landingpagehungyen/nhan1.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề thêu ren Thắng Lợi",
        product: "Thêu ren thủ công",
        description:
          "Nghề thêu ren tinh tế với các sản phẩm khăn, áo, đồ trang trí được thêu tay tỉ mỉ theo mẫu hoa văn truyền thống.",
        image: "/Images/Landingpagehungyen/maxresdefault.jpg",
        age: "300+ năm",
      },
      {
        name: "Mây tre đan Hoàng Long",
        product: "Đồ mây tre",
        description:
          "Làng nghề đan lát mây tre tạo ra sản phẩm phục vụ đời sống và xuất khẩu, duy trì nghề truyền thống qua nhiều thế hệ.",
        image: "/Images/Landingpagehungyen/nghe-hung-yen-220251007223152.jpg",
        age: "200+ năm",
      },
      {
        name: "Gỗ chạm khắc Hạ Liêm",
        product: "Đồ gỗ mỹ nghệ",
        description:
          "Làng nghề chạm khắc gỗ với các sản phẩm nội thất, đồ thờ và tranh gỗ nghệ thuật được thợ lành nghề tạo tác cẩn thận.",
        image: "/Images/Landingpagehungyen/lang-nghe-cham-khac-go-dong-giao.jpg",
        age: "400+ năm",
      },
      {
        name: "Làng nhãn lồng Hàm Tử",
        product: "Nhãn lồng đặc sản",
        description:
          "Vùng trồng nhãn lồng truyền thống với giống nhãn nguyên gốc quý giá, hương thơm ngọt lịm được cả nước ưa chuộng.",
        image: "/Images/Landingpagehungyen/7140_nhanlong1.jpg",
        age: "500+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Phố Hiến",
        date: "Tháng 3 âm lịch",
        description:
          "Lễ hội lớn nhất Hưng Yên tổ chức tại khu di tích Phố Hiến, tái hiện không khí thương cảng xưa với nhiều hoạt động văn hóa đặc sắc.",
        significance: "Lễ hội lịch sử thương cảng",
        image: "/Images/Landingpagehungyen/z6349967393721_e0ae29f9d69d4788889b6fc0d8f79f31.jpg",
      },
      {
        name: "Lễ hội Đền Mây",
        date: "Mùng 2 tháng 2 âm lịch",
        description:
          "Lễ hội truyền thống tại Đền Mây thờ Chử Đồng Tử và Tiên Dung – một trong Tứ bất tử của tín ngưỡng dân gian Việt Nam.",
        significance: "Tín ngưỡng dân gian Tứ bất tử",
        image: "/Images/Landingpagehungyen/65139579_1677748277282.jpg",
      },
      {
        name: "Hội mùa nhãn",
        date: "Tháng 7-8 dương lịch",
        description:
          "Lễ hội thu hoạch nhãn lồng với các hoạt động thi hái nhãn, thưởng thức nhãn và các sản phẩm chế biến từ nhãn đặc sắc.",
        significance: "Lễ hội nông nghiệp đặc trưng",
        image: "/Images/Landingpagehungyen/le-hoi-nhan-long-va-nong-san-tinh-hung-yen-nam-2024-1-.jpg",
      },
      {
        name: "Lễ hội Đa Hòa",
        date: "Mùng 10-12 tháng 2 âm lịch",
        description:
          "Lễ hội tại Đền Đa Hòa thờ Chử Đồng Tử với lễ rước thuyền trên sông Hồng và các nghi lễ truyền thống.",
        significance: "Lễ hội sông nước truyền thống",
        image: "/Images/Landingpagehungyen/9d03049c038fbdd1e49e_09162817022025.jpg",
      },
    ],
    specialties: [
      {
        name: "Nhãn lồng",
        description: "Quả nhãn thơm ngọt nổi tiếng.",
        origin: "Phố Hiến",
        image: "/Images/Landingpagehungyen/IMG_1853-03.jpg",
      },
      {
        name: "Bánh cuốn Phú Thị",
        description: "Mỏng mềm, chấm nước mắm thơm.",
        origin: "Văn Lâm",
        image: "/Images/Landingpagehungyen/at_banh-cuon-phu-thi---mon-ngon-nuc-tieng-hung-yen_94d67f09515f7a3d16c82f1bddc3d9ef.jpg",
      },
      {
        name: "Chè sen",
        description: "Thanh mát, tinh tế.",
        origin: "Tiên Lữ",
        image: "/Images/Landingpagehungyen/nau_che-hat-sen-long_nhan_02d11a7ec7b3421b95123b8499b6bd4e.jpg",
      },
    ],
    tourism: [
      {
        name: "Phố Hiến",
        description: "Di tích lịch sử thương cảng xưa.",
        image: "/Images/Landingpagehungyen/82025_ruoc_kieu_tai_le_hoi_van_hoa_dan_gian_pho_hien_anh_tu_lieu_21400914.jpg",
      },
      {
        name: "Chùa Chuông",
        description: "Ngôi chùa cổ kính linh thiêng.",
        image: "/Images/Landingpagehungyen/chua-chuong-01-1698070246.jpg",
      },
      {
        name: "Vườn nhãn",
        description: "Không gian xanh mát mùa thu hoạch.",
        image: "/Images/Landingpagehungyen/trong-nhan-o-hung-yen-va-nhung-tran-tro-kimnonggoldstar-vn-1.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Phố Hiến",
        description: "Tái hiện nhịp sống thương cảng xưa.",
        image: "/Images/Landingpagehungyen/z6349967393721_e0ae29f9d69d4788889b6fc0d8f79f31.jpg",
      },
      {
        name: "Hát chèo",
        description: "Nghệ thuật dân gian đặc trưng vùng đồng bằng.",
        image: "/Images/Landingpagehungyen/6-213-10-7-52.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagehungyen/chua-chuong-01-1698070246.jpg",
      "/Images/Landingpagehungyen/1280px-Văn_miếu_Xích_Đằng_02.jpg",
      "/Images/Landingpagehungyen/IMG_1853-03.jpg",
      "/Images/Landingpagehungyen/85872_di_tich_dong_do_quang_hoi.jpg",
      "/Images/Landingpagehungyen/trong-nhan-o-hung-yen-va-nhung-tran-tro-kimnonggoldstar-vn-1.jpg",
      "/Images/Landingpagehungyen/le-hoi-nhan-long-va-nong-san-tinh-hung-yen-nam-2024-1-.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Hưng Yên",
        data: [
          { name: "TP Hưng Yên", value: 31 },
          { name: "Văn Lâm", value: 22 },
          { name: "Khoái Châu", value: 26 },
          { name: "Kim Động", value: 17 },
          { name: "Tiên Lữ", value: 14 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Hưng Yên",
        data: [
          { name: "Di tích lịch sử", value: 40 },
          { name: "Ẩm thực đặc sản", value: 25 },
          { name: "Lễ hội truyền thống", value: 22 },
          { name: "Làng nghề / Sinh thái", value: 13 },
        ],
      },
    },
  },
  {
    slug: "ninh-binh",
    name: "Ninh Bình",
    slogan: "Non nước hữu tình đất cố đô",
    description:
      "Ninh Bình nổi bật với quần thể Tràng An, cố đô Hoa Lư và cảnh sắc thiên nhiên tuyệt mỹ.",
    accentColor: "#15803d",
    heroImage: "/Images/Landingpageninhbinh/trang_an.jpg",
    introImage: "/Images/Landingpageninhbinh/1280px-Village_by_the_River_-_panoramio.jpg",
    stats: [
      { value: "1000+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích danh thắng" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "968",
        title: "Kinh đô Hoa Lư ra đời",
        description:
          "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, lập nước Đại Cồ Việt và chọn Hoa Lư làm kinh đô đầu tiên của nhà nước phong kiến độc lập.",
        icon: "👑",
        image: "/Images/Landingpageninhbinh/Temple_comm%C3%A9moratif_au_roi_Dinh_Tien_Hoang_(Hoa_Lu).jpg",
      },
      {
        year: "980-1010",
        title: "Tiền Lê và sự phát triển",
        description:
          "Hoa Lư tiếp tục là kinh đô dưới thời nhà Tiền Lê với vua Lê Đại Hành lãnh đạo chiến thắng quân Tống và Chiêm Thành.",
        icon: "⚔️",
        image: "/Images/Landingpageninhbinh/1280px-Codoj6.jpg",
      },
      {
        year: "2014",
        title: "Di sản thế giới UNESCO",
        description:
          "Quần thể danh thắng Tràng An được UNESCO công nhận là Di sản thế giới hỗn hợp đầu tiên tại Đông Nam Á – vừa tự nhiên vừa văn hóa.",
        icon: "🌏",
        image: "/Images/Landingpageninhbinh/trang_an.jpg",
      },
      {
        year: "Hiện đại",
        title: "Điểm đến hàng đầu",
        description:
          "Ninh Bình vươn lên thành điểm đến du lịch hàng đầu Việt Nam với Tràng An, Tam Cốc, Bích Động thu hút hàng triệu khách mỗi năm.",
        icon: "🚣",
        image: "/Images/Landingpageninhbinh/tam_coc_bich_dong_692a15cbdd.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng đá mỹ nghệ Ninh Vân",
        product: "Đá điêu khắc",
        description:
          "Làng nghề chạm khắc đá nổi tiếng nhất Việt Nam, sản xuất tượng đá, cột đá, biển đá và các công trình kiến trúc trang trí.",
        image: "/Images/Landingpageninhbinh/da-nv.png",
        age: "400+ năm",
      },
      {
        name: "Làng nghề thêu ren Kim Sơn",
        product: "Thêu ren xuất khẩu",
        description:
          "Nghề thêu ren truyền thống Kim Sơn với sản phẩm chất lượng cao xuất khẩu sang nhiều quốc gia châu Âu và châu Á.",
        image: "/Images/Landingpageninhbinh/lang_nghe_theu_ren_van_lam_7fa095cba1.jpg",
        age: "200+ năm",
      },
      {
        name: "Gốm Bồng",
        product: "Gốm truyền thống",
        description:
          "Làng gốm Bồng sản xuất đồ gốm gia dụng và đồ thờ cúng bằng kỹ thuật thủ công truyền thống lâu đời của người dân địa phương.",
        image: "/Images/Landingpageninhbinh/base64-1690419908840510802791.jpg",
        age: "300+ năm",
      },
      {
        name: "Chiếu cói Kim Sơn",
        product: "Chiếu cói",
        description:
          "Vùng trồng cói và dệt chiếu Kim Sơn nổi tiếng với chiếu bền đẹp, được người dùng trên cả nước ưa chuộng.",
        image: "/Images/Landingpageninhbinh/chieu_coi.jpg",
        age: "200+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Hoa Lư",
        date: "Mùng 8-10 tháng 3 âm lịch",
        description:
          "Lễ hội tưởng nhớ vua Đinh Tiên Hoàng và vua Lê Đại Hành tại cố đô Hoa Lư với nghi lễ trang trọng, rước kiệu và các màn biểu diễn nghệ thuật.",
        significance: "Quốc lễ tưởng nhớ anh hùng dân tộc",
        image: "/Images/Landingpageninhbinh/z6284085815234_e871b91d3c710e3826c5480e7018bcf0.jpg",
      },
      {
        name: "Lễ hội Tràng An",
        date: "Tháng 3 âm lịch",
        description:
          "Lễ hội tại quần thể di sản Tràng An với các nghi lễ tâm linh và văn hóa đặc sắc, thu hút đông đảo du khách từ khắp nơi.",
        significance: "Lễ hội di sản thế giới",
        image: "/Images/Landingpageninhbinh/doc-dao-le-hoi-trang-an-net-van-hoa-tin-nguong-cua-ninh-binh-1640505232.jpg",
      },
      {
        name: "Lễ hội Chùa Bái Đính",
        date: "Mùng 6 tháng Giêng",
        description:
          "Lễ hội xuân tại chùa Bái Đính – ngôi chùa lớn nhất Đông Nam Á với nhiều kỷ lục Việt Nam, thu hút hàng trăm nghìn phật tử.",
        significance: "Lễ hội Phật giáo lớn nhất miền Bắc",
        image: "/Images/Landingpageninhbinh/1428-10-19-7.jpg",
      },
      {
        name: "Lễ hội Đền Thái Vi",
        date: "Mùng 14-17 tháng 3 âm lịch",
        description:
          "Lễ hội tại Đền Thái Vi thờ các vua Trần tại Ninh Bình với lễ rước kiệu và các hoạt động văn hóa dân gian.",
        significance: "Lễ hội triều Trần truyền thống",
        image: "/Images/Landingpageninhbinh/to-chuc-le-hoi-truyen-thong-den-thai-vi-nam-2024-d97e4.jpg",
      },
    ],
    specialties: [
      {
        name: "Dê núi",
        description: "Thịt dê săn chắc, chế biến đa dạng.",
        origin: "Hoa Lư",
        image: "/Images/Landingpageninhbinh/danh-sach-10-mon-an-tu-de-nui-ninh-binh-thom-ngon-kho-cuong-01-1640535420.jpg",
      },
      {
        name: "Cơm cháy",
        description: "Giòn rụm, thơm mùi gạo nếp.",
        origin: "Ninh Bình",
        image: "/Images/Landingpageninhbinh/com-chay-ninh-binh-dac-san-tru-danh-voi-cong-thuc-che-bien-truyen-thong-01-1640705441.jpg",
      },
      {
        name: "Gỏi cá nhệch",
        description: "Vị chua cay hòa quyện.",
        origin: "Kim Sơn",
        image: "/Images/Landingpageninhbinh/G%E1%BB%8Fi_c%C3%A1_nh%E1%BB%87ch.jpg",
      },
    ],
    tourism: [
      {
        name: "Tràng An",
        description: "Di sản thế giới với hang động và sông nước.",
        image: "/Images/Landingpageninhbinh/khu-du-lich-trang-an-1.png",
      },
      {
        name: "Tam Cốc",
        description: "Cảnh sắc sông núi nên thơ.",
        image: "/Images/Landingpageninhbinh/tam_coc_bich_dong_692a15cbdd.jpg",
      },
      {
        name: "Cố đô Hoa Lư",
        description: "Di tích lịch sử triều Đinh - Lê.",
        image: "/Images/Landingpageninhbinh/ve-tham-quan-co-do-hoa-lu-gia-ve-diem-den-va-kinh-nghiem-du-lich-phan-van-travel-1.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Tràng An",
        description: "Tôn vinh di sản văn hóa thiên nhiên.",
        image: "/Images/Landingpageninhbinh/rong-tren-song_1744531452607.jpg",
      },
      {
        name: "Làng đá mỹ nghệ",
        description: "Nghề truyền thống lâu đời.",
        image: "/Images/Landingpageninhbinh/da-nv.png",
      },
    ],
    gallery: [
      "/Images/Landingpageninhbinh/trang_an.jpg",
      "/Images/Landingpageninhbinh/tam_coc_bich_dong_692a15cbdd.jpg",
      "/Images/Landingpageninhbinh/ve-tham-quan-co-do-hoa-lu-gia-ve-diem-den-va-kinh-nghiem-du-lich-phan-van-travel-1.jpg",
      "/Images/Landingpageninhbinh/1428-10-19-7.jpg",
      "/Images/Landingpageninhbinh/1280px-Village_by_the_River_-_panoramio.jpg",
      "/Images/Landingpageninhbinh/Temple_comm%C3%A9moratif_au_roi_Dinh_Tien_Hoang_(Hoa_Lu).jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm du lịch theo huyện",
        subtitle:
          "Số lượng điểm du lịch nổi tiếng theo từng huyện của Ninh Bình",
        data: [
          { name: "Tràng An", value: 42 },
          { name: "Tam Cốc", value: 35 },
          { name: "Cố đô Hoa Lư", value: 38 },
          { name: "Vân Long", value: 21 },
          { name: "Bái Đính", value: 29 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Ninh Bình",
        data: [
          { name: "Di tích lịch sử", value: 30 },
          { name: "Ẩm thực đặc sản", value: 18 },
          { name: "Lễ hội truyền thống", value: 15 },
          { name: "Làng nghề / Sinh thái", value: 37 },
        ],
      },
    },
  },
  {
    slug: "quang-tri",
    name: "Quảng Trị",
    slogan: "Miền đất lịch sử bên dòng Bến Hải",
    description:
      "Quảng Trị ghi dấu lịch sử hào hùng, cảnh quan biển và những di tích chiến tranh.",
    accentColor: "#9a3412",
    heroImage:
      "/Images/Landingpagequangtri/cau_hien_luong_song_ben_hai_b98da484ce.png",
    introImage: "/Images/Landingpagequangtri/COt-co-vi-tuyen.jpg",
    stats: [
      { value: "400+", label: "Năm lịch sử" },
      { value: "500+", label: "Di tích lịch sử" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "20+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ II",
        title: "Vùng đất biên viễn",
        description:
          "Quảng Trị là vùng đất biên giới phía Nam của Đại Việt, nơi giao thoa văn hóa Việt – Chăm qua nhiều thế kỷ.",
        icon: "🗺️",
        image: "/Images/Landingpagequangtri/1.jpg",
      },
      {
        year: "1954",
        title: "Vĩ tuyến 17 chia cắt",
        description:
          "Hiệp định Genève 1954 lấy vĩ tuyến 17 sông Bến Hải làm ranh giới tạm thời, chia cắt đất nước và gia đình người dân Quảng Trị.",
        icon: "🌉",
        image: "/Images/Landingpagequangtri/ben-hai-1-2560x1440.jpg",
      },
      {
        year: "1972",
        title: "Mùa hè đỏ lửa",
        description:
          "Trận chiến Quảng Trị 1972 – một trong những trận đánh ác liệt nhất cuộc kháng chiến chống Mỹ, thành cổ Quảng Trị thành biểu tượng bất khuất.",
        icon: "🔥",
        image:
          "/Images/Landingpagequangtri/401200004b2511f0866c054443bc5751.jpeg",
      },
      {
        year: "1975",
        title: "Thống nhất non sông",
        description:
          "Giải phóng hoàn toàn Quảng Trị, cầu Hiền Lương và bờ Bắc sông Bến Hải thống nhất sau 21 năm chia cắt – cột mốc lịch sử không thể quên.",
        icon: "🇻🇳",
        image: "/Images/Landingpagequangtri/grabf56ba2_1619066358101.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng chiếu cói Lâm Xuân",
        product: "Chiếu cói truyền thống",
        description:
          "Nghề dệt chiếu cói truyền thống của người dân ven biển Quảng Trị với các sản phẩm bền đẹp phục vụ đời sống hàng ngày.",
        image: "/Images/Landingpagequangtri/dc4_ynoq.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng nghề nón lá",
        product: "Nón lá",
        description:
          "Nghề làm nón lá truyền thống với những chiếc nón trắng mỏng manh, tinh tế – vật dụng không thể thiếu của người phụ nữ Việt.",
        image:
          "/Images/Landingpagequangtri/164658-1-vinh-long-giu-gin-nghe-cham-non-la-truyen-thong.jpg",
        age: "200+ năm",
      },
      {
        name: "Gỗ chạm khắc Cam Lộ",
        product: "Đồ gỗ điêu khắc",
        description:
          "Làng nghề chạm khắc gỗ Cam Lộ tạo ra các sản phẩm trang trí, đồ thờ và đồ nội thất bằng gỗ quý có giá trị thẩm mỹ cao.",
        image:
          "/Images/Landingpagequangtri/lang-nghe-cham-khac-go-dong-giao.jpg",
        age: "150+ năm",
      },
      {
        name: "Muối Cửa Tùng",
        product: "Muối biển",
        description:
          "Vùng làm muối truyền thống tại bãi biển Cửa Tùng, sản xuất muối sạch tự nhiên bằng phương pháp phơi nắng truyền thống.",
        image:
          "/Images/Landingpagequangtri/Nghe_lam_muoi_da_gan_bo_voi_dan_lang_chai_qua_nhieu_the_he_6900b07288.jpg",
        age: "Truyền thống",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Cầu Hiền Lương",
        date: "Tháng 4 (ngày 30/4)",
        description:
          "Lễ kỷ niệm ngày đất nước thống nhất tại cầu Hiền Lương bên dòng Bến Hải, tái hiện lịch sử chia cắt và niềm vui đoàn tụ.",
        significance: "Lễ kỷ niệm thống nhất đất nước",
        image:
          "/Images/Landingpagequangtri/0dbdf1e8-9a3b-4bc8-9f33-06a776a1618f.jpg",
      },
      {
        name: "Lễ hội Thành cổ Quảng Trị",
        date: "Tháng 7 (ngày 27/7)",
        description:
          "Lễ tưởng niệm các chiến sỹ hy sinh tại Thành cổ Quảng Trị mùa hè 1972, thắp hoa đăng trên sông Thạch Hãn.",
        significance: "Lễ hội tri ân anh hùng",
        image: "/Images/Landingpagequangtri/images-5.jpg",
      },
      {
        name: "Lễ hội Làng Rào",
        date: "Mùng 1-3 tháng 2 âm lịch",
        description:
          "Lễ hội truyền thống của người dân Quảng Trị với các trò chơi dân gian, hát bội và các nghi lễ cầu mùa vụ bội thu.",
        significance: "Lễ hội dân gian truyền thống",
        image: "/Images/Landingpagequangtri/hung_nguyen_5_20230504184107.jpg",
      },
      {
        name: "Lễ hội Đua thuyền",
        date: "Mùng 5 tháng 5 âm lịch",
        description:
          "Lễ hội đua thuyền truyền thống trên sông Thạch Hãn với khí thế sôi động, thu hút đông đảo người dân và du khách.",
        significance: "Lễ hội sông nước truyền thống",
        image: "/Images/Landingpagequangtri/pexels-hson-31574101.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh ít lá gai",
        description: "Dẻo thơm, nhân đậu xanh.",
        origin: "Đông Hà",
        image: "/Images/Landingpagequangtri/banh-it-la-gai-binh-dinh-1.jpg",
      },
      {
        name: "Cháo vạt giường",
        description: "Đậm vị cá lóc và rau thơm.",
        origin: "Triệu Phong",
        image: "/Images/Landingpagequangtri/chao-vat-giuong-quang-tri-1151.jpg",
      },
      {
        name: "Hải sản Cửa Tùng",
        description: "Tươi ngon vùng biển miền Trung.",
        origin: "Cửa Tùng",
        image:
          "/Images/Landingpagequangtri/tom_hum_bien_cua_tung_ce29a036f1.jpg",
      },
    ],
    tourism: [
      {
        name: "Cầu Hiền Lương",
        description: "Di tích lịch sử chia cắt hai miền.",
        image: "/Images/Landingpagequangtri/cau-hien-luong-scaled.jpg",
      },
      {
        name: "Thành cổ Quảng Trị",
        description: "Dấu ấn chiến tranh và lịch sử.",
        image: "/Images/Landingpagequangtri/thanh_co_quang_tri_078270fc51.jpg",
      },
      {
        name: "Biển Cửa Việt",
        description: "Bãi biển hoang sơ, thanh bình.",
        image: "/Images/Landingpagequangtri/images-1.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Thống nhất",
        description: "Tưởng niệm và tri ân lịch sử.",
        image:
          "/Images/Landingpagequangtri/z3379958165362-52b9cd7368cfacb479290c3cdc642ba0-1651311133.jpg",
      },
      {
        name: "Làng nghề đan lát",
        description: "Nghề thủ công truyền thống.",
        image:
          "/Images/Landingpagequangtri/Nghe_dan_lat_truyen_thong_cua_lang_lan_dinh_0850b18b61.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagequangtri/cau_hien_luong_song_ben_hai_b98da484ce.png",
      "/Images/Landingpagequangtri/Redsvn-Vi-tuyen-17-08.jpg",
      "/Images/Landingpagequangtri/thanh_co_quang_tri_078270fc51.jpg",
      "/Images/Landingpagequangtri/tom_hum_bien_cua_tung_ce29a036f1.jpg",
      "/Images/Landingpagequangtri/0dbdf1e8-9a3b-4bc8-9f33-06a776a1618f.jpg",
      "/Images/Landingpagequangtri/images-5.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Quảng Trị",
        data: [
          { name: "TP Đông Hà", value: 27 },
          { name: "Gio Linh", value: 33 },
          { name: "Cam Lộ", value: 21 },
          { name: "Triệu Phong", value: 18 },
          { name: "Hải Lăng", value: 15 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Quảng Trị",
        data: [
          { name: "Di tích lịch sử", value: 48 },
          { name: "Ẩm thực đặc sản", value: 20 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 14 },
        ],
      },
    },
  },
  {
    slug: "quang-ngai",
    name: "Quảng Ngãi",
    slogan: "Hơi thở biển đảo và núi non",
    description:
      "Quảng Ngãi nổi bật với đảo Lý Sơn, biển xanh và văn hóa Sa Huỳnh.",
    accentColor: "#0f766e",
    heroImage: "/Images/Landingpagequangngai/q1-1715913723539.jpg",
    introImage: "/Images/Landingpagequangngai/diadiem_1750393165.jpg",
    stats: [
      { value: "3000+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích văn hóa" },
      { value: "60+", label: "Lễ hội truyền thống" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ II TCN",
        title: "Văn hóa Sa Huỳnh",
        description:
          "Vùng đất Quảng Ngãi là trung tâm của nền văn hóa Sa Huỳnh – nền văn hóa cổ đại nổi tiếng Đông Nam Á với nghề luyện sắt và đồ gốm tinh xảo.",
        icon: "🏺",
        image: "/Images/Landingpagequangngai/images2508901_SH1.jpg",
      },
      {
        year: "Thế kỷ XV",
        title: "Đội hùng binh Hoàng Sa",
        description:
          "Người dân Quảng Ngãi lập các đội hùng binh ra trấn giữ Hoàng Sa, khẳng định chủ quyền biển đảo của Việt Nam từ rất sớm.",
        icon: "⛵",
        image: "/Images/Landingpagequangngai/Hai-doi-Hoang-Sa.jpg",
      },
      {
        year: "1968",
        title: "Thảm sát Mỹ Lai",
        description:
          "Sự kiện bi thương Mỹ Lai ghi vào lịch sử nhân loại, trở thành biểu tượng chống chiến tranh và đòi hỏi hòa bình trên toàn thế giới.",
        icon: "✊",
        image:
          "/Images/Landingpagequangngai/My_Lai_massacre_woman_and_children.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thiên đường đảo Lý Sơn",
        description:
          "Đảo Lý Sơn nổi lên thành điểm du lịch hấp dẫn với cảnh quan núi lửa kỳ vĩ, tỏi thơm đặc sản và văn hóa biển đảo độc đáo.",
        icon: "🏝️",
        image: "/Images/Landingpagequangngai/dao-ly-son-1.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng gốm Mỹ Thiện",
        product: "Gốm truyền thống",
        description:
          "Làng gốm lâu đời sản xuất đồ gia dụng và đồ thờ bằng đất sét địa phương với kỹ thuật nung thủ công truyền thống.",
        image: "/Images/Landingpagequangngai/lang-gom-my-thien-2.jpg",
        age: "500+ năm",
      },
      {
        name: "Làng tỏi Lý Sơn",
        product: "Tỏi đặc sản",
        description:
          "Đảo Lý Sơn nổi tiếng với tỏi trồng trên đất núi lửa có hương vị thơm cay đặc biệt, được coi là 'vàng trắng' của đảo.",
        image:
          "/Images/Landingpagequangngai/canh-dong-toi-ly-son-5-1758181474.jpg",
        age: "400+ năm",
      },
      {
        name: "Dệt thổ cẩm Hrê",
        product: "Thổ cẩm Hrê",
        description:
          "Nghề dệt thổ cẩm truyền thống của người Hrê (H'rê) với hoa văn độc đáo, màu sắc rực rỡ phản ánh bản sắc văn hóa dân tộc thiểu số.",
        image: "/Images/Landingpagequangngai/tho_cam_2_zzot.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng nghề đan lát",
        product: "Đồ đan lát",
        description:
          "Nghề đan lát của các dân tộc thiểu số vùng núi Quảng Ngãi tạo ra sản phẩm phục vụ đời sống nông nghiệp và đồ thủ công mỹ nghệ.",
        image:
          "/Images/Landingpagequangngai/Nghe_dan_lat_truyen_thong_cua_lang_lan_dinh_0850b18b61.jpg",
        age: "Truyền thống",
      },
    ],
    festivals: [
      {
        name: "Lễ khao lề thế lính Hoàng Sa",
        date: "Tháng 3 âm lịch",
        description:
          "Nghi lễ tưởng nhớ đội hùng binh Hoàng Sa tại Lý Sơn – lễ hội độc đáo và ý nghĩa nhất miền Trung, khẳng định chủ quyền biển đảo.",
        significance: "Lễ hội chủ quyền biển đảo",
        image: "/Images/Landingpagequangngai/49LekhaolinhHoangsa01.jpg",
      },
      {
        name: "Lễ hội Đua thuyền tứ linh",
        date: "Mùng 4-5 tháng Giêng",
        description:
          "Lễ hội đua thuyền truyền thống trên sông Trà Khúc với 4 đội mang hình tứ linh long, lân, quy, phụng tranh tài.",
        significance: "Lễ hội đua thuyền truyền thống",
        image:
          "/Images/Landingpagequangngai/dua-thuyen-quang-ngai_1747062448.jpg",
      },
      {
        name: "Lễ hội Dinh Bà",
        date: "Tháng 3 âm lịch",
        description:
          "Lễ hội tín ngưỡng thờ Thiên Y A Na của cộng đồng dân cư vùng biển Quảng Ngãi với các nghi lễ cầu ngư và thả đèn trên biển.",
        significance: "Tín ngưỡng dân gian vùng biển",
        image: "/Images/Landingpagequangngai/Dinh-Co.jpg",
      },
      {
        name: "Lễ hội Cầu Ngư",
        date: "Đầu năm âm lịch",
        description:
          "Lễ hội cầu ngư truyền thống của ngư dân ven biển cầu bình an và mùa đánh bắt bội thu trước khi ra khơi đầu mùa.",
        significance: "Lễ hội ngư dân truyền thống",
        image:
          "/Images/Landingpagequangngai/z5202919559084_404366c613b07f9f0955fb36a205ee72.jpg",
      },
    ],
    specialties: [
      {
        name: "Tỏi Lý Sơn",
        description: "Tỏi thơm, vị cay dịu đặc trưng.",
        origin: "Đảo Lý Sơn",
        image:
          "/Images/Landingpagequangngai/pexels-liza-sigareva-2149951107-31056103.jpg",
      },
      {
        name: "Cá bống sông Trà",
        description: "Cá kho đậm vị, thịt chắc.",
        origin: "Sông Trà",
        image: "/Images/Landingpagequangngai/ca-bong-song-tra-quang-ngai-4.jpg",
      },
      {
        name: "Bánh ít lá gai",
        description: "Món bánh truyền thống thơm ngon.",
        origin: "Quảng Ngãi",
        image: "/Images/Landingpagequangngai/maxresdefault-5-1200x675.jpg",
      },
    ],
    tourism: [
      {
        name: "Đảo Lý Sơn",
        description: "Thiên đường biển đảo với núi lửa cổ.",
        image: "/Images/Landingpagequangngai/1-1554852416.jpg",
      },
      {
        name: "Bãi biển Mỹ Khê",
        description: "Bãi biển trong xanh, mịn màng.",
        image:
          "/Images/Landingpagequangngai/Bai-tam-1-2-3-luon-dong-khach-nhat-Anh_-Suu-tam.png",
      },
      {
        name: "Thành cổ Châu Sa",
        description: "Di tích văn hóa Sa Huỳnh.",
        image: "/Images/Landingpagequangngai/Thanh-co-Chau-Sa-12.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ khao lề thế lính Hoàng Sa",
        description: "Nghi lễ tưởng nhớ đội hùng binh Hoàng Sa.",
        image:
          "/Images/Landingpagequangngai/6f9a6905-le-khao-le-the-linh-hoang-sa-1.jpg",
      },
      {
        name: "Hát bài chòi",
        description: "Di sản văn hóa miền Trung.",
        image:
          "/Images/Landingpagequangngai/nghe-thuat-bai-choi-trung-bo-viet-nam-da-nang-05.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagequangngai/q1-1715913723539.jpg",
      "/Images/Landingpagequangngai/dji_0452-8108.jpg",
      "/Images/Landingpagequangngai/dua-thuyen-quang-ngai_1747062448.jpg",
      "/Images/Landingpagequangngai/pexels-liza-sigareva-2149951107-31056103.jpg",
      "/Images/Landingpagequangngai/6f9a6905-le-khao-le-the-linh-hoang-sa-1.jpg",
      "/Images/Landingpagequangngai/tho_cam_2_zzot.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Quảng Ngãi",
        data: [
          { name: "TP Quảng Ngãi", value: 29 },
          { name: "Sơn Hà", value: 21 },
          { name: "Tư Nghĩa", value: 17 },
          { name: "Bình Sơn", value: 24 },
          { name: "Lý Sơn", value: 33 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Quảng Ngãi",
        data: [
          { name: "Di tích lịch sử", value: 35 },
          { name: "Ẩm thực đặc sản", value: 25 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 22 },
        ],
      },
    },
  },
  {
    slug: "gia-lai",
    name: "Gia Lai",
    slogan: "Cao nguyên đại ngàn và hồ nước xanh",
    description:
      "Gia Lai mang vẻ đẹp hoang sơ của núi rừng Tây Nguyên, văn hóa cồng chiêng và cà phê thơm.",
    accentColor: "#166534",
    heroImage: "/Images/Landingpagegialai/f09025f2-bien-ho-pleiku-02.jpg",
    introImage:
      "/Images/Landingpagegialai/bien-ho-che-gia-lai-lui9d20230320105309.jpg",
    stats: [
      { value: "500+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích văn hóa" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "20+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ XIII-XV",
        title: "Vương quốc Ba Na",
        description:
          "Gia Lai là vùng đất cư trú lâu đời của người Ba Na, Jrai với nền văn hóa cồng chiêng đặc sắc và hệ thống làng buôn phát triển.",
        icon: "🏕️",
        image: "/Images/Landingpagegialai/521-nha-rong-le-hoi-mung-lua-moi.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Pháp khai thác Tây Nguyên",
        description:
          "Người Pháp đến khai thác Tây Nguyên, lập đồn điền cà phê và cao su, mở đường xuyên sơn – thay đổi vĩnh viễn diện mạo cao nguyên.",
        icon: "🌿",
        image:
          "/Images/Landingpagegialai/nguoihanoi-com-vn-nguoi-phap-voi-cay-ca-phe-o-viet-nam_72247.jpg",
      },
      {
        year: "2005",
        title: "Di sản cồng chiêng UNESCO",
        description:
          "Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện – niềm tự hào vô giá.",
        icon: "🥁",
        image:
          "/Images/Landingpagegialai/uploads-2023-thang-11-ngay-21-ngoc-thu-bai-20gin-20giu-20cong-20chieng-201-a1.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thủ phủ cà phê Robusta",
        description:
          "Gia Lai nổi lên là vùng trồng cà phê Robusta lớn nhất Việt Nam, cung cấp nguyên liệu cho thị trường trong nước và xuất khẩu quốc tế.",
        icon: "☕",
        image:
          "/Images/Landingpagegialai/ca-phe-pleiku-hon-ca-mot-loai-thuc-uong-hhv9j.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng dệt thổ cẩm Jrai",
        product: "Thổ cẩm Jrai",
        description:
          "Nghề dệt thổ cẩm truyền thống của phụ nữ Jrai với hoa văn hình học tinh tế, màu sắc rực rỡ phản ánh thế giới quan phong phú.",
        image: "/Images/Landingpagegialai/1_KVXD.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng đan gùi Ba Na",
        product: "Gùi mây tre đan",
        description:
          "Nghề đan gùi của người Ba Na – dụng cụ không thể thiếu trong đời sống hàng ngày, nay trở thành hàng thủ công mỹ nghệ.",
        image: "/Images/Landingpagegialai/mnong.jpg",
        age: "Truyền thống",
      },
      {
        name: "Tạc tượng gỗ nhà mồ",
        product: "Tượng gỗ dân gian",
        description:
          "Nghề tạc tượng gỗ đặt quanh nhà mồ – nghệ thuật dân gian độc đáo của người Ba Na, Jrai với hình tượng sinh động đầy cảm xúc.",
        image: "/Images/Landingpagegialai/images-3.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng cà phê Biển Hồ",
        product: "Cà phê Arabica cao nguyên",
        description:
          "Vùng canh tác cà phê bên hồ miệng núi lửa Biển Hồ với cà phê Arabica đặc biệt có hương vị tinh tế nhờ khí hậu và thổ nhưỡng đặc trưng.",
        image: "/Images/Landingpagegialai/pexels-1500mcoffee-29798812.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội cồng chiêng Tây Nguyên",
        date: "Tháng 11-12 hàng năm",
        description:
          "Lễ hội cồng chiêng huy hoàng với hàng trăm nghệ nhân biểu diễn, tái hiện không gian văn hóa cồng chiêng Tây Nguyên huyền bí.",
        significance: "Di sản phi vật thể UNESCO",
        image: "/Images/Landingpagegialai/231-gia-lai-cong-chieng.jpg",
      },
      {
        name: "Lễ hội mừng lúa mới (Tơ nưng)",
        description:
          "Lễ hội nông nghiệp của người Jrai sau mùa gặt, tạ ơn Yàng (thần linh) và cầu chúc cho mùa vụ tiếp theo bội thu.",
        date: "Sau mùa gặt tháng 11-12",
        significance: "Lễ hội nông nghiệp truyền thống",
        image: "/Images/Landingpagegialai/images-1.jpg",
      },
      {
        name: "Lễ hội Bỏ mả (Pơ thi)",
        date: "Sau lễ tang 3-5 năm",
        description:
          "Nghi lễ đặc trưng của người Ba Na và Jrai, tổ chức sau khi làng đã cúng bỏ linh hồn người mất, với múa hát và tiệc lớn cả làng.",
        significance: "Nghi lễ dân gian đặc trưng Tây Nguyên",
        image:
          "/Images/Landingpagegialai/kham-pha-le-po-thi-bo-ma-buon-ma-thuot-doc-dao-01-1651918909.jpg",
      },
      {
        name: "Lễ hội đâm trâu",
        date: "Các dịp lễ lớn",
        description:
          "Nghi lễ đâm trâu hiến tế thần linh trong các dịp lễ lớn của người Ba Na, là nghi thức cầu may mắn, sức khỏe và bình an cho cộng đồng.",
        significance: "Nghi lễ tín ngưỡng đặc trưng",
        image: "/Images/Landingpagegialai/le-hoi-dam-trau-ivivu.jpg",
      },
    ],
    specialties: [
      {
        name: "Cơm lam",
        description: "Gạo nướng trong ống tre thơm lừng.",
        origin: "Pleiku",
        image: "/Images/Landingpagegialai/DSC01365-scaled.jpg",
      },
      {
        name: "Gà nướng",
        description: "Thịt gà đậm vị núi rừng.",
        origin: "Kon Hà Nừng",
        image:
          "/Images/Landingpagegialai/lam-ga-nuong-sa-te-bang-noi-chien-khong-dau_6e203ba544274c69b6284f9209223c97.jpg",
      },
      {
        name: "Cà phê Pleiku",
        description: "Hương cà phê mạnh mẽ, quyến rũ.",
        origin: "Pleiku",
        image: "/Images/Landingpagegialai/pexels-1500mcoffee-29812660.jpg",
      },
    ],
    tourism: [
      {
        name: "Biển Hồ",
        description: "Hồ nước xanh biếc giữa cao nguyên.",
        image: "/Images/Landingpagegialai/8d98d60d-bien-ho-pleiku-13.jpg",
      },
      {
        name: "Đồi chè Biển Hồ",
        description: "Đồi chè xanh trải dài.",
        image: "/Images/Landingpagegialai/397399aa886346e6bb3bd9341cf0a930.jpg",
      },
      {
        name: "Thác Phú Cường",
        description: "Thác nước hùng vĩ giữa đại ngàn.",
        image:
          "/Images/Landingpagegialai/thac-phu-cuong-chiem-nguong-tuyet-tac-cua-nui-rung-gia-lai-05-1659179228.jpg",
      },
    ],
    culture: [
      {
        name: "Không gian cồng chiêng",
        description: "Di sản văn hóa Tây Nguyên.",
        image: "/Images/Landingpagegialai/Pyang-1.jpg",
      },
      {
        name: "Lễ hội mừng lúa mới",
        description: "Nghi lễ đặc trưng của người Jrai.",
        image: "/Images/Landingpagegialai/mungluamoi-1838.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagegialai/f09025f2-bien-ho-pleiku-02.jpg",
      "/Images/Landingpagegialai/397399aa886346e6bb3bd9341cf0a930.jpg",
      "/Images/Landingpagegialai/1d165368-thac-phu-cuong-10.jpg",
      "/Images/Landingpagegialai/bien-ho-che-gia-lai-lui9d20230320105309.jpg",
      "/Images/Landingpagegialai/Pyang-1.jpg",
      "/Images/Landingpagegialai/van-hoa-ca-phe-pleiku-1.png",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo huyện",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng huyện của Gia Lai",
        data: [
          { name: "TP Pleiku", value: 27 },
          { name: "Chư Sê", value: 19 },
          { name: "Đak Đoa", value: 22 },
          { name: "An Khê", value: 16 },
          { name: "Ia Grai", value: 24 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Gia Lai",
        data: [
          { name: "Di tích lịch sử", value: 22 },
          { name: "Ẩm thực đặc sản", value: 23 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 35 },
        ],
      },
    },
  },
  {
    slug: "khanh-hoa",
    name: "Khánh Hòa",
    slogan: "Nha Trang rực rỡ bên biển xanh",
    description:
      "Khánh Hòa nổi tiếng với biển Nha Trang trong xanh, đảo đẹp và hải sản phong phú.",
    accentColor: "#0284c7",
    heroImage: "/Images/Landingpagekhanhhoa/Vinh-Nha-Trang-15.jpg",
    introImage: "/Images/Landingpagekhanhhoa/Vịnh-Nha-Trang-ivivu.jpg",
    stats: [
      { value: "400+", label: "Năm lịch sử" },
      { value: "150+", label: "Di tích danh thắng" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ VII-XV",
        title: "Vương quốc Chăm Pa",
        description:
          "Khánh Hòa là vùng đất trung tâm của Vương quốc Chăm Pa với nhiều công trình kiến trúc Chăm kỳ vĩ, điển hình là Tháp Bà Ponagar.",
        icon: "🏛️",
        image: "/Images/Landingpagekhanhhoa/kien-truc-cham-pa-4.jpg",
      },
      {
        year: "1653",
        title: "Sáp nhập Đại Việt",
        description:
          "Sau khi Chúa Nguyễn Phúc Tần chinh phục, Khánh Hòa chính thức sáp nhập vào lãnh thổ Đại Việt và phát triển thành trung tâm thương mại miền Trung.",
        icon: "🗺️",
        image: "/Images/Landingpagekhanhhoa/958d40ce-ban-do-khanh-hoa-1.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Nha Trang hình thành",
        description:
          "Thành phố Nha Trang dần hình thành dưới thời Pháp thuộc với các công trình thuộc địa, bến cảng và khu nghỉ dưỡng ven biển.",
        icon: "🏖️",
        image: "/Images/Landingpagekhanhhoa/nha-trang-xua-1965-compressed.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thành phố biển đẳng cấp quốc tế",
        description:
          "Nha Trang trở thành thành phố biển hàng đầu Đông Nam Á với hệ thống resort, cáp treo vượt biển và các lễ hội du lịch quốc tế.",
        icon: "🌊",
        image: "/Images/Landingpagekhanhhoa/Vinh-Nha-Trang-15.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề yến sào Khánh Hòa",
        product: "Yến sào cao cấp",
        description:
          "Khánh Hòa là vùng khai thác yến sào tự nhiên lớn nhất Việt Nam, sản xuất yến chất lượng cao có giá trị dinh dưỡng và kinh tế vượt trội.",
        image: "/Images/Landingpagekhanhhoa/yen-sao-san-vat-quy-gia-tu-nhung-mom-da-cheo-leo-ngoai-khoi-xa-6-1622485990.jpg",
        age: "300+ năm",
      },
      {
        name: "Làng đúc nồi đất Vạn Khánh",
        product: "Đồ gốm đất nung",
        description:
          "Nghề đúc nồi đất truyền thống với phương pháp thủ công độc đáo, tạo ra nồi đất nung chất lượng phục vụ nấu nướng gia đình.",
        image: "/Images/Landingpagekhanhhoa/www.khoahocphothong.com.vn-vnt_upload-file-05_2023-_tho_lam_noi_dat_tai_lang_nghe_tru_son.jpg",
        age: "200+ năm",
      },
      {
        name: "Nghề đóng thuyền Vĩnh Lương",
        product: "Thuyền gỗ đánh cá",
        description:
          "Làng nghề đóng thuyền gỗ truyền thống cung cấp phương tiện đánh bắt hải sản cho ngư dân Khánh Hòa và các tỉnh lân cận.",
        image: "/Images/Landingpagekhanhhoa/1829669_toan_canh_xuong_dong_sua_chua_tau_thuyen_cua_gia_dinh_ong_le_duc_minh_o_khu_8_phuong_phong_hai_tx_quang_yen_09465518.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng đá granit Diên Khánh",
        product: "Đá granit tự nhiên",
        description:
          "Vùng khai thác và chế tác đá granit nổi tiếng miền Trung, cung cấp vật liệu xây dựng cao cấp và đồ trang trí cho thị trường cả nước.",
        image: "/Images/Landingpagekhanhhoa/quy-trinh-khai-thac-da-tu-nhien-3.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Tháp Bà Ponagar",
        date: "20-23 tháng 3 âm lịch",
        description:
          "Lễ hội lớn nhất Khánh Hòa tại Tháp Bà Ponagar – công trình Chăm Pa cổ, với nghi lễ tắm tượng, múa bóng rỗi và hát chầu văn.",
        significance: "Lễ hội tín ngưỡng Tháp Bà",
        image: "/Images/Landingpagekhanhhoa/thap-ba-ponagar-o-nha-trang.jpg",
      },
      {
        name: "Lễ hội Cầu Ngư",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội cầu ngư truyền thống của ngư dân ven biển với lễ rước linh và đua thuyền sôi động cầu mong mùa biển bình yên và cá đầy thuyền.",
        significance: "Lễ hội ngư dân truyền thống",
        image: "/Images/Landingpagekhanhhoa/le-hoi-cau-ngu.-anh-ngoc-lan.jpg",
      },
      {
        name: "Festival Biển Nha Trang",
        date: "Tháng 6-7 hàng năm",
        description:
          "Lễ hội du lịch quốc tế với nhiều hoạt động văn hóa, nghệ thuật, thể thao biển và trình diễn ánh sáng rực rỡ trên vịnh Nha Trang.",
        significance: "Sự kiện du lịch quốc tế",
        image: "/Images/Landingpagekhanhhoa/le-hoi-festival-bien-nha-trang-1.jpg",
      },
      {
        name: "Lễ hội Am Chúa",
        date: "Mùng 1-3 tháng 3 âm lịch",
        description:
          "Lễ hội tôn vinh Thiên Y A Na (Bà Chúa Ngọc) tại Am Chúa, Diên Khánh với nhiều nghi lễ dân gian đặc sắc.",
        significance: "Tín ngưỡng thờ Mẫu đặc trưng",
        image: "/Images/Landingpagekhanhhoa/am%20chua%20ac.jpg",
      },
    ],
    specialties: [
      {
        name: "Bún cá Nha Trang",
        description: "Nước dùng thanh, cá tươi ngọt.",
        origin: "Nha Trang",
        image: "/Images/Landingpagekhanhhoa/bun-ca-nha-trang-banner.jpg",
      },
      {
        name: "Nem nướng",
        description: "Nem thơm, ăn kèm bánh tráng.",
        origin: "Ninh Hòa",
        image: "/Images/Landingpagekhanhhoa/nem-nuong-noi-tieng-nha-trang.jpg",
      },
      {
        name: "Yến sào",
        description: "Đặc sản quý của vùng biển.",
        origin: "Đảo yến",
        image: "/Images/Landingpagekhanhhoa/Yen-sao-nha-trang-8..jpg",
      },
    ],
    tourism: [
      {
        name: "Vịnh Nha Trang",
        description: "Một trong những vịnh đẹp nhất thế giới.",
        image: "/Images/Landingpagekhanhhoa/Vịnh-Nha-Trang-ivivu.jpg",
      },
      {
        name: "Đảo Hòn Mun",
        description: "Thiên đường lặn biển.",
        image: "/Images/Landingpagekhanhhoa/hon-mun-3.jpg",
      },
      {
        name: "Tháp Bà Ponagar",
        description: "Di tích văn hóa Chăm.",
        image: "/Images/Landingpagekhanhhoa/Thap-Po-Nagar-09.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội biển Nha Trang",
        description: "Sôi động, tôn vinh văn hóa biển.",
        image: "/Images/Landingpagekhanhhoa/kham-pha-festival-bien-nha-trang-khong-gian-le-hoi-quang-ba-bien-dao-day-sac-mau-1027.jpg",
      },
      {
        name: "Lễ hội yến sào",
        description: "Tôn vinh nghề khai thác yến.",
        image: "/Images/Landingpagekhanhhoa/le-hoi-yen-sao-nha-trang-khanh-hoa-ton-vinh-lang-nghe-truyen-thong-dac-sac-tai-nha-trang-1625645933.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagekhanhhoa/Vịnh-Nha-Trang-ivivu.jpg",
      "/Images/Landingpagekhanhhoa/tour-hon-mun-hon-mot-nha-trang2-1.jpeg",
      "/Images/Landingpagekhanhhoa/thap-ba-ponagar-o-nha-trang.jpg",
      "/Images/Landingpagekhanhhoa/festival-bien-nha-trang-0.jpg",
      "/Images/Landingpagekhanhhoa/bun-ca-nha-trang-banner.jpg",
      "/Images/Landingpagekhanhhoa/Le_hoi_cau_ngu_net_dep_van_hoa_cua_nguoi_mien_bien_7f20b8dac7.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm du lịch theo khu vực",
        subtitle:
          "Số lượng điểm du lịch nổi tiếng theo từng khu vực của Khánh Hòa",
        data: [
          { name: "Nha Trang", value: 48 },
          { name: "Cam Ranh", value: 22 },
          { name: "Vạn Ninh", value: 27 },
          { name: "Diên Khánh", value: 14 },
          { name: "Khánh Sơn", value: 11 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Khánh Hòa",
        data: [
          { name: "Di tích lịch sử", value: 20 },
          { name: "Ẩm thực đặc sản", value: 28 },
          { name: "Lễ hội truyền thống", value: 12 },
          { name: "Làng nghề / Sinh thái", value: 40 },
        ],
      },
    },
  },
  {
    slug: "lam-dong",
    name: "Lâm Đồng",
    slogan: "Đà Lạt mộng mơ giữa cao nguyên",
    description:
      "Lâm Đồng – xứ sở của ngàn hoa, rừng thông vi vút và thành phố Đà Lạt mát lành quanh năm ở độ cao 1.500m. Nơi giao thoa giữa kiến trúc Pháp cổ kính, văn hóa bản địa K'Ho và thiên nhiên cao nguyên hùng vĩ.",
    accentColor: "#0f766e",
    heroImage: "/Images/landingpagelamdong/Dalat3.jpg",
    introImage: "/Images/landingpagelamdong/ho-xuan-huong-da-lat-1.jpg",
    stats: [
      { value: "130+", label: "Năm thành phố Đà Lạt" },
      { value: "300+", label: "Loài hoa đặc trưng" },
      { value: "50+", label: "Lễ hội văn hóa" },
      { value: "30+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "1893",
        title: "Bác sĩ Yersin khám phá Đà Lạt",
        description:
          "Bác sĩ Alexandre Yersin khám phá cao nguyên Lang Biang 1893, đề xuất xây dựng thành phố nghỉ dưỡng trên cao nguyên mát mẻ này.",
        icon: "🔭",
        image: "/Images/Landingpagelamdong/alexandre-yersin-institutpasteur_46576.jpg",
      },
      {
        year: "1916",
        title: "Thành phố Đà Lạt ra đời",
        description:
          "Đà Lạt chính thức được thành lập, xây dựng theo kiểu quy hoạch đô thị Pháp với các biệt thự cổ và vườn hoa tuyệt đẹp.",
        icon: "🏘️",
        image: "/Images/Landingpagelamdong/Langbian_Palace_1920s.jpg",
      },
      {
        year: "1944",
        title: "Trường Võ Bị Quốc Gia",
        description:
          "Trường Võ Bị Quốc Gia Đà Lạt thành lập, khẳng định vị trí giáo dục đặc biệt của thành phố cao nguyên trong lịch sử Việt Nam.",
        icon: "🎓",
        image: "/Images/Landingpagelamdong/Trường_Võ-bị_Quốc-gia.JPG",
      },
      {
        year: "Hiện đại",
        title: "Thành phố hoa quốc tế",
        description:
          "Đà Lạt nổi tiếng khắp thế giới với Festival Hoa quốc tế và trở thành điểm đến du lịch, nghỉ dưỡng hàng đầu Đông Nam Á.",
        icon: "🌸",
        image: "/Images/Landingpagelamdong/10.-dan-hoa-dalat-ha-huu-net.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng hoa Vạn Thành",
        product: "Hoa tươi cao cấp",
        description:
          "Vùng trồng hoa tươi lớn nhất Đà Lạt cung cấp hoa hồng, cẩm chướng, lay ơn cho thị trường cả nước và xuất khẩu.",
        image: "/Images/Landingpagelamdong/lang-hoa-van-thanh-13.jpg",
        age: "70+ năm",
      },
      {
        name: "Làng nghề dệt thổ cẩm K'Ho",
        product: "Thổ cẩm K'Ho",
        description:
          "Nghề dệt thổ cẩm truyền thống của người K'Ho tại Lạc Dương với hoa văn độc đáo phản ánh văn hóa cao nguyên.",
        image: "/Images/Landingpagelamdong/Det-tho-cam-truyen-thong-cua-nguoi-KHo-Lam-Dong-duoc-gioi-thieu-tai-hoi-nghi.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Gốm mỹ nghệ Đà Lạt",
        product: "Gốm nghệ thuật",
        description:
          "Làng nghề gốm mỹ nghệ sản xuất đồ lưu niệm và nghệ thuật phong phú, khai thác đất sét địa phương và phong cách thiết kế hiện đại.",
        image: "/Images/Landingpagelamdong/pexels-mesayu-elida-irawati-2155088933-37232086.jpg",
        age: "50+ năm",
      },
      {
        name: "Làng chè oolong Cầu Đất",
        product: "Chè Oolong cao cấp",
        description:
          "Vùng chè Oolong Cầu Đất với độ cao trên 1600m tạo ra chè chất lượng cao, hương vị thơm ngon được xuất khẩu sang nhiều quốc gia.",
        image: "/Images/Landingpagelamdong/doi-che-cau-dat-1.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Festival Hoa Đà Lạt",
        date: "Tháng 12 (2 năm một lần)",
        description:
          "Lễ hội hoa quốc tế lớn nhất Việt Nam với hàng triệu bông hoa trang trí khắp thành phố, thu hút khách quốc tế và trong nước.",
        significance: "Lễ hội hoa quốc tế",
        image: "/Images/Landingpagelamdong/7e529118-7843-4887-b692-ff9966b80114.jpg",
      },
      {
        name: "Lễ hội Cồng Chiêng K'Ho",
        date: "Tháng 1-2 hàng năm",
        description:
          "Lễ hội cồng chiêng của người K'Ho Lang Biang tái hiện không gian văn hóa Tây Nguyên với các điệu múa và nhạc cụ truyền thống.",
        significance: "Di sản văn hóa cồng chiêng",
        image: "/Images/Landingpagelamdong/521-kon_tum-phuocsonkt%40gmailcom-le_hoi_mung_lua_moi.jpg",
      },
      {
        name: "Lễ hội trà Bảo Lộc",
        date: "Tháng 11 hàng năm",
        description:
          "Lễ hội tôn vinh ngành chè Bảo Lộc với các hoạt động thưởng trà, thi hái chè và trình diễn pha trà nghệ thuật.",
        significance: "Lễ hội nông nghiệp đặc trưng",
        image: "/Images/Landingpagelamdong/doi-che-cau-dat-o-da-lat-2.png",
      },
      {
        name: "Lễ hội Nhật Nguyệt Lang Biang",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội truyền thống của người K'Ho tại núi Lang Biang với các nghi lễ cầu Yàng ban phúc và lửa trại cộng đồng hoành tráng.",
        significance: "Lễ hội núi Lang Biang",
        image: "/Images/Landingpagelamdong/0031041_ve-tham-quan-langbiang-land.jpeg",
      },
    ],
    specialties: [
      {
        name: "Cà phê Đà Lạt",
        description: "Cà phê Arabica trồng ở độ cao 1.500m với hương thơm dịu nhẹ, vị chua thanh tự nhiên và hậu vị ngọt lịm – đặc sản không thể bỏ qua khi đến xứ sở sương mù.",
        origin: "Đà Lạt",
        image: "/Images/Landingpagelamdong/0.aa.jpg",
      },
      {
        name: "Dâu tây Đà Lạt",
        description: "Quả dâu tây đỏ mọng, vị chua ngọt hài hòa được trồng trên những vườn dâu xanh mướt ở độ cao lý tưởng – biểu tượng nông sản sạch của vùng cao nguyên Lâm Đồng.",
        origin: "Đà Lạt",
        image: "/Images/Landingpagelamdong/pexels-valeriia-tkachenko-1240258405-36855669.jpg",
      },
      {
        name: "Atiso Đà Lạt",
        description: "Thảo dược quý thanh nhiệt, lọc gan được trồng trên cao nguyên Lâm Đồng – chế biến thành trà atiso, mứt và thực phẩm chức năng xuất khẩu giá trị cao.",
        origin: "Lâm Đồng",
        image: "/Images/Landingpagelamdong/lang-hoa-van-thanh-1.jpg",
      },
    ],
    tourism: [
      {
        name: "Hồ Xuân Hương",
        description: "Biểu tượng thơ mộng của Đà Lạt.",
        image: "/Images/Landingpagelamdong/ho-xuan-huong-da-lat-1.jpg",
      },
      {
        name: "Đồi chè Cầu Đất",
        description: "Đồi chè xanh bạt ngàn.",
        image: "/Images/Landingpagelamdong/doi%20tra%20cau%20dat%201.jpg",
      },
      {
        name: "Thung lũng Tình Yêu",
        description: "Điểm đến lãng mạn giữa rừng thông.",
        image: "/Images/Landingpagelamdong/TLTY2.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Hoa Đà Lạt",
        description: "Sự kiện văn hóa đặc trưng cao nguyên.",
        image: "/Images/Landingpagelamdong/ruc-ro-le-hoi-hoa-o-da-lat-5ece160609332.jpg",
      },
      {
        name: "Không gian cồng chiêng",
        description: "Di sản văn hóa Tây Nguyên.",
        image: "/Images/Landingpagelamdong/231-gia_lai-huytinhphoto%40gmail.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagelamdong/ho-xuan-huong-da-lat-1.jpg",
      "/Images/Landingpagelamdong/TLTY2.jpg",
      "/Images/Landingpagelamdong/0031041_ve-tham-quan-langbiang-land.jpeg",
      "/Images/Landingpagelamdong/7e529118-7843-4887-b692-ff9966b80114.jpg",
      "/Images/Landingpagelamdong/doi-che-cau-dat-1.jpg",
      "/Images/Landingpagelamdong/Dalat3.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm du lịch theo huyện",
        subtitle:
          "Số lượng điểm du lịch nổi tiếng theo từng huyện của Lâm Đồng",
        data: [
          { name: "Đà Lạt", value: 51 },
          { name: "Lạc Dương", value: 28 },
          { name: "Đức Trọng", value: 19 },
          { name: "Bảo Lộc", value: 23 },
          { name: "Di Linh", value: 16 },
          { name: "Đức Trọng", value: 19 },
          { name: "Lạc Dương", value: 28 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Lâm Đồng",
        data: [
          { name: "Làng nghề / Sinh thái", value: 45 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Di tích lịch sử", value: 18 },
          { name: "Lễ hội truyền thống", value: 15 },
          { name: "Làng nghề / Sinh thái", value: 45 },
        ],
      },
    },
  },
  {
    slug: "dak-lak",
    name: "Đắk Lắk",
    slogan: "Cao nguyên nắng gió và cà phê",
    description:
      "Đắk Lắk nổi bật với cà phê Buôn Ma Thuột, văn hóa cồng chiêng và thác nước hùng vĩ.",
    accentColor: "#92400e",
    heroImage: "/Images/Landingpagedaklak/Draynur_falls.jpg",
    introImage: "/Images/Landingpagedaklak/Ho-Lak-Dak-Lak-18.jpg",
    stats: [
      { value: "500+", label: "Năm lịch sử" },
      { value: "100+", label: "Buôn làng truyền thống" },
      { value: "60+", label: "Lễ hội văn hóa" },
      { value: "Số 1", label: "Cà phê Việt Nam" },
    ],
    timeline: [
      {
        year: "Thế kỷ XV-XVIII",
        title: "Vương quốc Mơ Nông",
        description:
          "Đắk Lắk là vùng đất của các dân tộc Ê Đê, M'Nông với hệ thống buôn làng tự trị và truyền thống săn voi nổi tiếng.",
        icon: "🐘",
        image: "/Images/Landingpagedaklak/b400b825-buon-don-dak-lak-01.jpg",
      },
      {
        year: "1899",
        title: "Buôn Ma Thuột thành lập",
        description:
          "Người Pháp thành lập tỉnh lỵ Buôn Ma Thuột, đưa cây cà phê vào trồng đại trà và biến Tây Nguyên thành vựa cà phê Đông Dương.",
        icon: "☕",
        image: "/Images/Landingpagedaklak/lich-su-va-vung-dat-trong-ca-phe.jpg",
      },
      {
        year: "2005",
        title: "Di sản cồng chiêng UNESCO",
        description:
          "Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO vinh danh – đóng góp lớn của Đắk Lắk với các buôn Ê Đê, M'Nông.",
        icon: "🥁",
        image: "/Images/Landingpagedaklak/Cong_Chieng_Tay_Nguyen_1.jpg",
      },
      {
        year: "Hiện đại",
        title: "Thủ phủ cà phê thế giới",
        description:
          "Buôn Ma Thuột được mệnh danh là thủ phủ cà phê, nơi tổ chức Festival Cà phê quốc tế và xuất khẩu cà phê đến hơn 80 quốc gia.",
        icon: "🌍",
        image: "/Images/Landingpagedaklak/ttocf3.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Buôn Ako Dhông",
        product: "Thủ công truyền thống Ê Đê",
        description:
          "Buôn cổ truyền thống nhất Buôn Ma Thuột với nhà dài Ê Đê, nghề dệt thổ cẩm và các nghề thủ công truyền thống còn được bảo tồn nguyên vẹn.",
        image: "/Images/Landingpagedaklak/Buon-Ako-Dhong-4.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng gốm M'Nông",
        product: "Gốm đất nung truyền thống",
        description:
          "Nghề làm gốm bằng tay không dùng bàn xoay của người M'Nông – kỹ thuật cổ xưa tạo ra những chiếc ché rượu cần độc đáo.",
        image: "/Images/Landingpagedaklak/gom-12a-scaled.jpg",
        age: "Hàng trăm năm",
      },
      {
        name: "Làng dệt thổ cẩm Ê Đê",
        product: "Thổ cẩm Ê Đê",
        description:
          "Nghề dệt thổ cẩm Ê Đê với hoa văn chim thú, hình học tinh tế, màu sắc rực rỡ – sản phẩm văn hóa không thể thiếu trong đời sống cộng đồng.",
        image: "/Images/Landingpagedaklak/det-tho-cam-4-9007.jpg",
        age: "Truyền thống",
      },
      {
        name: "Cà phê đặc sản Buôn Ma Thuột",
        product: "Cà phê Robusta cao nguyên",
        description:
          "Vùng cà phê Robusta số một Việt Nam với quy trình chế biến ướt, rang xay thủ công tạo ra hạt cà phê chất lượng xuất khẩu hàng đầu.",
        image: "/Images/Landingpagedaklak/dak2.jpg",
        age: "120+ năm",
      },
    ],
    festivals: [
      {
        name: "Festival Cà phê Buôn Ma Thuột",
        date: "Tháng 3 (2 năm một lần)",
        description:
          "Lễ hội cà phê quốc tế lớn nhất Việt Nam với triển lãm, hội thảo, thi pha chế và lễ hội cồng chiêng hoành tráng.",
        significance: "Sự kiện cà phê quốc tế",
        image: "/Images/Landingpagedaklak/KhaimacLHcaphe2015.jpg",
      },
      {
        name: "Lễ hội Cầu Mưa (H'Drăm)",
        date: "Tháng 3-4 âm lịch",
        description:
          "Lễ cầu mưa của người Ê Đê vào đầu mùa canh tác, cầu thần nước ban mưa thuận cho mùa vụ với nghi lễ hiến tế và hát sử thi Khan.",
        significance: "Nghi lễ tín ngưỡng Ê Đê",
        image: "/Images/Landingpagedaklak/trai-nghiem-van-hoa-doc-dao-tai-buon-ako-dhong-7-1651563609.jpg",
      },
      {
        name: "Lễ hội Đua voi Buôn Đôn",
        date: "Tháng 3 hàng năm",
        description:
          "Lễ hội đua voi độc đáo tại Buôn Đôn – nơi có truyền thống thuần phục và nuôi voi lâu đời nhất Việt Nam, thu hút khách quốc tế.",
        significance: "Lễ hội voi đặc trưng",
        image: "/Images/Landingpagedaklak/Le-hoi-dua-voi-7.jpg",
      },
      {
        name: "Lễ bỏ mả M'Nông",
        date: "Sau tang lễ 3-5 năm",
        description:
          "Nghi lễ tiễn biệt cuối cùng của người M'Nông với tiệc cộng đồng, múa hát và tạc tượng gỗ – nét văn hóa tâm linh đặc sắc.",
        significance: "Nghi lễ tâm linh đặc trưng",
        image: "/Images/Landingpagedaklak/kham-pha-le-po-thi-bo-ma-buon-ma-thuot-doc-dao-04-1651918948.jpg",
      },
    ],
    specialties: [
      {
        name: "Cà phê Buôn Ma Thuột",
        description: "Đậm đà, thơm nồng đặc trưng.",
        origin: "Buôn Ma Thuột",
        image: "/Images/Landingpagedaklak/cafe-vie1bb87t1.jpg",
      },
      {
        name: "Gà nướng bản Đôn",
        description: "Thịt gà thơm vị núi rừng.",
        origin: "Buôn Đôn",
        image: "/Images/Landingpagedaklak/923265421426809205976143937644828929556480n-17024638.jpg",
      },
      {
        name: "Cơm lam",
        description: "Gạo nếp nướng ống tre.",
        origin: "Krông Ana",
        image: "/Images/Landingpagedaklak/com-lam-thit-nuong-ong-tre-tay-giang-d.jpg",
      },
    ],
    tourism: [
      {
        name: "Thác Dray Nur",
        description: "Thác nước hùng vĩ giữa rừng xanh.",
        image: "/Images/Landingpagedaklak/photo3jpg.jpg",
      },
      {
        name: "Hồ Lắk",
        description: "Hồ nước tự nhiên lớn nhất Tây Nguyên.",
        image: "/Images/Landingpagedaklak/ho-lak-buon-ma-thuot.jpg",
      },
      {
        name: "Buôn Đôn",
        description: "Làng văn hóa với truyền thống săn voi.",
        image: "/Images/Landingpagedaklak/Bản_Đôn.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội cà phê",
        description: "Tôn vinh đặc sản Tây Nguyên.",
        image: "/Images/Landingpagedaklak/choang-ngop-voi-le-hoi-ca-phe-buon-ma-thuot-dam-da-sac-mau-van-hoa-04-1651916038.jpg",
      },
      {
        name: "Cồng chiêng",
        description: "Di sản văn hóa Tây Nguyên.",
        image: "/Images/Landingpagedaklak/Cong_Chieng_Tay_Nguyen_1.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagedaklak/Draynur_falls.jpg",
      "/Images/Landingpagedaklak/ho-lak-buon-ma-thuot.jpg",
      "/Images/Landingpagedaklak/Cong_Chieng_Tay_Nguyen_1.jpg",
      "/Images/Landingpagedaklak/KhaimacLHcaphe2015.jpg",
      "/Images/Landingpagedaklak/Le-hoi-dua-voi-7.jpg",
      "/Images/Landingpagedaklak/Buon-Ako-Dhong-4.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo huyện",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng huyện của Đắk Lắk",
        data: [
          { name: "Buôn Ma Thuột", value: 34 },
          { name: "Buôn Đôn", value: 28 },
          { name: "Krông Ana", value: 17 },
          { name: "Lắk", value: 22 },
          { name: "Ea H'leo", value: 13 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Đắk Lắk",
        data: [
          { name: "Di tích lịch sử", value: 20 },
          { name: "Ẩm thực đặc sản", value: 25 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 37 },
        ],
      },
    },
  },
  {
    slug: "dong-nai",
    name: "Đồng Nai",
    slogan: "Vùng đất cửa ngõ Đông Nam Bộ",
    description:
      "Đồng Nai sở hữu khu dự trữ sinh quyển, trái cây phong phú và không gian xanh rộng lớn.",
    accentColor: "#15803d",
    heroImage: "/Images/Landingpagedongnai/vuon-quoc-gia-cat-tien.jpg",
    introImage: "/Images/Landingpagedongnai/Dong-Nai-3.jpg",
    stats: [
      { value: "300+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích văn hóa" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "40+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVII",
        title: "Di dân người Việt phương Nam",
        description:
          "Các lưu dân người Việt bắt đầu khai khẩn vùng đất Đồng Nai – Gia Định, xây dựng định cư đầu tiên tại Cù Lao Phố (Biên Hòa).",
        icon: "🚢",
        image: "/Images/Landingpagedongnai/vuegeneraledelarroyochinoissagonpv0007573-read-only-17066713404091835128177.jpg",
      },
      {
        year: "1698",
        title: "Phủ Gia Định thành lập",
        description:
          "Chúa Nguyễn lập Phủ Gia Định gồm vùng Đồng Nai, mở đầu giai đoạn quản lý hành chính chính thức của người Việt tại đất phương Nam.",
        icon: "🏛️",
        image: "/Images/Landingpagedongnai/Lich-su-Dong-Nai.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Trung tâm thương mại Biên Hòa",
        description:
          "Biên Hòa phát triển thành trung tâm thương mại quan trọng với gốm sứ, gỗ và nông sản trao đổi sôi động với Sài Gòn và quốc tế.",
        icon: "⚓",
        image: "/Images/Landingpagedongnai/vanmieutranbienvov-1683876680.jpg",
      },
      {
        year: "Hiện đại",
        title: "Cửa ngõ công nghiệp",
        description:
          "Đồng Nai trở thành trung tâm công nghiệp lớn nhất miền Nam với các khu công nghiệp thu hút đầu tư nước ngoài hàng tỷ đô.",
        icon: "🏭",
        image: "/Images/Landingpagedongnai/Long-Thanh-3.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Gốm sứ Biên Hòa",
        product: "Gốm mỹ nghệ",
        description:
          "Gốm Biên Hòa nổi tiếng từ thế kỷ XIX với men rạn đặc trưng màu xanh lam, được sưu tầm và trưng bày tại nhiều bảo tàng quốc tế.",
        image: "/Images/Landingpagedongnai/thuong-hieu-gom-bien-hoa-vang-danh-the-gioi-mot-thoi-1635135453.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng nghề đá ong Long Khánh",
        product: "Đá ong xây dựng",
        description:
          "Vùng khai thác và chế tác đá ong – loại đá xây dựng tự nhiên đặc trưng Nam Bộ, được dùng xây nhà cổ và công trình văn hóa.",
        image: "/Images/Landingpagedongnai/Cac_thanh_pham_deu_duoc_hoan_thien_mot_cach_chin_chu_nhat_a8e83064b9.jpg",
        age: "200+ năm",
      },
      {
        name: "Nghề đan lát Cẩm Mỹ",
        product: "Lục bình, mây tre",
        description:
          "Làng nghề đan lát lục bình, mây tre tạo ra sản phẩm thủ công mỹ nghệ xuất khẩu sang châu Âu và châu Á.",
        image: "/Images/Landingpagedongnai/dan-lat-7-755.jpg",
        age: "100+ năm",
      },
      {
        name: "Vườn bưởi Tân Triều",
        product: "Bưởi đặc sản",
        description:
          "Vùng trồng bưởi Tân Triều nổi tiếng cả nước với hương thơm đặc biệt và múi bưởi ngọt thanh được thị trường ưa chuộng.",
        image: "/Images/Landingpagedongnai/lang-buoi-tan-trieu-o-dong-nai-ivivu-4.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Cúng đình",
        date: "Kỳ Yên tháng 2 âm lịch",
        description:
          "Lễ hội cúng đình Kỳ Yên truyền thống của người miền Nam tại các đình làng Đồng Nai với hát bội, múa lân và lễ cầu an.",
        significance: "Lễ hội đình làng Nam Bộ",
        image: "/Images/Landingpagedongnai/3433.NGHI%20THỨC%20NGHINH%20ÔNG-01102023.jpg",
      },
      {
        name: "Lễ hội trái cây Long Khánh",
        date: "Tháng 5-6 hàng năm",
        description:
          "Lễ hội tôn vinh các loại trái cây đặc sản Long Khánh gồm sầu riêng, chôm chôm, bưởi... với nhiều hoạt động vui chơi hấp dẫn.",
        significance: "Lễ hội nông nghiệp đặc trưng",
        image: "/Images/Landingpagedongnai/le-hoi-trai-cay-long-khanh-2770.jpg",
      },
      {
        name: "Lễ Nguyên Tiêu Biên Hòa",
        date: "Rằm tháng Giêng",
        description:
          "Lễ hội rằm tháng Giêng tại Biên Hòa – nơi có cộng đồng Hoa lớn – với đèn lồng rực rỡ và các hoạt động văn hóa truyền thống.",
        significance: "Lễ hội cộng đồng Hoa người Việt",
        image: "/Images/Landingpagedongnai/vi-sao-ram-thang-gieng-duoc-goi-la-tet-nguyen-tieu-2155.jpg",
      },
      {
        name: "Hội Chùa Ông Biên Hòa",
        date: "Mùng 14-15 tháng Giêng",
        description:
          "Lễ hội tại Chùa Ông – Thất Phủ Cổ Miếu do người Hoa lập từ thế kỷ XVIII – với các nghi lễ cầu an và biểu diễn văn hóa truyền thống.",
        significance: "Di tích lịch sử cộng đồng Hoa",
        image: "/Images/Landingpagedongnai/Le-Hoi-Chua-Ong-4.jpg",
      },
    ],
    specialties: [
      {
        name: "Gỏi cá Biên Hòa",
        description: "Vị chua cay hài hòa.",
        origin: "Biên Hòa",
        image: "/Images/Landingpagedongnai/goi-ca-bien-hoa-avatar.jpg",
      },
      {
        name: "Bưởi Tân Triều",
        description: "Trái cây đặc sản ngọt thanh.",
        origin: "Vĩnh Cửu",
        image: "/Images/Landingpagedongnai/lang-buoi-tan-trieu-o-dong-nai-ivivu-4.jpg",
      },
      {
        name: "Lẩu lá khổ qua",
        description: "Món ăn thanh mát đặc trưng.",
        origin: "Đồng Nai",
        image: "/Images/Landingpagedongnai/lau-kho-qua-nam-thumbnail.jpg",
      },
    ],
    tourism: [
      {
        name: "Vườn quốc gia Cát Tiên",
        description: "Hệ sinh thái rừng nhiệt đới đa dạng.",
        image: "/Images/Landingpagedongnai/9.5._Du_lich_xanh_o_Vuon_Quoc_gia_Cat_Tien_1.jpg",
      },
      {
        name: "Khu du lịch Bửu Long",
        description: "Hồ nước và núi đá nên thơ.",
        image: "/Images/Landingpagedongnai/khu_du_lich_buu_long.jpg",
      },
      {
        name: "Thác Giang Điền",
        description: "Thác nước mát lành.",
        image: "/Images/Landingpagedongnai/Thác-Giang-Điền.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội trái cây",
        description: "Sắc màu nông sản Đông Nam Bộ.",
        image: "/Images/Landingpagedongnai/212501-khai-mac-le-hoi-trai-cay-long-khanh.jpg",
      },
      {
        name: "Đờn ca tài tử",
        description: "Không gian âm nhạc Nam Bộ.",
        image: "/Images/Landingpagedongnai/le-hoi-dong-nai-4.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagedongnai/vuon-quoc-gia-cat-tien.jpg",
      "/Images/Landingpagedongnai/Thác-Giang-Điền.jpg",
      "/Images/Landingpagedongnai/khu_du_lich_buu_long.jpg",
      "/Images/Landingpagedongnai/Chua-Ong-1.jpg",
      "/Images/Landingpagedongnai/Den-Long.jpg",
      "/Images/Landingpagedongnai/le-hoi-trai-cay-long-khanh-2770.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Đồng Nai",
        data: [
          { name: "Biên Hòa", value: 38 },
          { name: "Long Khánh", value: 21 },
          { name: "Vĩnh Cửu", value: 27 },
          { name: "Xuân Lộc", value: 16 },
          { name: "Trảng Bom", value: 19 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Đồng Nai",
        data: [
          { name: "Di tích lịch sử", value: 33 },
          { name: "Ẩm thực đặc sản", value: 27 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 20 },
        ],
      },
    },
  },
  {
    slug: "tay-ninh",
    name: "Tây Ninh",
    slogan: "Núi Bà hùng vĩ và hương vị đặc sắc",
    description:
      "Tây Ninh là cửa ngõ Đông Nam Bộ, nổi bật với núi Bà Đen và ẩm thực độc đáo.",
    accentColor: "#b45309",
    heroImage: "/Images/Landingpagetayninh/nui-Ba-Den-ivivu-7-1.jpg",
    introImage: "/Images/Landingpagetayninh/canh-dep-2.jpg",
    stats: [
      { value: "300+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích văn hóa" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "986m", label: "Núi Bà Đen" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVII",
        title: "Khai hoang đất phương Nam",
        description:
          "Các lưu dân người Việt đến khai phá vùng đất Tây Ninh, lập làng xã và trồng trọt trên vùng đất màu mỡ bên dãy núi Bà Đen.",
        icon: "🌾",
        image: "/Images/Landingpagetayninh/1605.tay_ninh1.jpg",
      },
      {
        year: "1926",
        title: "Đạo Cao Đài ra đời",
        description:
          "Đạo Cao Đài được khai sáng tại Tây Ninh – tôn giáo dung hợp Phật, Lão, Khổng đặc trưng Nam Bộ với Tòa Thánh Tây Ninh nổi tiếng.",
        icon: "⭐",
        image: "/Images/Landingpagetayninh/cac-gia-tri-cua-dao-cao-dai-trong-doi-song-cu-dan-nam-bo-c4c3afc21f2d4a4f89c8feb4548c8d60.jpg",
      },
      {
        year: "1975",
        title: "Chiến trường biên giới Tây Nam",
        description:
          "Tây Ninh là chiến trường ác liệt trong cuộc chiến tranh bảo vệ biên giới Tây Nam 1975-1979 chống lại chế độ Khmer Đỏ.",
        icon: "🛡️",
        image: "/Images/Landingpagetayninh/chien-khu-duong-minh-chau-noi-phao-dai-kien-cuong-cua-tinh-quan-dan_20241210084433532.jpg",
      },
      {
        year: "Hiện đại",
        title: "Vùng đất tâm linh hành hương",
        description:
          "Tây Ninh nổi lên là điểm đến tâm linh lớn với núi Bà Đen và Tòa Thánh Cao Đài thu hút hàng triệu du khách hành hương mỗi năm.",
        icon: "⛰️",
        image: "/Images/Landingpagetayninh/hanh-huong-nui-ba-den-1.png",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề muối tôm Tây Ninh",
        product: "Muối tôm đặc sản",
        description:
          "Muối tôm Tây Ninh – gia vị nổi tiếng cả nước được làm từ tôm tươi và muối hột với công thức bí truyền gia đình, dùng chấm trái cây.",
        image: "/Images/Landingpagetayninh/muoi-tom-tay-ninh-thumbnail.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng bánh tráng Trảng Bàng",
        product: "Bánh tráng phơi sương",
        description:
          "Bánh tráng Trảng Bàng phơi sương đêm – đặc sản nổi tiếng cả nước, dẻo thơm nhờ quy trình phơi đặc biệt theo truyền thống.",
        image: "/Images/Landingpagetayninh/banh-trang-phoi-suong-5-3083.jpg",
        age: "200+ năm",
      },
      {
        name: "Nghề chạm khắc Cao Đài",
        product: "Đồ thờ Cao Đài",
        description:
          "Nghề làm đồ thờ và trang trí cho các thánh thất Cao Đài với hoa văn đặc trưng của đạo, kết hợp thủ công điêu khắc tinh xảo.",
        image: "/Images/Landingpagetayninh/lang-huong-tram-nam-tuoi-2-4664-8930.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng nghề đan đát Tây Ninh",
        product: "Đồ đan thủ công",
        description:
          "Làng nghề đan lát mây tre tạo ra các sản phẩm gia dụng như thúng, mủng, giỏ phục vụ đời sống và thị trường địa phương.",
        image: "/Images/Landingpagetayninh/9845-1656215031-dan-15.jpg",
        age: "150+ năm",
      },
    ],
    festivals: [
      {
        name: "Hội Xuân Núi Bà Đen",
        date: "Mùng 4-6 tháng Giêng",
        description:
          "Lễ hội hành hương lớn nhất Nam Bộ tại núi Bà Đen – ngọn núi thiêng cao nhất Nam Bộ, thu hút hàng triệu phật tử leo núi cầu nguyện.",
        significance: "Lễ hội hành hương lớn nhất Nam Bộ",
        image: "/Images/Landingpagetayninh/le-hoi-nui-ba-den-ivivu-9-1.jpg",
      },
      {
        name: "Lễ hội Cao Đài",
        date: "Các ngày lễ Cao Đài",
        description:
          "Lễ hội tâm linh của đạo Cao Đài tại Tòa Thánh Tây Ninh với nghi thức đặc sắc, áo lễ rực rỡ và kèn trống hùng tráng.",
        significance: "Lễ hội tôn giáo Cao Đài",
        image: "/Images/Landingpagetayninh/dao-cao-dai-tho-nhung-ai-1200x1988.jpg",
      },
      {
        name: "Lễ hội trái cây Tây Ninh",
        date: "Tháng 5-6",
        description:
          "Lễ hội tôn vinh các loại trái cây đặc sản Tây Ninh: mãng cầu Bà Đen, mì Tây Ninh và các sản phẩm nông nghiệp địa phương.",
        significance: "Lễ hội nông nghiệp địa phương",
        image: "/Images/Landingpagetayninh/le-hoi-tay-ninh-4.jpg",
      },
      {
        name: "Lễ Kỳ Yên đình làng",
        date: "Tháng 2-3 âm lịch",
        description:
          "Lễ Kỳ Yên cầu an mùa màng tại các đình làng Tây Ninh với hát bội, múa lân và lễ cúng thần hoàng làng truyền thống Nam Bộ.",
        significance: "Lễ hội đình làng Nam Bộ",
        image: "/Images/Landingpagetayninh/le-hoi-ky-yen-thumbnail.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh tráng phơi sương",
        description: "Dẻo thơm, ăn kèm thịt luộc.",
        origin: "Trảng Bàng",
        image: "/Images/Landingpagetayninh/banh_trang_cuon_dac_biet-09_8fbf1994c257414eb2137aba14eba375_master.jpg",
      },
      {
        name: "Muối tôm",
        description: "Gia vị đậm đà nổi tiếng.",
        origin: "Tây Ninh",
        image: "/Images/Landingpagetayninh/muoi-tom-tay-ninh-thumbnail.jpg",
      },
      {
        name: "Bò tơ",
        description: "Thịt mềm, ngọt thơm.",
        origin: "Gò Dầu",
        image: "/Images/Landingpagetayninh/bo-to-dat-tay-ninh.jpg",
      },
    ],
    tourism: [
      {
        name: "Núi Bà Đen",
        description: "Ngọn núi linh thiêng cao nhất Nam Bộ.",
        image: "/Images/Landingpagetayninh/du-lich-nui-ba-den.jpg",
      },
      {
        name: "Tòa thánh Cao Đài",
        description: "Kiến trúc độc đáo của đạo Cao Đài.",
        image: "/Images/Landingpagetayninh/Cao_Dai_Holy_See.jpg",
      },
      {
        name: "Hồ Dầu Tiếng",
        description: "Hồ nước rộng lớn và yên bình.",
        image: "/Images/Landingpagetayninh/Dau_Tieng_Lake_-_50767513742.png",
      },
    ],
    culture: [
      {
        name: "Lễ hội núi Bà",
        description: "Lễ hội tâm linh lớn của vùng.",
        image: "/Images/Landingpagetayninh/fd67c1c2-le-hoi-nui-ba-den.jpg",
      },
      {
        name: "Ẩm thực chay",
        description: "Văn hóa ẩm thực gắn với đạo Cao Đài.",
        image: "/Images/Landingpagetayninh/Com-chay.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagetayninh/nui-Ba-Den-ivivu-7-1.jpg",
      "/Images/Landingpagetayninh/Cao_Dai_Holy_See.jpg",
      "/Images/Landingpagetayninh/Dau_Tieng_Lake_-_50767513742.png",
      "/Images/Landingpagetayninh/banh-trang-phoi-suong-5-3083.jpg",
      "/Images/Landingpagetayninh/le-hoi-nui-ba-den-ivivu-9-1.jpg",
      "/Images/Landingpagetayninh/bo-to-dat-tay-ninh.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Tây Ninh",
        data: [
          { name: "TP Tây Ninh", value: 29 },
          { name: "Gò Dầu", value: 21 },
          { name: "Trảng Bàng", value: 24 },
          { name: "Châu Thành", value: 17 },
          { name: "Dương Minh Châu", value: 33 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Tây Ninh",
        data: [
          { name: "Di tích lịch sử", value: 35 },
          { name: "Ẩm thực đặc sản", value: 25 },
          { name: "Lễ hội truyền thống", value: 28 },
          { name: "Làng nghề / Sinh thái", value: 12 },
        ],
      },
    },
  },
  {
    slug: "vinh-long",
    name: "Vĩnh Long",
    slogan: "Miệt vườn trù phú bên sông Tiền",
    description:
      "Vĩnh Long nằm giữa sông Tiền và sông Hậu, nổi bật với vườn trái cây và chợ nổi.",
    accentColor: "#16a34a",
    heroImage: "/Images/Landingpagevinhlong/Vinh-Long-1.jpg",
    introImage: "/Images/Landingpagevinhlong/cu-lao-an-binh-mua-trai-chin-voi-nhung-kinh-nghiem-checkin-sieu-xinh-1663000611.jpg",
    stats: [
      { value: "300+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích danh thắng" },
      { value: "30+", label: "Lễ hội truyền thống" },
      { value: "50+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVII",
        title: "Khai hoang đất miệt vườn",
        description:
          "Lưu dân người Việt đến khai phá vùng đất ngập lũ giữa sông Tiền và sông Hậu, lập vườn cây và xây dựng cộng đồng trên cù lao.",
        icon: "🌿",
        image: "/Images/Landingpagevinhlong/trai-cay-miet-vuon.jpg",
      },
      {
        year: "1832",
        title: "Tỉnh Vĩnh Long thành lập",
        description:
          "Vua Minh Mạng lập tỉnh Vĩnh Long thuộc lục tỉnh Nam Kỳ – một trong 6 tỉnh đầu tiên của miền Nam dưới triều Nguyễn.",
        icon: "🏛️",
        image: "/Images/Landingpagevinhlong/68b7bc26f2bd1b765cb9ff67_1200px-cua_huu_thanh_long_ho.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Trung tâm văn hóa Nam Bộ",
        description:
          "Vĩnh Long nổi lên là trung tâm giáo dục và văn hóa Nam Kỳ với nhiều sĩ phu nổi tiếng như Phan Thanh Giản, Nguyễn Thông.",
        icon: "📚",
        image: "/Images/Landingpagevinhlong/bvl_18.4_p.thuy-_bai_bao_tang_2_20250419103712.jpg",
      },
      {
        year: "Hiện đại",
        title: "Vương quốc trái cây miền Tây",
        description:
          "Vĩnh Long phát triển mạnh du lịch miệt vườn với các vườn trái cây xanh mướt trên cù lao, đờn ca tài tử và gốm đỏ Mang Thít.",
        icon: "🍊",
        image: "/Images/Landingpagevinhlong/bo-tui-cam-nang-kham-pha-miet-vuon-vinh-long-tu-a-den-z-1662485598.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng gốm đỏ Mang Thít",
        product: "Gạch gốm đỏ",
        description:
          "Vùng lò gạch gốm đỏ Mang Thít – di sản kiến trúc độc đáo với hàng trăm lò nung gạch cổ sắp xếp dọc sông, đang hồi sinh thành điểm du lịch.",
        image: "/Images/Landingpagevinhlong/mangthit-425.png",
        age: "200+ năm",
      },
      {
        name: "Vườn trái cây Cù lao An Bình",
        product: "Trái cây miệt vườn",
        description:
          "Cù lao An Bình nổi tiếng với các vườn trái cây xanh tươi trên đảo giữa sông Cổ Chiên, cho khách trải nghiệm hái trái và sống cùng nông dân.",
        image: "/Images/Landingpagevinhlong/culaoanbinh1.jpg",
        age: "200+ năm",
      },
      {
        name: "Đan đát lục bình",
        product: "Đồ thủ công lục bình",
        description:
          "Nghề đan đát lục bình phổ biến ở Vĩnh Long, tạo ra sản phẩm thủ công mỹ nghệ xuất khẩu từ cây lục bình hoang dã sông nước.",
        image: "/Images/Landingpagevinhlong/87-du-khach-duoc-trai-nghiem-va-thuong-thuc-san-pham-cua-lang-nghe-lam-com-no-vinh-long.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng nghề nem Vĩnh Long",
        product: "Nem chua, chả lụa",
        description:
          "Làng nghề làm nem chua và chả lụa truyền thống của người dân Vĩnh Long với hương vị đặc trưng miền Tây được bày bán rộng rãi.",
        image: "/Images/Landingpagevinhlong/nem-chua20240223093624.png",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Đua ghe ngo",
        date: "Rằm tháng 10 âm lịch",
        description:
          "Lễ hội đua ghe ngo truyền thống của người Khmer Vĩnh Long – ghe ngo dài hơn 20m với hàng chục tay chèo đua trên sông Cổ Chiên.",
        significance: "Lễ hội đua ghe người Khmer",
        image: "/Images/Landingpagevinhlong/ghe-ngo-2-2174.jpg",
      },
      {
        name: "Lễ hội Nghinh Ông",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội cầu ngư của ngư dân vùng sông nước Vĩnh Long với lễ rước linh và các hoạt động cầu bình an cho năm mới.",
        significance: "Lễ hội tín ngưỡng sông nước",
        image: "/Images/Landingpagevinhlong/le-hoi-nghinh-ong-2.jpg",
      },
      {
        name: "Lễ hội trái cây miệt vườn",
        date: "Mùa trái cây tháng 5-7",
        description:
          "Lễ hội tôn vinh sản vật miệt vườn với trưng bày, thi hái trái và thưởng thức các loại trái cây đặc sản Vĩnh Long.",
        significance: "Lễ hội nông nghiệp miệt vườn",
        image: "/Images/Landingpagevinhlong/hang-nghin-nguoi-do-ve-tham-quan-le-hoi-trai-cay-o-mien-tay-547.jpg",
      },
      {
        name: "Lễ Kỳ Yên",
        date: "Tháng 2 âm lịch",
        description:
          "Lễ cúng đình Kỳ Yên cầu an năm mới tại các đình làng Vĩnh Long với hát bội, múa lân và lễ cúng thần hoàng truyền thống.",
        significance: "Lễ hội đình làng Nam Bộ",
        image: "/Images/Landingpagevinhlong/le-hoi-ky-yen-2.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh xèo",
        description: "Vỏ giòn, nhân tôm thịt đầy đặn.",
        origin: "Vĩnh Long",
        image: "/Images/Landingpagevinhlong/banh-xeo-hen-cu-lao-dai-gion-rum-mon-banh-dac-san-vinh-long-doc-dao.jpg",
      },
      {
        name: "Cam sành",
        description: "Vị ngọt thanh mát.",
        origin: "Trà Ôn",
        image: "/Images/Landingpagevinhlong/CAM---SANH-3.jpg",
      },
      {
        name: "Cá tai tượng",
        description: "Cá chiên giòn đặc trưng miền Tây.",
        origin: "Cù lao An Bình",
        image: "/Images/Landingpagevinhlong/Cá-tai-tượng-chiên-xù-ivivu.jpg",
      },
    ],
    tourism: [
      {
        name: "Cù lao An Bình",
        description: "Du lịch miệt vườn yên bình.",
        image: "/Images/Landingpagevinhlong/package-tour-du-lich-cu-lao-an-binh-vinh-long--5eod_1481.jpg",
      },
      {
        name: "Chợ nổi Trà Ôn",
        description: "Nét văn hóa giao thương sông nước.",
        image: "/Images/Landingpagevinhlong/khudulich-chonoitraon.jpg",
      },
      {
        name: "Lò gạch Mang Thít",
        description: "Di sản kiến trúc độc đáo.",
        image: "/Images/Landingpagevinhlong/Vinhlong_Mangthit7.jpg",
      },
    ],
    culture: [
      {
        name: "Đờn ca tài tử",
        description: "Âm nhạc truyền thống miền Tây.",
        image: "/Images/Landingpagevinhlong/don_ca_tai_tu_EZAC.jpg",
      },
      {
        name: "Làng nghề gốm",
        description: "Nghề truyền thống lâu đời.",
        image: "/Images/Landingpagevinhlong/gom-99338519876824955402514-29664672874026656370978.png",
      },
    ],
    gallery: [
      "/Images/Landingpagevinhlong/Vinh-Long-1.jpg",
      "/Images/Landingpagevinhlong/culaoanbinh1.jpg",
      "/Images/Landingpagevinhlong/mangthit-425.png",
      "/Images/Landingpagevinhlong/khudulich-chonoitraon.jpg",
      "/Images/Landingpagevinhlong/ghe-ngo-2-2174.jpg",
      "/Images/Landingpagevinhlong/trai-cay-miet-vuon.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo huyện",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng huyện của Vĩnh Long",
        data: [
          { name: "TP Vĩnh Long", value: 31 },
          { name: "Long Hồ", value: 23 },
          { name: "Mang Thít", value: 19 },
          { name: "Tam Bình", value: 16 },
          { name: "Bình Tân", value: 14 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Vĩnh Long",
        data: [
          { name: "Di tích lịch sử", value: 28 },
          { name: "Ẩm thực đặc sản", value: 30 },
          { name: "Lễ hội truyền thống", value: 17 },
          { name: "Làng nghề / Sinh thái", value: 25 },
        ],
      },
    },
  },
  {
    slug: "dong-thap",
    name: "Đồng Tháp",
    slogan: "Sen hồng và miền đất hiền hòa",
    description:
      "Đồng Tháp nổi tiếng với đồng sen, vườn quốc gia Tràm Chim và ẩm thực dân dã.",
    accentColor: "#b91c1c",
    heroImage: "/Images/Landingpagedongthap/canh-dong-sen-phu-thien-va-ve-dep-ngay-ngat-long-nguoi-3-1660051967.jpg",
    introImage: "/Images/Landingpagedongthap/canh-dong-sen-phu-thien-va-ve-dep-ngay-ngat-long-nguoi-3-1660051967.jpg",
    stats: [
      { value: "300+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích danh thắng" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "40+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVII",
        title: "Khai hoang đất Đồng Tháp Mười",
        description:
          "Lưu dân người Việt bắt đầu khai hoang vùng Đồng Tháp Mười – vùng trũng lớn nhất Nam Bộ với lau sậy và nước lũ mênh mông.",
        icon: "🌾",
        image: "/Images/Landingpagedongthap/Đồng_Tháp_Mười_nhìn_trên_cao.jpg",
      },
      {
        year: "1832",
        title: "Tỉnh An Giang và Sa Đéc",
        description:
          "Khu vực Đồng Tháp ngày nay từng thuộc tỉnh An Giang và Sa Đéc dưới triều Nguyễn, là vùng sản xuất lúa gạo quan trọng Nam Kỳ.",
        icon: "🏛️",
        image: "/Images/Landingpagedongthap/Sa-Dec-7.jpg",
      },
      {
        year: "Thế kỷ XIX-XX",
        title: "Kháng chiến Đồng Tháp Mười",
        description:
          "Đồng Tháp Mười là vùng căn cứ kháng chiến quan trọng trong cả hai cuộc kháng chiến chống Pháp và chống Mỹ.",
        icon: "⭐",
        image: "/Images/Landingpagedongthap/c705e633-khu-di-tich-go-thap-dong-thap-4961574-1250x715.jpg",
      },
      {
        year: "Hiện đại",
        title: "Xứ sen hồng Sa Đéc",
        description:
          "Đồng Tháp nổi tiếng với làng hoa Sa Đéc, đồng sen bạt ngàn và hủ tiếu Sa Đéc thương hiệu – điểm đến du lịch sinh thái hấp dẫn.",
        icon: "🌸",
        image: "/Images/Landingpagedongthap/63910-lang-hoa-kieng-sa-dec.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng hoa Sa Đéc",
        product: "Hoa tươi đặc sắc",
        description:
          "Làng hoa Sa Đéc cung cấp hoa tươi cho cả nước dịp Tết và quanh năm, nổi tiếng với các loại hoa cúc, hoa hồng và cây kiểng.",
        image: "/Images/Landingpagedongthap/Vuon-hoa-sadec-06.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng nghề nem Lai Vung",
        product: "Nem chua đặc sản",
        description:
          "Nem Lai Vung – đặc sản nổi tiếng cả nước với vị chua ngọt, thơm lừng từ thịt heo và bì heo lên men theo công thức truyền thống.",
        image: "/Images/Landingpagedongthap/nem-Lai-Vung-ivivu-3.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng chiếu Định Yên",
        product: "Chiếu cói",
        description:
          "Làng nghề dệt chiếu cói Định Yên nổi tiếng vùng đồng bằng với chợ chiếu họp vào ban đêm dưới ánh đèn – nét văn hóa độc đáo hiếm có.",
        image: "/Images/Landingpagedongthap/làng-chiếu-Định-Yên-1.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng dệt thổ cẩm Khmer Lấp Vò",
        product: "Thổ cẩm Khmer",
        description:
          "Nghề dệt thổ cẩm của người Khmer Lấp Vò với màu sắc rực rỡ, hoa văn độc đáo phản ánh văn hóa dân tộc Khmer Nam Bộ.",
        image: "/Images/Landingpagedongthap/vna-potal-danh-thuc-tiem-nang-lang-nghe-det-tho-cam-cua-dong-bao-khmer-an-giang-85708254-10-11-40.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Sen hồng Đồng Tháp",
        date: "Tháng 5-6 hàng năm",
        description:
          "Lễ hội tôn vinh hoa sen – loài hoa biểu trưng của Đồng Tháp với các hoạt động tham quan đồng sen, thưởng thức ẩm thực sen.",
        significance: "Lễ hội hoa sen đặc trưng",
        image: "/Images/Landingpagedongthap/Le-Hoi-Sen-Dong-Thap.jpg",
      },
      {
        name: "Lễ hội Xây Chầu – Đại Bội",
        date: "Rằm tháng 11 âm lịch",
        description:
          "Lễ hội dân gian đặc sắc tại các đình làng Đồng Tháp với nghi thức hát bội, cúng đình và các trò chơi dân gian.",
        significance: "Lễ hội đình làng Nam Bộ",
        image: "/Images/Landingpagedongthap/le-hoi-dong-thap-2.jpg",
      },
      {
        name: "Lễ Vu Lan người Khmer (Sen Dolta)",
        date: "Tháng 8-9 âm lịch",
        description:
          "Lễ hội cúng tổ tiên của người Khmer diễn ra tại các chùa, kéo dài vài ngày với lễ dâng cơm, thả đèn nước và múa Apsara.",
        significance: "Lễ hội Phật giáo người Khmer",
        image: "/Images/Landingpagedongthap/lễ-hội-Sen-Dolta-ivivu.jpg",
      },
      {
        name: "Lễ hội Ok Om Bok",
        date: "Rằm tháng 10 âm lịch",
        description:
          "Lễ hội cúng trăng của người Khmer với lễ đút cốm dẹp và đua ghe ngo trên sông – sự kiện văn hóa đặc sắc Đồng Tháp.",
        significance: "Lễ hội đua ghe ngo Khmer",
        image: "/Images/Landingpagedongthap/dac-sac-le-hoi-ok-om-bok-cua-dong-bao-khmer-tai-can-tho-1-1649199760.jpg",
      },
    ],
    specialties: [
      {
        name: "Cá lóc nướng trui",
        description: "Món ăn dân dã, thơm lừng.",
        origin: "Sa Đéc",
        image: "/Images/Landingpagedongthap/cam-long-sao-dang-voi-top-quan-ca-loc-nuong-trui-can-tho-01-1649324152.jpg",
      },
      {
        name: "Hủ tiếu Sa Đéc",
        description: "Sợi hủ tiếu dai, nước dùng ngọt.",
        origin: "Sa Đéc",
        image: "/Images/Landingpagedongthap/kham-pha-suc-hut-cua-hu-tieu-mi-sa-dec-kieu-loan-can-tho-01-1649241179.jpg",
      },
      {
        name: "Nem Lai Vung",
        description: "Nem chua ngọt thơm.",
        origin: "Lai Vung",
        image: "/Images/Landingpagedongthap/Nem-Lai-Vung-Mon-Ngo.jpg",
      },
    ],
    tourism: [
      {
        name: "Vườn quốc gia Tràm Chim",
        description: "Khu sinh thái ngập nước nổi tiếng.",
        image: "/Images/Landingpagedongthap/vuon-quoc-gia-tram-chim-2.jpg",
      },
      {
        name: "Làng hoa Sa Đéc",
        description: "Thiên đường hoa rực rỡ.",
        image: "/Images/Landingpagedongthap/tour-lang-hoa-sa-dec-min.jpg",
      },
      {
        name: "Đồng sen",
        description: "Khung cảnh sen nở thơ mộng.",
        image: "/Images/Landingpagedongthap/hoa-sen-4135.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội sen",
        description: "Tôn vinh biểu tượng Đồng Tháp.",
        image: "/Images/Landingpagedongthap/le-hoi-sen-1-8198.jpg",
      },
      {
        name: "Làng nghề bánh phồng",
        description: "Nghề truyền thống lâu đời.",
        image: "/Images/Landingpagedongthap/langnghebanhphongphumy-1.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagedongthap/canh-dong-sen-phu-thien-va-ve-dep-ngay-ngat-long-nguoi-3-1660051967.jpg",
      "/Images/Landingpagedongthap/Vuon-hoa-sadec-06.jpg",
      "/Images/Landingpagedongthap/vuon-quoc-gia-tram-chim-2.jpg",
      "/Images/Landingpagedongthap/Le-Hoi-Sen-Dong-Thap.jpg",
      "/Images/Landingpagedongthap/làng-chiếu-Định-Yên-1.jpg",
      "/Images/Landingpagedongthap/nem-Lai-Vung-ivivu-3.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo huyện",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng huyện của Đồng Tháp",
        data: [
          { name: "Cao Lãnh", value: 33 },
          { name: "Sa Đéc", value: 27 },
          { name: "Hồng Ngự", value: 19 },
          { name: "Tháp Mười", value: 22 },
          { name: "Tam Nông", value: 16 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Đồng Tháp",
        data: [
          { name: "Di tích lịch sử", value: 27 },
          { name: "Ẩm thực đặc sản", value: 30 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 25 },
        ],
      },
    },
  },
  {
    slug: "ca-mau",
    name: "Cà Mau",
    slogan: "Cực Nam Tổ quốc giữa rừng và biển",
    description:
      "Cà Mau là vùng đất cuối trời Nam với rừng ngập mặn, biển cả và hải sản phong phú.",
    accentColor: "#065f46",
    heroImage: "/Images/Landingpagecamau/muicamau249104700am.jpg",
    introImage: "/Images/Landingpagecamau/30-1620656446-nuoi-tom-trong-rung-ngap-man-anh-dang-quang-minh.jpg",
    stats: [
      { value: "300+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích danh thắng" },
      { value: "30+", label: "Lễ hội truyền thống" },
      { value: "3 triệu ha", label: "Rừng ngập mặn" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVIII",
        title: "Khai hoang đất Cà Mau",
        description:
          "Các lưu dân người Việt đến khai phá vùng đất cuối trời Nam – vùng rừng ngập mặn hoang vu bên biển Đông và vịnh Thái Lan.",
        icon: "🌿",
        image: "/Images/Landingpagecamau/anh-03-1651803544891341353972.jpg",
      },
      {
        year: "1832",
        title: "Tỉnh An Giang mở rộng",
        description:
          "Vùng đất Cà Mau thuộc hạt Hà Tiên sau đó sáp nhập dần vào lãnh thổ Nam Kỳ qua các đợt khai hoang và cải cách hành chính.",
        icon: "🗺️",
        image: "/Images/Landingpagecamau/nam-ky-luc-tinh-xua-2039.jpg",
      },
      {
        year: "1975",
        title: "Điểm cuối hành trình thống nhất",
        description:
          "Mũi Cà Mau trở thành biểu tượng hòa bình khi cả nước thống nhất – điểm Cực Nam của Tổ quốc như một câu chuyện huyền thoại về đất nước.",
        icon: "🇻🇳",
        image: "/Images/Landingpagecamau/Tuongdaimuicamau.jpg",
      },
      {
        year: "Hiện đại",
        title: "Kinh tế biển và rừng ngập mặn",
        description:
          "Cà Mau phát triển kinh tế biển với tôm cua hải sản phong phú và rừng U Minh – khu dự trữ sinh quyển thế giới tại vùng đất cuối trời Nam.",
        icon: "🦀",
        image: "/Images/Landingpagecamau/thu-hoach-tom4_1562030978.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Nghề nuôi tôm Năm Căn",
        product: "Tôm sú nuôi trồng",
        description:
          "Năm Căn nổi tiếng với nghề nuôi tôm sú trong rừng ngập mặn – mô hình sinh thái bền vững tạo ra tôm sạch chất lượng xuất khẩu.",
        image: "/Images/Landingpagecamau/tom-su-1.png",
        age: "50+ năm",
      },
      {
        name: "Nghề làm mắm Cà Mau",
        product: "Mắm cá biển",
        description:
          "Nghề làm mắm cá biển truyền thống của người Cà Mau với nhiều loại mắm: mắm cá sặc, mắm ba khía, mắm lóc... mỗi loại có hương vị riêng.",
        image: "/Images/Landingpagecamau/nghe-lam-mam-o-ca-mau-va-mon-ngon-dac-san-van-nguoi-me-01-1664278878.jpeg",
        age: "200+ năm",
      },
      {
        name: "Đan đát cần xé",
        product: "Đồ đan lát",
        description:
          "Nghề đan cần xé và thúng mủng từ tre nứa của người dân Cà Mau phục vụ nhu cầu đánh bắt và nuôi trồng thủy sản.",
        image: "/Images/Landingpagecamau/Nghe-dan-can-xe-bang-tre.jpg",
        age: "Truyền thống",
      },
      {
        name: "Nghề khai thác ba khía",
        product: "Ba khía muối",
        description:
          "Nghề khai thác và muối ba khía – loài cua nhỏ đặc trưng rừng ngập mặn Cà Mau, trở thành đặc sản nổi tiếng được người dân yêu thích.",
        image: "/Images/Landingpagecamau/ba-khia-tron-toi-ot-thumbnail.jpg",
        age: "Truyền thống",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Nghinh Ông Cà Mau",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội cầu ngư truyền thống của ngư dân Cà Mau với lễ rước kiệu Ông Nam Hải xuống biển, cầu bình an và mùa cá bội thu.",
        significance: "Lễ hội ngư dân truyền thống",
        image: "/Images/Landingpagecamau/vna-potal-ca-mau-tung-bung-le-hoi-nghinh-ong-song-doc-66149037-13-16-16.jpg",
      },
      {
        name: "Lễ hội Vàm Lũng",
        date: "Tháng 4 (30/4)",
        description:
          "Lễ kỷ niệm tại Vàm Lũng – bến cảng lịch sử tiếp nhận vũ khí theo đường Hồ Chí Minh trên biển, tưởng nhớ anh hùng liệt sỹ.",
        significance: "Lễ kỷ niệm lịch sử",
        image: "/Images/Landingpagecamau/images%20(1).jpg",
      },
      {
        name: "Lễ hội Ok Om Bok",
        date: "Rằm tháng 10 âm lịch",
        description:
          "Lễ hội cúng trăng của người Khmer Cà Mau với lễ đút cốm dẹp và đua ghe ngo trên sông – nét văn hóa đa dân tộc đặc trưng.",
        significance: "Lễ hội dân tộc Khmer",
        image: "/Images/Landingpagecamau/le-hoi-ok-om-bok-5.jpg",
      },
      {
        name: "Lễ Kỳ Yên Đình Cà Mau",
        date: "Tháng 2 âm lịch",
        description:
          "Lễ cúng đình Kỳ Yên cầu an năm mới tại các đình làng Cà Mau với hát bội và các nghi lễ dân gian truyền thống miền Nam.",
        significance: "Lễ hội đình làng Nam Bộ",
        image: "/Images/Landingpagecamau/le-ky-yen-dinh-than-tan-loc-kham-pha-net-dep-van-hoa-cua-nguoi-dan-ca-mau-1663084894.jpg",
      },
    ],
    specialties: [
      {
        name: "Cua Cà Mau",
        description: "Cua chắc thịt, thơm ngọt.",
        origin: "Năm Căn",
        image: "/Images/Landingpagecamau/Cua-cà-mau-Poseidon-3.jpg",
      },
      {
        name: "Lẩu mắm",
        description: "Đậm đà hương vị miền Tây.",
        origin: "Cà Mau",
        image: "/Images/Landingpagecamau/Hinh-bia-4.jpg",
      },
      {
        name: "Ba khía",
        description: "Món ăn dân dã đặc trưng.",
        origin: "Rạch Gốc",
        image: "/Images/Landingpagecamau/ba-khia-tron-toi-ot-thumbnail.jpg",
      },
    ],
    tourism: [
      {
        name: "Mũi Cà Mau",
        description: "Điểm cực Nam Tổ quốc.",
        image: "/Images/Landingpagecamau/muicamau249104700am.jpg",
      },
      {
        name: "Rừng U Minh",
        description: "Rừng ngập mặn đặc trưng.",
        image: "/Images/Landingpagecamau/images.jpg",
      },
      {
        name: "Đầm Thị Tường",
        description: "Đầm nước rộng lớn miền Tây.",
        image: "/Images/Landingpagecamau/damthituong.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Nghinh Ông",
        description: "Nghi lễ cầu mùa của ngư dân.",
        image: "/Images/Landingpagecamau/lehoinghinhongsongdoc.jpg",
      },
      {
        name: "Đờn ca tài tử",
        description: "Âm nhạc truyền thống miền Tây.",
        image: "/Images/Landingpagecamau/don-ca-tai-tu-2.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagecamau/anh-03-1651803544891341353972.jpg",
      "/Images/Landingpagecamau/Cua-cà-mau-Poseidon-3.jpg",
      "/Images/Landingpagecamau/image-20250729074547-1.jpeg",
      "/Images/Landingpagecamau/damthituongcamau.jpg",
      "/Images/Landingpagecamau/le-hoi-ok-om-bok-5.jpg",
      "/Images/Landingpagecamau/don_ca_tai_tu_EZAC.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm sinh thái theo huyện",
        subtitle:
          "Số lượng điểm sinh thái – du lịch nổi tiếng theo từng huyện của Cà Mau",
        data: [
          { name: "TP Cà Mau", value: 26 },
          { name: "Năm Căn", value: 31 },
          { name: "Ngọc Hiển", value: 38 },
          { name: "Trần Văn Thời", value: 18 },
          { name: "U Minh", value: 29 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Cà Mau",
        data: [
          { name: "Di tích lịch sử", value: 20 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 40 },
        ],
      },
    },
  },
  {
    slug: "an-giang",
    name: "An Giang",
    slogan: "Sắc màu biên giới và mùa nước nổi",
    description:
      "An Giang gắn liền với núi Cấm, mùa nước nổi và văn hóa đa dạng.",
    accentColor: "#15803d",
    heroImage: "/Images/Landingpageangiang/du-lich-an-giang-ivivu-1.png",
    introImage: "/Images/Landingpageangiang/rung-tram-Tra-Su.jpg",
    stats: [
      { value: "300+", label: "Năm lịch sử" },
      { value: "100+", label: "Di tích văn hóa" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "Số 1", label: "Lúa gạo miền Nam" },
    ],
    timeline: [
      {
        year: "Thế kỷ XVII",
        title: "Đất Hà Tiên thuở ban đầu",
        description:
          "Vùng An Giang ngày nay là phần đất phía bắc của trấn Hà Tiên xưa, được khai hoang bởi dòng người Việt di dân từ miền Trung.",
        icon: "🌾",
        image: "/Images/Landingpageangiang/Ky-3-Cac-Chua-Nguyen-khai-khan-vung-Nam-Bo-291-1568298059-width500height280.jpg",
      },
      {
        year: "1832",
        title: "Tỉnh An Giang thành lập",
        description:
          "Vua Minh Mạng lập tỉnh An Giang – một trong 6 tỉnh Nam Kỳ đầu tiên, trở thành trung tâm hành chính và kinh tế vùng biên giới.",
        icon: "🏛️",
        image: "/Images/Landingpageangiang/nam-ky-luc-tinh-xua-2039.jpg",
      },
      {
        year: "1849",
        title: "Đạo Bửu Sơn Kỳ Hương",
        description:
          "Đức Phật Thầy Tây An khai lập đạo Bửu Sơn Kỳ Hương tại núi Sam – tôn giáo đặc trưng Nam Bộ có ảnh hưởng sâu rộng đến người dân An Giang.",
        icon: "⭐",
        image: "/Images/Landingpageangiang/800px-ChC3B9a_ThE1BB9Bi_SC6A1n_E1BB9F_TE1BB8Bnh_BiC3AAn.jpg",
      },
      {
        year: "Hiện đại",
        title: "Vựa lúa và điểm hành hương",
        description:
          "An Giang là tỉnh đầu nguồn sông Cửu Long với sản lượng lúa lớn nhất miền Nam và là điểm hành hương nổi tiếng tại núi Sam, núi Cấm.",
        icon: "🏔️",
        image: "/Images/Landingpageangiang/hanh-huong-nui-cam-tim-ve-noi-linh-thieng-va-ky-bi-o-vung-nam-bo-07-1660155614.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng lụa Tân Châu",
        product: "Lụa mặc nưa",
        description:
          "Lụa Tân Châu (lụa mặc nưa) – đặc sản vải lụa nhuộm đen từ trái mặc nưa độc đáo nhất Việt Nam, mềm mịn và bền màu theo thời gian.",
        image: "/Images/Landingpageangiang/lang-lua-tan-chau-an-giang-25-.1097.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng nghề mộc Long Điền",
        product: "Đồ gỗ mỹ nghệ",
        description:
          "Làng nghề chế tác gỗ Long Điền Chợ sản xuất tủ thờ, bàn ghế và đồ mỹ nghệ gỗ quý với kỹ thuật điêu khắc tinh xảo.",
        image: "/Images/Landingpageangiang/24725500-lang-nghe-1.png",
        age: "200+ năm",
      },
      {
        name: "Làng mắm Châu Đốc",
        product: "Mắm cá đồng",
        description:
          "Châu Đốc nổi tiếng là thủ đô mắm miền Tây với hàng chục loại mắm cá khác nhau, được sản xuất thủ công bằng cá đồng nước ngọt.",
        image: "/Images/Landingpageangiang/dac_san_mam_chau_doc_an_giang_laodong_min.jpg",
        age: "200+ năm",
      },
      {
        name: "Bonsai kiểng cổ Long Xuyên",
        product: "Cây kiểng nghệ thuật",
        description:
          "Nghề chơi và chế tác cây kiểng bonsai tại Long Xuyên với những tác phẩm nghệ thuật độc đáo từ cây tự nhiên địa phương.",
        image: "/Images/Landingpageangiang/Tuoi-bonsai.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Vía Bà Chúa Xứ núi Sam",
        date: "24-27 tháng 4 âm lịch",
        description:
          "Một trong những lễ hội lớn nhất Nam Bộ tại Miếu Bà Chúa Xứ với lễ rước bà, tắm bà và đám rước hoành tráng thu hút hàng triệu du khách.",
        significance: "Lễ hội lớn nhất Nam Bộ",
        image: "/Images/Landingpageangiang/491b1585-le-hoi-ba-chua-xu-6.jpg",
      },
      {
        name: "Lễ hội Đua bò Bảy Núi",
        date: "Rằm tháng 10 âm lịch",
        description:
          "Lễ hội đua bò độc đáo nhất Việt Nam của người Khmer Bảy Núi với các cặp bò đua trên ruộng lúa trong không khí sôi động.",
        significance: "Lễ hội đua bò độc đáo nhất VN",
        image: "/Images/Landingpageangiang/Hoi-Dua-Bo-Bay-Nui-2.jpg",
      },
      {
        name: "Lễ Ok Om Bok",
        date: "Rằm tháng 10 âm lịch",
        description:
          "Lễ cúng trăng của người Khmer An Giang với lễ đút cốm dẹp cầu mưa thuận gió hòa và thả đèn gió rực sáng trên bầu trời đêm.",
        significance: "Lễ hội tín ngưỡng người Khmer",
        image: "/Images/Landingpageangiang/le-hoi-ok-om-bok-5.jpg",
      },
      {
        name: "Lễ hội Mùa nước nổi",
        date: "Tháng 8-10 dương lịch",
        description:
          "Lễ hội tôn vinh mùa lũ đặc trưng đồng bằng sông Cửu Long tại An Giang với các hoạt động câu cá, bắt cá và thưởng thức hải sản mùa lũ.",
        significance: "Lễ hội đặc trưng mùa nước nổi",
        image: "/Images/Landingpageangiang/An-Giang-6.jpg",
      },
    ],
    specialties: [
      {
        name: "Bún cá Châu Đốc",
        description: "Nước dùng thơm nghệ, cá lóc tươi.",
        origin: "Châu Đốc",
        image: "/Images/Landingpageangiang/bun-ca-chau-doc-an-giang.jpg",
      },
      {
        name: "Mắm Châu Đốc",
        description: "Đặc sản đậm đà miền biên giới.",
        origin: "Châu Đốc",
        image: "/Images/Landingpageangiang/mam-chau-doc-topbanner.jpg",
      },
      {
        name: "Gà đốt Ô Thum",
        description: "Gà nướng thơm vị sả.",
        origin: "Tri Tôn",
        image: "/Images/Landingpageangiang/ga-dot-o-thum-an-giang-du-lich-viet.jpg",
      },
    ],
    tourism: [
      {
        name: "Núi Cấm",
        description: "Điểm hành hương nổi tiếng.",
        image: "/Images/Landingpageangiang/hanh-huong-nui-cam-tim-ve-noi-linh-thieng-va-ky-bi-o-vung-nam-bo-03-1660155614.jpeg",
      },
      {
        name: "Rừng tràm Trà Sư",
        description: "Cảnh sắc xanh mát mùa nước nổi.",
        image: "/Images/Landingpageangiang/rung-tram-Tra-Su.jpg",
      },
      {
        name: "Chợ Châu Đốc",
        description: "Giao thương sôi động vùng biên.",
        image: "/Images/Landingpageangiang/c51888ae7f2bb7f71de286eca7161c9200003917.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Bà Chúa Xứ",
        description: "Lễ hội tâm linh lớn nhất miền Tây.",
        image: "/Images/Landingpageangiang/491b1585-le-hoi-ba-chua-xu-6.jpg",
      },
      {
        name: "Văn hóa Khmer",
        description: "Sắc màu văn hóa đa dạng vùng biên.",
        image: "/Images/Landingpageangiang/441_thang_11_ve_tra_vinh_tham_gia_le_hoi_ok_om_bok_nam.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpageangiang/Angiang.jpg",
      "/Images/Landingpageangiang/rung-tram-Tra-Su.jpg",
      "/Images/Landingpageangiang/Hoi-Dua-Bo-Bay-Nui-2.jpg",
      "/Images/Landingpageangiang/bun-ca-chau-doc-an-giang.jpg",
      "/Images/Landingpageangiang/An-Giang-3.jpg",
      "/Images/Landingpageangiang/hanh-huong-nui-cam-tim-ve-noi-linh-thieng-va-ky-bi-o-vung-nam-bo-07-1660155614.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo huyện",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng huyện của An Giang",
        data: [
          { name: "Long Xuyên", value: 33 },
          { name: "Châu Đốc", value: 42 },
          { name: "Thoại Sơn", value: 21 },
          { name: "Tri Tôn", value: 27 },
          { name: "Tịnh Biên", value: 35 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của An Giang",
        data: [
          { name: "Di tích lịch sử", value: 32 },
          { name: "Ẩm thực đặc sản", value: 27 },
          { name: "Lễ hội truyền thống", value: 25 },
          { name: "Làng nghề / Sinh thái", value: 16 },
        ],
      },
    },
  },
  {
    slug: "quang-ninh",
    name: "Quảng Ninh",
    slogan: "Vịnh Hạ Long kỳ quan thế giới",
    description:
      "Quảng Ninh là điểm đến nổi tiếng với vịnh Hạ Long, đảo Cô Tô và ẩm thực biển phong phú.",
    accentColor: "#0ea5e9",
    heroImage: "/Images/Landingpagequangninh/Halong_Bay.jpg",
    introImage: "/Images/Landingpagequangninh/1280px-Halon_bay.jpg",
    stats: [
      { value: "1969", label: "Năm Hạ Long được khám phá" },
      { value: "1969 hòn đảo", label: "Trong vịnh Hạ Long" },
      { value: "2x", label: "Kỳ quan thiên nhiên UNESCO" },
      { value: "100+", label: "Lễ hội truyền thống" },
    ],
    timeline: [
      {
        year: "Thời tiền sử",
        title: "Văn hóa Hạ Long cổ đại",
        description:
          "Vịnh Hạ Long đã có người ở từ thời tiền sử với nền Văn hóa Hạ Long độc đáo, để lại di chỉ khảo cổ trong nhiều hang động đảo đá.",
        icon: "🏺",
        image: "/Images/Landingpagequangninh/1as-1.png",
      },
      {
        year: "Thế kỷ XIII",
        title: "Chiến thắng Bạch Đằng",
        description:
          "Vùng biển Quảng Ninh chứng kiến trận chiến trên sông Bạch Đằng 1288 lịch sử – nơi Trần Hưng Đạo tiêu diệt đại quân Nguyên Mông.",
        icon: "⚔️",
        image: "/Images/Landingpagequangninh/B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_Giang_chi_chi%E1%BA%BFn_(938).jpg",
      },
      {
        year: "1994",
        title: "Kỳ quan thiên nhiên thế giới lần 1",
        description:
          "Vịnh Hạ Long lần đầu được UNESCO công nhận là Di sản thiên nhiên thế giới về giá trị thẩm mỹ với hàng nghìn đảo đá kỳ vĩ.",
        icon: "🌏",
        image: "/Images/Landingpagequangninh/Halong_Bay.jpg",
      },
      {
        year: "2000",
        title: "Kỳ quan thiên nhiên thế giới lần 2",
        description:
          "Vịnh Hạ Long được UNESCO tái công nhận lần 2 về giá trị địa chất địa mạo – cột mốc khẳng định tầm vóc di sản thiên nhiên vô giá.",
        icon: "⭐",
        image: "/Images/Landingpagequangninh/Halong_Bay_in_Vietnam.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng chài Cửa Vạn",
        product: "Hải sản biển khơi",
        description:
          "Làng chài nổi trên vịnh Hạ Long – cộng đồng ngư dân sống trên thuyền hàng thế kỷ với nghề đánh cá và nuôi trồng hải sản.",
        image: "/Images/Landingpagequangninh/lang-chai-cua-van-2.jpg",
        age: "300+ năm",
      },
      {
        name: "Làng gốm Đông Triều",
        product: "Gốm men ngọc",
        description:
          "Làng gốm Đông Triều nổi tiếng với gốm men ngọc và gốm men trắng từ thời Trần, cung cấp đồ sứ cao cấp cho cung đình và thị trường.",
        image: "/Images/Landingpagequangninh/gom-su-dong-trieu-ivivu-1.jpg",
        age: "700+ năm",
      },
      {
        name: "Nghề than Hạ Long",
        product: "Than đá",
        description:
          "Quảng Ninh có trữ lượng than đá lớn nhất Việt Nam, nghề khai thác than đã gắn liền với lịch sử và kinh tế vùng đất này từ thế kỷ XIX.",
        image: "/Images/Landingpagequangninh/2337872_wtm_0a20282580d07015996d471430cd4396.jpg",
        age: "150+ năm",
      },
      {
        name: "Làng sứa biển Vân Đồn",
        product: "Hải sản đặc sản",
        description:
          "Vân Đồn nổi tiếng với nghề khai thác và chế biến các hải sản quý như sứa biển, hải sâm, bào ngư và ngọc trai.",
        image: "/Images/Landingpagequangninh/images1483325_Sua_Minh_Chau_6.jpg",
        age: "200+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Carnaval Hạ Long",
        date: "Tháng 4-5 hàng năm",
        description:
          "Lễ hội carnaval đặc sắc tại thành phố Hạ Long với diễu hành đường phố, trình diễn nghệ thuật và bắn pháo hoa trên vịnh Hạ Long.",
        significance: "Lễ hội du lịch quốc tế",
        image: "/Images/Landingpagequangninh/Carnaval%20H%E1%BA%A1%20Long%20%C4%91%C6%B0%E1%BB%9Dng%20ph%E1%BB%91.jpeg",
      },
      {
        name: "Lễ hội Đình Quan Lạn",
        date: "Ngày 18 tháng 6 âm lịch",
        description:
          "Lễ hội tại đình Quan Lạn tưởng nhớ trận chiến chống quân Nguyên Mông trên vịnh Bái Tử Long với đua thuyền truyền thống.",
        significance: "Lễ hội lịch sử kháng Nguyên",
        image: "/Images/Landingpagequangninh/le-hoi-quan-lan.jpg",
      },
      {
        name: "Lễ hội Yên Tử",
        date: "Mùng 10 tháng Giêng đến tháng 3",
        description:
          "Lễ hội hành hương lớn nhất miền Bắc tại núi Yên Tử – nơi vua Trần Nhân Tông xuất gia lập thiền phái Trúc Lâm Yên Tử.",
        significance: "Lễ hội hành hương Phật giáo",
        image: "/Images/Landingpagequangninh/chua-dong-yen-tu.jpg",
      },
      {
        name: "Lễ hội đền Cửa Ông",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội tại đền Cửa Ông thờ Hưng Nhượng Vương Trần Quốc Tảng với nghi lễ rước bộ, rước thuyền và nhiều hoạt động văn hóa.",
        significance: "Lễ hội tín ngưỡng biển đảo",
        image: "/Images/Landingpagequangninh/le-hoi-den-cua-ong-1.jpg",
      },
    ],
    specialties: [
      {
        name: "Chả mực",
        description: "Mực giã tay, thơm ngon đặc trưng.",
        origin: "Hạ Long",
        image: "/Images/Landingpagequangninh/images1483325_Sua_Minh_Chau_6.jpg",
      },
      {
        name: "Sá sùng",
        description: "Đặc sản quý của biển.",
        origin: "Vân Đồn",
        image: "/Images/Landingpagequangninh/sa-sung-ha-long.jpg",
      },
      {
        name: "Sam biển",
        description: "Món ăn độc đáo vùng biển.",
        origin: "Móng Cái",
        image: "/Images/Landingpagequangninh/sam-bien-mon-dac-san-ha-long-ma-du-khach-nhat-dinh-phai-thu-mot-lan-1641745882.jpg",
      },
    ],
    tourism: [
      {
        name: "Vịnh Hạ Long",
        description: "Kỳ quan thiên nhiên thế giới.",
        image: "/Images/Landingpagequangninh/1920px-A_view_of_Ha_Long_Bay_from_the_high_point_of_Sun_Sot_cave_(31520203451).jpg",
      },
      {
        name: "Yên Tử",
        description: "Thiền viện và cảnh sắc linh thiêng.",
        image: "/Images/Landingpagequangninh/vnapotalquantheditichvadanhthangyentu-vinhnghiem-consonkiepbacnamtronghosodecudisanvanhoathegioi8145.jpg",
      },
      {
        name: "Đảo Cô Tô",
        description: "Thiên đường biển đảo.",
        image: "/Images/Landingpagequangninh/du-lich-dao-co-to-1-1281x1024.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Yên Tử",
        description: "Hành hương về đất Phật.",
        image: "/Images/Landingpagequangninh/z62956362516278f2fb5a36a27e3c14957aeff1f452da5-1738909299778795283677.jpg",
      },
      {
        name: "Văn hóa than",
        description: "Dấu ấn công nhân mỏ.",
        image: "/Images/Landingpagequangninh/578801076-1361359882444194-4159546888632681046-n20251117154043.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagequangninh/Halong_Bay.jpg",
      "/Images/Landingpagequangninh/1920px-A_view_of_Ha_Long_Bay_from_the_high_point_of_Sun_Sot_cave_(31520203451).jpg",
      "/Images/Landingpagequangninh/chua-dong-yen-tu.jpg",
      "/Images/Landingpagequangninh/du-lich-dao-co-to-1-1281x1024.jpg",
      "/Images/Landingpagequangninh/Carnaval%20H%E1%BA%A1%20Long%20%C4%91%C6%B0%E1%BB%9Dng%20ph%E1%BB%91.jpeg",
      "/Images/Landingpagequangninh/B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_Giang_chi_chi%E1%BA%BFn_(938).jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm du lịch theo khu vực",
        subtitle:
          "Số lượng điểm du lịch nổi tiếng theo từng khu vực của Quảng Ninh",
        data: [
          { name: "Hạ Long", value: 58 },
          { name: "Vân Đồn", value: 34 },
          { name: "Cẩm Phả", value: 19 },
          { name: "Uông Bí", value: 27 },
          { name: "Móng Cái", value: 22 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Quảng Ninh",
        data: [
          { name: "Di tích lịch sử", value: 22 },
          { name: "Ẩm thực đặc sản", value: 23 },
          { name: "Lễ hội truyền thống", value: 13 },
          { name: "Làng nghề / Sinh thái", value: 42 },
        ],
      },
    },
  },
  {
    slug: "cao-bang",
    name: "Cao Bằng",
    slogan: "Thác nước kỳ vĩ và núi rừng biên giới",
    description:
      "Cao Bằng nổi bật với thác Bản Giốc, động Ngườm Ngao và văn hóa dân tộc Tày.",
    accentColor: "#0f766e",
    heroImage: "/Images/Landingpagecaobang/1280px-Bangioc9tam.jpg",
    introImage: "/Images/Landingpagecaobang/105831_khung_canh_non_nuoc_huu_tinh_noi_day_khien_cho_ban_co_the_trai_nghiem_hoa_minh_vao_cung_voi_thien_nhien_trong_lanh_14354112.jpg",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "200+", label: "Di tích văn hóa" },
      { value: "40+", label: "Lễ hội truyền thống" },
      { value: "272m", label: "Chiều rộng thác Bản Giốc" },
    ],
    timeline: [
      {
        year: "Thời Hùng Vương",
        title: "Đất cổ biên thùy",
        description:
          "Cao Bằng là vùng đất biên thùy phía Bắc với người Tày, Nùng cư trú từ thời Hùng Vương, gắn liền với truyền thuyết về nàng Tô Thị.",
        icon: "🗻",
        image: "/Images/Landingpagecaobang/du-lich-cao-bang-dulichhangngay-40-1197x800.jpg",
      },
      {
        year: "1941",
        title: "Căn cứ địa Việt Bắc",
        description:
          "Pác Bó – Cao Bằng là nơi Bác Hồ về nước và bắt đầu lãnh đạo cách mạng Việt Nam năm 1941, khai sinh Mặt trận Việt Minh.",
        icon: "⭐",
        image: "/Images/Landingpagecaobang/1280px-Cốc_Bó.jpg",
      },
      {
        year: "1979",
        title: "Chiến tranh biên giới phía Bắc",
        description:
          "Cao Bằng là chiến trường ác liệt trong cuộc chiến tranh bảo vệ biên giới phía Bắc 1979, người dân anh dũng chống giặc giữ đất.",
        icon: "🛡️",
        image: "/Images/Landingpagecaobang/k1-7-oqza-9863.jpg",
      },
      {
        year: "2018",
        title: "Công viên địa chất UNESCO",
        description:
          "Công viên địa chất Non nước Cao Bằng được UNESCO công nhận là Công viên địa chất toàn cầu, bảo tồn cảnh quan đá vôi kỳ vĩ.",
        icon: "🌏",
        image: "/Images/Landingpagecaobang/cao-bang-04042024-02.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề rèn Phúc Sen",
        product: "Dao kiếm thủ công",
        description:
          "Làng rèn Phúc Sen của người Nùng An nổi tiếng với dao, liềm và các dụng cụ bằng thép rèn thủ công chất lượng cao từ hàng trăm năm.",
        image: "/Images/Landingpagecaobang/dc24978125b3f4edada2.jpg",
        age: "300+ năm",
      },
      {
        name: "Dệt thổ cẩm Tày",
        product: "Vải thổ cẩm Tày",
        description:
          "Nghề dệt thổ cẩm của người Tày Cao Bằng với hoa văn hình học tinh tế, sử dụng sợi tự nhiên nhuộm màu từ thực vật địa phương.",
        image: "/Images/Landingpagecaobang/104933-vna_potal_tuyen_quang_gin_giu_nghe_det_tho_cam_cua_nguoi_tay_o_thuong_nong_stand.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng đan cót Quảng Uyên",
        product: "Cót tre",
        description:
          "Làng nghề đan cót tre Quảng Uyên cung cấp nguyên liệu bao gói nông sản và vật dụng đời sống cho người dân vùng núi.",
        image: "/Images/Landingpagecaobang/1920px-Lang_van_hoa_Dan_toc_Tay,_Dam_Thuy,_Trung_khanh,_Cao_bang,_Vietnam_-_panoramio.jpg",
        age: "Truyền thống",
      },
      {
        name: "Nghề nấu rượu ngô Hà Quảng",
        product: "Rượu ngô đặc sản",
        description:
          "Nghề nấu rượu ngô truyền thống của người H'Mông và Tày Hà Quảng từ ngô nếp nương, tạo ra rượu thơm ngon đặc sắc vùng cao.",
        image: "/Images/Landingpagecaobang/dsc_3273-copy_NGGI.jpg",
        age: "Truyền thống lâu đời",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Lồng Tồng",
        date: "Mùng 5-7 tháng Giêng",
        description:
          "Lễ hội xuống đồng lớn nhất của người Tày Cao Bằng cầu mưa thuận gió hòa và mùa màng bội thu với nhiều trò chơi dân gian.",
        significance: "Lễ hội nông nghiệp người Tày",
        image: "/Images/Landingpagecaobang/le-hoi-long-tong-1.jpg",
      },
      {
        name: "Lễ hội Nàng Hai",
        date: "Rằm tháng 2 âm lịch",
        description:
          "Lễ hội độc đáo của người Tày thờ thần Mặt Trăng với các nghi lễ hát Then và đàn Tính dưới ánh trăng huyền bí.",
        significance: "Lễ hội tín ngưỡng người Tày",
        image: "/Images/Landingpagecaobang/img_5932.jpg",
      },
      {
        name: "Lễ hội Pác Bó",
        date: "Tháng 1-2 âm lịch",
        description:
          "Lễ hội tại khu di tích lịch sử Pác Bó – nơi Bác Hồ trở về nước, kết hợp giữa lễ dâng hương và trải nghiệm văn hóa vùng cao.",
        significance: "Lễ hội cách mạng lịch sử",
        image: "/Images/Landingpagecaobang/134101_le_hoi_ve_nguon_pac_bo_gop_phan_xay_dung_quang_ba_hinh_anh_cua_huyen_ha_quang_cac_diem_di_san_cong_vien_dia_chat_non_nuoc_cao_bang_danh_lam_thang_canh_2203072.jpg",
      },
      {
        name: "Chợ phiên vùng cao",
        date: "Định kỳ hàng tuần",
        description:
          "Chợ phiên vùng cao Cao Bằng là nơi giao lưu văn hóa sắc tộc, với người Tày, Nùng, H'Mông mặc trang phục truyền thống đi chợ.",
        significance: "Văn hóa giao lưu dân tộc",
        image: "/Images/Landingpagecaobang/Cho-Phien-Bao-Lac-2.jpg",
      },
    ],
    specialties: [
      {
        name: "Bánh cuốn Cao Bằng",
        description: "Bánh mềm, nước dùng xương thơm.",
        origin: "Thành phố Cao Bằng",
        image: "/Images/Landingpagecaobang/6666tfhd.jpg",
      },
      {
        name: "Lạp xưởng",
        description: "Hương vị đậm đà vùng biên.",
        origin: "Trùng Khánh",
        image: "/Images/Landingpagecaobang/ef858987709bea5d85ca9b8dba3accbd.jpg",
      },
      {
        name: "Hạt dẻ",
        description: "Đặc sản mùa thu Cao Bằng.",
        origin: "Trùng Khánh",
        image: "/Images/Landingpagecaobang/Hạt-dẻ-Trùng-Khánh-ivivu-6-Vua-Nệm.jpg",
      },
    ],
    tourism: [
      {
        name: "Thác Bản Giốc",
        description: "Thác nước lớn nhất Việt Nam.",
        image: "/Images/Landingpagecaobang/1280px-Bangioc9tam.jpg",
      },
      {
        name: "Động Ngườm Ngao",
        description: "Hang động kỳ ảo.",
        image: "/Images/Landingpagecaobang/dong-nguom-ngao-1-16829902009791799997902.jpg",
      },
      {
        name: "Hồ Thang Hen",
        description: "Hồ nước xanh giữa núi đá.",
        image: "/Images/Landingpagecaobang/105831_khung_canh_non_nuoc_huu_tinh_noi_day_khien_cho_ban_co_the_trai_nghiem_hoa_minh_vao_cung_voi_thien_nhien_trong_lanh_14354112.jpg",
      },
    ],
    culture: [
      {
        name: "Hát then",
        description: "Di sản văn hóa của người Tày.",
        image: "/Images/Landingpagecaobang/1280px-Ba-Be-Lake-_Then-singing.jpg",
      },
      {
        name: "Lễ hội Lồng Tồng",
        description: "Lễ hội cầu mùa.",
        image: "/Images/Landingpagecaobang/vnapotallehoilongtong-netvanhoadacsaccuanguoitayvungcaolaocai8616138-17724523602051846499257.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagecaobang/cao-bang-04042024-02.jpg",
      "/Images/Landingpagecaobang/dong-nguom-ngao-1-16829902009791799997902.jpg",
      "/Images/Landingpagecaobang/6666tfhd.jpg",
      "/Images/Landingpagecaobang/le-hoi-long-tong-1.jpg",
      "/Images/Landingpagecaobang/Hạt-dẻ-Trùng-Khánh-ivivu-6-Vua-Nệm.jpg",
      "/Images/Landingpagecaobang/Cho-Phien-Bao-Lac-4.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Cao Bằng",
        data: [
          { name: "TP Cao Bằng", value: 26 },
          { name: "Trùng Khánh", value: 34 },
          { name: "Hà Quảng", value: 21 },
          { name: "Bảo Lạc", value: 16 },
          { name: "Nguyên Bình", value: 19 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Cao Bằng",
        data: [
          { name: "Di tích lịch sử", value: 38 },
          { name: "Ẩm thực đặc sản", value: 20 },
          { name: "Lễ hội truyền thống", value: 22 },
          { name: "Làng nghề / Sinh thái", value: 20 },
        ],
      },
    },
  },
  {
    slug: "lang-son",
    name: "Lạng Sơn",
    slogan: "Xứ Lạng thơ mộng nơi cửa khẩu",
    description:
      "Lạng Sơn nổi tiếng với núi đá, chợ biên giới và ẩm thực vịt quay.",
    accentColor: "#9a3412",
    heroImage: "/Images/Landingpagelangson/1280px-Đêm_Lạng_Sơn.jpg",
    introImage: "/Images/Landingpagelangson/uploads-2024-thang-10-ngay-8-1727940409650-z5885852099498_e4fdebcb439c970f566f3f6488a6cb65.jpg",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "300+", label: "Di tích văn hóa" },
      { value: "50+", label: "Lễ hội truyền thống" },
      { value: "Cửa khẩu", label: "Hữu Nghị Quan lịch sử" },
    ],
    timeline: [
      {
        year: "Thế kỷ XI",
        title: "Ải Chi Lăng lịch sử",
        description:
          "Lạng Sơn là vùng đất biên thùy với ải Chi Lăng – nơi diễn ra nhiều trận đánh lịch sử chống quân xâm lược phương Bắc.",
        icon: "⚔️",
        image: "/Images/Landingpagelangson/maxresdefault%20(1).jpg",
      },
      {
        year: "1077",
        title: "Chiến thắng sông Như Nguyệt",
        description:
          "Lý Thường Kiệt chỉ huy quân dân ngăn chặn đại quân Tống tại sông Như Nguyệt, đọc Thần Tứ bất hủ khẳng định nền độc lập.",
        icon: "🛡️",
        image: "/Images/Landingpagelangson/anh.jpg",
      },
      {
        year: "1427",
        title: "Đại thắng Chi Lăng – Xương Giang",
        description:
          "Trận Chi Lăng – Xương Giang 1427 tiêu diệt đạo viện binh Minh, kết thúc 10 năm Lê Lợi lãnh đạo kháng chiến giành lại độc lập.",
        icon: "🏆",
        image: "/Images/Landingpagelangson/kt3PG1hPTgTPG1MJ.u54.L8JKx-X.jpg",
      },
      {
        year: "Hiện đại",
        title: "Cửa ngõ thương mại biên giới",
        description:
          "Lạng Sơn phát triển thành trung tâm thương mại biên giới lớn nhất phía Bắc với cửa khẩu Hữu Nghị Quan giao thương Việt – Trung.",
        icon: "🏪",
        image: "/Images/Landingpagelangson/cac-cua-khau-o-lang-son-0160e7-1200x864.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề chế biến hoa hồi",
        product: "Hoa hồi đặc sản",
        description:
          "Lạng Sơn là vùng trồng hoa hồi lớn nhất Việt Nam và thế giới, chế biến hoa hồi xuất khẩu hương liệu và gia vị quý giá toàn cầu.",
        image: "/Images/Landingpagelangson/hoa-hoi-nosaco-01.jpg",
        age: "400+ năm",
      },
      {
        name: "Dệt thổ cẩm Tày – Nùng",
        product: "Thổ cẩm truyền thống",
        description:
          "Nghề dệt thổ cẩm của người Tày, Nùng Lạng Sơn với màu sắc tươi sáng và hoa văn truyền thống phản ánh đời sống văn hóa độc đáo.",
        image: "/Images/Landingpagelangson/233449-theu-1-17339066839941175860604-13-0-653-1024-crop-17339066903551466465778.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng làm bánh ngải",
        product: "Bánh ngải dân tộc",
        description:
          "Bánh ngải là đặc sản của người Tày Lạng Sơn làm từ lá ngải cứu nếp và nhân đậu xanh – mang hương vị dân tộc không thể nhầm lẫn.",
        image: "/Images/Landingpagelangson/657406_657394_z7777906826958_a4504dd897c13f902f7ce6c3c541f81a_13302830_13470230.jpg",
        age: "Truyền thống",
      },
      {
        name: "Nghề nuôi ong rừng Bình Gia",
        product: "Mật ong rừng",
        description:
          "Nghề nuôi ong và khai thác mật ong rừng tại vùng rừng núi Bình Gia, tạo ra mật ong nguyên chất có giá trị dinh dưỡng cao.",
        image: "/Images/Landingpagelangson/a%20ong%20lay%20mat%201.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội đền Kỳ Cùng – Tả Phủ",
        date: "22-27 tháng Giêng",
        description:
          "Lễ hội lớn nhất Lạng Sơn tại đền Kỳ Cùng và đền Tả Phủ với rước kiệu trên sông Kỳ Cùng và nhiều hoạt động văn hóa dân gian.",
        significance: "Lễ hội tín ngưỡng lớn nhất xứ Lạng",
        image: "/Images/Landingpagelangson/MUA%20RONG.jpg",
      },
      {
        name: "Hội Lồng Tồng",
        date: "Mùng 5-7 tháng Giêng",
        description:
          "Lễ hội xuống đồng đầu năm của người Tày Lạng Sơn cầu mưa thuận gió hòa với ném còn, múa sư tử và các trò chơi dân gian.",
        significance: "Lễ hội nông nghiệp người Tày",
        image: "/Images/Landingpagelangson/0905ngayhoihangpo1-8765.jpg",
      },
      {
        name: "Chợ tình Lạng Sơn",
        date: "Tháng Giêng",
        description:
          "Chợ phiên đặc biệt nơi trai gái Tày, Nùng gặp gỡ, trao duyên bằng hát lượn và hát sli – nét văn hóa giao duyên dân gian độc đáo.",
        significance: "Văn hóa giao duyên dân tộc",
        image: "/Images/Landingpagelangson/5_NVDJ.jpg",
      },
      {
        name: "Lễ hội Mẫu Sơn",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội tại núi Mẫu Sơn thờ thần núi linh thiêng với các nghi lễ tâm linh và trải nghiệm leo núi trong tuyết lạnh hiếm gặp.",
        significance: "Lễ hội thần núi đặc trưng",
        image: "/Images/Landingpagelangson/mm2.jpg",
      },
    ],
    specialties: [
      {
        name: "Vịt quay",
        description: "Da giòn, thịt thơm vị mắc mật.",
        origin: "Thành phố Lạng Sơn",
        image: "/Images/Landingpagelangson/vn-11134259-7ra0g-m9y5lsb14opm63@resize_ss1242x600!@crop_w1242_h600_cT%20(1).jpg",
      },
      {
        name: "Khâu nhục",
        description: "Thịt mềm, đậm vị.",
        origin: "Cao Lộc",
        image: "/Images/Landingpagelangson/Bc9Thnhphm19-1705650163-7592-1705650639.jpg",
      },
      {
        name: "Bánh áp chao",
        description: "Bánh rán giòn nóng.",
        origin: "Lạng Sơn",
        image: "/Images/Landingpagelangson/apchao3_KIAF.jpg",
      },
    ],
    tourism: [
      {
        name: "Mẫu Sơn",
        description: "Khí hậu mát lạnh quanh năm.",
        image: "/Images/Landingpagelangson/1280px-Mẫu_Sơn.jpg",
      },
      {
        name: "Động Tam Thanh",
        description: "Danh thắng nổi tiếng xứ Lạng.",
        image: "/Images/Landingpagelangson/1280px-Trong_động_Tam_Thanh.jpg",
      },
      {
        name: "Chợ Đông Kinh",
        description: "Trung tâm thương mại biên giới.",
        image: "/Images/Landingpagelangson/Chợ_Đông_Kinh.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Kỳ Lừa",
        description: "Lễ hội truyền thống xứ Lạng.",
        image: "/Images/Landingpagelangson/2024_02_22_09_36_491.jpg",
      },
      {
        name: "Hát sli",
        description: "Dân ca của người Nùng.",
        image: "/Images/Landingpagelangson/5_NVDJ.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagelangson/1280px-Mẫu_Sơn.jpg",
      "/Images/Landingpagelangson/1280px-Trong_động_Tam_Thanh.jpg",
      "/Images/Landingpagelangson/vn-11134259-7ra0g-m9y5lsb14opm63@resize_ss1242x600!@crop_w1242_h600_cT%20(1).jpg",
      "/Images/Landingpagelangson/MUA%20RONG.jpg",
      "/Images/Landingpagelangson/Chợ_Đông_Kinh.jpg",
      "/Images/Landingpagelangson/hoa-hoi-nosaco-01.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Lạng Sơn",
        data: [
          { name: "TP Lạng Sơn", value: 31 },
          { name: "Văn Lãng", value: 22 },
          { name: "Cao Lộc", value: 27 },
          { name: "Hữu Lũng", value: 18 },
          { name: "Chi Lăng", value: 24 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Lạng Sơn",
        data: [
          { name: "Di tích lịch sử", value: 38 },
          { name: "Ẩm thực đặc sản", value: 27 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 15 },
        ],
      },
    },
  },
  {
    slug: "lai-chau",
    name: "Lai Châu",
    slogan: "Mây núi đại ngàn và bản sắc vùng cao",
    description:
      "Lai Châu sở hữu núi non hùng vĩ, ruộng bậc thang và văn hóa dân tộc đa dạng.",
    accentColor: "#0f766e",
    heroImage: "/Images/Landingpagelaichau/bacthang-1731409774806269157966.jpg",
    introImage: "/Images/Landingpagelaichau/Laichautown.jpg",
    stats: [
      { value: "20+", label: "Dân tộc thiểu số" },
      { value: "100+", label: "Lễ hội dân gian" },
      { value: "3143m", label: "Đỉnh Pu Si Lung cao nhất" },
      { value: "30+", label: "Làng nghề truyền thống" },
    ],
    timeline: [
      {
        year: "Thời cổ đại",
        title: "Đất đai của người Thái",
        description:
          "Lai Châu là quê hương của người Thái trắng từ ngàn năm trước, với nền văn hóa phong phú gắn liền với sông suối và ruộng bậc thang.",
        icon: "🏔️",
        image: "/Images/Landingpagelaichau/sac_mau_lai_chau_4.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Tỉnh Lai Châu thành lập",
        description:
          "Người Pháp thành lập tỉnh Lai Châu kiểm soát vùng biên giới phía Tây Bắc, mở đường và khai thác tài nguyên thiên nhiên vùng núi.",
        icon: "🗺️",
        image: "/Images/Landingpagelaichau/Laichautown.jpg",
      },
      {
        year: "1953",
        title: "Giải phóng Lai Châu",
        description:
          "Chiến dịch Lai Châu 1953 giải phóng toàn tỉnh khỏi ách thực dân Pháp, tạo bàn đạp cho chiến thắng Điện Biên Phủ lịch sử.",
        icon: "🇻🇳",
        image: "/Images/Landingpagelaichau/k24-1675690184869299386461.png",
      },
      {
        year: "Hiện đại",
        title: "Vùng đất bản sắc vùng cao",
        description:
          "Lai Châu phát triển du lịch văn hóa với ruộng bậc thang Sìn Hồ, lễ hội dân tộc và cảnh quan thiên nhiên hùng vĩ còn nguyên sơ.",
        icon: "🌄",
        image: "/Images/Landingpagelaichau/kp01-22016140289207053657826.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Dệt thổ cẩm Thái trắng",
        product: "Thổ cẩm Thái trắng",
        description:
          "Nghề dệt thổ cẩm của phụ nữ Thái trắng Lai Châu với hoa văn hình chim, hoa lá tinh tế và sợi tự nhiên từ cây bông và lanh.",
        image: "/Images/Landingpagelaichau/thanutrang.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng đan lát Mường",
        product: "Đồ đan Mường",
        description:
          "Nghề đan lát gùi, giỏ và đồ dùng hàng ngày của người Mường Lai Châu bằng tre nứa địa phương theo kỹ thuật truyền thống.",
        image: "/Images/Landingpagelaichau/1_fwxv.jpg",
        age: "Truyền thống",
      },
      {
        name: "Nghề rèn H'Mông",
        product: "Dao rèn thủ công",
        description:
          "Người H'Mông Lai Châu nổi tiếng với nghề rèn dao kiếm bằng sắt rèn tay theo bí quyết truyền thống, tạo ra công cụ bền chắc.",
        image: "/Images/Landingpagelaichau/ong-mua-a-trong,-mot-trong-nhung-tho-ren-con-luu-giu-nghe-ren-tai-ban-ta-so-1,-xa-chieng-hac.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Nghề làm Nâm Đin",
        product: "Rượu men lá",
        description:
          "Rượu nấu từ men lá tự nhiên của người Thái Lai Châu với hương vị thơm đặc biệt từ các loại thảo mộc rừng núi.",
        image: "/Images/Landingpagelaichau/890_1658908007537.jpg",
        age: "Truyền thống",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Then Kin Pang",
        date: "Tháng 2-3 âm lịch",
        description:
          "Lễ hội lớn nhất của người Thái trắng Lai Châu với hát Then, đàn Tính và các nghi lễ tâm linh cầu bình an sức khỏe.",
        significance: "Lễ hội lớn nhất người Thái trắng",
        image: "/Images/Landingpagelaichau/Then-kin-pang-1.jpg",
      },
      {
        name: "Chợ phiên Sìn Hồ",
        date: "Chủ nhật hàng tuần",
        description:
          "Chợ phiên cao nguyên Sìn Hồ – nơi giao lưu văn hóa đa sắc tộc với người Thái, H'Mông, Dao, Lự mặc trang phục truyền thống.",
        significance: "Văn hóa chợ phiên vùng cao",
        image: "/Images/Landingpagelaichau/20210913-152919-8KtMCDIF.jpg",
      },
      {
        name: "Lễ Cốm Lai Châu",
        date: "Mùa gặt tháng 9-10",
        description:
          "Lễ hội cốm của người Thái trắng mừng mùa gặt với các nghi lễ tạ ơn thần lúa và ăn cốm dẻo thơm vừa gặt từ ruộng bậc thang.",
        significance: "Lễ hội thu hoạch mùa màng",
        image: "/Images/Landingpagelaichau/140557-lai-chau-2.jpg",
      },
      {
        name: "Lễ hội Gầu Tào",
        date: "Mùng 1-3 Tết",
        description:
          "Lễ hội đầu năm lớn nhất của người H'Mông với múa khèn, ném pao và hát dân ca cầu mong gia đình hạnh phúc, mùa màng bội thu.",
        significance: "Lễ hội người H'Mông đặc trưng",
        image: "/Images/Landingpagelaichau/le-hoi-gau-tao-1.jpg",
      },
    ],
    specialties: [
      {
        name: "Thịt trâu gác bếp",
        description: "Đậm vị khói của núi rừng.",
        origin: "Tam Đường",
        image: "/Images/Landingpagelaichau/thit-treo-gac-bep-2.jpg",
      },
      {
        name: "Xôi tím",
        description: "Xôi nếp nương thơm dẻo.",
        origin: "Sìn Hồ",
        image: "/Images/Landingpagelaichau/suhapdancuaxoitimlaichau3.jpg",
      },
      {
        name: "Rượu ngô",
        description: "Hương vị đặc trưng vùng cao.",
        origin: "Phong Thổ",
        image: "/Images/Landingpagelaichau/890_1658908007537.jpg",
      },
    ],
    tourism: [
      {
        name: "Đèo Ô Quy Hồ",
        description: "Một trong tứ đại đỉnh đèo.",
        image: "/Images/Landingpagelaichau/1280px-Đèo_Ô_Quy_Hồ_1.jpg",
      },
      {
        name: "Ruộng bậc thang",
        description: "Cảnh sắc mùa lúa chín.",
        image: "/Images/Landingpagelaichau/bacthang-1731409774806269157966.jpg",
      },
      {
        name: "Đỉnh Putaleng",
        description: "Nóc nhà thứ hai của Đông Dương.",
        image: "/Images/Landingpagelaichau/1280px-Đèo_Ô_Quy_Hồ_1.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Then Kin Pang",
        description: "Lễ hội của người Thái.",
        image: "/Images/Landingpagelaichau/Then-kin-pang-1.jpg",
      },
      {
        name: "Chợ phiên vùng cao",
        description: "Không gian giao lưu văn hóa.",
        image: "/Images/Landingpagelaichau/20210913-152919-8KtMCDIF.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagelaichau/bacthang-1731409774806269157966.jpg",
      "/Images/Landingpagelaichau/1280px-Đèo_Ô_Quy_Hồ_1.jpg",
      "/Images/Landingpagelaichau/Then-kin-pang-1.jpg",
      "/Images/Landingpagelaichau/thit-treo-gac-bep-2.jpg",
      "/Images/Landingpagelaichau/le-hoi-gau-tao-1.jpg",
      "/Images/Landingpagelaichau/suhapdancuaxoitimlaichau3.jpg",
    ],
    charts: {
      barChart: {
        title: "Điểm văn hóa theo huyện",
        subtitle:
          "Số lượng điểm văn hóa – du lịch nổi tiếng theo từng huyện của Lai Châu",
        data: [
          { name: "TP Lai Châu", value: 24 },
          { name: "Sìn Hồ", value: 19 },
          { name: "Phong Thổ", value: 22 },
          { name: "Tam Đường", value: 17 },
          { name: "Mường Tè", value: 15 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Lai Châu",
        data: [
          { name: "Di tích lịch sử", value: 25 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 33 },
        ],
      },
    },
  },
  {
    slug: "dien-bien",
    name: "Điện Biên",
    slogan: "Điểm hẹn lịch sử và hùng vĩ Tây Bắc",
    description:
      "Điện Biên lưu giữ chiến thắng lịch sử, núi rừng rộng lớn và văn hóa dân tộc độc đáo.",
    accentColor: "#b45309",
    heroImage: "/Images/Landingpagedienbien/1280px-Mường_Thanh_Valley.jpg",
    introImage: "/Images/Landingpagedienbien/canh-dong-muong-thanh-3214.jpg",
    stats: [
      { value: "1954", label: "Năm chiến thắng lịch sử" },
      { value: "56 ngày", label: "Chiến dịch Điện Biên Phủ" },
      { value: "20+", label: "Dân tộc anh em" },
      { value: "Lòng chảo", label: "Mường Thanh rộng lớn nhất Tây Bắc" },
    ],
    timeline: [
      {
        year: "Thời cổ đại",
        title: "Mường Thanh – vùng đất lịch sử",
        description:
          "Cánh đồng Mường Thanh (nay là Điện Biên Phủ) là vùng đất trù phú bậc nhất Tây Bắc, nơi nhiều dân tộc Thái, H'Mông sinh sống từ ngàn năm.",
        icon: "🌾",
        image: "/Images/Landingpagedienbien/canh-dong-muong-thanh-3214.jpg",
      },
      {
        year: "1953-1954",
        title: "Chiến dịch Điện Biên Phủ",
        description:
          "Đại tướng Võ Nguyên Giáp chỉ huy chiến dịch Điện Biên Phủ lịch sử 1954, đánh tan đội quân Pháp tinh nhuệ, kết thúc chiến tranh Đông Dương.",
        icon: "⭐",
        image: "/Images/Landingpagedienbien/01.jpg",
      },
      {
        year: "1954",
        title: "Chiến thắng rạng ngời",
        description:
          "Ngày 7/5/1954, hầm De Castries thất thủ, chiến thắng Điện Biên Phủ vang dội khắp thế giới – cột mốc lịch sử của cuộc chiến tranh giải phóng dân tộc.",
        icon: "🏆",
        image: "/Images/Landingpagedienbien/Victory_in_Battle_of_Dien_Bien_Phu.jpg",
      },
      {
        year: "Hiện đại",
        title: "Hành hương về đất anh hùng",
        description:
          "Điện Biên trở thành điểm đến lịch sử hàng đầu Việt Nam với Khu di tích Điện Biên Phủ và văn hóa đa dân tộc phong phú.",
        icon: "🇻🇳",
        image: "/Images/Landingpagedienbien/z53865242065550058404915f537c0979f22006a23be36-1714149099255415963407.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Dệt thổ cẩm Thái",
        product: "Thổ cẩm Thái Điện Biên",
        description:
          "Nghề dệt thổ cẩm của phụ nữ Thái Điện Biên với hoa văn đặc trưng cánh đồng Mường Thanh, sử dụng chỉ màu tự nhiên từ cây rừng.",
        image: "/Images/Landingpagedienbien/vna-potal-nghe-an-no-luc-giu-gin-nghe-det-tho-cam-truyen-thong-cua-dong-bao-thai-77950688-14-22-49.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Nghề đan gùi H'Mông",
        product: "Gùi thổ cẩm",
        description:
          "Gùi H'Mông Điện Biên được đan bằng tre nứa và trang trí thổ cẩm, vừa là vật dụng hàng ngày vừa là sản phẩm thủ công mỹ nghệ.",
        image: "/Images/Landingpagedienbien/base64-16296285115301331432256.jpg",
        age: "Truyền thống",
      },
      {
        name: "Nghề làm nhạc cụ truyền thống",
        product: "Khèn, sáo",
        description:
          "Nghề làm khèn H'Mông và sáo Thái tại Điện Biên – nhạc cụ gắn liền với các lễ hội dân gian và đời sống tinh thần của đồng bào.",
        image: "/Images/Landingpagedienbien/kham-pha-kho-nhac-cu-_531698945467.jpg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng chè Tủa Chùa",
        product: "Chè Shan tuyết cổ thụ",
        description:
          "Tủa Chùa có những vườn chè Shan tuyết cổ thụ trăm năm tuổi mọc hoang dã trên núi cao, cho ra loại chè đặc sản quý hiếm.",
        image: "/Images/Landingpagedienbien/uploads-2022-th-c3-a1ng-204-ng-c3-a0y_13-to-20oanh-che-20shan-20tuyet-img_12_kzck.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Hoa Ban",
        date: "Tháng 2-3 âm lịch",
        description:
          "Lễ hội mùa xuân lớn nhất của người Thái Tây Bắc với hoa ban nở trắng núi rừng, múa xòe và hát thơ đêm giao duyên.",
        significance: "Lễ hội mùa xuân Thái đặc trưng",
        image: "/Images/Landingpagedienbien/0603ngayhoihoaban1-17097142067731284238982.jpg",
      },
      {
        name: "Lễ kỷ niệm chiến thắng Điện Biên Phủ",
        date: "Ngày 7/5",
        description:
          "Lễ kỷ niệm chiến thắng Điện Biên Phủ 7/5/1954 hàng năm với diễu binh, dâng hương tại nghĩa trang liệt sỹ và các hoạt động tri ân.",
        significance: "Lễ kỷ niệm lịch sử quốc gia",
        image: "/Images/Landingpagedienbien/img4643-17150517001891572250202.jpg",
      },
      {
        name: "Lễ hội Gầu Tào H'Mông",
        date: "Mùng 1-5 Tết",
        description:
          "Lễ hội đầu năm của người H'Mông Điện Biên với múa khèn, ném pao và hội chợ phiên vùng cao sôi động đầu xuân.",
        significance: "Lễ hội người H'Mông",
        image: "/Images/Landingpagedienbien/le-hoi-gau-tao-ha-giang-le-hoi-dac-sac-cua-dong-bao-nguoi-mong-02-1642173152.jpg",
      },
      {
        name: "Chợ phiên Điện Biên Đông",
        date: "Định kỳ hàng tuần",
        description:
          "Chợ phiên vùng cao đa sắc tộc – nơi giao lưu văn hóa và thương mại của người Thái, H'Mông, Khơ Mú vùng biên giới.",
        significance: "Chợ phiên đa sắc tộc",
        image: "/Images/Landingpagedienbien/chophien_28_12-10-2021-09-35-20.jpg",
      },
    ],
    specialties: [
      {
        name: "Xôi nếp nương",
        description: "Dẻo thơm, hạt nếp bóng mẩy.",
        origin: "Điện Biên",
        image: "/Images/Landingpagedienbien/xoi.jpg",
      },
      {
        name: "Gà đen Tủa Chùa",
        description: "Thịt thơm, chắc.",
        origin: "Tủa Chùa",
        image: "/Images/Landingpagedienbien/ga-den-tua-chua-1-1016.jpg",
      },
      {
        name: "Rượu sâu chít",
        description: "Đặc sản núi rừng.",
        origin: "Mường Ảng",
        image: "/Images/Landingpagedienbien/z4794583699778_13ec8b56e1fc606dc602c7fd2bf2e59b.jpg",
      },
    ],
    tourism: [
      {
        name: "Đồi A1",
        description: "Di tích chiến thắng Điện Biên Phủ.",
        image: "/Images/Landingpagedienbien/doi-a1-noi-gin-giu-nhung-ky-uc-hao-hung-mot-thoi-cua-dan-toc-2-17125556800421812163728.jpg",
      },
      {
        name: "Hồ Pá Khoang",
        description: "Hồ nước trong xanh giữa núi.",
        image: "/Images/Landingpagedienbien/pa_khoang_006.jpg",
      },
      {
        name: "Cánh đồng Mường Thanh",
        description: "Cánh đồng lớn nhất Tây Bắc.",
        image: "/Images/Landingpagedienbien/1280px-Mường_Thanh_Valley.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Hoa Ban",
        description: "Lễ hội mùa xuân của người Thái.",
        image: "/Images/Landingpagedienbien/001-6-1673057777174385239911.jpg",
      },
      {
        name: "Nghệ thuật múa xòe",
        description: "Điệu múa truyền thống Tây Bắc.",
        image: "/Images/Landingpagedienbien/xt-1800x1200.jpeg",
      },
    ],
    gallery: [
      "/Images/Landingpagedienbien/1280px-Mường_Thanh_Valley.jpg",
      "/Images/Landingpagedienbien/pa_khoang_006.jpg",
      "/Images/Landingpagedienbien/Victory_in_Battle_of_Dien_Bien_Phu.jpg",
      "/Images/Landingpagedienbien/doi-a1-noi-gin-giu-nhung-ky-uc-hao-hung-mot-thoi-cua-dan-toc-2-17125556800421812163728.jpg",
      "/Images/Landingpagedienbien/0603ngayhoihoaban1-17097142067731284238982.jpg",
      "/Images/Landingpagedienbien/-Cho-Phien-Vung-Cao-.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Điện Biên",
        data: [
          { name: "TP Điện Biên Phủ", value: 43 },
          { name: "Điện Biên", value: 31 },
          { name: "Mường Ảng", value: 14 },
          { name: "Tuần Giáo", value: 18 },
          { name: "Mường Lay", value: 12 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Điện Biên",
        data: [
          { name: "Di tích lịch sử", value: 48 },
          { name: "Ẩm thực đặc sản", value: 18 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 14 },
        ],
      },
    },
  },
  {
    slug: "son-la",
    name: "Sơn La",
    slogan: "Mùa hoa ban nở giữa núi rừng",
    description:
      "Sơn La nổi bật với cao nguyên Mộc Châu, khí hậu mát mẻ và văn hóa dân tộc phong phú.",
    accentColor: "#15803d",
    heroImage: "/Images/Landingpagesonla/dji_0956.jpg",
    introImage: "/Images/Landingpagesonla/ghe-doc-review-cao-nguyen-moc-chau-nen-tho-hung-vi-1-1646148376.jpg",
    stats: [
      { value: "1050m", label: "Độ cao Mộc Châu" },
      { value: "12+", label: "Dân tộc thiểu số" },
      { value: "100+", label: "Lễ hội văn hóa" },
      { value: "30+", label: "Làng nghề truyền thống" },
    ],
    timeline: [
      {
        year: "Thời cổ đại",
        title: "Vương quốc Thái trắng",
        description:
          "Sơn La là vùng đất của người Thái trắng từ ngàn xưa với tổ chức xã hội Mường, bản độc đáo và văn hóa xòe Thái phong phú.",
        icon: "🏔️",
        image: "/Images/Landingpagesonla/618024470_1477467984382299_8741246800668610743_n.jpg",
      },
      {
        year: "Thế kỷ XIX",
        title: "Nhà tù Sơn La thực dân",
        description:
          "Thực dân Pháp xây nhà tù Sơn La để giam cầm các chiến sỹ cách mạng – nơi nhiều lãnh đạo Đảng bị giam giữ và tiếp tục hoạt động.",
        icon: "⛓️",
        image: "/Images/Landingpagesonla/anh-lan-1-dien-tu-(6).jpg",
      },
      {
        year: "1952",
        title: "Giải phóng Sơn La",
        description:
          "Chiến dịch Tây Bắc 1952 giải phóng Sơn La, tạo vùng tự do Tây Bắc quan trọng cho cách mạng và sau đó là chiến thắng Điện Biên Phủ.",
        icon: "⭐",
        image: "/Images/Landingpagesonla/anh-lan-1-dien-tu-(6).jpg",
      },
      {
        year: "Hiện đại",
        title: "Mộc Châu – thiên đường mùa hoa",
        description:
          "Mộc Châu nổi tiếng với hoa cải trắng, hoa mận, hoa đào bung nở đầu xuân – điểm đến du lịch hàng đầu miền Bắc mỗi dịp Tết.",
        icon: "🌸",
        image: "/Images/Landingpagesonla/top-5-thien-duong-check-in-dep-me-ly-voi-mua-hoa-cai-moc-chau-5f925f8792adc.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Dệt thổ cẩm bản Áng",
        product: "Thổ cẩm Thái",
        description:
          "Bản Áng – Mộc Châu nổi tiếng với nghề dệt thổ cẩm Thái trắng tuyệt đẹp, các sản phẩm khăn piêu, váy áo được du khách yêu thích.",
        image: "/Images/Landingpagesonla/img_0786.jpeg",
        age: "Truyền thống lâu đời",
      },
      {
        name: "Nghề làm rượu cần",
        product: "Rượu cần truyền thống",
        description:
          "Rượu cần – thức uống không thể thiếu trong lễ hội của người Thái, Mường Sơn La, được ủ từ gạo nếp và men lá theo bí quyết gia truyền.",
        image: "/Images/Landingpagesonla/32.jpg",
        age: "Truyền thống",
      },
      {
        name: "Mộc Châu – vườn chè",
        product: "Chè Shan tuyết Mộc Châu",
        description:
          "Vùng chè Mộc Châu với giống chè Shan tuyết và OIM cung cấp nguyên liệu cho các thương hiệu chè nổi tiếng và xuất khẩu quốc tế.",
        image: "/Images/Landingpagesonla/Đồi-chè-Mộc-Châu-ivivu-1.jpg",
        age: "50+ năm",
      },
      {
        name: "Trang trại bò sữa",
        product: "Sản phẩm từ sữa bò",
        description:
          "Mộc Châu nổi tiếng với các trang trại bò sữa quy mô lớn, sản xuất sữa tươi và các sản phẩm từ sữa chất lượng cao.",
        image: "/Images/Landingpagesonla/kham-pha-ve-dep-cua-trang-trai-bo-sua-daily-farm-moc-chau-1645867246.jpg",
        age: "50+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Hoa Đào Mộc Châu",
        date: "Tháng 1-2 (mùa hoa nở)",
        description:
          "Lễ hội mùa hoa đào, mận bung nở ở Mộc Châu thu hút hàng chục nghìn du khách mỗi dịp Tết đến ngắm cảnh thiên nhiên thơ mộng.",
        significance: "Lễ hội mùa hoa đặc trưng",
        image: "/Images/Landingpagesonla/MC4.jpg",
      },
      {
        name: "Lễ hội Hoa Ban",
        date: "Tháng 2-3 âm lịch",
        description:
          "Lễ hội mùa xuân của người Thái Sơn La với hoa ban nở trắng núi rừng, múa xòe và hát thơ giao duyên dưới ánh trăng.",
        significance: "Lễ hội mùa xuân người Thái",
        image: "/Images/Landingpagesonla/1._hoat_dong_thi_trai_van_hoa_nam_nay_da_thu_hut_12_trai_van_hoa_cua_cac_xa_phuong_tren_dia_ban_thanh_pho_son_la.png",
      },
      {
        name: "Lễ hội Mường Bú",
        date: "Mùng 13 tháng Giêng",
        description:
          "Lễ hội dân gian đặc sắc tại Mường Bú với các nghi lễ cầu mùa, ném còn và múa xòe truyền thống của người Thái Sơn La.",
        significance: "Lễ hội dân gian người Thái",
        image: "/Images/Landingpagesonla/vedepquyenrucuacogaitaybactrong-dieumuaxoethai6-16761224922841135214608.png",
      },
      {
        name: "Chợ phiên Mộc Châu",
        date: "Định kỳ hàng tuần",
        description:
          "Chợ phiên Mộc Châu là nơi gặp gỡ của người Thái, H'Mông, Mường với các sản phẩm nông sản, thổ cẩm và đặc sản vùng cao.",
        significance: "Văn hóa chợ phiên đa dân tộc",
        image: "/Images/Landingpagesonla/maxresdefault.jpg",
      },
    ],
    specialties: [
      {
        name: "Bê chao Mộc Châu",
        description: "Thịt bê mềm, thơm.",
        origin: "Mộc Châu",
        image: "/Images/Landingpagesonla/be-caho-1_d14780feeef743d8af3e393ad189125e_1024x1024.jpg",
      },
      {
        name: "Sữa tươi Mộc Châu",
        description: "Sữa tươi ngọt thanh.",
        origin: "Mộc Châu",
        image: "/Images/Landingpagesonla/kham-pha-ve-dep-cua-trang-trai-bo-sua-daily-farm-moc-chau-1645867246.jpg",
      },
      {
        name: "Táo mèo",
        description: "Quả rừng chua ngọt.",
        origin: "Bắc Yên",
        image: "/Images/Landingpagesonla/dac-san-tao-meo-yen-bai-va-huong-vi-nui-rung-1-1646115050.jpg",
      },
    ],
    tourism: [
      {
        name: "Cao nguyên Mộc Châu",
        description: "Thảo nguyên xanh mát quanh năm.",
        image: "/Images/Landingpagesonla/dji_0956.jpg",
      },
      {
        name: "Đồi chè Mộc Châu",
        description: "Đồi chè trải dài bạt ngàn.",
        image: "/Images/Landingpagesonla/4_khu-du-lich-doi-che-trai-tim-chup-tu-tren-cao(1).jpg",
      },
      {
        name: "Ngũ động Bản Ôn",
        description: "Hang động đẹp giữa núi.",
        image: "/Images/Landingpagesonla/kham-pha-ngu-dong-ban-on-tren-cao-nguyen-moc-chau-dep-ky-vi-02-1644504036.jpeg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Hết Chá",
        description: "Nghi lễ đặc sắc của người Thái.",
        image: "/Images/Landingpagesonla/img_5243(1).jpg",
      },
      {
        name: "Múa xòe",
        description: "Điệu múa truyền thống Tây Bắc.",
        image: "/Images/Landingpagesonla/vedepquyenrucuacogaitaybactrong-dieumuaxoethai6-16761224922841135214608.png",
      },
    ],
    gallery: [
      "/Images/Landingpagesonla/dji_0956.jpg",
      "/Images/Landingpagesonla/Đồi-chè-Mộc-Châu-ivivu-1.jpg",
      "/Images/Landingpagesonla/MC4.jpg",
      "/Images/Landingpagesonla/be-caho-1_d14780feeef743d8af3e393ad189125e_1024x1024.jpg",
      "/Images/Landingpagesonla/kham-pha-ngu-dong-ban-on-tren-cao-nguyen-moc-chau-dep-ky-vi-02-1644504036.jpeg",
      "/Images/Landingpagesonla/vedepquyenrucuacogaitaybactrong-dieumuaxoethai6-16761224922841135214608.png",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Sơn La",
        data: [
          { name: "TP Sơn La", value: 28 },
          { name: "Mộc Châu", value: 36 },
          { name: "Mai Sơn", value: 17 },
          { name: "Thuận Châu", value: 21 },
          { name: "Quỳnh Nhai", value: 14 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Sơn La",
        data: [
          { name: "Di tích lịch sử", value: 28 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 32 },
        ],
      },
    },
  },
  {
    slug: "thanh-hoa",
    name: "Thanh Hóa",
    slogan: "Đất địa linh và biển xanh",
    description:
      "Thanh Hóa hội tụ di sản văn hóa, bãi biển Sầm Sơn và ẩm thực phong phú.",
    accentColor: "#9a3412",
    heroImage: "/Images/Landingpagethanhhoa/bai-bien-sam-son-o-dau.jpg",
    introImage: "/Images/Landingpagethanhhoa/165d5070801t88966l0.jpg",
    stats: [
      { value: "2000+", label: "Năm lịch sử" },
      { value: "800+", label: "Di tích văn hóa" },
      { value: "100+", label: "Lễ hội truyền thống" },
      { value: "40+", label: "Làng nghề đặc sắc" },
    ],
    timeline: [
      {
        year: "Thế kỷ I TCN",
        title: "Văn hóa Đông Sơn",
        description:
          "Thanh Hóa là trung tâm của nền văn hóa Đông Sơn nổi tiếng – văn hóa trống đồng đặc trưng của cư dân Việt cổ từ hơn 2000 năm trước.",
        icon: "🥁",
        image: "/Images/Landingpagethanhhoa/1280px-Trong_dong_Dong_Son_Guimet.jpg",
      },
      {
        year: "40-43",
        title: "Khởi nghĩa Bà Triệu",
        description:
          "Bà Triệu Thị Trinh (Bà Triệu) phát động khởi nghĩa tại Thanh Hóa năm 248 chống ách thống trị Ngô, câu nói lừng danh: 'Tôi muốn cưỡi cơn gió mạnh, đạp sóng dữ...'",
        icon: "⚔️",
        image: "/Images/Landingpagethanhhoa/ba_trieu1-2.jpg",
      },
      {
        year: "1428",
        title: "Lê Lợi – khởi nghĩa Lam Sơn",
        description:
          "Lê Lợi xuất thân từ Lam Sơn – Thanh Hóa lãnh đạo 10 năm kháng chiến chống Minh, khai sinh triều Lê – triều đại lâu dài nhất Việt Nam.",
        icon: "🏆",
        image: "/Images/Landingpagethanhhoa/le-hoi-lam-kinh-3.jpg",
      },
      {
        year: "Hiện đại",
        title: "Công nghiệp và biển xanh",
        description:
          "Thanh Hóa phát triển công nghiệp lọc hóa dầu Nghi Sơn trong khi bảo tồn di sản văn hóa Thành nhà Hồ và nghỉ dưỡng biển Sầm Sơn.",
        icon: "🌊",
        image: "/Images/Landingpagethanhhoa/mkl3-17181587771161307460895.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề chiếu cói Nga Sơn",
        product: "Chiếu cói đặc sản",
        description:
          "Chiếu cói Nga Sơn nổi tiếng cả nước với sợi cói dẻo bóng, màu sắc bền đẹp – sản phẩm truyền thống lâu đời được ưa chuộng rộng rãi.",
        image: "/Images/Landingpagethanhhoa/AD_4nXfa0BPWSeJxoMFMAcQg3rIU54Otc10-7gbqdgPh0jF8CpZUrCMnZ19LZpbh_bvluRePD5D9C0QVrpHBaPBoXsTgUAmU9xMVPPGgqfArwGU8cfu5rxwuek6euqryeIlzZjhyWvZ5YMVygqxOEBP5kCqrAU5JqYTN.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng đúc đồng Trà Đông",
        product: "Đồ đồng mỹ nghệ",
        description:
          "Làng nghề đúc đồng Trà Đông (Thiệu Hóa) sản xuất trống đồng, chuông, lư hương và các vật dụng đồng nghệ thuật theo kỹ thuật truyền thống.",
        image: "/Images/Landingpagethanhhoa/tradong.jpg",
        age: "500+ năm",
      },
      {
        name: "Nghề dệt lụa Hồng Đô",
        product: "Lụa tơ tằm",
        description:
          "Làng dệt lụa truyền thống tại Thiệu Hóa sản xuất lụa tơ tằm cao cấp với màu sắc tự nhiên và kỹ thuật dệt thủ công tinh tế.",
        image: "/Images/Landingpagethanhhoa/hong-do.jpeg",
        age: "300+ năm",
      },
      {
        name: "Làng nghề bánh gai Tứ Trụ",
        product: "Bánh gai đặc sản",
        description:
          "Bánh gai Tứ Trụ – đặc sản Thọ Xuân nổi tiếng với vị dẻo thơm, nhân đậu xanh béo ngọt và lá gai từ vùng đất địa linh Lam Sơn.",
        image: "/Images/Landingpagethanhhoa/banh-gai-tu-tru-1.jpg",
        age: "200+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội Lam Kinh",
        date: "Ngày 22 tháng 8 âm lịch",
        description:
          "Lễ hội lớn nhất Thanh Hóa tưởng nhớ anh hùng Lê Lợi và các vua Lê tại Lam Kinh với rước kiệu, hát hò sông Mã và diễu hành truyền thống.",
        significance: "Quốc lễ tưởng nhớ nhà Lê",
        image: "/Images/Landingpagethanhhoa/le-hoi-lam-kinh-7.jpg",
      },
      {
        name: "Lễ hội Bà Triệu",
        date: "Ngày 21-23 tháng 2 âm lịch",
        description:
          "Lễ hội tưởng nhớ Anh hùng dân tộc Triệu Thị Trinh tại núi Nưa, Yên Định với nghi lễ trang trọng, rước kiệu và biểu diễn tuồng chèo.",
        significance: "Lễ hội anh hùng dân tộc",
        image: "/Images/Landingpagethanhhoa/ba_trieu1-2.jpg",
      },
      {
        name: "Lễ hội đền Độc Cước",
        date: "Tháng 5-6 âm lịch",
        description:
          "Lễ hội tại đền Độc Cước trên vách đá ven biển Sầm Sơn thờ thần biển với nghi lễ cầu ngư và đua thuyền truyền thống.",
        significance: "Lễ hội thần biển Sầm Sơn",
        image: "/Images/Landingpagethanhhoa/1280px-Lehoidendinh.jpg",
      },
      {
        name: "Hội vật Làng Sình",
        date: "Mùng 9-10 tháng Giêng",
        description:
          "Hội vật truyền thống đặc sắc với các đô vật từ khắp nơi về tranh tài trong không khí xuân tưng bừng của xứ Thanh.",
        significance: "Lễ hội thể thao dân gian",
        image: "/Images/Landingpagethanhhoa/Khamphahue-LeHoiVatLangSinh3.jpeg",
      },
    ],
    specialties: [
      {
        name: "Nem chua",
        description: "Chua cay, thơm mùi lá.",
        origin: "Thanh Hóa",
        image: "/Images/Landingpagethanhhoa/gia-nem-chua-o-thanh-hoa.jpg",
      },
      {
        name: "Bánh gai Tứ Trụ",
        description: "Bánh dẻo thơm, nhân đậu xanh.",
        origin: "Thọ Xuân",
        image: "/Images/Landingpagethanhhoa/p6d_pxkr.jpg",
      },
      {
        name: "Hải sản Sầm Sơn",
        description: "Tươi ngon từ biển.",
        origin: "Sầm Sơn",
        image: "/Images/Landingpagethanhhoa/Dac-san-hai-san-Sam-Son.jpg",
      },
    ],
    tourism: [
      {
        name: "Thành nhà Hồ",
        description: "Di sản thế giới với kiến trúc đá.",
        image: "/Images/Landingpagethanhhoa/1280px-Cổng_Nam.jpg",
      },
      {
        name: "Biển Sầm Sơn",
        description: "Bãi biển nổi tiếng miền Bắc.",
        image: "/Images/Landingpagethanhhoa/1280px-Bãi_biển_Sầm_Sơn_2.jpg",
      },
      {
        name: "Suối cá Cẩm Lương",
        description: "Kỳ quan thiên nhiên độc đáo.",
        image: "/Images/Landingpagethanhhoa/1280px-Suoi_ca_Cam_Luong.jpg",
      },
    ],
    culture: [
      {
        name: "Lễ hội Lam Kinh",
        description: "Tưởng nhớ vua Lê Lợi.",
        image: "/Images/Landingpagethanhhoa/57-1774532417-z64275559118859dddfe410a5727b32f40f2ca420ffa84.jpg",
      },
      {
        name: "Hò sông Mã",
        description: "Làn điệu dân gian xứ Thanh.",
        image: "/Images/Landingpagethanhhoa/maxresdefault_2.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagethanhhoa/samson4.jpg",
      "/Images/Landingpagethanhhoa/1920px-Cầu_Bông_Lau.jpg",
      "/Images/Landingpagethanhhoa/le-hoi-lam-kinh-3.jpg",
      "/Images/Landingpagethanhhoa/Dac-san-hai-san-Sam-Son.jpg",
      "/Images/Landingpagethanhhoa/1280px-Suoi_ca_Cam_Luong.jpg",
      "/Images/Landingpagethanhhoa/ba_trieu1-2.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Thanh Hóa",
        data: [
          { name: "TP Thanh Hóa", value: 34 },
          { name: "Sầm Sơn", value: 27 },
          { name: "Lam Kinh", value: 38 },
          { name: "Bỉm Sơn", value: 16 },
          { name: "Hà Trung", value: 19 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Thanh Hóa",
        data: [
          { name: "Di tích lịch sử", value: 40 },
          { name: "Ẩm thực đặc sản", value: 23 },
          { name: "Lễ hội truyền thống", value: 22 },
          { name: "Làng nghề / Sinh thái", value: 15 },
        ],
      },
    },
  },
  {
    slug: "nghe-an",
    name: "Nghệ An",
    slogan: "Miền quê xứ Nghệ giàu truyền thống",
    description:
      "Nghệ An là quê hương Chủ tịch Hồ Chí Minh, với bãi biển đẹp và ẩm thực đậm đà.",
    accentColor: "#b91c1c",
    heroImage:
      "/Images/Landingpagenghean/pexels-quang-nguyen-vinh-222549-11669960.jpg",
    introImage:
      "/Images/Landingpagenghean/pexels-vo-van-ti-n-2037497312-29624001.jpg",
    stats: [
      { value: "1000+", label: "Năm lịch sử" },
      { value: "1000+", label: "Di tích văn hóa" },
      { value: "100+", label: "Lễ hội truyền thống" },
      { value: "Quê hương", label: "Chủ tịch Hồ Chí Minh" },
    ],
    timeline: [
      {
        year: "Thế kỷ X",
        title: "Đất xứ Nghệ hào kiệt",
        description:
          "Nghệ An là đất địa linh nhân kiệt với nhiều danh nhân lịch sử như Nguyễn Trãi, Phan Bội Châu, và đặc biệt là Chủ tịch Hồ Chí Minh.",
        icon: "⭐",
        image: "/Images/Landingpagenghean/header18_2020113021328.jpg",
      },
      {
        year: "1890",
        title: "Sinh Chủ tịch Hồ Chí Minh",
        description:
          "Nguyễn Sinh Cung – sau này là Chủ tịch Hồ Chí Minh ra đời tại làng Sen, Kim Liên, Nghệ An, quê hương của vị lãnh tụ vĩ đại dân tộc.",
        icon: "🌟",
        image: "/Images/Landingpagenghean/Ho_Chi_Minh_-_1946_Portrait.jpg",
      },
      {
        year: "1930-1931",
        title: "Xô viết Nghệ Tĩnh",
        description:
          "Phong trào Xô viết Nghệ Tĩnh 1930-1931 – cuộc đấu tranh cách mạng tiên phong của nhân dân xứ Nghệ dưới sự lãnh đạo của Đảng Cộng sản.",
        icon: "✊",
        image:
          "/Images/Landingpagenghean/tranh-ve-cao-trao-xo-viet-nghe-tinh-cua-tac-gia-nguyen-duc-nung-1.jpg",
      },
      {
        year: "2009",
        title: "Dân ca ví giặm UNESCO",
        description:
          "Dân ca Ví, Giặm Nghệ Tĩnh được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại – biểu tượng âm nhạc dân gian xứ Nghệ.",
        icon: "🎶",
        image:
          "/Images/Landingpagenghean/pexels-vo-van-ti-n-2037497312-29501888.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng dệt lụa Quỳnh Lưu",
        product: "Lụa tơ tằm",
        description:
          "Nghề dệt lụa truyền thống tại Quỳnh Lưu với sản phẩm tơ tằm mềm mịn, nổi tiếng tại các thị trường miền Bắc và miền Trung.",
        image:
          "/Images/Landingpagenghean/nghe-det-lua-nha-xa-di-san-van-hoa-phi-vat-the-q-56-0.jpg",
        age: "300+ năm",
      },
      {
        name: "Làng nghề gỗ mỹ nghệ Thanh Chương",
        product: "Đồ gỗ điêu khắc",
        description:
          "Làng nghề chạm khắc gỗ tại Thanh Chương sản xuất đồ nội thất, tranh gỗ và đồ thờ cúng với kỹ thuật điêu khắc tinh xảo.",
        image: "/Images/Landingpagenghean/pexels-nguyendesigner-15772948.jpg",
        age: "200+ năm",
      },
      {
        name: "Làng nghề đá Diễn Châu",
        product: "Đá granit chế tác",
        description:
          "Vùng chế tác đá granit Diễn Châu với các sản phẩm trang trí, bia đá và công trình xây dựng phục vụ cả nước.",
        image:
          "/Images/Landingpagenghean/pexels-duc-nguyen-400576574-18582529.jpg",
        age: "100+ năm",
      },
      {
        name: "Làng chè Thanh Chương",
        product: "Chè đặc sản xứ Nghệ",
        description:
          "Vùng chè Thanh Chương – Con Cuông nổi tiếng với chè búp xanh tươi, hương thơm thanh mát là đặc sản của vùng đất miền Tây Nghệ An.",
        image:
          "/Images/Landingpagenghean/pexels-quang-nguyen-vinh-222549-6871933.jpg",
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội đền Cuông",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội lớn nhất Nghệ An tại đền Cuông thờ vua Thục Phán An Dương Vương với lễ rước kiệu, lễ tế và các trò chơi dân gian.",
        significance: "Lễ hội lớn nhất xứ Nghệ",
        image: "/Images/Landingpagenghean/pexels-hson-30600045.jpg",
      },
      {
        name: "Lễ hội đền Vua Lê",
        date: "Tháng 2 âm lịch",
        description:
          "Lễ hội kỷ niệm vua Lê Thái Tổ và nhà Lê tại các đền miếu xứ Nghệ với nghi lễ trang trọng và biểu diễn dân gian.",
        significance: "Lễ hội tưởng niệm triều Lê",
        image:
          "/Images/Landingpagenghean/pexels-felix-schickel-2151168240-36838205.jpg",
      },
      {
        name: "Hội làng Sen",
        date: "Ngày 19/5",
        description:
          "Lễ kỷ niệm sinh nhật Bác Hồ tại làng Sen Kim Liên – quê hương của Chủ tịch Hồ Chí Minh với các hoạt động văn hóa ý nghĩa.",
        significance: "Lễ kỷ niệm Bác Hồ",
        image: "/Images/Landingpagenghean/Anh_Dep_Resized.jpg",
      },
      {
        name: "Festival Dân ca ví giặm",
        date: "Hàng năm",
        description:
          "Festival tôn vinh dân ca Ví Giặm Nghệ Tĩnh với các buổi biểu diễn, giao lưu và trình diễn của các nghệ nhân hát ví giặm.",
        significance: "Di sản phi vật thể UNESCO",
        image: "/Images/Landingpagenghean/5-4.jpg",
      },
    ],
    specialties: [
      {
        name: "Cháo lươn",
        description: "Nước dùng đậm đà, lươn thơm.",
        origin: "Vinh",
        image:
          "/Images/Landingpagenghean/pexels-vui-nguyen-745287463-35839646.jpg",
      },
      {
        name: "Nhút Thanh Chương",
        description: "Món ăn dân dã từ mít non.",
        origin: "Thanh Chương",
        image:
          "/Images/Landingpagenghean/nhut-nghe-an-la-mon-an-lam-tu-qua-gi-xua-mon-nha-ngheo-nay-la-qua-gui-di-xa-anh-6-1750.jpg",
      },
      {
        name: "Cam Vinh",
        description: "Cam mọng nước, thơm ngọt.",
        origin: "Vinh",
        image: "/Images/Landingpagenghean/pexels-ivett-33549534.jpg",
      },
    ],
    tourism: [
      {
        name: "Làng Sen",
        description: "Quê hương Chủ tịch Hồ Chí Minh.",
        image: "/Images/Landingpagenghean/km8_20250515223122.jpg",
      },
      {
        name: "Biển Cửa Lò",
        description: "Bãi biển sôi động miền Trung.",
        image:
          "/Images/Landingpagenghean/pexels-hang-thu-1121481316-29763020.jpg",
      },
      {
        name: "Đảo Lan Châu",
        description: "Điểm ngắm hoàng hôn tuyệt đẹp.",
        image: "/Images/Landingpagenghean/pexels-107018629-9839229.jpg",
      },
    ],
    culture: [
      {
        name: "Dân ca ví giặm",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image:
          "/Images/Landingpagenghean/171707-cac-tiet-muc-vi-giam-dac-sac-duoc-bieu-dien-tai-buoi-le-anh-van-ty-ttxvn.jpg",
      },
      {
        name: "Lễ hội đền Cuông",
        description: "Lễ hội truyền thống xứ Nghệ.",
        image:
          "/Images/Landingpagenghean/uploaded-thanhthuybna-2024_03_23-_bna-3-8616.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagenghean/pexels-tran-le-tuan-865376-9914029.jpg",
      "/Images/Landingpagenghean/pexels-van-long-bui-1496562-4438930.jpg",
      "/Images/Landingpagenghean/baodanang.vn-dataimages-202106-original-_images1611388_07__2_.jpg",
      "/Images/Landingpagenghean/pexels-green-odette-232224115-12574164.jpg",
      "/Images/Landingpagenghean/pexels-manishjangid-30195882.jpg",
      "/Images/Landingpagenghean/pexels-hson-30600045.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Nghệ An",
        data: [
          { name: "TP Vinh", value: 37 },
          { name: "Nam Đàn", value: 43 },
          { name: "Đô Lương", value: 21 },
          { name: "Diễn Châu", value: 17 },
          { name: "Quỳnh Lưu", value: 14 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Nghệ An",
        data: [
          { name: "Di tích lịch sử", value: 42 },
          { name: "Ẩm thực đặc sản", value: 22 },
          { name: "Lễ hội truyền thống", value: 20 },
          { name: "Làng nghề / Sinh thái", value: 16 },
        ],
      },
    },
  },
  {
    slug: "ha-tinh",
    name: "Hà Tĩnh",
    slogan: "Dải đất miền Trung trầm mặc",
    description:
      "Hà Tĩnh nổi bật với bãi biển hoang sơ, núi Hồng Lĩnh và văn hóa dân ca đặc sắc.",
    accentColor: "#92400e",
    heroImage: "/Images/Landingpagehatinh/bien-thien-cam-ha-tinh-banner.jpg",
    introImage: "/Images/Landingpagehatinh/nui-hong-linh-topbanner.jpg",
    stats: [
      { value: "1000+", label: "Năm lịch sử" },
      { value: "500+", label: "Di tích văn hóa" },
      { value: "80+", label: "Lễ hội truyền thống" },
      { value: "Quê hương", label: "Đại thi hào Nguyễn Du" },
    ],
    timeline: [
      {
        year: "Thế kỷ X",
        title: "Vùng đất địa linh xứ Nghệ",
        description:
          "Hà Tĩnh là mảnh đất địa linh sản sinh nhiều danh nhân lịch sử, điển hình là đại thi hào Nguyễn Du – tác giả Truyện Kiều bất hủ.",
        icon: "📜",
        image: "/Images/Landingpagehatinh/1_20240912094506.jpg",
      },
      {
        year: "1765",
        title: "Nguyễn Du ra đời",
        description:
          "Đại thi hào Nguyễn Du sinh tại Tiên Điền, Hà Tĩnh – tác giả của Truyện Kiều, kiệt tác văn học Việt Nam được cả thế giới công nhận.",
        icon: "✍️",
        image: "/Images/Landingpagehatinh/a7.jpg",
      },
      {
        year: "1930",
        title: "Xô viết Nghệ Tĩnh",
        description:
          "Nhân dân Hà Tĩnh cùng Nghệ An nổi dậy trong phong trào Xô viết Nghệ Tĩnh 1930-1931 – biểu tượng tinh thần yêu nước bất khuất.",
        icon: "✊",
        image: "/Images/Landingpagehatinh/xo-viet.jpg",
      },
      {
        year: "2009",
        title: "Dân ca ví giặm UNESCO",
        description:
          "Cùng Nghệ An, Hà Tĩnh đóng góp dân ca Ví Giặm được UNESCO công nhận Di sản văn hóa phi vật thể, khẳng định bản sắc văn hóa xứ Nghệ.",
        icon: "🎶",
        image: "/Images/Landingpagehatinh/Vi-Giam-Di-San-01.jpg",
      },
    ],
    craftVillages: [
      {
        name: "Làng nghề mộc Thái Yên",
        product: "Đồ gỗ mỹ nghệ",
        description:
          "Làng nghề mộc Thái Yên sản xuất đồ nội thất, tủ thờ và tranh gỗ điêu khắc tinh xảo, nổi tiếng khắp miền Trung.",
        image: "/Images/Landingpagehatinh/pexels-hson-32357249.jpg",
        age: "300+ năm",
      },
      {
        name: "Làng chiếu cói Phú Lộc",
        product: "Chiếu cói",
        description:
          "Nghề dệt chiếu cói truyền thống tại vùng ven biển Hà Tĩnh với sản phẩm bền đẹp phục vụ đời sống và thị trường trong nước.",
        image:
          "/Images/Landingpagehatinh/pexels-quang-nguyen-vinh-222549-6713126.jpg",
        age: "200+ năm",
      },
      {
        name: "Kẹo cu đơ Hồng Lĩnh",
        product: "Kẹo cu đơ đặc sản",
        description:
          "Kẹo cu đơ – đặc sản nổi tiếng nhất Hà Tĩnh làm từ lạc và mật mía với vị ngọt bùi đặc trưng, gắn liền với vùng đất núi Hồng Lĩnh.",
        image: "/Images/Landingpagehatinh/keo-cu-do-thanh-dat-ha-tinh.jpeg",
        age: "100+ năm",
      },
      {
        name: "Nước mắm Kỳ Anh",
        product: "Nước mắm truyền thống",
        description:
          "Nghề làm nước mắm truyền thống tại Kỳ Anh với cá biển tươi nguyên liệu, tạo ra nước mắm thơm ngon đặc trưng vùng biển miền Trung.",
        image:
          "/Images/Landingpagehatinh/pexels-quang-nguyen-vinh-222549-8260101.jpg",
        age: "200+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội đền Bà Hải",
        date: "Tháng Giêng âm lịch",
        description:
          "Lễ hội tín ngưỡng thờ Bà Hải – thần biển của ngư dân Hà Tĩnh với nghi lễ cầu ngư, rước thuyền và các trò chơi dân gian ven biển.",
        significance: "Lễ hội tín ngưỡng biển",
        image: "/Images/Landingpagehatinh/11-1612344797-dua-thuyen-6.jpg",
      },
      {
        name: "Lễ hội Nguyễn Du",
        date: "Tháng 4 âm lịch",
        description:
          "Lễ hội tôn vinh đại thi hào Nguyễn Du tại Tiên Điền với các hoạt động đọc thơ, bình Kiều và triển lãm về cuộc đời tác giả.",
        significance: "Lễ hội văn học đặc trưng",
        image: "/Images/Landingpagehatinh/a7.jpg",
      },
      {
        name: "Lễ hội đền Phủ Thổ",
        date: "Mùng 10-15 tháng Giêng",
        description:
          "Lễ hội dân gian tại Đức Thọ với các nghi thức tín ngưỡng thờ Mẫu và các trò chơi dân gian truyền thống.",
        significance: "Lễ hội tín ngưỡng dân gian",
        image:
          "/Images/Landingpagehatinh/3d0bee13-9f2a-496e-8b39-86105e91155b.jpg",
      },
      {
        name: "Hội đua thuyền Nghi Xuân",
        date: "Mùng 5 tháng 5 âm lịch",
        description:
          "Lễ hội đua thuyền truyền thống trên sông Ngàn Phố và sông Cả với các đội thuyền từ các xã thi đua trong không khí sôi động.",
        significance: "Lễ hội sông nước truyền thống",
        image: "/Images/Landingpagehatinh/hinh-anh-le-hoi-dua-thuyen.jpg",
      },
    ],
    specialties: [
      {
        name: "Kẹo cu đơ",
        description: "Ngọt thơm vị lạc và mật mía.",
        origin: "Hồng Lĩnh",
        image: "/Images/Landingpagehatinh/nguon-goc-keo-cu-do-o-ha-tinh.jpeg",
      },
      {
        name: "Bún bò Đức Thọ",
        description: "Nước dùng đậm vị.",
        origin: "Đức Thọ",
        image: "/Images/Landingpagehatinh/anh-8.jpg",
      },
      {
        name: "Mực nhảy",
        description: "Hải sản tươi ngon.",
        origin: "Thiên Cầm",
        image: "/Images/Landingpagehatinh/17120506444643.jpg",
      },
    ],
    tourism: [
      {
        name: "Biển Thiên Cầm",
        description: "Bãi biển hoang sơ, thơ mộng.",
        image: "/Images/Landingpagehatinh/Nui-Hong-Linh-3.jpg",
      },
      {
        name: "Núi Hồng Lĩnh",
        description: "Ngọn núi gắn với truyền thuyết.",
        image: "/Images/Landingpagehatinh/nui-hong-linh-topbanner.jpg",
      },
      {
        name: "Khu lưu niệm Nguyễn Du",
        description: "Không gian văn hóa của đại thi hào.",
        image: "/Images/Landingpagehatinh/image_ugi1620456658.jpg",
      },
    ],
    culture: [
      {
        name: "Dân ca ví giặm",
        description: "Nét văn hóa dân gian đặc sắc.",
        image: "/Images/Landingpagehatinh/anh-8.jpg",
      },
      {
        name: "Lễ hội Nguyễn Du",
        description: "Tôn vinh giá trị văn học.",
        image: "/Images/Landingpagehatinh/img-1032-copy.jpg",
      },
    ],
    gallery: [
      "/Images/Landingpagehatinh/Nui-Hong-Linh-3.jpg",
      "/Images/Landingpagehatinh/pexels-quang-nguyen-vinh-222549-35105812.jpg",
      "/Images/Landingpagehatinh/Vi-Giam-Di-San-01.jpg",
      "/Images/Landingpagehatinh/img-1032-copy.jpg",
      "/Images/Landingpagehatinh/17120506444643.jpg",
      "/Images/Landingpagehatinh/bien-thien-cam-ha-tinh-banner.jpg",
    ],
    charts: {
      barChart: {
        title: "Di tích theo huyện",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa nổi tiếng theo từng huyện của Hà Tĩnh",
        data: [
          { name: "TP Hà Tĩnh", value: 29 },
          { name: "Can Lộc", value: 22 },
          { name: "Nghi Xuân", value: 31 },
          { name: "Cẩm Xuyên", value: 17 },
          { name: "Hương Sơn", value: 19 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của Hà Tĩnh",
        data: [
          { name: "Di tích lịch sử", value: 38 },
          { name: "Ẩm thực đặc sản", value: 25 },
          { name: "Lễ hội truyền thống", value: 22 },
          { name: "Làng nghề / Sinh thái", value: 15 },
        ],
      },
    },
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
    stats: [
      { value: "3000+", label: "Năm lịch sử" },
      { value: "1000+", label: "Làng nghề truyền thống" },
      { value: "300+", label: "Lễ hội truyền thống" },
      { value: "15000 km²", label: "Diện tích đồng bằng" },
    ],
    timeline: [
      {
        year: "2879 TCN",
        title: "Nhà nước Văn Lang ra đời",
        description:
          "Đồng bằng sông Hồng là cái nôi của nền văn minh Việt cổ với nhà nước Văn Lang của các vua Hùng – trung tâm chính trị và kinh tế đầu tiên.",
        icon: "👑",
        image: heroLandscape,
      },
      {
        year: "1010",
        title: "Thăng Long – kinh đô nghìn năm",
        description:
          "Vua Lý Thái Tổ dời đô về Thăng Long (Hà Nội) – trung tâm của đồng bằng sông Hồng trở thành kinh đô nghìn năm của đất nước.",
        icon: "🏯",
        image: heroLandscape,
      },
      {
        year: "Thế kỷ XVI-XVIII",
        title: "Trăm nghề trăm làng",
        description:
          "Đồng bằng sông Hồng phát triển rực rỡ với hàng trăm làng nghề thủ công: gốm Bát Tràng, lụa Vạn Phúc, tranh Đông Hồ, đúc đồng...",
        icon: "🎨",
        image: heroLandscape,
      },
      {
        year: "Hiện đại",
        title: "Trung tâm kinh tế miền Bắc",
        description:
          "Đồng bằng sông Hồng là trung tâm kinh tế, văn hóa, giáo dục miền Bắc với Hà Nội dẫn đầu và nhiều tỉnh thành phát triển năng động.",
        icon: "🌟",
        image: heroLandscape,
      },
    ],
    craftVillages: [
      {
        name: "Làng gốm Bát Tràng",
        product: "Gốm sứ cao cấp",
        description:
          "Bát Tràng – làng nghề gốm sứ nổi tiếng nhất Việt Nam từ thế kỷ XV, sản xuất gốm xuất khẩu chất lượng cao sang hàng chục quốc gia.",
        image: heroLandscape,
        age: "600+ năm",
      },
      {
        name: "Làng lụa Vạn Phúc",
        product: "Lụa tơ tằm",
        description:
          "Lụa Vạn Phúc (Hà Đông) – thương hiệu lụa tơ tằm nổi tiếng nhất miền Bắc với những tấm lụa mềm mịn, hoa văn tinh tế dệt thủ công.",
        image: heroLandscape,
        age: "1200+ năm",
      },
      {
        name: "Làng nghề cói Kim Sơn",
        product: "Chiếu cói",
        description:
          "Kim Sơn (Ninh Bình) là vùng trồng cói và dệt chiếu lớn nhất miền Bắc, sản xuất chiếu bền đẹp phục vụ thị trường cả nước.",
        image: heroLandscape,
        age: "200+ năm",
      },
      {
        name: "Làng đúc đồng Đại Bái",
        product: "Đồ đồng thủ công",
        description:
          "Đại Bái (Bắc Ninh) – làng nghề đúc đồng lớn nhất miền Bắc với lịch sử gần 1000 năm, sản xuất chuông, tượng và đồ trang trí đồng.",
        image: heroLandscape,
        age: "900+ năm",
      },
    ],
    festivals: [
      {
        name: "Giỗ Tổ Hùng Vương",
        date: "Mùng 10 tháng 3 âm lịch",
        description:
          "Lễ hội lớn nhất cả nước tưởng nhớ các vua Hùng dựng nước tại Phú Thọ – nguồn cội của đồng bằng sông Hồng và cả dân tộc Việt Nam.",
        significance: "Quốc giỗ dân tộc Việt Nam",
        image: heroLandscape,
      },
      {
        name: "Hội Lim",
        date: "Mùng 13 tháng Giêng",
        description:
          "Hội Lim Bắc Ninh – hội tụ tinh hoa dân ca Quan họ di sản UNESCO, với các hội chơi và thi hát trên thuyền và trên cạn.",
        significance: "Lễ hội dân ca Quan họ UNESCO",
        image: heroLandscape,
      },
      {
        name: "Lễ hội chùa Hương",
        date: "Mùng 6 tháng Giêng – tháng 3 âm lịch",
        description:
          "Lễ hội lớn nhất miền Bắc tại quần thể chùa Hương Hà Nội, thu hút hàng triệu du khách đi thuyền và leo núi hành hương.",
        significance: "Lễ hội Phật giáo lớn nhất miền Bắc",
        image: heroLandscape,
      },
      {
        name: "Hội Gióng đền Phù Đổng",
        date: "Mùng 8-9 tháng 4 âm lịch",
        description:
          "Lễ hội UNESCO di sản phi vật thể tại đền Phù Đổng Hà Nội tưởng nhớ Thánh Gióng đánh giặc Ân, tái hiện trận chiến qua nghi lễ đặc sắc.",
        significance: "Di sản phi vật thể UNESCO",
        image: heroLandscape,
      },
    ],
    specialties: [
      {
        name: "Bún thang",
        description: "Tinh tế, thanh nhẹ với hương vị Hà Nội.",
        origin: "Hà Nội",
        image: phoImage,
      },
      {
        name: "Bánh gai",
        description: "Bánh dẻo thơm, nhân đậu xanh.",
        origin: "Ninh Giang",
        image: cuisineImage,
      },
      {
        name: "Chè sen",
        description: "Vị thanh mát từ sen vùng châu thổ.",
        origin: "Hưng Yên",
        image: heroLandscape,
      },
    ],
    tourism: [
      {
        name: "Phố cổ Hà Nội",
        description: "Không gian văn hóa và ẩm thực đậm chất Bắc Bộ.",
        image: heroLandscape,
      },
      {
        name: "Làng nghề gốm Bát Tràng",
        description: "Di sản thủ công truyền thống.",
        image: thangLongImage,
      },
      {
        name: "Vườn nhãn Hưng Yên",
        description: "Mùa quả ngọt tràn ngập sắc màu.",
        image: coffeeImage,
      },
    ],
    culture: [
      {
        name: "Quan họ Bắc Ninh",
        description: "Di sản văn hóa phi vật thể UNESCO.",
        image: cuisineImage,
      },
      {
        name: "Lễ hội làng",
        description: "Gắn kết cộng đồng, giữ gìn bản sắc.",
        image: heroLandscape,
      },
    ],
    gallery: [
      thangLongImage,
      cuisineImage,
      heroLandscape,
      phoImage,
      halongImage,
      seafoodImage,
    ],
    charts: {
      barChart: {
        title: "Di tích theo tỉnh thành",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa tiêu biểu theo tỉnh thành vùng Đồng Bằng Sông Hồng",
        data: [
          { name: "Hà Nội", value: 48 },
          { name: "Ninh Bình", value: 36 },
          { name: "Hải Phòng", value: 27 },
          { name: "Hưng Yên", value: 21 },
          { name: "Bắc Ninh", value: 31 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle:
          "Tỷ lệ các hạng mục điểm đến tiêu biểu của vùng Đồng Bằng Sông Hồng",
        data: [
          { name: "Di tích lịch sử", value: 40 },
          { name: "Ẩm thực đặc sản", value: 25 },
          { name: "Lễ hội truyền thống", value: 22 },
          { name: "Làng nghề / Sinh thái", value: 13 },
        ],
      },
    },
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
    stats: [
      { value: "15+", label: "Dân tộc thiểu số" },
      { value: "500+", label: "Lễ hội dân gian" },
      { value: "100+", label: "Làng nghề truyền thống" },
      { value: "2 kỳ quan", label: "UNESCO công nhận" },
    ],
    timeline: [
      {
        year: "Thời tiền sử",
        title: "Đất cổ vùng Đông Bắc",
        description:
          "Vùng Đông Bắc là quê hương lâu đời của người Tày, Nùng, H'Mông, Dao... với nền văn hóa phong phú và bản sắc riêng biệt qua hàng nghìn năm.",
        icon: "🏔️",
        image: heroLandscape,
      },
      {
        year: "1288",
        title: "Chiến thắng Bạch Đằng",
        description:
          "Vùng biển và sông Đông Bắc chứng kiến trận Bạch Đằng lịch sử 1288 – Trần Hưng Đạo đánh tan quân Nguyên Mông lần thứ ba.",
        icon: "⚔️",
        image: heroLandscape,
      },
      {
        year: "2010",
        title: "Cao nguyên đá Đồng Văn – UNESCO",
        description:
          "Cao nguyên đá Đồng Văn được UNESCO công nhận là Công viên địa chất toàn cầu – vùng đá vôi kỳ vĩ với 400-500 triệu năm tuổi.",
        icon: "🌏",
        image: heroLandscape,
      },
      {
        year: "Hiện đại",
        title: "Du lịch bản sắc vùng cao",
        description:
          "Vùng Đông Bắc trở thành điểm đến du lịch khám phá hấp dẫn với ruộng bậc thang, chợ phiên đầy màu sắc và văn hóa dân tộc còn nguyên vẹn.",
        icon: "🌄",
        image: heroLandscape,
      },
    ],
    craftVillages: [
      {
        name: "Dệt thổ cẩm Tày – Nùng",
        product: "Thổ cẩm truyền thống",
        description:
          "Nghề dệt thổ cẩm của người Tày, Nùng Đông Bắc với hoa văn hình học màu sắc sặc sỡ, là di sản văn hóa đặc trưng của vùng biên giới.",
        image: heroLandscape,
        age: "Truyền thống lâu đời",
      },
      {
        name: "Làng rèn Phúc Sen",
        product: "Dao rèn Cao Bằng",
        description:
          "Làng rèn Phúc Sen của người Nùng An Cao Bằng – nơi sản xuất dao, liềm và nông cụ rèn thủ công chất lượng cao nổi tiếng vùng Đông Bắc.",
        image: heroLandscape,
        age: "300+ năm",
      },
      {
        name: "Nghề làm giấy dó Thái Nguyên",
        product: "Giấy dó thủ công",
        description:
          "Nghề làm giấy dó truyền thống – loại giấy thủ công từ vỏ cây dó dùng trong thư pháp, tranh dân gian và các nghi lễ tâm linh.",
        image: heroLandscape,
        age: "300+ năm",
      },
      {
        name: "Chè shan tuyết Tuyên Quang",
        product: "Chè Shan tuyết cổ thụ",
        description:
          "Vùng chè Shan tuyết Tuyên Quang với những cây chè cổ thụ trăm năm mọc trên núi cao, cho búp chè chất lượng cao và hương thơm đặc biệt.",
        image: heroLandscape,
        age: "100+ năm",
      },
    ],
    festivals: [
      {
        name: "Lễ hội hoa tam giác mạch Hà Giang",
        date: "Tháng 10-11 hàng năm",
        description:
          "Mùa hoa tam giác mạch nở rộ tràn ngập cao nguyên đá Đồng Văn – Mèo Vạc, thu hút hàng chục nghìn du khách khắp nơi đến chiêm ngưỡng.",
        significance: "Lễ hội hoa đặc trưng Đông Bắc",
        image: heroLandscape,
      },
      {
        name: "Lễ hội Lồng Tồng Cao Bằng",
        date: "Mùng 5-7 tháng Giêng",
        description:
          "Lễ hội xuống đồng đầu năm của người Tày Cao Bằng cầu mưa thuận gió hòa với các nghi lễ nông nghiệp và trò chơi dân gian truyền thống.",
        significance: "Lễ hội nông nghiệp người Tày",
        image: heroLandscape,
      },
      {
        name: "Chợ phiên Đồng Văn",
        date: "Chủ nhật hàng tuần",
        description:
          "Chợ phiên Đồng Văn Hà Giang – nơi giao lưu văn hóa của người Mông, Lô Lô, Pu Péo với trang phục rực rỡ và hàng hóa phong phú.",
        significance: "Văn hóa chợ phiên đặc sắc",
        image: heroLandscape,
      },
      {
        name: "Lễ hội Gầu Tào H'Mông",
        date: "Mùng 1-5 Tết Nguyên Đán",
        description:
          "Lễ hội đầu năm lớn nhất của người H'Mông vùng Đông Bắc với múa khèn, ném pao, thi hát dân ca và nhiều trò chơi dân gian.",
        significance: "Lễ hội người H'Mông đặc trưng",
        image: heroLandscape,
      },
    ],
    specialties: [
      {
        name: "Thắng cố",
        description: "Món ăn đặc trưng vùng cao.",
        origin: "Hà Giang",
        image: cuisineImage,
      },
      {
        name: "Lạp xưởng gác bếp",
        description: "Hương vị đậm đà của núi rừng.",
        origin: "Lạng Sơn",
        image: seafoodImage,
      },
      {
        name: "Chè shan tuyết",
        description: "Trà cổ thụ thơm dịu.",
        origin: "Tuyên Quang",
        image: coffeeImage,
      },
    ],
    tourism: [
      {
        name: "Cao nguyên đá Đồng Văn",
        description: "Cảnh quan đá vôi kỳ vĩ.",
        image: heroLandscape,
      },
      {
        name: "Thác Bản Giốc",
        description: "Một trong những thác nước đẹp nhất Việt Nam.",
        image: halongImage,
      },
      {
        name: "Hồ Ba Bể",
        description: "Hồ nước ngọt lớn giữa núi rừng.",
        image: thangLongImage,
      },
    ],
    culture: [
      {
        name: "Chợ phiên vùng cao",
        description: "Nơi giao lưu văn hóa của đồng bào dân tộc.",
        image: cuisineImage,
      },
      {
        name: "Lễ hội mùa hoa tam giác mạch",
        description: "Sắc hồng phủ khắp núi rừng.",
        image: heroLandscape,
      },
    ],
    gallery: [
      halongImage,
      heroLandscape,
      cuisineImage,
      coffeeImage,
      seafoodImage,
      phoImage,
    ],
    charts: {
      barChart: {
        title: "Di tích theo tỉnh thành",
        subtitle:
          "Số lượng di tích lịch sử – văn hóa tiêu biểu theo tỉnh thành vùng Đông Bắc",
        data: [
          { name: "Quảng Ninh", value: 42 },
          { name: "Cao Bằng", value: 28 },
          { name: "Lạng Sơn", value: 31 },
          { name: "Lào Cai", value: 35 },
          { name: "Hà Giang", value: 24 },
        ],
      },
      pieChart: {
        title: "Phân loại điểm đến văn hóa",
        subtitle: "Tỷ lệ các hạng mục điểm đến tiêu biểu của vùng Đông Bắc",
        data: [
          { name: "Di tích lịch sử", value: 32 },
          { name: "Ẩm thực đặc sản", value: 20 },
          { name: "Lễ hội truyền thống", value: 18 },
          { name: "Làng nghề / Sinh thái", value: 30 },
        ],
      },
    },
  },
];

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const provincesWithSpecialtySlugs = provinces.map((province) => ({
  ...province,
  specialties: Array.isArray(province.specialties)
    ? province.specialties.map((specialty) => ({
      ...specialty,
      slug: slugify(specialty.name),
    }))
    : province.specialties,
}));

export default provincesWithSpecialtySlugs;
