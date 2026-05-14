# 🌏 Hệ Thống Thông Tin & Kinh Doanh Đặc Sản Địa Phương

Chuyên đề tốt nghiệp - Nhóm Phạm Minh Hiếu

## 📌 Mục lục

- [📖 Giới thiệu](#-giới-thiệu)
- [🎯 Mục tiêu hệ thống](#-mục-tiêu-hệ-thống)
- [🚀 Tính năng chính](#-tính-năng-chính)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [📂 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [⚙️ Cài đặt & chạy dự án](#️-cài-đặt--chạy-dự-án)
- [👥 Phân quyền người dùng](#-phân-quyền-người-dùng)
- [🔄 Quy trình nghiệp vụ](#-quy-trình-nghiệp-vụ)
- [📊 Báo cáo & thống kê](#-báo-cáo--thống-kê)
- [📏 Quy định làm việc](#-quy-định-làm-việc)
- [🚧 Định hướng phát triển](#-định-hướng-phát-triển)

---

## 👨‍💻 Thành viên thực hiện

- Phạm Minh Hiếu
- Nguyễn Thiện Minh Hoàng
- Huỳnh Công Minh Toàn

---

## 📖 Giới thiệu

Hệ thống được xây dựng nhằm quản lý và chia sẻ thông tin các tỉnh, thành phố tại Việt Nam, kết hợp giới thiệu bản sắc địa phương và kinh doanh đặc sản trực tuyến.

Người dùng có thể:

- Khám phá thông tin văn hóa, du lịch, ẩm thực
- Xem nội dung đa phương tiện (ảnh, video, bài viết)
- Mua sắm đặc sản ngay trên cùng nền tảng

---

## 🎯 Mục tiêu hệ thống

- Xây dựng nền tảng tích hợp giữa **thông tin địa phương** và **thương mại điện tử**
- Hỗ trợ quản lý dữ liệu linh hoạt, dễ mở rộng
- Tạo trải nghiệm người dùng liền mạch: _khám phá → mua sắm_

---

## 🚀 Tính năng chính

### 🏙️ 1. Quản lý dữ liệu địa phương

- Lưu trữ thông tin: tên, khu vực, mô tả
- Nội dung: văn hóa, du lịch, ẩm thực, lễ hội
- Hình ảnh, video
- CRUD đầy đủ

---

### 🎨 2. Landing page riêng cho từng tỉnh

- Mỗi địa phương có giao diện riêng
- Tùy biến layout, màu sắc
- Tách biệt nội dung và cấu hình giao diện

---

### 🛒 3. Quản lý & bán đặc sản

- Danh mục theo từng địa phương
- Thông tin sản phẩm:
  - Tên
  - Giá
  - Mô tả
  - Tồn kho
  - Nhà cung cấp
- Liên kết trực tiếp với landing page

---

### 🧾 4. Quy trình mua hàng

- Xem sản phẩm
- Thêm vào giỏ hàng
- Đặt hàng
- Theo dõi trạng thái đơn hàng

---

### 📰 5. Quản lý nội dung truyền thông

- Bài viết
- Hình ảnh
- Video
- Hiển thị theo từng địa phương

---

### 🔍 6. Tìm kiếm & lọc

- Tìm tỉnh/thành
- Tìm sản phẩm
- Lọc theo:
  - Khu vực
  - Giá
  - Loại sản phẩm

---

### 👤 7. Người dùng & phân quyền

- Admin
- Editor
- Seller
- Customer

---

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ                     |
| ---------- | ----------------------------- |
| Backend    | ASP.NET Core Web API (.NET 8) |
| Frontend   | React                         |
| Database   | PostgreSQL                    |
| Giao tiếp  | RESTful API                   |

---

## 📂 Cấu trúc dự án

graduation-project/
│
├── backend/
│ ├── ApiGateway/
│ ├── Services/
│ ├── Shared/
│ └── backend.sln
│
├── frontend/
│ └── web-client/
│
├── docs/
└── README.md

---

## ⚙️ Cài đặt & chạy dự án

### 🔧 Backend

```bash
cd backend
dotnet restore
dotnet run
💻 Frontend
cd frontend/web-client
npm install
npm run dev
```

---

## 👥 Phân quyền người dùng

| Vai trò  | Quyền                 |
| -------- | --------------------- |
| Admin    | Quản lý toàn hệ thống |
| Editor   | Quản lý nội dung      |
| Seller   | Quản lý sản phẩm      |
| Customer | Mua hàng              |

---

## 🔄 Quy trình nghiệp vụ

Khám phá địa phương → Xem sản phẩm → Thêm vào giỏ → Đặt hàng → Theo dõi đơn

---

## 📊 Báo cáo & thống kê

- Số lượng địa phương
- Số lượng sản phẩm
- Số đơn hàng
- Doanh thu

### Hiển thị:

- Bảng dữ liệu
- Biểu đồ trực quan

---

## 📏 Quy định làm việc

### 🔀 Git Flow

- main: production
- develop: development
- feature/\*
- bugfix/\*

### 📝 Commit message

- feat: thêm tính năng
- fix: sửa lỗi
- refactor: tối ưu code
- docs: cập nhật tài liệu

---

## ⚠️ Quy tắc

- Không push trực tiếp lên main
- Luôn tạo branch riêng
- Code phải chạy trước khi commit

## 🚧 Định hướng phát triển

- Tích hợp thanh toán online
- Tích hợp AI gợi ý sản phẩm
- Mở rộng thành microservices
- Tối ưu trải nghiệm người dùng
